import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import type { Listing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Menopause Doctors in Texas — Find HRT-Friendly Providers | MenopauseDirectory.co',
  description:
    'Find menopause specialists, MSCP-certified practitioners, and HRT prescribers across Texas. 17+ providers listed in Houston, Dallas, Austin, San Antonio, and beyond.',
  openGraph: {
    title: 'Menopause Doctors in Texas',
    description:
      'Find menopause specialists in Texas — HRT prescribers, MSCP-certified, pelvic floor therapists, and telehealth options across the state.',
  },
}

const TX_CITIES = [
  { city: 'Houston', label: 'Houston' },
  { city: 'Dallas', label: 'Dallas / DFW' },
  { city: 'Austin', label: 'Austin' },
  { city: 'San Antonio', label: 'San Antonio' },
  { city: 'Fort Worth', label: 'Fort Worth' },
  { city: 'El Paso', label: 'El Paso' },
  { city: 'Plano', label: 'Plano' },
  { city: 'Arlington', label: 'Arlington' },
]

async function getTxListings(): Promise<Listing[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('menopause_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .eq('state', 'TX')
    .order('listing_tier', { ascending: false })
    .order('is_verified', { ascending: false })
    .limit(9)
  return (data as Listing[]) ?? []
}

export default async function TexasMenopausePage() {
  const listings = await getTxListings()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">Home</Link>
        {' › '}
        <Link href="/listings" className="hover:text-gray-600">Find a Specialist</Link>
        {' › '}
        <span className="text-gray-600">Texas</span>
      </nav>

      <div className="max-w-3xl mb-10">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Menopause Doctors in Texas
        </h1>
        <p className="text-gray-600 leading-relaxed">
          Texas has 17+ menopause specialists listed across its major metros — Houston, Dallas, Austin,
          San Antonio, and beyond. The provider mix includes MSCP-certified OB-GYNs, functional medicine
          doctors focusing on hormone balance, pelvic floor physical therapists, and menopause coaches.
          Telehealth options are available statewide for women outside major metro areas.
        </p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
          <span>17+ providers statewide</span>
          <span>·</span>
          <span>Major metros covered</span>
          <span>·</span>
          <span>Telehealth statewide</span>
          <span>·</span>
          <span>Tricare accepted</span>
        </div>
      </div>

      {/* City links */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-10">
        <h2 className="font-serif text-xl font-semibold text-gray-900 mb-4">Browse by City in Texas</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {TX_CITIES.map(({ city, label }) => (
            <Link
              key={city}
              href={`/listings?city=${encodeURIComponent(city)}&state=TX`}
              className="text-sm text-brand-plum hover:underline font-medium"
            >
              {label} →
            </Link>
          ))}
        </div>
      </div>

      {/* Listings */}
      {listings.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl font-bold text-gray-900">
              Menopause Specialists Across Texas
            </h2>
            <Link
              href="/listings?state=TX"
              className="flex items-center gap-1 text-sm font-semibold text-brand-plum hover:text-brand-plum/80"
            >
              See all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {listings.map((listing) => (
              <Link
                key={listing.id}
                href={`/listings/${listing.slug}`}
                className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow group"
              >
                <p className="font-semibold text-gray-800 group-hover:text-brand-plum transition-colors">
                  {listing.full_name}
                  {listing.credentials ? `, ${listing.credentials}` : ''}
                </p>
                <p className="text-sm text-gray-400 mt-1">{listing.city}, TX</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {listing.mscp_certified && (
                    <span className="text-xs font-medium text-brand-plum bg-brand-plum/10 rounded-full px-2 py-0.5">
                      MSCP Certified
                    </span>
                  )}
                  {listing.accepts_telehealth && (
                    <span className="text-xs font-medium text-gray-600 bg-gray-100 rounded-full px-2 py-0.5">
                      Telehealth
                    </span>
                  )}
                  {listing.hrt_prescriber && (
                    <span className="text-xs font-medium text-brand-rose bg-brand-rose/10 rounded-full px-2 py-0.5">
                      Prescribes HRT
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-3xl">
        <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
          Menopause Care in Texas: FAQ
        </h2>
        <div className="space-y-4">
          {[
            {
              q: 'How do I find an HRT-prescribing doctor in Texas?',
              a: 'Filter this directory for Texas providers and select "Prescribes HRT." Houston and Dallas have strong concentrations of menopause-knowledgeable providers. Austin\'s growing healthcare ecosystem also has solid options. For rural Texas, telehealth is the most practical path — several providers offer statewide telehealth consultations.',
            },
            {
              q: 'Does Texas Medicaid (STAR) cover menopause care?',
              a: 'Texas Medicaid (STAR) covers women\'s preventive care, OB-GYN visits, and some medications. Coverage for specific HRT formulations varies by managed care plan. Contact your STAR plan\'s member services to confirm what\'s covered before booking.',
            },
            {
              q: 'Are there menopause specialists near me in rural Texas?',
              a: 'If you\'re outside a major Texas metro, telehealth is your best option. Several providers in this directory serve Texas statewide via telehealth, including HRT prescribers and MSCP-certified practitioners. Look for listings with "Telehealth Available" in their profile.',
            },
            {
              q: 'What is the Tricare situation for menopause care in Texas?',
              a: 'Texas has large military populations near major bases (Fort Hood, Fort Sam Houston, Joint Base San Antonio, NAS Corpus Christi). Tricare covers IBCLC services — but more relevantly for menopause, Tricare covers OB-GYN and women\'s health visits where menopause management occurs. Filter by "Tricare" in the insurance search to find authorized providers.',
            },
          ].map((faq) => (
            <details key={faq.q} className="bg-white rounded-xl border border-gray-100 p-5 group">
              <summary className="font-medium text-gray-900 cursor-pointer list-none flex items-center justify-between gap-4">
                <span>{faq.q}</span>
                <span className="text-brand-plum text-lg group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-3 text-gray-600 leading-relaxed text-sm">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-gray-100">
        <h3 className="font-serif text-lg font-semibold text-gray-800 mb-3">Browse Other States</h3>
        <div className="flex flex-wrap gap-3">
          <Link href="/menopause-doctors/california" className="text-sm text-brand-plum hover:underline font-medium">California →</Link>
          <Link href="/menopause-doctors/boston-ma" className="text-sm text-brand-plum hover:underline font-medium">Boston, MA →</Link>
          <Link href="/menopause-doctors/atlanta-ga" className="text-sm text-brand-plum hover:underline font-medium">Atlanta, GA →</Link>
          <Link href="/listings" className="text-sm text-brand-plum hover:underline font-medium">All Providers →</Link>
        </div>
      </div>
    </div>
  )
}
