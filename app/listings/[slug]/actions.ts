'use server'

import { redirect } from 'next/navigation'
import { stripe, VERIFIED_PRICE_ID } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/server'

export async function createCheckoutSession(listingId: string, listingSlug: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://menopausedirectory.co'

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',
    line_items: [
      {
        price: VERIFIED_PRICE_ID,
        quantity: 1,
      },
    ],
    allow_promotion_codes: true,
    success_url: `${siteUrl}/listings/${listingSlug}?upgraded=1`,
    cancel_url: `${siteUrl}/listings/${listingSlug}`,
    customer_email: user?.email,
    metadata: {
      listing_id: listingId,
      listing_slug: listingSlug,
      tier: 'premium',
    },
  })

  redirect(session.url!)
}
