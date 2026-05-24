import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email || typeof email !== 'string' || !EMAIL_RE.test(email.trim())) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    const supabase = createServiceClient()

    const { error } = await supabase.from('email_subscribers').insert({
      email: email.trim().toLowerCase(),
      directory: 'menopause',
      source: 'footer-bar',
    })

    if (error) {
      // Unique constraint violation = already subscribed — treat as success
      if (error.code === '23505') {
        return NextResponse.json({ success: true })
      }
      console.error('Subscribe insert error:', error)
      return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
    }

    // Send welcome email via Resend
    const resendKey = process.env.RESEND_API_KEY
    if (resendKey) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'hello@menopausedirectory.co',
          to: email.trim().toLowerCase(),
          subject: 'Welcome to the weekly menopause guide',
          html: `<p>Hi there,</p>
<p>You're in. Every week: real talk about HRT, finding care, and what actually works for perimenopause and menopause.</p>
<p>No fluff. No spam. Just the guide you wish you'd had sooner.</p>
<p>— The MenopauseDirectory.co team</p>
<p style="font-size:12px;color:#aaa;margin-top:32px;">You signed up at MenopauseDirectory.co. <a href="https://menopausedirectory.co">Visit the directory</a>.</p>`,
        }),
      }).catch((err) => console.error('Resend welcome email error:', err))
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Subscribe error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
