import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import type { Listing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Menopause Doctors in New York — Find HRT Specialists | MenopauseDirectory.co',
  description:
    'Find menopause specialists, MSCP-certified practitioners, and HRT prescribers across New York. 23+ providers statewide — Manhattan, Brooklyn, Buffalo, Rochester, Albany, and more.',
  openGraph: {
    title: 'Menopause Doctors in New York',
    description:
      'Find menopause specialists across New York — HRT prescribers, MSCP-certified, and telehealth options statewide. NYC plus upstate.',
  },
}

const NY_CITIES = [
  { city: 'New York', label: 'Manhattan' },
  { city: 'Brooklyn', label: 'Brooklyn' },
  { city: 'The Bronx', label: 'The Bronx' },
  { city: 'Queens', label: 'Queens' },
  { city: 'Buffalo', label: 'Buffalo' },
  { city: 'Rochester', label: 'Rochester' },
  { city: 'Albany', label: 'Albany' },
]

async function getNyListings(): Promise<Listing[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('menopause_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .eq('state', 'NY')
    .order('listing_tier', { ascending: false })
    .order('is_verified', { ascending: false })
    .limit(9)
  return (data as Listing[]) ?? []
}

export default async function NewYorkMenopausePage() {
  const listings = await getNyListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I find an HRT prescriber in New York City?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Search MenopauseDirectory.co for New York providers and filter by \"Prescribes HRT\" or \"MSCP Certified.\" Manhattan and Brooklyn have the highest concentrations of menopause specialists in New York State. NYC's density of academic medical centers (NYU Langone, Columbia/NewYork-Presbyterian, Mount Sinai, Weill Cornell) means more providers with specialized training.",
        },
      },
      {
        '@type': 'Question',
        name: 'Is telehealth available for menopause care across New York State?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Many New York-based providers offer telehealth statewide, making it possible for patients in upstate New York — Buffalo, Rochester, Albany, the Adirondacks — to access NYC or urban-based menopause specialists without traveling. Look for providers who list telehealth availability on their profile.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are there MSCP-certified menopause practitioners in New York?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The Menopause Society Certified Practitioner (MSCP) credential represents the highest standard of menopause training. Several New York providers hold this certification, particularly in Manhattan and the outer boroughs. Filter by "MSCP Certified" in the directory to find them quickly.',
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
          <span className="text-gray-600">New York</span>
        </nav>

        <div className="max-w-3xl mb-10">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Menopause Doctors in New York
          </h1>
          <p className="text-gray-600 leading-relaxed">
            New York City alone has one of the largest concentrations of menopause-specialized providers
            in the US, particularly in Manhattan and Brooklyn. The city's academic medical powerhouses —
            NYU Langone, Columbia/NewYork-Presbyterian, Mount Sinai, Weill Cornell — anchor a deep bench
            of women's health specialists. Upstate New York — Rochester and Buffalo — also has an
            established medical community with solid women's health coverage.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>23+ providers listed statewide</span>
            <span>·</span>
            <span>Manhattan & Brooklyn most concentrated</span>
            <span>·</span>
            <span>Telehealth statewide</span>
          </div>
        </div>

        {/* City links */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-10">
          <h2 className="font-serif text-xl font-semibold text-gray-900 mb-4">Browse by City</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {NY_CITIES.map(({ city, label }) => (
              <Link
                key={city}
                href={`/listings?city=${encodeURIComponent(city)}&state=NY`}
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
                Menopause Specialists Across New York
              </h2>
              <Link
                href="/listings?state=NY"
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
                  <p className="text-sm text-gray-400 mt-1">{listing.city}, NY</p>
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
            Menopause Care in New York: FAQ
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Which NYC borough has the most menopause specialists?",
                a: "Manhattan has the highest concentration by far, driven by the density of academic medical centers and private specialty practices on the Upper East Side and Midtown. Brooklyn has a growing number of independent women's health practices. The outer boroughs are more limited — Queens, The Bronx, and Staten Island residents often find better options in Manhattan or via telehealth.",
              },
              {
                q: "Can I see a New York menopause specialist by telehealth if I'm upstate?",
                a: "Yes. Many NYC-based menopause providers offer telehealth statewide in New York. This is particularly valuable for patients in the Hudson Valley, Capital Region, the North Country, or Western New York who want access to NYC's depth of specialty providers without the trip.",
              },
              {
                q: "Does New York Medicaid cover menopause care or HRT?",
                a: "New York Medicaid covers preventive women's health services including OB-GYN visits. Coverage for specific HRT medications varies by formulary and plan. If you're on Medicaid or a managed Medicaid plan, look for providers who accept Medicaid and ask about HRT coverage specifics before your appointment.",
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
            <Link href="/menopause-doctors/florida" className="text-sm text-brand-plum hover:underline font-medium">Florida →</Link>
            <Link href="/listings" className="text-sm text-brand-plum hover:underline font-medium">All Providers →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
