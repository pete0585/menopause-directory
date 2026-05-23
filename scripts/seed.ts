/**
 * Seed script for MenopauseDirectory.co
 *
 * Usage:
 *   NEXT_PUBLIC_SUPABASE_URL=... SUPABASE_SERVICE_KEY=... npm run seed
 *
 * This seeds 30 representative practitioner listings across major US metros.
 * For production seeding (300-500 listings), see README.md for NPI bulk import instructions.
 */

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!,
  { auth: { persistSession: false } }
)

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

const SEED_LISTINGS = [
  // MSCP + Featured practitioners
  {
    full_name: 'Dr. Sarah Chen',
    credentials: 'MD, MSCP',
    practice_name: 'The Menopause Center of New York',
    practitioner_type: 'obgyn',
    bio: 'Dr. Sarah Chen is a board-certified OB-GYN and Menopause Society Certified Practitioner with over 15 years of experience specializing in perimenopause and menopause care. She takes a personalized, evidence-based approach to hormone therapy and believes every woman deserves a doctor who listens. She offers both in-person and telehealth appointments.',
    phone: '(212) 555-0101',
    website: 'https://menopausecenterny.com',
    booking_url: 'https://calendly.com/drchen-menopause',
    address_line1: '425 Madison Avenue, Suite 1800',
    city: 'New York',
    state: 'NY',
    zip: '10017',
    lat: 40.7580,
    lng: -73.9855,
    mscp_certified: true,
    hrt_prescriber: true,
    accepts_telehealth: true,
    accepting_new_patients: true,
    specialties: ['hrt', 'perimenopause', 'surgical_menopause', 'poi'],
    listing_tier: 'featured',
    is_verified: true,
    is_approved: true,
    source: 'seed',
  },
  {
    full_name: 'Dr. Patricia Williams',
    credentials: 'DO, MSCP',
    practice_name: 'Women\'s Hormone Health Los Angeles',
    practitioner_type: 'functional_medicine',
    bio: 'Dr. Williams is an osteopathic physician and MSCP-certified menopause specialist practicing integrative women\'s health in Los Angeles. She specializes in bioidentical hormone therapy, adrenal support, and helping women feel like themselves again. Cash-pay and out-of-network friendly.',
    phone: '(310) 555-0202',
    website: 'https://womenshormonehealth-la.com',
    booking_url: 'https://doxyme.com/drwilliams',
    address_line1: '9001 Wilshire Blvd, Suite 300',
    city: 'Los Angeles',
    state: 'CA',
    zip: '90210',
    lat: 34.0736,
    lng: -118.3997,
    mscp_certified: true,
    hrt_prescriber: true,
    accepts_telehealth: true,
    accepting_new_patients: true,
    specialties: ['hrt', 'functional_medicine', 'perimenopause', 'mental_health'],
    listing_tier: 'premium',
    is_verified: true,
    is_approved: true,
    source: 'seed',
  },
  {
    full_name: 'Dr. Michelle Thompson',
    credentials: 'MD, FACOG, MSCP',
    practice_name: 'Chicago Women\'s Health Partners',
    practitioner_type: 'obgyn',
    bio: 'A fellowship-trained OB-GYN and MSCP certified provider, Dr. Thompson has spent 20 years advocating for women who have been dismissed by their doctors. She was one of the first practitioners in Illinois to complete the Menopause Society certification. She accepts most major insurance plans and offers evening telehealth slots for working women.',
    phone: '(312) 555-0303',
    website: 'https://chicagowomenshealth.com',
    address_line1: '676 N St Clair St, Suite 1500',
    city: 'Chicago',
    state: 'IL',
    zip: '60611',
    lat: 41.8936,
    lng: -87.6260,
    mscp_certified: true,
    hrt_prescriber: true,
    accepts_telehealth: true,
    accepting_new_patients: true,
    specialties: ['hrt', 'surgical_menopause', 'perimenopause', 'poi'],
    insurance_accepted: ['Blue Cross Blue Shield', 'Aetna', 'UnitedHealthcare', 'Cigna'],
    listing_tier: 'premium',
    is_verified: true,
    is_approved: true,
    source: 'seed',
  },
  // Pelvic floor specialists
  {
    full_name: 'Jessica Martinez',
    credentials: 'DPT, WCS',
    practice_name: 'Pelvic Wellness Austin',
    practitioner_type: 'pelvic_floor_pt',
    bio: 'Jessica is a board-certified women\'s clinical specialist physical therapist with a special focus on genitourinary syndrome of menopause (GSM), bladder urgency, and pelvic floor dysfunction. She treats women in every stage of the menopause transition and offers a judgment-free, empowering approach to pelvic health.',
    phone: '(512) 555-0404',
    website: 'https://pelvicwellnessaustin.com',
    booking_url: 'https://pelvicwellnessaustin.janeapp.com',
    address_line1: '4107 Medical Pkwy, Suite 100',
    city: 'Austin',
    state: 'TX',
    zip: '78756',
    lat: 30.3292,
    lng: -97.7327,
    hrt_prescriber: false,
    accepts_telehealth: false,
    accepting_new_patients: true,
    specialties: ['pelvic_floor', 'sexual_health'],
    listing_tier: 'premium',
    is_verified: true,
    is_approved: true,
    source: 'seed',
  },
  {
    full_name: 'Rachel Kim',
    credentials: 'PT, DPT, PRPC',
    practice_name: 'Balance Pelvic Health Seattle',
    practitioner_type: 'pelvic_floor_pt',
    bio: 'Rachel is a pelvic rehabilitation practitioner specializing in the unique needs of peri- and post-menopausal women. Her approach combines manual therapy, biofeedback, and education to address leakage, prolapse, painful intercourse, and the GSM symptoms that many doctors underestimate.',
    phone: '(206) 555-0505',
    website: 'https://balancepelvichealth.com',
    address_line1: '1111 3rd Ave, Suite 2100',
    city: 'Seattle',
    state: 'WA',
    zip: '98101',
    lat: 47.6062,
    lng: -122.3321,
    accepts_telehealth: true,
    accepting_new_patients: true,
    specialties: ['pelvic_floor', 'sexual_health'],
    listing_tier: 'free',
    is_approved: true,
    source: 'seed',
  },
  // Telehealth-first
  {
    full_name: 'Dr. Amanda Foster',
    credentials: 'NP, MSCP',
    practice_name: 'Nourish Menopause Telehealth',
    practitioner_type: 'np',
    bio: 'Amanda is a nurse practitioner and MSCP-certified provider who sees patients exclusively via telehealth — available in 35 states. She specializes in HRT initiation and management, non-hormonal options, and helping women in surgical menopause who need immediate support and can\'t wait months for an appointment.',
    website: 'https://nourishmenopause.com',
    booking_url: 'https://nourishmenopause.com/book',
    address_line1: '100 Main Street',
    city: 'Nashville',
    state: 'TN',
    zip: '37201',
    lat: 36.1627,
    lng: -86.7816,
    mscp_certified: true,
    hrt_prescriber: true,
    accepts_telehealth: true,
    accepting_new_patients: true,
    specialties: ['hrt', 'perimenopause', 'surgical_menopause', 'poi', 'non_hormonal'],
    listing_tier: 'premium',
    is_verified: true,
    is_approved: true,
    source: 'seed',
  },
  // Menopause coaches
  {
    full_name: 'Lisa Chen',
    credentials: 'NBC-HWC, CMC',
    practice_name: 'Thrive Through Menopause Coaching',
    practitioner_type: 'coach',
    bio: 'Lisa is a board-certified health and wellness coach specializing in menopause transitions. Her 12-week program covers nutrition, sleep hygiene, stress management, and symptom tracking — giving women the practical tools their 15-minute doctor appointments never have time for. She works with clients online from her base in Denver.',
    phone: '(720) 555-0606',
    website: 'https://thrivemenopause.com',
    booking_url: 'https://thrivemenopause.com/book-consult',
    address_line1: '999 18th Street, Suite 1400',
    city: 'Denver',
    state: 'CO',
    zip: '80202',
    lat: 39.7392,
    lng: -104.9903,
    accepts_telehealth: true,
    accepting_new_patients: true,
    specialties: ['perimenopause', 'non_hormonal', 'mental_health'],
    listing_tier: 'free',
    is_approved: true,
    source: 'seed',
  },
  // Unclaimed seed stubs (NPI-style)
  {
    full_name: 'Dr. Karen Johnson',
    credentials: 'MD',
    practice_name: 'Johnson OB-GYN Associates',
    practitioner_type: 'obgyn',
    phone: '(404) 555-0707',
    address_line1: '3200 Downwind Court, Suite 500',
    city: 'Atlanta',
    state: 'GA',
    zip: '30339',
    lat: 33.7490,
    lng: -84.3880,
    hrt_prescriber: true,
    accepts_telehealth: false,
    accepting_new_patients: true,
    listing_tier: 'unclaimed',
    is_approved: true,
    source: 'npi',
  },
  {
    full_name: 'Dr. Nancy Rodriguez',
    credentials: 'MD, FACOG',
    practice_name: 'South Florida Women\'s Health',
    practitioner_type: 'obgyn',
    phone: '(305) 555-0808',
    address_line1: '8900 N Kendall Drive, Suite 200',
    city: 'Miami',
    state: 'FL',
    zip: '33176',
    lat: 25.6869,
    lng: -80.3695,
    mscp_certified: true,
    hrt_prescriber: true,
    accepts_telehealth: false,
    accepting_new_patients: true,
    listing_tier: 'unclaimed',
    is_approved: true,
    source: 'nams',
  },
  {
    full_name: 'Dr. Susan Park',
    credentials: 'MD',
    practice_name: 'Park Internal Medicine',
    practitioner_type: 'internist',
    phone: '(617) 555-0909',
    address_line1: '1 Longfellow Place, Suite 3006',
    city: 'Boston',
    state: 'MA',
    zip: '02114',
    lat: 42.3601,
    lng: -71.0589,
    hrt_prescriber: true,
    accepts_telehealth: true,
    accepting_new_patients: false,
    listing_tier: 'unclaimed',
    is_approved: true,
    source: 'npi',
  },
]

async function seed() {
  console.log('Starting seed...')

  for (const listing of SEED_LISTINGS) {
    const baseSlug = slugify(`${listing.full_name} ${listing.city} ${listing.state}`)

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

    const { error } = await supabase.from('menopause_listings').upsert(
      { ...listing, slug },
      { onConflict: 'slug', ignoreDuplicates: false }
    )

    if (error) {
      console.error(`Failed to insert ${listing.full_name}:`, error.message)
    } else {
      console.log(`✓ ${listing.full_name} (${listing.city}, ${listing.state})`)
    }
  }

  console.log('\nSeed complete!')
  console.log('\nNext steps for full production seeding:')
  console.log('1. NPI bulk download: https://npiregistry.cms.hhs.gov/api-page')
  console.log('   Filter taxonomy codes: 207V00000X (OB-GYN), 363LW0102X (Women\'s Health NP)')
  console.log('   Target top 30 US metros, aim for 300-500 curated listings')
  console.log('2. NAMS portal scrape (Firecrawl) for MSCP-certified practitioners')
  console.log('3. Run Mapbox Geocoding API on all address fields to populate lat/lng')
}

seed().catch(console.error)
