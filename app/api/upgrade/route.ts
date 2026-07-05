import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { stripe, PLAN_PRICE_IDS } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const { listingId, tier, billing = 'monthly' } = await request.json()

    // tier from claim page: 'pro' → 'premium', 'verified' → 'featured'
    const menoTier = tier === 'verified' ? 'featured' : 'premium'
    const billingKey = billing === 'annual' ? 'annual' : 'monthly'

    if (!listingId) {
      return NextResponse.json({ error: 'listingId is required' }, { status: 400 })
    }

    const supabase = createServiceClient()

    const { data: listing, error } = await supabase
      .from('menopause_listings')
      .select('id, full_name, practice_name, email, claimed_at')
      .eq('id', listingId)
      .single()

    if (error || !listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://menopausedirectory.co'
    const priceId = PLAN_PRICE_IDS[menoTier][billingKey]

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      allow_promotion_codes: true,
      customer_email: listing.email ?? undefined,
      success_url: `${siteUrl}/claim/${listingId}?verified=true&upgraded=1`,
      cancel_url: `${siteUrl}/claim/${listingId}?verified=true`,
      metadata: {
        listing_id: listingId,
        tier: menoTier,
      },
      subscription_data: {
        metadata: {
          listing_id: listingId,
          tier: menoTier,
        },
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Upgrade error:', err)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
