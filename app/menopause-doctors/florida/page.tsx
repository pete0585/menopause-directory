import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import type { Listing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Menopause Doctors in Florida — Find HRT Specialists | MenopauseDirectory.co',
  description:
    'Find menopause specialists, MSCP-certified practitioners, and HRT prescribers across Florida. Orlando, Jacksonville, Miami, Tampa, Boca Raton, and more.',
  openGraph: {
    title: 'Menopause Doctors in Florida',
    description:
      'Find menopause specialists across Florida — HRT prescribers, MSCP-certified, and telehealth options statewide. Orlando, Jacksonville, Miami, and more.',
  },
}

const FL_CITIES = [
  { city: 'Miami', label: 'Miami / Coral Gables' },
  { city: 'Orlando', label: 'Orlando' },
  { city: 'Jacksonville', label: 'Jacksonville' },
  { city: 'Tampa', label: 'Tampa / St. Pete' },
  { city: 'Fort Lauderdale', label: 'Fort Lauderdale' },
  { city: 'Boca Raton', label: 'Boca Raton' },
  { city: 'Gainesville', label: 'Gainesville' },
  { city: 'Tallahassee', label: 'Tallahassee' },
]

async function getFlListings(): Promise<Listing[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('menopause_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .eq('state', 'FL')
    .order('listing_tier', { ascending: false })
    .order('is_verified', { ascending: false })
    .limit(9)
  return (data as Listing[]) ?? []
}

export default async function FloridaMenopausePage() {
  const listings = await getFlListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I find a menopause specialist in Florida who prescribes HRT?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Search MenopauseDirectory.co for Florida providers and filter by \"Prescribes HRT\" or \"MSCP Certified.\" Florida's large and diverse population is driving growing demand for menopause-literate providers, with Miami/Coral Gables, Orlando, and Jacksonville having the current strongest provider concentrations.",
        },
      },
      {
        '@type': 'Question',
        name: 'Is telehealth available for menopause care in Florida?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Many Florida menopause specialists offer telehealth statewide — valuable for residents of rural North Florida, the Panhandle, or the Keys who want access to specialists in larger metros. Several national telehealth platforms also serve Florida specifically.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are there MSCP-certified menopause practitioners in Florida?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The Menopause Society Certified Practitioner (MSCP) credential is the gold standard for menopause training. Filter by "MSCP Certified" in the directory to find credentialed providers across Florida.',
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
          <span className="text-gray-600">Florida</span>
        </nav>

        <div className="max-w-3xl mb-10">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Menopause Doctors in Florida
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Florida's large and diverse population — from retirees on the coasts to young families in
            Orlando and Tampa — is driving growing demand for menopause-literate providers across the
            state. Miami/Coral Gables has several listed providers, and Orlando and Jacksonville are
            both well-covered. Whether you need an HRT prescriber, an MSCP-certified OB-GYN, or a
            provider who takes an integrative approach, Florida's provider network is expanding.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>Orlando: 3 providers listed</span>
            <span>·</span>
            <span>Jacksonville: 3 providers listed</span>
            <span>·</span>
            <span>Telehealth statewide</span>
          </div>
        </div>

        {/* City links */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-10">
          <h2 className="font-serif text-xl font-semibold text-gray-900 mb-4">Browse by City</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {FL_CITIES.map(({ city, label }) => (
              <Link
                key={city}
                href={`/listings?city=${encodeURIComponent(city)}&state=FL`}
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
                Menopause Specialists Across Florida
              </h2>
              <Link
                href="/listings?state=FL"
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
                  <p className="text-sm text-gray-400 mt-1">{listing.city}, FL</p>
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
            Menopause Care in Florida: FAQ
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Why does Florida have a growing demand for menopause specialists?",
                a: "Florida's population skews older than the national average, and the state continues to attract retirees from across the country. Baby Boomer women — the largest cohort in US history — are now well into their 60s and 70s, and many are seeking menopause care that primary care doctors often aren't equipped to provide. Florida's growth is also driving younger family demographics in the Orlando and Tampa corridors.",
              },
              {
                q: "Is the Miami menopause provider landscape different from Orlando or Jacksonville?",
                a: "Miami/Coral Gables has a more cosmopolitan, concierge-oriented provider mix — more private pay, more integrative and functional medicine options. Orlando and Jacksonville skew more toward traditional OB-GYN and academic-adjacent practices. All three markets have solid options, and telehealth largely eliminates geographic barriers within the state.",
              },
              {
                q: "Does Florida Medicaid cover HRT?",
                a: "Florida Medicaid covers women's preventive care including OB-GYN visits where menopause can be discussed. HRT medication coverage depends on your specific Medicaid managed care plan and formulary. If you're on Florida Medicaid, search for providers who accept Medicaid and ask about formulary coverage for specific HRT options before your appointment.",
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
            <Link href="/menopause-doctors/texas" className="text-sm text-brand-plum hover:underline font-medium">Texas →</Link>
            <Link href="/menopause-doctors/new-york" className="text-sm text-brand-plum hover:underline font-medium">New York →</Link>
            <Link href="/listings" className="text-sm text-brand-plum hover:underline font-medium">All Providers →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
