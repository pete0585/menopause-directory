import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import type { Listing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Menopause Doctors in California — Find HRT-Friendly Providers | MenopauseDirectory.co',
  description:
    'Find menopause specialists, MSCP-certified practitioners, and HRT prescribers across California. 19+ providers listed statewide — Los Angeles, San Francisco, San Diego, Sacramento, and more.',
  openGraph: {
    title: 'Menopause Doctors in California',
    description:
      'Find menopause specialists across California — HRT prescribers, MSCP-certified, pelvic floor therapists, and telehealth options statewide.',
  },
}

const CA_CITIES = [
  { city: 'Los Angeles', label: 'Los Angeles' },
  { city: 'San Francisco', label: 'San Francisco' },
  { city: 'San Diego', label: 'San Diego' },
  { city: 'Sacramento', label: 'Sacramento' },
  { city: 'Oakland', label: 'Oakland / East Bay' },
  { city: 'San Jose', label: 'San Jose' },
  { city: 'Santa Monica', label: 'Santa Monica' },
  { city: 'Pasadena', label: 'Pasadena' },
]

async function getCaListings(): Promise<Listing[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('menopause_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .eq('state', 'CA')
    .order('listing_tier', { ascending: false })
    .order('is_verified', { ascending: false })
    .limit(9)
  return (data as Listing[]) ?? []
}

export default async function CaliforniaMenopausePage() {
  const listings = await getCaListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I find a menopause specialist in California who prescribes HRT?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Search MenopauseDirectory.co for California providers and filter by "Prescribes HRT" or "MSCP Certified." California has the largest concentration of menopause specialists of any US state, with significant density in Los Angeles, San Francisco, and San Diego metro areas.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is telehealth available for menopause care in California?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Many California menopause specialists offer telehealth statewide. Several telehealth platforms (Midi Health, Gennev, Alloy) serve California specifically. Telehealth is a strong option for initial consultations, HRT management, and follow-up care across the state.',
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <nav className="text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-gray-600">Home</Link>
          {' › '}
          <Link href="/listings" className="hover:text-gray-600">Find a Specialist</Link>
          {' › '}
          <span className="text-gray-600">California</span>
        </nav>

        <div className="max-w-3xl mb-10">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Menopause Doctors in California
          </h1>
          <p className="text-gray-600 leading-relaxed">
            California has one of the highest concentrations of menopause-specialized providers in the US —
            particularly in the Los Angeles, San Francisco Bay Area, and San Diego metros. Whether you need
            an MSCP-certified OB-GYN, a functional medicine doctor who focuses on hormone balance, or a
            pelvic floor PT, California's provider network is deep.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>19+ providers listed statewide</span>
            <span>·</span>
            <span>Multiple major metros covered</span>
            <span>·</span>
            <span>Telehealth statewide</span>
          </div>
        </div>

        {/* City links */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-10">
          <h2 className="font-serif text-xl font-semibold text-gray-900 mb-4">Browse by City</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CA_CITIES.map(({ city, label }) => (
              <Link
                key={city}
                href={`/listings?city=${encodeURIComponent(city)}&state=CA`}
                className="text-sm text-brand-plum hover:underline font-medium"
              >
                {label} →
              </Link>
            ))}
          </div>
        </div>

        {/* Featured listings */}
        {listings.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-bold text-gray-900">
                Menopause Specialists Across California
              </h2>
              <Link
                href="/listings?state=CA"
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
                  <p className="text-sm text-gray-400 mt-1">{listing.city}, CA</p>
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
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="max-w-3xl">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
            Menopause Care in California: FAQ
          </h2>
          <div className="space-y-4">
            {[
              {
                q: 'What\'s the best way to find a menopause specialist in LA or the Bay Area?',
                a: 'Search the directory by city (Los Angeles, San Francisco, Oakland, San Jose) and filter by MSCP Certified or Prescribes HRT. Both metros have strong concentrations of menopause-knowledgeable providers. If you need a specific type of specialist (functional medicine, pelvic floor PT, telehealth-only), filter by category.',
              },
              {
                q: 'Can I see a California menopause specialist by telehealth if I\'m in a rural area?',
                a: 'Yes. Several California-based providers offer telehealth statewide, which means rural and Central Valley residents can access menopause specialists without traveling to a major metro. Look for providers who list "Telehealth Available" on their profiles.',
              },
              {
                q: 'Does California Medicaid (Medi-Cal) cover menopause care?',
                a: 'Medi-Cal covers women\'s preventive care services including OB-GYN visits where menopause can be discussed. Coverage for HRT medications varies by plan and formulary. If you\'re on Medi-Cal, search for providers who accept Medicaid and contact them about their Medi-Cal coverage before booking.',
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
            <Link href="/menopause-doctors/texas" className="text-sm text-brand-plum hover:underline font-medium">Texas →</Link>
            <Link href="/menopause-doctors/boston-ma" className="text-sm text-brand-plum hover:underline font-medium">Boston, MA →</Link>
            <Link href="/menopause-doctors/atlanta-ga" className="text-sm text-brand-plum hover:underline font-medium">Atlanta, GA →</Link>
            <Link href="/listings" className="text-sm text-brand-plum hover:underline font-medium">All Providers →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
