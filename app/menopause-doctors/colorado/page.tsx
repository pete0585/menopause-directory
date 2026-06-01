import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import type { Listing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Menopause Doctors in Colorado — Find HRT Specialists | MenopauseDirectory.co',
  description:
    'Find menopause specialists, MSCP-certified practitioners, and HRT prescribers across Colorado. Denver, Colorado Springs, Boulder, Fort Collins, and more. Telehealth available statewide.',
  openGraph: {
    title: 'Menopause Doctors in Colorado',
    description:
      'Find menopause specialists and HRT-friendly doctors across Colorado. MSCP-certified, telehealth available, accepting new patients.',
  },
}

const CO_CITIES = [
  { city: 'Denver', slug: 'denver-co', label: 'Denver' },
  { city: 'Colorado Springs', slug: 'colorado-springs-co', label: 'Colorado Springs' },
  { city: 'Boulder', slug: null, label: 'Boulder' },
  { city: 'Fort Collins', slug: null, label: 'Fort Collins' },
  { city: 'Aurora', slug: null, label: 'Aurora' },
  { city: 'Lakewood', slug: null, label: 'Lakewood' },
  { city: 'Pueblo', slug: null, label: 'Pueblo' },
  { city: 'Grand Junction', slug: null, label: 'Grand Junction' },
]

async function getColoradoListings(): Promise<Listing[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('menopause_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .eq('state', 'CO')
    .order('listing_tier', { ascending: false })
    .order('is_verified', { ascending: false })
    .limit(9)
  return (data as Listing[]) ?? []
}

export default async function ColoradoMenopausePage() {
  const listings = await getColoradoListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I find a menopause specialist in Colorado who prescribes HRT?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Search MenopauseDirectory.co for Colorado providers and filter by \"Prescribes HRT\" or \"MSCP Certified.\" Denver has the largest concentration of providers — UCHealth, SCL Health, and HealthONE anchor the academic side, with a growing number of independent and integrative practices. Colorado Springs is the second-largest market in the state.",
        },
      },
      {
        '@type': 'Question',
        name: 'Is telehealth available for menopause care in Colorado?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. Many Colorado menopause specialists offer telehealth statewide — particularly valuable for patients in mountain communities, Western Slope towns like Grand Junction and Durango, and rural Eastern Plains areas where specialist access is very limited.",
        },
      },
      {
        '@type': 'Question',
        name: 'Are there MSCP-certified menopause practitioners in Colorado?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Use the MSCP filter in the directory to find Menopause Society Certified Practitioners across Colorado. Denver and Boulder have the highest concentration of MSCP-credentialed providers in the state.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does Colorado have a good menopause care landscape compared to other states?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Colorado ranks well for menopause care access among Mountain West states. Denver has a deep provider ecosystem with multiple large health systems and a strong integrative medicine community. Boulder has a particularly high concentration of functional and integrative medicine practitioners. Colorado Springs benefits from Fort Liberty proximity — many providers there are experienced with military families and Tricare coverage.',
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
          <span className="text-gray-600">Colorado</span>
        </nav>

        <div className="max-w-3xl mb-10">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Menopause Doctors in Colorado
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Colorado has a strong menopause care ecosystem driven by Denver's major health systems and
            a well-developed integrative and functional medicine community across the Front Range.
            UCHealth, SCL Health (now Intermountain), and HealthONE all have women's health programs
            with menopause expertise. Beyond the academic centers, Denver and Boulder have an unusually
            high concentration of independent integrative practices — making Colorado a standout state
            for women who want a whole-person approach to the menopause transition.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>Denver: largest concentration</span>
            <span>·</span>
            <span>Colorado Springs: strong military-aware providers</span>
            <span>·</span>
            <span>Telehealth statewide</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-10">
          <h2 className="font-serif text-xl font-semibold text-gray-900 mb-4">Browse by City</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CO_CITIES.map(({ city, slug, label }) => (
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
                  href={`/listings?city=${encodeURIComponent(city)}&state=CO`}
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
                Menopause Specialists Across Colorado
              </h2>
              <Link
                href="/listings?state=CO"
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
                  <p className="text-sm text-gray-400 mt-1">{listing.city}, CO</p>
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
            Menopause Care in Colorado: FAQ
          </h2>
          <div className="space-y-4">
            {faqLd.mainEntity.map((faq) => (
              <details key={faq.name} className="bg-white rounded-xl border border-gray-100 p-5 group">
                <summary className="font-medium text-gray-900 cursor-pointer list-none flex items-center justify-between gap-4">
                  <span>{faq.name}</span>
                  <span className="text-brand-plum text-lg group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-gray-600 leading-relaxed text-sm">{faq.acceptedAnswer.text}</p>
              </details>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-100">
          <h3 className="font-serif text-lg font-semibold text-gray-800 mb-3">Browse Other States</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/menopause-doctors/california" className="text-sm text-brand-plum hover:underline font-medium">California →</Link>
            <Link href="/menopause-doctors/texas" className="text-sm text-brand-plum hover:underline font-medium">Texas →</Link>
            <Link href="/menopause-doctors/ohio" className="text-sm text-brand-plum hover:underline font-medium">Ohio →</Link>
            <Link href="/listings" className="text-sm text-brand-plum hover:underline font-medium">All Providers →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
