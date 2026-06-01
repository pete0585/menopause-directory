import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import type { Listing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Menopause Doctors in Ohio — Find HRT Specialists | MenopauseDirectory.co',
  description:
    'Find menopause specialists, MSCP-certified practitioners, and HRT prescribers across Ohio. Columbus, Cleveland, Cincinnati, Dayton, and more. Telehealth available statewide.',
  openGraph: {
    title: 'Menopause Doctors in Ohio',
    description:
      'Find menopause specialists and HRT-friendly doctors across Ohio. MSCP-certified, telehealth available, accepting new patients.',
  },
}

const OH_CITIES = [
  { city: 'Columbus', slug: 'columbus-oh', label: 'Columbus' },
  { city: 'Cleveland', slug: null, label: 'Cleveland' },
  { city: 'Cincinnati', slug: null, label: 'Cincinnati' },
  { city: 'Dayton', slug: null, label: 'Dayton' },
  { city: 'Toledo', slug: null, label: 'Toledo' },
  { city: 'Akron', slug: null, label: 'Akron' },
  { city: 'Canton', slug: null, label: 'Canton' },
  { city: 'Youngstown', slug: null, label: 'Youngstown' },
]

async function getOhioListings(): Promise<Listing[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('menopause_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .eq('state', 'OH')
    .order('listing_tier', { ascending: false })
    .order('is_verified', { ascending: false })
    .limit(9)
  return (data as Listing[]) ?? []
}

export default async function OhioMenopausePage() {
  const listings = await getOhioListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I find a menopause specialist in Ohio who prescribes HRT?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Search MenopauseDirectory.co for Ohio providers and filter by \"Prescribes HRT\" or \"MSCP Certified.\" Ohio's largest provider concentrations are in Columbus (Ohio State Wexner Medical Center, OhioHealth), Cleveland (Cleveland Clinic, University Hospitals), and Cincinnati (UC Health, TriHealth, The Christ Hospital).",
        },
      },
      {
        '@type': 'Question',
        name: 'Is telehealth available for menopause care in Ohio?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Many Ohio menopause specialists offer telehealth statewide — especially valuable for patients in rural Southeast Ohio, the Appalachian counties, and smaller cities where specialist access is limited. Telehealth extends the reach of Columbus and Cleveland-based specialists across the state.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are there MSCP-certified menopause practitioners in Ohio?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Use the MSCP filter in the directory to find Menopause Society Certified Practitioners across Ohio. Major academic medical centers including Ohio State Wexner, Cleveland Clinic, and UC Health have practitioners with specialized menopause training.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does Ohio Medicaid cover HRT?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ohio Medicaid covers OB-GYN visits including menopause consultations. Coverage for specific HRT medications depends on your managed care plan (Caresource, Buckeye Health, Molina, UHC Community) and formulary. Ask whether the provider accepts your specific Ohio Medicaid plan before scheduling.',
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
          <span className="text-gray-600">Ohio</span>
        </nav>

        <div className="max-w-3xl mb-10">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Menopause Doctors in Ohio
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Ohio has one of the strongest academic medical ecosystems in the Midwest — Ohio State Wexner
            Medical Center in Columbus, Cleveland Clinic in Cleveland, and UC Health in Cincinnati are
            national leaders in women's health. That clinical depth extends to menopause care, with a
            growing number of specialists in independent practice alongside the academic-affiliated options.
            Whether you need an HRT prescriber, an MSCP-certified practitioner, or a provider who takes
            an integrative approach, Ohio's provider network covers the full spectrum.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>Columbus: largest concentration</span>
            <span>·</span>
            <span>Cleveland Clinic system</span>
            <span>·</span>
            <span>Telehealth statewide</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-10">
          <h2 className="font-serif text-xl font-semibold text-gray-900 mb-4">Browse by City</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {OH_CITIES.map(({ city, slug, label }) => (
              slug ? (
                <Link
                  key={city}
                  href={`/menopause-doctors/${slug}`}
                  className="text-sm text-brand-plum hover:underline font-medium"
                >
                  {label} →
                </Link>
              ) : (
                <Link
                  key={city}
                  href={`/listings?city=${encodeURIComponent(city)}&state=OH`}
                  className="text-sm text-brand-plum hover:underline font-medium"
                >
                  {label} →
                </Link>
              )
            ))}
          </div>
        </div>

        {listings.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-bold text-gray-900">
                Menopause Specialists Across Ohio
              </h2>
              <Link
                href="/listings?state=OH"
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
                  <p className="text-sm text-gray-400 mt-1">{listing.city}, OH</p>
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
            Menopause Care in Ohio: FAQ
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "What makes Columbus a strong market for menopause care?",
                a: "Ohio State Wexner Medical Center and OhioHealth's network of hospitals give Columbus a depth of women's health expertise rare outside of major coastal metros. The Columbus metro has also attracted independent integrative and functional medicine practices that specialize in hormone care, creating a tiered provider landscape from academic-affiliated to personalized concierge-style practices.",
              },
              {
                q: "How does Cleveland's provider landscape compare to Columbus?",
                a: "Cleveland is anchored by Cleveland Clinic — one of the best-regarded health systems in the country for women's health — and University Hospitals. Cleveland tends to be more academically oriented. Columbus has more independent practices. Both cities have MSCP-certified providers and HRT prescribers, and telehealth largely eliminates the need to choose between them.",
              },
              {
                q: "Is Ohio a good state for menopause care access?",
                a: "Ohio ranks above average for menopause care access compared to other Midwestern states, primarily due to its large academic medical centers and dense urban population in Columbus, Cleveland, and Cincinnati. Rural parts of Appalachian Ohio — the Southeast and river counties — have fewer specialists, which makes telehealth particularly valuable for residents in those areas.",
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
            <Link href="/menopause-doctors/florida" className="text-sm text-brand-plum hover:underline font-medium">Florida →</Link>
            <Link href="/menopause-doctors/california" className="text-sm text-brand-plum hover:underline font-medium">California →</Link>
            <Link href="/menopause-doctors/texas" className="text-sm text-brand-plum hover:underline font-medium">Texas →</Link>
            <Link href="/listings" className="text-sm text-brand-plum hover:underline font-medium">All Providers →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
