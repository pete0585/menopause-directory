import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'
import { slugify } from '@/lib/utils'

const schema = z.object({
  full_name: z.string().min(2),
  credentials: z.string().optional(),
  practice_name: z.string().optional(),
  practitioner_type: z.enum([
    'obgyn', 'endocrinologist', 'internist', 'np', 'pa',
    'functional_medicine', 'pelvic_floor_pt', 'coach', 'other',
  ]),
  bio: z.string().min(50).max(1000),
  phone: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  booking_url: z.string().url().optional().or(z.literal('')),
  email: z.string().email(),
  address_line1: z.string().min(5),
  city: z.string().min(2),
  state: z.string().min(2),
  zip: z.string().regex(/^\d{5}(-\d{4})?$/),
  mscp_certified: z.boolean().optional(),
  hrt_prescriber: z.boolean().optional(),
  accepts_telehealth: z.boolean().optional(),
  accepting_new_patients: z.boolean().optional(),
})

function generateSlug(fullName: string, city: string, state: string): string {
  return slugify(`${fullName} ${city} ${state}`)
}

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 422 }
    )
  }

  const data = parsed.data
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!,
    { auth: { persistSession: false } }
  )

  const baseSlug = generateSlug(data.full_name, data.city, data.state)

  // Ensure slug uniqueness
  let slug = baseSlug
  let attempt = 0
  while (true) {
    const { data: existing } = await supabase
      .from('menopause_listings')
      .select('id')
      .eq('slug', slug)
      .maybeSingle()
    if (!existing) break
    attempt++
    slug = `${baseSlug}-${attempt}`
  }

  const { error } = await supabase.from('menopause_listings').insert({
    slug,
    full_name: data.full_name,
    credentials: data.credentials || null,
    practice_name: data.practice_name || null,
    practitioner_type: data.practitioner_type,
    bio: data.bio,
    phone: data.phone || null,
    website: data.website || null,
    booking_url: data.booking_url || null,
    email: data.email,
    address_line1: data.address_line1,
    city: data.city,
    state: data.state,
    zip: data.zip,
    mscp_certified: data.mscp_certified ?? false,
    hrt_prescriber: data.hrt_prescriber ?? false,
    accepts_telehealth: data.accepts_telehealth ?? false,
    accepting_new_patients: data.accepting_new_patients ?? true,
    listing_tier: 'free',
    is_verified: false,
    is_active: true,
    is_approved: false,
    source: 'self_submitted',
  })

  if (error) {
    console.error('Insert error:', error)
    return NextResponse.json({ error: 'Failed to save listing' }, { status: 500 })
  }

  return NextResponse.json({ success: true }, { status: 201 })
}
