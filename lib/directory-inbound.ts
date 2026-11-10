import { createHmac, createHash, timingSafeEqual } from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'

type Config = { tenant: string; directory: string; domains: readonly string[]; table?: 'inbound_emails' | 'fertility_specialist_inbound_emails' }
type Dependencies = { db: () => Promise<any>; fetch?: typeof fetch; now?: () => number }
const reply = (status: number, value: Record<string, unknown>) => NextResponse.json(value, { status })
const uuid = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i
const emailAddress = (raw: unknown) => typeof raw === 'string' ? (raw.match(/<([^<>]+)>/)?.[1] ?? raw).trim().toLowerCase() : ''
export function validSignature(raw: string, headers: Headers, secret: string, now: number) {
  const id = headers.get('svix-id'), timestamp = headers.get('svix-timestamp'), signatures = headers.get('svix-signature')
  if (!id || !timestamp || !signatures || !/^\d+$/.test(timestamp) || Math.abs(now / 1000 - Number(timestamp)) > 300 || !/^whsec_[A-Za-z0-9+/=]+$/.test(secret)) return false
  const expected = createHmac('sha256', Buffer.from(secret.slice(6), 'base64')).update(`${id}.${timestamp}.${raw}`).digest()
  return signatures.split(' ').some(value => {
    if (!value.startsWith('v1,')) return false
    const actual = Buffer.from(value.slice(3), 'base64')
    return actual.length === expected.length && timingSafeEqual(actual, expected)
  })
}
export function inboundIdentity(tenant: string, emailId: string) {
  const h = createHash('sha256').update(`${tenant}\0${emailId}`).digest('hex')
  return `${h.slice(0,8)}-${h.slice(8,12)}-8${h.slice(13,16)}-a${h.slice(17,20)}-${h.slice(20,32)}`
}
async function readBoundedBody(req: NextRequest): Promise<string | null> {
  if (!req.body) return ''
  const reader = req.body.getReader(), chunks: Uint8Array[] = []
  let size = 0
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      size += value.byteLength
      if (size > 131072) { await reader.cancel(); return null }
      chunks.push(value)
    }
    return new TextDecoder('utf-8', { fatal: true }).decode(Buffer.concat(chunks))
  } finally { reader.releaseLock() }
}
export function createInboundHandler(config: Config, deps: Dependencies) {
  if (!/^directories--[a-z0-9-]+$/.test(config.tenant) || !config.domains.length || config.domains.some(d => !/^[a-z0-9.-]+$/.test(d))) throw new Error('invalid_inbound_binding')
  return async function POST(req: NextRequest) {
    const secret = process.env.INBOUND_WEBHOOK_SECRET, key = process.env.RESEND_API_KEY
    if (!secret || !key) return reply(503, { error: 'inbound_connection_not_configured' })
    if (Number(req.headers.get('content-length') || 0) > 131072) return reply(413, { error: 'payload_too_large' })
    let raw: string | null
    try { raw = await readBoundedBody(req) } catch { return reply(400, { error: 'invalid_body' }) }
    if (raw === null) return reply(413, { error: 'payload_too_large' })
    if (!validSignature(raw, req.headers, secret, (deps.now ?? Date.now)())) return reply(401, { error: 'invalid_webhook_signature' })
    let event: any
    try { event = JSON.parse(raw) } catch { return reply(400, { error: 'invalid_json' }) }
    if (event.type !== 'email.received') return reply(200, { received: true, skipped: 'not_email_received' })
    const emailId = event.data?.email_id
    if (typeof emailId !== 'string' || !uuid.test(emailId)) return reply(400, { error: 'invalid_email_id' })
    try {
      const res = await (deps.fetch ?? fetch)(`https://api.resend.com/emails/receiving/${emailId}`, { headers: { Authorization: `Bearer ${key}` }, redirect: 'error', signal: AbortSignal.timeout(15000) })
      if (!res.ok) return reply(503, { error: 'receiving_refetch_failed', upstream_status: res.status })
      const message: any = await res.json()
      if (message.id !== emailId || !Array.isArray(message.to)) return reply(502, { error: 'receiving_identity_invalid' })
      const recipients = message.to.map(emailAddress).filter((v: string) => /^[^\s@]+@[^\s@]+$/.test(v))
      if (!recipients.some((v: string) => config.domains.includes(v.split('@')[1]))) return reply(200, { received: true, skipped: 'other_directory' })
      const sender = emailAddress(message.from)
      if (!/^[^\s@]+@[^\s@]+$/.test(sender)) return reply(502, { error: 'receiving_sender_invalid' })
      const id = inboundIdentity(config.tenant, emailId), table = config.table ?? 'inbound_emails'
      const row: Record<string, unknown> = { id, from_email: sender, subject: String(message.subject ?? '').slice(0,500), body_text: String(message.text ?? '').slice(0,10000), processed: false }
      if (table === 'inbound_emails') Object.assign(row, { directory: config.directory, email_id: emailId, to_address: recipients.filter((v: string) => config.domains.includes(v.split('@')[1])).join(', '), body_html: String(message.html ?? '').slice(0,50000), message_id: typeof message.message_id === 'string' ? message.message_id : null })
      // Never infer listing ownership from sender headers or message body.
      const db = await deps.db()
      const saved = await db.from(table).insert(row).select('id').single()
      if (saved.error && saved.error.code !== '23505') return reply(503, { error: 'inbound_save_failed' })
      const readback = await db.from(table).select(table === 'inbound_emails' ? 'id,directory,email_id' : 'id').eq('id',id).maybeSingle()
      if (readback.error || readback.data?.id !== id || (table === 'inbound_emails' && (readback.data.directory !== config.directory || readback.data.email_id !== emailId))) return reply(503, { error: 'inbound_save_unconfirmed' })
      return reply(200, { received: true, duplicate: saved.error?.code === '23505', record_id: id })
    } catch { return reply(503, { error: 'inbound_temporarily_unavailable' }) }
  }
}
