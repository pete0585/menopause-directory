import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import ListingCard from '@/components/ListingCard'
import type { Listing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Find a Menopause Doctor in North Carolina | Menopause Directory',
  description:
    'Find menopause specialists, HRT prescribers, and MSCP-certified practitioners across North Carolina. Browse providers in Charlotte, Raleigh, Durham, Greensboro, and Winston-Salem.',
  openGraph: {
    title: 'Find a Menopause Doctor in North Carolina',
    description:
      'Menopause specialists across North Carolina — Charlotte, Raleigh, Durham, Greensboro. HRT prescribers, MSCP-certified, telehealth available.',
  },
}

async function getNorthCarolinaListings(): Promise<Listing[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('menopause_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .eq('state', 'NC')
    .order('listing_tier', { ascending: false })
    .order('is_verified', { ascending: false })
    .limit(9)
  return (data as Listing[]) ?? []
}

const ncCities = [
  { city: 'Charlotte', note: "NC's largest city — Atrium Health and Novant Health anchor the women's health market" },
  { city: 'Raleigh', note: 'Research Triangle hub — UNC Rex and WakeMed serve this growing metro' },
  { city: 'Durham', note: 'Duke University Health System has one of the strongest women\'s health programs in the Southeast' },
  { city: 'Greensboro', note: 'Cone Health serves the Piedmont Triad region' },
  { city: 'Winston-Salem', note: 'Wake Forest Baptist Health has a women\'s health and menopause program' },
]

export default async function NorthCarolinaMenopausePage() {
  const listings = await getNorthCarolinaListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I find a menopause specialist in North Carolina?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Use MenopauseDirectory.co to search for HRT-prescribing providers across North Carolina. The state has strong academic medical centers at Duke University Health System (Durham), UNC Health (Chapel Hill), and Wake Forest Baptist Health (Winston-Salem) — all of which have women's health and menopause programs. Atrium Health and Novant Health serve Charlotte. For dedicated menopause consultation, private OB/GYNs and functional medicine practitioners across the state often provide more focused, longer appointments than academic systems.",
        },
      },
      {
        '@type': 'Question',
        name: 'Does Duke Health or UNC Health treat menopause in North Carolina?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. Duke University Hospital (Durham) and UNC Health (Chapel Hill) both have women's health divisions with OB/GYNs and internists experienced in menopause management. Duke Women's Health, in particular, has a well-regarded program. Wake Forest Baptist Health's OB/GYN department serves the Winston-Salem area. For women seeking the most focused menopause-specialist care, the North American Menopause Society directory (which this site draws from) lists MSCP-certified practitioners across the state.",
        },
      },
      {
        '@type': 'Question',
        name: 'What HRT options are available in North Carolina?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "All standard hormone therapy formulations are available in North Carolina — estradiol patches, gels, sprays, and oral forms; micronized progesterone (Prometrium); and testosterone. Bioidentical hormone therapy through both FDA-approved and compounded formulations is available through functional medicine and integrative medicine practices across the state, particularly in the Research Triangle and Charlotte metro. North Carolina has a competitive pharmacy market with multiple options for standard HRT prescriptions.",
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
          <span className="text-gray-600">North Carolina</span>
        </nav>

        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8 mb-10">
          <div className="flex items-center gap-2 text-pink-500 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">North Carolina</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
            Find a Menopause Doctor in North Carolina
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl leading-relaxed">
            North Carolina has a strong network of menopause specialists anchored by Duke University
            Health System, UNC Health, Wake Forest Baptist Health, Atrium Health, and Novant Health.
            The state&apos;s Research Triangle region (Raleigh-Durham-Chapel Hill) is one of the most
            educated and healthcare-engaged metros in the Southeast. Whether you are in Charlotte,
            Raleigh, Durham, Greensboro, or a smaller community, this directory lists HRT-prescribing
            specialists throughout the state.
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>{listings.length > 0 ? `${listings.length}+` : '200+'} providers listed</span>
            <span>·</span>
            <span>HRT prescribers</span>
            <span>·</span>
            <span>MSCP-certified options</span>
            <span>·</span>
            <span>Telehealth available</span>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="font-serif text-2xl font-semibold text-gray-800 mb-6">
            Browse by City
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ncCities.map(({ city, note }) => (
              <Link
                key={city}
                href={`/listings?state=NC&city=${encodeURIComponent(city)}`}
                className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:border-pink-200 hover:shadow transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-gray-800 group-hover:text-pink-600 transition-colors">{city}, NC</p>
                  <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-pink-500 transition-colors" />
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{note}</p>
              </Link>
            ))}
          </div>
        </div>

        {listings.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-semibold text-gray-800">
                Featured North Carolina Providers
              </h2>
              <Link href="/listings?state=NC" className="flex items-center gap-1 text-sm font-semibold text-pink-500 hover:text-pink-600">
                See all NC providers <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4 mb-12">
          <h2 className="font-serif text-2xl font-semibold text-gray-800">About Menopause Care in North Carolina</h2>
          {faqLd.mainEntity.map((faq) => (
            <div key={faq.name} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-serif text-base font-semibold text-gray-800 mb-2">{faq.name}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{faq.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div className="bg-brand-plum rounded-2xl p-8 text-center text-white mb-8">
          <h2 className="font-serif text-2xl font-bold mb-3">Browse All North Carolina Providers</h2>
          <p className="text-white/80 mb-6">
            Search the full directory of menopause specialists in North Carolina — filter by city,
            telehealth availability, and specialty.
          </p>
          <Link
            href="/listings?state=NC"
            className="inline-flex items-center gap-2 bg-white text-brand-plum font-semibold px-6 py-3 rounded-full hover:bg-pink-50 transition-colors"
          >
            Find a North Carolina Provider <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h3 className="font-serif text-lg font-semibold text-gray-800 mb-4">Related</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/guides/is-hrt-safe" className="text-sm text-pink-600 hover:text-pink-700 font-medium">Is HRT Safe? →</Link>
            <Link href="/guides/hrt-safety-by-age" className="text-sm text-pink-600 hover:text-pink-700 font-medium">HRT Safety by Age →</Link>
            <Link href="/categories/telehealth-menopause" className="text-sm text-pink-600 hover:text-pink-700 font-medium">Telehealth Menopause Care →</Link>
            <Link href="/guides/how-to-find-hrt-friendly-doctor" className="text-sm text-pink-600 hover:text-pink-700 font-medium">How to Find an HRT Doctor →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
