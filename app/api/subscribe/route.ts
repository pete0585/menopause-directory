import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { email } = await request.json()
  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  const res = await fetch('https://api.resend.com/contacts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      audience_id: process.env.RESEND_MENOPAUSE_AUDIENCE_ID,
      unsubscribed: false,
    }),
  })

  if (!res.ok) {
    // Resend returns 409 if already subscribed — treat as success
    if (res.status === 409) return NextResponse.json({ ok: true })
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
