import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

// Domain this handler owns. Resend global webhooks fire for all inbound domains —
// ignore emails not addressed to our domain to prevent duplicate rows in inbound_emails.
const OWNED_DOMAIN = 'menopausedirectory.co'

function parseFromHeader(raw: string): { email: string; name: string | null } {
  const match = raw.match(/<([^>]+)>/)
  if (match) {
    const email = match[1].toLowerCase().trim()
    const name = raw.replace(/<[^>]+>/, '').replace(/"/g, '').trim() || null
    return { email, name }
  }
  return { email: raw.toLowerCase().trim(), name: null }
}

// Fetch email body from Resend REST API with exponential backoff.
// Resend webhooks are notification-only — body is not included in the payload.
// The API may not have indexed the body yet when the webhook fires (race condition).
async function fetchEmailBodyWithRetry(
  emailId: string,
  maxAttempts = 3,
  baseDelayMs = 2000,
): Promise<{ text: string; html: string; error: string | null }> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return { text: '', html: '', error: 'RESEND_API_KEY not set' }

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const res = await fetch(`https://api.resend.com/emails/receiving/${emailId}`, {
        headers: { Authorization: `Bearer ${apiKey}` },
      })
      if (!res.ok) {
        if (attempt < maxAttempts) {
          await new Promise(r => setTimeout(r, baseDelayMs * attempt))
          continue
        }
        return { text: '', html: '', error: `HTTP ${res.status}` }
      }
      const data = await res.json() as Record<string, unknown>
      const text = typeof data.text === 'string' ? data.text : ''
      const html = typeof data.html === 'string' ? data.html : ''
      if (text || html) return { text, html, error: null }
      // Response succeeded but body empty — may not be indexed yet
      if (attempt < maxAttempts) {
        await new Promise(r => setTimeout(r, baseDelayMs * attempt))
        continue
      }
      return { text: '', html: '', error: 'Body empty after all retries' }
    } catch (err) {
      if (attempt < maxAttempts) {
        await new Promise(r => setTimeout(r, baseDelayMs * attempt))
        continue
      }
      return { text: '', html: '', error: err instanceof Error ? err.message : String(err) }
    }
  }
  return { text: '', html: '', error: 'Max retries reached' }
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
    console.error('[inbound-email/menopause] Missing email_id in webhook payload', JSON.stringify(eventData))
    return NextResponse.json({ error: 'Missing email_id' }, { status: 400 })
  }

  const toAddress = Array.isArray(eventData.to)
    ? (eventData.to as string[]).join(', ')
    : String(eventData.to ?? '')

  // Domain filter — only process emails addressed to our domain
  if (!toAddress.toLowerCase().includes(OWNED_DOMAIN)) {
    return NextResponse.json({ received: true, skipped: 'not-our-domain' })
  }

  const fromRaw = String(eventData.from ?? '')
  if (!fromRaw) {
    return NextResponse.json({ error: 'Missing from address' }, { status: 400 })
  }

  const { email: fromEmail, name: fromName } = parseFromHeader(fromRaw)
  const subject = String(eventData.subject ?? '')
  const messageId = String(eventData.message_id ?? '') || null

  // Fetch full email body — webhook payload never includes body text.
  // email_id is stored regardless so inbox-watcher can backfill if body is still empty.
  const { text: bodyText, html: bodyHtml, error: fetchError } = await fetchEmailBodyWithRetry(resendEmailId)

  if (fetchError) {
    console.warn('[inbound-email/menopause] Body fetch failed after retries:', fetchError, 'email_id:', resendEmailId)
  }

  const supabase = await createServiceClient()

  const { data: listing } = await supabase
    .from('menopause_listings')
    .select('id, slug')
    .eq('email', fromEmail)
    .maybeSingle()

  await supabase.from('inbound_emails').insert({
    directory: 'menopause',
    email_id: resendEmailId,
    from_email: fromEmail,
    from_name: fromName,
    subject,
    body_text: bodyText,
    body_html: bodyHtml,
    message_id: messageId,
    to_address: toAddress,
    listing_id: listing?.id ?? null,
    listing_slug: listing?.slug ?? null,
    processed: false,
  })

  return NextResponse.json({ received: true })
}
