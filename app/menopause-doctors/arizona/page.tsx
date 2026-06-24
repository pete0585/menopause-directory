import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import ListingCard from '@/components/ListingCard'
import type { Listing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Menopause Doctors in Arizona — Find HRT Specialists | MenopauseDirectory.co',
  description:
    'Find menopause specialists, MSCP-certified practitioners, and HRT prescribers across Arizona. Phoenix, Scottsdale, Tucson, Mesa, and more. Telehealth available statewide.',
  openGraph: {
    title: 'Menopause Doctors in Arizona',
    description:
      'Find menopause specialists and HRT-friendly doctors across Arizona. MSCP-certified, telehealth available, accepting new patients.',
  },
}

const AZ_CITIES = [
  { city: 'Phoenix', slug: null, label: 'Phoenix' },
  { city: 'Scottsdale', slug: null, label: 'Scottsdale' },
  { city: 'Tucson', slug: null, label: 'Tucson' },
  { city: 'Mesa', slug: null, label: 'Mesa' },
  { city: 'Chandler', slug: null, label: 'Chandler' },
  { city: 'Gilbert', slug: null, label: 'Gilbert' },
  { city: 'Tempe', slug: null, label: 'Tempe' },
  { city: 'Peoria', slug: null, label: 'Peoria' },
  { city: 'Glendale', slug: null, label: 'Glendale' },
  { city: 'Flagstaff', slug: null, label: 'Flagstaff' },
]

async function getArizonaListings(): Promise<Listing[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('menopause_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .eq('state', 'AZ')
    .order('listing_tier', { ascending: false })
    .order('is_verified', { ascending: false })
    .limit(9)
  return (data as Listing[]) ?? []
}

export default async function ArizonaMenopausePage() {
  const listings = await getArizonaListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I find a menopause specialist in Arizona who prescribes HRT?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Search MenopauseDirectory.co for Arizona providers and filter by HRT prescribers or MSCP certification. Arizona's largest provider concentrations are in Phoenix (Banner Health, Dignity Health, Honor Health, Valleywise Health), Scottsdale (Mayo Clinic Arizona, HonorHealth Scottsdale), and Tucson (Banner-University Medical Center, Tucson Medical Center). The Phoenix-Scottsdale corridor has one of the highest concentrations of concierge and integrative women's health practices in the Southwest.",
        },
      },
      {
        '@type': 'Question',
        name: 'Is telehealth available for menopause care in Arizona?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. Arizona has broad telehealth rules and many menopause specialists see patients statewide via video appointment. Telehealth is especially valuable for patients in rural Arizona — Prescott, Flagstaff, Sedona, Yuma, and the Navajo Nation areas — where in-person specialist access is extremely limited. Most telehealth providers in Arizona can prescribe and manage HRT remotely.",
        },
      },
      {
        '@type': 'Question',
        name: 'Are there MSCP-certified menopause practitioners in Arizona?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. The Phoenix-Scottsdale area in particular has MSCP-certified practitioners, especially through Mayo Clinic Arizona (Scottsdale) and larger women's health private practices in the North Scottsdale and Paradise Valley areas. Use the MSCP filter in the directory to find certified specialists.",
        },
      },
      {
        '@type': 'Question',
        name: 'Does the Arizona heat affect menopause symptoms?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Arizona summers absolutely compound menopause symptoms — hot flashes and night sweats become more intense in 110+ degree heat. This is one reason Arizona women often prioritize finding a skilled menopause provider: effective hormone management isn't just about quality of life here, it can be a safety issue during extreme heat. Arizona OB-GYNs who specialize in menopause are well-acquainted with the heat-amplification effect.",
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
          <span className="text-gray-600">Arizona</span>
        </nav>

        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8 mb-10">
          <h1 className="font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
            Menopause Doctors in Arizona
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl leading-relaxed">
            Arizona&apos;s extreme summer heat makes effective menopause management more than a quality-of-life
            issue — it&apos;s a practical necessity. The Phoenix-Scottsdale corridor has a sophisticated
            women&apos;s health market with MSCP-certified practitioners, integrative providers, and major
            academic medical centers including Mayo Clinic Arizona. Across the state, from Tucson to Flagstaff,
            menopause specialists serve Arizona women in-person and via telehealth.
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>{listings.length > 0 ? `${listings.length}+` : '90+'} providers listed</span>
            <span>·</span>
            <span>Phoenix · Scottsdale · Tucson</span>
            <span>·</span>
            <span>MSCP-certified options</span>
            <span>·</span>
            <span>Telehealth statewide</span>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="font-serif text-xl font-semibold text-gray-800 mb-4">Browse by City</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {AZ_CITIES.map(({ city, slug, label }) => (
              <Link
                key={city}
                href={slug ? `/menopause-doctors/${slug}` : `/listings?city=${encodeURIComponent(city)}&state=AZ`}
                className="bg-white rounded-xl border border-gray-100 p-4 text-center text-sm font-medium text-gray-700 hover:border-pink-200 hover:text-pink-600 transition-colors shadow-sm"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {listings.length > 0 ? (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-semibold text-gray-800">
                Featured Arizona Menopause Specialists
              </h2>
              <Link
                href="/listings?state=AZ"
                className="flex items-center gap-1 text-sm font-semibold text-pink-500 hover:text-pink-600"
              >
                See all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </div>
        ) : (
          <div className="card p-12 text-center mb-12">
            <p className="text-gray-500 mb-4">Search menopause specialists across Arizona.</p>
            <Link href="/listings?state=AZ" className="inline-flex items-center gap-2 bg-pink-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-pink-700">
              Browse Arizona Providers <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <div className="space-y-5 mb-12">
          <h2 className="font-serif text-2xl font-semibold text-gray-800">
            Menopause Care in Arizona
          </h2>
          {faqLd.mainEntity.map((faq) => (
            <div key={faq.name} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-serif text-base font-semibold text-gray-800 mb-2">{faq.name}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{faq.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h3 className="font-serif text-lg font-semibold text-gray-800 mb-4">Related Resources</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/menopause-doctors/phoenix-az" className="text-sm text-pink-600 hover:text-pink-700 font-medium">Menopause Doctors in Phoenix →</Link>
            <Link href="/guides/is-hrt-safe" className="text-sm text-pink-600 hover:text-pink-700 font-medium">Is HRT Safe? →</Link>
            <Link href="/guides/hrt-safety-by-age" className="text-sm text-pink-600 hover:text-pink-700 font-medium">HRT Safety by Age →</Link>
            <Link href="/categories/telehealth-menopause" className="text-sm text-pink-600 hover:text-pink-700 font-medium">Telehealth Menopause Care →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
