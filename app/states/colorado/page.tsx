import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Menopause Doctors in Colorado | CO Directory | MenopauseDirectory.co',
  description:
    'Find menopause specialists and HRT doctors in Colorado. Browse providers in Denver, Colorado Springs, Fort Collins, Boulder, and across the state. Telehealth available.',
  openGraph: {
    title: 'Menopause Doctors in Colorado',
    description:
      'Find HRT-prescribing menopause specialists across Colorado. MSCP-certified options, telehealth available.',
  },
}

const CO_CITIES = [
  { name: 'Denver', slug: 'denver' },
  { name: 'Colorado Springs', slug: 'colorado-springs' },
  { name: 'Aurora', slug: 'aurora' },
  { name: 'Fort Collins', slug: 'fort-collins' },
  { name: 'Boulder', slug: 'boulder' },
  { name: 'Pueblo', slug: 'pueblo' },
  { name: 'Loveland', slug: 'loveland' },
  { name: 'Greeley', slug: 'greeley' },
]

async function getColoradoListings() {
  const supabase = createClient()
  const { data } = await supabase
    .from('menopause_listings')
    .select('city, state')
    .eq('is_approved', true)
    .eq('is_active', true)
    .eq('state', 'CO')
  return data ?? []
}

async function getColoradoFeatured() {
  const supabase = createClient()
  const { data } = await supabase
    .from('menopause_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .eq('state', 'CO')
    .order('listing_tier', { ascending: false })
    .order('is_verified', { ascending: false })
    .limit(12)
  return data ?? []
}

export default async function ColoradoMenopausePage() {
  const [allListings, featured] = await Promise.all([
    getColoradoListings(),
    getColoradoFeatured(),
  ])

  const totalCount = allListings.length

  // Count by city
  const cityCounts: Record<string, number> = {}
  for (const listing of allListings) {
    if (listing.city) {
      cityCounts[listing.city] = (cityCounts[listing.city] ?? 0) + 1
    }
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many menopause doctors are in Colorado?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `MenopauseDirectory.co lists ${totalCount > 0 ? totalCount + '+' : 'many'} menopause specialists in Colorado, with the highest concentration in the Denver-Aurora metro. Colorado has a well-developed healthcare infrastructure including UCHealth, SCL Health (CommonSpirit), HealthONE, and Banner Health — all with women's health departments across the state.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Does Colorado Medicaid cover menopause treatment?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Health First Colorado (Colorado Medicaid) and CHP+ cover OB-GYN visits including menopause consultations. Coverage for specific hormone therapy medications depends on your managed care plan (Colorado Access, Denver Health Medical Plan, Centene/Colorado HealthOps) and formulary. Check with your plan before scheduling to confirm coverage.",
        },
      },
      {
        '@type': 'Question',
        name: 'Are there menopause specialists in Denver?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. Denver has the highest concentration of menopause specialists in Colorado, with providers affiliated with UCHealth, St. Joseph Hospital, and HealthONE, as well as independent women's health practices throughout the metro. Search this directory filtered by Denver or nearby cities like Aurora, Lakewood, and Centennial for current listings.",
        },
      },
      {
        '@type': 'Question',
        name: 'Can altitude affect menopause symptoms in Colorado?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "There is emerging evidence that high altitude may affect estrogen metabolism. Colorado's high elevation — Denver sits at 5,280 feet, with much of the state at 6,000-10,000 feet — is worth discussing with your menopause specialist, particularly if you are new to the altitude or experiencing symptoms that feel different from what you expected. A knowledgeable Colorado provider will be familiar with these considerations.",
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-gray-600">Home</Link>
          <span>/</span>
          <Link href="/listings" className="hover:text-gray-600">Find a Specialist</Link>
          <span>/</span>
          <Link href="/states" className="hover:text-gray-600">States</Link>
          <span>/</span>
          <span className="text-gray-600">Colorado</span>
        </nav>

        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8 mb-10">
          <h1 className="font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
            Menopause Doctors in Colorado
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl leading-relaxed">
            Colorado has a robust healthcare system with major academic medical centers including
            UCHealth, SCL Health/CommonSpirit, and HealthONE serving the Front Range. The state&apos;s
            health-conscious, active culture means many Colorado women are seeking menopause care that
            supports an active lifestyle — whether that&apos;s hiking the Rockies or cycling at altitude.
            High-altitude physiology is a real consideration for hormone metabolism in Colorado, and
            local menopause specialists understand this context.
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>{totalCount > 0 ? `${totalCount}+` : '50+'} providers statewide</span>
            <span>·</span>
            <span>HRT prescribers</span>
            <span>·</span>
            <span>MSCP-certified options</span>
            <span>·</span>
            <span>Telehealth available</span>
          </div>
        </div>

        {/* City grid */}
        <div className="mb-12">
          <h2 className="font-serif text-2xl font-semibold text-gray-800 mb-6">
            Browse by City in Colorado
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {CO_CITIES.map((city) => {
              const count = cityCounts[city.name] ?? 0
              return (
                <Link
                  key={city.slug}
                  href={`/listings?city=${encodeURIComponent(city.name)}&state=CO`}
                  className="bg-white rounded-xl border border-gray-100 p-4 hover:border-pink-200 hover:shadow-md transition-all group"
                >
                  <p className="font-semibold text-gray-800 group-hover:text-pink-600 transition-colors">
                    {city.name}
                  </p>
                  {count > 0 && (
                    <p className="text-sm text-gray-400 mt-1">
                      {count} provider{count !== 1 ? 's' : ''}
                    </p>
                  )}
                  <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-pink-400 mt-2 transition-colors" />
                </Link>
              )
            })}
          </div>
        </div>

        {/* Featured listings */}
        {featured.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-semibold text-gray-800">
                Featured Colorado Providers
              </h2>
              <Link
                href="/listings?state=CO"
                className="flex items-center gap-1 text-sm font-semibold text-pink-500 hover:text-pink-600"
              >
                See all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((listing: any) => (
                <Link
                  key={listing.id}
                  href={`/provider/${listing.slug}`}
                  className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-all group"
                >
                  <p className="font-semibold text-gray-800 group-hover:text-pink-600 transition-colors">
                    {listing.name}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">{listing.city}, {listing.state}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {listing.telehealth_available && (
                      <span className="text-xs font-medium text-pink-600 bg-pink-50 rounded-full px-2 py-0.5">
                        Telehealth
                      </span>
                    )}
                    {listing.is_verified && (
                      <span className="text-xs font-medium text-purple-600 bg-purple-50 rounded-full px-2 py-0.5">
                        Verified
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* FAQs */}
        <div className="space-y-5 mb-12">
          <h2 className="font-serif text-2xl font-semibold text-gray-800">
            Menopause Care in Colorado
          </h2>
          {faqLd.mainEntity.map((faq) => (
            <div key={faq.name} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-serif text-base font-semibold text-gray-800 mb-2">{faq.name}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{faq.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h3 className="font-serif text-lg font-semibold text-gray-800 mb-4">Related</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/listings?state=CO" className="text-sm text-pink-600 hover:text-pink-700 font-medium">Browse All Colorado Listings →</Link>
            <Link href="/guides/is-hrt-safe" className="text-sm text-pink-600 hover:text-pink-700 font-medium">Is HRT Safe? →</Link>
            <Link href="/categories/telehealth-menopause" className="text-sm text-pink-600 hover:text-pink-700 font-medium">Telehealth Menopause Care →</Link>
            <Link href="/guides/how-to-find-hrt-friendly-doctor" className="text-sm text-pink-600 hover:text-pink-700 font-medium">How to Find an HRT Doctor →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
