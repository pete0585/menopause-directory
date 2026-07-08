import { NextRequest, NextResponse } from 'next/server'
import { stripe, PLAN_PRICE_IDS } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const { listingId, listingSlug, email, tier = 'premium' } = await request.json()

    if (!listingId) {
      return NextResponse.json({ error: 'listingId is required' }, { status: 400 })
    }

    const isFeatured = tier === 'featured'
    const priceId = isFeatured ? PLAN_PRICE_IDS.featured.annual : PLAN_PRICE_IDS.premium.annual

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://menopausedirectory.co'

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: listingSlug
        ? `${siteUrl}/listings/${listingSlug}?upgraded=1`
        : `${siteUrl}/?upgraded=1`,
      cancel_url: listingSlug
        ? `${siteUrl}/listings/${listingSlug}`
        : `${siteUrl}/`,
      customer_email: email ?? undefined,
      metadata: {
        listing_id: listingId,
        listing_slug: listingSlug ?? '',
        tier,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Checkout session error:', err)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
