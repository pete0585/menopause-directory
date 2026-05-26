import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

const VERIFIED_PRICE_CENTS = 14900 // $149/year

export async function POST(request: NextRequest) {
  try {
    const { listingId, listingSlug, email } = await request.json()

    if (!listingId) {
      return NextResponse.json({ error: 'listingId is required' }, { status: 400 })
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://menopausedirectory.co'

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Verified Listing — MenopauseDirectory.co',
              description:
                'Annual verified practitioner listing: priority placement, verified badge, full profile with direct booking link.',
            },
            unit_amount: VERIFIED_PRICE_CENTS,
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
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Checkout session error:', err)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
