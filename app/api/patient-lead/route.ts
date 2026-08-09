import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    const { email, listing_id, directory_slug, provider_name, city, state } = await request.json()

    if (!email || !directory_slug) {
      return NextResponse.json({ error: 'email and directory_slug are required' }, { status: 400 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!,
      { auth: { persistSession: false } }
    )

    const { error } = await supabase.from('patient_leads').insert({
      email,
      listing_id: listing_id ?? null,
      directory_slug,
      provider_name: provider_name ?? null,
      city: city ?? null,
      state: state ?? null,
    })

    if (error) {
      console.error('patient_leads insert error:', error)
      return NextResponse.json({ error: 'Failed to save inquiry' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('patient-lead error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
