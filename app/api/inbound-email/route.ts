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
  // Verify shared secret to prevent unauthorized webhook calls
  const auth = request.headers.get('authorization') ?? ''
  const secret = process.env.INBOUND_WEBHOOK_SECRET
  if (secret && auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let payload: Record<string, unknown>
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const fromRaw = String(payload.from ?? '')
  if (!fromRaw) {
    return NextResponse.json({ error: 'Missing from address' }, { status: 400 })
  }

  const { email: fromEmail, name: fromName } = parseFromHeader(fromRaw)
  const subject = String(payload.subject ?? '')
  const bodyText = String(payload.text ?? '')
  const bodyHtml = String(payload.html ?? '')
  const toAddress = Array.isArray(payload.to)
    ? (payload.to as string[]).join(', ')
    : String(payload.to ?? '')
  const headers = (payload.headers ?? {}) as Record<string, string>
  const inReplyTo = headers['In-Reply-To'] ?? headers['in-reply-to'] ?? null
  const messageId = headers['Message-ID'] ?? headers['message-id'] ?? null

  // Auto-reply detection: skip OOO / delivery-failure / auto-generated emails
  const autoReplyPatterns = /out of office|auto.?reply|automatic reply|delivery failed|undeliverable|vacation/i
  if (autoReplyPatterns.test(subject) || autoReplyPatterns.test(bodyText.slice(0, 200))) {
    return NextResponse.json({ received: true, skipped: 'auto-reply' })
  }

  const supabase = createServiceClient()

  // menopause_listings uses email column same as ibclc
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
