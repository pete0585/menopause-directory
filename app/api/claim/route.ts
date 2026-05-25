import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { listingId, userId, email } = await request.json()

    if (!listingId || !userId) {
      return NextResponse.json({ error: 'listingId and userId are required' }, { status: 400 })
    }

    const supabase = createServiceClient()

    const { data: listing, error: listingError } = await supabase
      .from('menopause_listings')
      .select('id, full_name, slug, listing_tier')
      .eq('id', listingId)
      .single()

    if (listingError || !listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
    }

    if (listing.listing_tier !== 'unclaimed') {
      // Already claimed — still return success so user can proceed to upgrade
      return NextResponse.json({
        success: true,
        listingName: listing.full_name,
        listingSlug: listing.slug,
        alreadyClaimed: true,
      })
    }

    const { error: updateError } = await supabase
      .from('menopause_listings')
      .update({
        listing_tier: 'free',
        claimed_at: new Date().toISOString(),
        claimed_by: userId,
      })
      .eq('id', listingId)

    if (updateError) {
      console.error('Failed to claim listing:', updateError)
      return NextResponse.json({ error: 'Failed to claim listing' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      listingName: listing.full_name,
      listingSlug: listing.slug,
    })
  } catch (err) {
    console.error('Claim API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
