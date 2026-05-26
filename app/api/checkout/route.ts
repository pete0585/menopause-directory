import { NextRequest, NextResponse } from 'next/server'
import { stripe, VERIFIED_PRICE_CENTS, FEATURED_PRICE_CENTS } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const { listingId, listingSlug, email, tier = 'premium' } = await request.json()

    if (!listingId) {
      return NextResponse.json({ error: 'listingId is required' }, { status: 400 })
    }

    const isFeatured = tier === 'featured'
    const priceAmount = isFeatured ? FEATURED_PRICE_CENTS : VERIFIED_PRICE_CENTS
    const productName = isFeatured
      ? 'Featured Listing — MenopauseDirectory.co'
      : 'Verified Listing — MenopauseDirectory.co'
    const productDesc = isFeatured
      ? 'Featured practitioner listing: top placement in city listings (1 of 3 featured spots), verified badge, highlighted card, newsletter mention.'
      : 'Annual verified practitioner listing: priority placement, verified badge, full profile with direct booking link.'

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://menopausedirectory.co'

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: productName,
              description: productDesc,
            },
            unit_amount: priceAmount,
            recurring: { interval: 'year' },
          },
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
