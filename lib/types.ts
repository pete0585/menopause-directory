export type PractitionerType =
  | 'obgyn'
  | 'endocrinologist'
  | 'internist'
  | 'np'
  | 'pa'
  | 'functional_medicine'
  | 'pelvic_floor_pt'
  | 'coach'
  | 'other'

export type ListingTier = 'unclaimed' | 'free' | 'premium' | 'featured'

export type Specialty =
  | 'hrt'
  | 'surgical_menopause'
  | 'poi'
  | 'perimenopause'
  | 'pelvic_floor'
  | 'sexual_health'
  | 'non_hormonal'
  | 'functional_medicine'
  | 'mental_health'

export interface Listing {
  id: string
  slug: string
  npi_number: string | null
  full_name: string
  credentials: string | null
  practice_name: string | null
  practitioner_type: PractitionerType
  bio: string | null
  headshot_url: string | null
  phone: string | null
  website: string | null
  booking_url: string | null
  email: string | null
  address_line1: string | null
  address_line2: string | null
  city: string
  state: string
  zip: string
  lat: number | null
  lng: number | null
  mscp_certified: boolean
  isswsh_member: boolean
  hrt_prescriber: boolean
  accepts_telehealth: boolean
  accepting_new_patients: boolean
  specialties: string[]
  insurance_accepted: string[]
  languages_spoken: string[]
  listing_tier: ListingTier
  is_verified: boolean
  is_active: boolean
  is_approved: boolean
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  subscription_expires_at: string | null
  source: string | null
  claimed_at: string | null
  claimed_by: string | null
  created_at: string
  updated_at: string
}

export interface Claim {
  id: string
  listing_id: string
  user_id: string
  status: 'pending' | 'approved' | 'rejected'
  verified_at: string | null
  notes: string | null
  created_at: string
}

export interface Payment {
  id: string
  listing_id: string
  stripe_payment_intent_id: string | null
  stripe_subscription_id: string | null
  amount_cents: number
  currency: string
  tier: string
  status: 'pending' | 'succeeded' | 'failed' | 'canceled'
  period_start: string | null
  period_end: string | null
  created_at: string
}

export interface Review {
  id: string
  listing_id: string
  reviewer_name: string | null
  rating: number
  body: string | null
  is_approved: boolean
  created_at: string
}

export interface SearchFilters {
  query?: string
  city?: string
  state?: string
  practitioner_type?: PractitionerType
  mscp_certified?: boolean
  accepts_telehealth?: boolean
  accepting_new_patients?: boolean
  hrt_prescriber?: boolean
}
