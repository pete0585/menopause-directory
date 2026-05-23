import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { PractitionerType, ListingTier } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export const PRACTITIONER_TYPE_LABELS: Record<PractitionerType, string> = {
  obgyn: 'OB-GYN',
  endocrinologist: 'Endocrinologist',
  internist: 'Internal Medicine',
  np: 'Nurse Practitioner',
  pa: 'Physician Assistant',
  functional_medicine: 'Functional Medicine',
  pelvic_floor_pt: 'Pelvic Floor PT',
  coach: 'Menopause Coach',
  other: 'Specialist',
}

export const PRACTITIONER_TYPE_COLORS: Record<PractitionerType, string> = {
  obgyn: 'bg-brand-plum/10 text-brand-plum',
  endocrinologist: 'bg-brand-rose/10 text-brand-rose-dark',
  internist: 'bg-brand-sage/10 text-brand-sage-dark',
  np: 'bg-brand-plum/10 text-brand-plum',
  pa: 'bg-brand-rose/10 text-brand-rose-dark',
  functional_medicine: 'bg-brand-sage/10 text-brand-sage-dark',
  pelvic_floor_pt: 'bg-brand-rose/10 text-brand-rose-dark',
  coach: 'bg-brand-sage/10 text-brand-sage-dark',
  other: 'bg-gray-100 text-gray-600',
}

export const TIER_LABELS: Record<ListingTier, string> = {
  unclaimed: 'Unclaimed',
  free: 'Claimed',
  premium: 'Verified',
  featured: 'Featured',
}

export const SPECIALTY_LABELS: Record<string, string> = {
  hrt: 'Hormone Replacement Therapy',
  surgical_menopause: 'Surgical Menopause',
  poi: 'Premature Ovarian Insufficiency',
  perimenopause: 'Perimenopause',
  pelvic_floor: 'Pelvic Floor Health',
  sexual_health: 'Sexual Health & GSM',
  non_hormonal: 'Non-Hormonal Options',
  functional_medicine: 'Functional Medicine',
  mental_health: 'Mental Health & Menopause',
}

export const US_STATES = [
  { abbr: 'AL', name: 'Alabama' }, { abbr: 'AK', name: 'Alaska' },
  { abbr: 'AZ', name: 'Arizona' }, { abbr: 'AR', name: 'Arkansas' },
  { abbr: 'CA', name: 'California' }, { abbr: 'CO', name: 'Colorado' },
  { abbr: 'CT', name: 'Connecticut' }, { abbr: 'DE', name: 'Delaware' },
  { abbr: 'FL', name: 'Florida' }, { abbr: 'GA', name: 'Georgia' },
  { abbr: 'HI', name: 'Hawaii' }, { abbr: 'ID', name: 'Idaho' },
  { abbr: 'IL', name: 'Illinois' }, { abbr: 'IN', name: 'Indiana' },
  { abbr: 'IA', name: 'Iowa' }, { abbr: 'KS', name: 'Kansas' },
  { abbr: 'KY', name: 'Kentucky' }, { abbr: 'LA', name: 'Louisiana' },
  { abbr: 'ME', name: 'Maine' }, { abbr: 'MD', name: 'Maryland' },
  { abbr: 'MA', name: 'Massachusetts' }, { abbr: 'MI', name: 'Michigan' },
  { abbr: 'MN', name: 'Minnesota' }, { abbr: 'MS', name: 'Mississippi' },
  { abbr: 'MO', name: 'Missouri' }, { abbr: 'MT', name: 'Montana' },
  { abbr: 'NE', name: 'Nebraska' }, { abbr: 'NV', name: 'Nevada' },
  { abbr: 'NH', name: 'New Hampshire' }, { abbr: 'NJ', name: 'New Jersey' },
  { abbr: 'NM', name: 'New Mexico' }, { abbr: 'NY', name: 'New York' },
  { abbr: 'NC', name: 'North Carolina' }, { abbr: 'ND', name: 'North Dakota' },
  { abbr: 'OH', name: 'Ohio' }, { abbr: 'OK', name: 'Oklahoma' },
  { abbr: 'OR', name: 'Oregon' }, { abbr: 'PA', name: 'Pennsylvania' },
  { abbr: 'RI', name: 'Rhode Island' }, { abbr: 'SC', name: 'South Carolina' },
  { abbr: 'SD', name: 'South Dakota' }, { abbr: 'TN', name: 'Tennessee' },
  { abbr: 'TX', name: 'Texas' }, { abbr: 'UT', name: 'Utah' },
  { abbr: 'VT', name: 'Vermont' }, { abbr: 'VA', name: 'Virginia' },
  { abbr: 'WA', name: 'Washington' }, { abbr: 'WV', name: 'West Virginia' },
  { abbr: 'WI', name: 'Wisconsin' }, { abbr: 'WY', name: 'Wyoming' },
]

export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
  }
  return phone
}

export function getStateAbbr(state: string): string {
  const found = US_STATES.find(
    (s) => s.name.toLowerCase() === state.toLowerCase() || s.abbr.toLowerCase() === state.toLowerCase()
  )
  return found?.abbr ?? state
}
