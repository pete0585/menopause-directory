import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

function parseFromHeader(raw: string): { email: string; name: string | null } {
  const match = raw.match(/<([^>]+)>/)
  if (match) {
    const email = match[1].toLowerCase().trim()
    const name = raw.replace(/<[^>]+>/, '').replace(/"/g, '').trim() || null
    return { email, name }
  }
  return { email: raw.toLowerCase().trim(), name: null }
}

export async function POST(request: NextRequest) {
  let payload: Record<string, unknown>
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // Resend delivers inbound webhooks via Svix with envelope format:
  // { type: "email.received", created_at: "...", data: { from, to, subject, text, html, headers } }
  // Fall back to flat format for direct testing / other senders.
  const emailData: Record<string, unknown> =
    payload.type === 'email.received' && payload.data && typeof payload.data === 'object'
      ? (payload.data as Record<string, unknown>)
      : payload

  const fromRaw = String(emailData.from ?? '')
  if (!fromRaw) {
    return NextResponse.json({ error: 'Missing from address' }, { status: 400 })
  }

  const { email: fromEmail, name: fromName } = parseFromHeader(fromRaw)
  const subject = String(emailData.subject ?? '')

  // Body extraction — try multiple field names Resend may use
  const bodyText = String(
    emailData.text ??
    emailData.textBody ??
    emailData.text_body ??
    emailData.body_text ??
    (typeof emailData.body === 'string' ? emailData.body : null) ??
    ''
  )
  const bodyHtml = String(
    emailData.html ??
    emailData.htmlBody ??
    emailData.html_body ??
    emailData.body_html ??
    ''
  )

  const toAddress = Array.isArray(emailData.to)
    ? (emailData.to as string[]).join(', ')
    : String(emailData.to ?? '')
  const headers = (emailData.headers ?? {}) as Record<string, string>
  const inReplyTo = headers['In-Reply-To'] ?? headers['in-reply-to'] ?? null
  const messageId = headers['Message-ID'] ?? headers['message-id'] ?? null

  // Auto-reply detection: skip OOO / delivery-failure / auto-generated emails
  const autoReplyPatterns = /out of office|auto.?reply|automatic reply|delivery (failed|delayed)|undeliverable|mailer.daemon|postmaster|no.reply|noreply|do.not.reply/i
  if (autoReplyPatterns.test(subject) || autoReplyPatterns.test(bodyText.slice(0, 200))) {
    return NextResponse.json({ received: true, skipped: 'auto-reply' })
  }

  const supabase = await createServiceClient()

  // Match sender to a listing by email
  const { data: listing } = await supabase
    .from('menopause_listings')
    .select('id, slug')
    .eq('email', fromEmail)
    .maybeSingle()

  await supabase.from('inbound_emails').insert({
    directory: 'menopause',
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
