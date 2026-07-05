import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createServiceClient } from '@/lib/supabase/server'

const resend = new Resend(process.env.RESEND_API_KEY)

function parseFromHeader(raw: string): { email: string; name: string | null } {
  const match = raw.match(/<([^>]+)>/)
  if (match) {
    const email = match[1].toLowerCase().trim()
    const name = raw.replace(/<[^>]+>/, '').replace(/"/g, '').trim() || null
    return { email, name }
  }
  return { email: raw.toLowerCase().trim(), name: null }
}

async function fetchEmailBody(
  emailId: string,
  maxAttempts = 3,
): Promise<{ text: string; html: string; error: string | null }> {
  let lastError: string | null = null
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    if (attempt > 1) {
      // Backoff: 1s, then 2s — gives Resend time to finish processing
      await new Promise((resolve) => setTimeout(resolve, 1000 * attempt))
    }
    try {
      const { data: email, error } = await resend.emails.receiving.get(emailId)
      if (error) {
        lastError = `Resend error: ${error.message}`
        continue
      }
      if (email) {
        const rec = email as Record<string, unknown>
        const text = String(rec.text ?? '')
        const html = String(rec.html ?? '')
        if (text || html) return { text, html, error: null }
        // Body empty on this attempt — webhook fired before body was ready, retry
        lastError = 'body empty'
        continue
      }
      lastError = 'no data returned'
    } catch (err) {
      lastError = err instanceof Error ? err.message : String(err)
    }
  }
  return { text: '', html: '', error: lastError }
}

export async function POST(request: NextRequest) {
  let payload: Record<string, unknown>
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (payload.type !== 'email.received' || !payload.data || typeof payload.data !== 'object') {
    return NextResponse.json({ received: true, skipped: 'not email.received' })
  }

  const eventData = payload.data as Record<string, unknown>
  const resendEmailId = eventData.email_id as string | undefined

  if (!resendEmailId) {
    console.error('[inbound-email/menopause] Missing email_id in webhook payload')
    return NextResponse.json({ error: 'Missing email_id' }, { status: 400 })
  }

  const fromRaw = String(eventData.from ?? '')
  if (!fromRaw) {
    return NextResponse.json({ error: 'Missing from address' }, { status: 400 })
  }

  const toAddress = Array.isArray(eventData.to)
    ? (eventData.to as string[]).join(', ')
    : String(eventData.to ?? '')

  // Domain filter: Resend webhooks are global — one webhook fires for ALL receiving domains.
  // Only process emails addressed to our Menopause domain to prevent cross-directory duplicates.
  if (!toAddress.toLowerCase().includes('menopausedirectory.co')) {
    return NextResponse.json({ received: true, skipped: 'wrong domain' })
  }

  const { email: fromEmail, name: fromName } = parseFromHeader(fromRaw)
  const subject = String(eventData.subject ?? '')
  const headers = (eventData.headers ?? {}) as Record<string, string>
  const inReplyTo = headers['In-Reply-To'] ?? headers['in-reply-to'] ?? null
  const messageId =
    (headers['Message-ID'] ?? headers['message-id'] ?? String(eventData.message_id ?? '')) || null

  // Auto-reply detection: skip before body fetch to save API calls
  const autoReplyPatterns =
    /out of office|auto.?reply|automatic reply|delivery (failed|delayed)|undeliverable|mailer.daemon|postmaster|no.reply|noreply|do.not.reply/i
  if (autoReplyPatterns.test(subject)) {
    return NextResponse.json({ received: true, skipped: 'auto-reply' })
  }

  // Fetch full email body with retry/backoff.
  // Resend webhooks fire before body is available — retries handle the race condition.
  const { text: bodyText, html: bodyHtml, error: fetchError } = await fetchEmailBody(resendEmailId)

  if (autoReplyPatterns.test(bodyText.slice(0, 200))) {
    return NextResponse.json({ received: true, skipped: 'auto-reply-body' })
  }

  if (fetchError) {
    console.warn('[inbound-email/menopause] Body fetch failed after retries. email_id:', resendEmailId, 'error:', fetchError)
  }

  const supabase = await createServiceClient()

  // Match sender to a listing by email
  const { data: listing } = await supabase
    .from('menopause_listings')
    .select('id, slug')
    .eq('email', fromEmail)
    .maybeSingle()

  // Always insert even if body fetch failed — email_id stored so inbox-watcher can backfill
  await supabase.from('inbound_emails').insert({
    directory: 'menopause',
    email_id: resendEmailId,
    from_email: fromEmail,
    from_name: fromName,
    subject,
    body_text: bodyText,
    body_html: bodyHtml,
    in_reply_to: inReplyTo,
    message_id: messageId,
    to_address: toAddress,
    listing_id: listing?.id ?? null,
    listing_slug: listing?.slug ?? null,
    processed: false,
  })

  return NextResponse.json({ received: true })
}
