import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const { listingId, email } = await request.json()

    if (!listingId || !email) {
      return NextResponse.json({ error: 'listingId and email are required' }, { status: 400 })
    }

    const supabase = createServiceClient()

    const { data: listing, error: listingError } = await supabase
      .from('menopause_listings')
      .select('id, full_name, practice_name, email, claimed_at')
      .eq('id', listingId)
      .single()

    if (listingError || !listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
    }

    if (listing.claimed_at) {
      return NextResponse.json({ error: 'This listing has already been claimed' }, { status: 400 })
    }

    const token = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString()
    const displayName = listing.practice_name || listing.full_name

    const { error: claimError } = await supabase.from('menopause_claims').insert({
      listing_id: listingId,
      email,
      token,
      verified: false,
      expires_at: expiresAt,
    })

    if (claimError) {
      return NextResponse.json({ error: 'Failed to create claim' }, { status: 500 })
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://menopausedirectory.co'
    const claimUrl = `${siteUrl}/api/claim/verify?token=${token}`

    if (process.env.RESEND_API_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL ?? 'MenopauseDirectory <hello@mail.menopausedirectory.co>',
          to: email,
          subject: `Claim your MenopauseDirectory.co listing: ${displayName}`,
          html: `
            <p>Hi there,</p>
            <p>Click the link below to verify and claim your listing on MenopauseDirectory.co:</p>
            <p><a href="${claimUrl}" style="color:#7c3aed;font-weight:bold;">Claim my listing →</a></p>
            <p>This link expires in 72 hours.</p>
            <p>If you didn't request this, you can safely ignore this email.</p>
          `,
        }),
      })
    }

    return NextResponse.json({ success: true, listingName: displayName })
  } catch (err) {
    console.error('Claim error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
