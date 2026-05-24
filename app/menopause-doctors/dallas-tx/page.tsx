import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import ListingCard from '@/components/ListingCard'
import type { Listing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Menopause Doctors in Dallas, TX — Find HRT-Friendly Providers | MenopauseDirectory.co',
  description:
    'Find menopause specialists, MSCP-certified practitioners, and HRT-prescribing doctors in Dallas, Texas. 3+ providers in Dallas, 7 in Houston. Browse the Texas state hub for all TX providers.',
  openGraph: {
    title: 'Menopause Doctors in Dallas, TX',
    description:
      'Find menopause specialists and HRT-friendly doctors in Dallas. DFW metro including Plano, Frisco, and The Colony. Telehealth and in-person options.',
  },
}

async function getDallasListings(): Promise<Listing[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('menopause_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .eq('city', 'Dallas')
    .eq('state', 'TX')
    .order('listing_tier', { ascending: false })
    .order('is_verified', { ascending: false })
    .limit(12)
  return (data as Listing[]) ?? []
}

export default async function DallasMenopausePage() {
  const listings = await getDallasListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I find an HRT prescriber in Dallas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use MenopauseDirectory.co to search for HRT-prescribing providers in Dallas. Filter by "Prescribes HRT" to find doctors, NPs, and licensed prescribers who actively offer hormone replacement therapy across the DFW metro — including Uptown, Plano, Frisco, and The Colony.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does Houston have more menopause providers than Dallas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Houston currently has 7 listed menopause providers compared to 3 in Dallas — likely reflecting Houston's larger Texas Medical Center complex. Both metros have solid options, and many Texas providers offer telehealth statewide.",
        },
      },
      {
        '@type': 'Question',
        name: 'Can I see a Dallas menopause specialist by telehealth?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Many Dallas-area and Texas-based providers offer telehealth statewide. This is especially useful for DFW residents in suburban communities like Fort Worth, Arlington, Grapevine, or Southlake who want access to Dallas specialists without the traffic.',
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
          <Link href="/menopause-doctors/texas" className="hover:text-gray-600">Texas</Link>
          {' › '}
          <span className="text-gray-600">Dallas, TX</span>
        </nav>

        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-brand-rose mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Dallas, TX</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Menopause Doctors in Dallas, TX
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Dallas has a growing network of menopause-literate providers across the DFW metro — from
            specialist OB-GYNs in Uptown and Plano to functional medicine practices in Frisco and
            The Colony. With Houston also well-served (7 providers), Texas women have strong options
            across the state.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>3+ providers in Dallas</span>
            <span>·</span>
            <span>MSCP-certified available</span>
            <span>·</span>
            <span>Telehealth options</span>
          </div>
          <p className="mt-3 text-sm text-gray-500">
            Houston has 7 providers listed.{' '}
            <Link href="/listings?city=Houston&state=TX" className="text-brand-plum hover:underline font-medium">
              Browse Houston providers →
            </Link>
          </p>
        </div>

        {listings.length > 0 ? (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-bold text-gray-900">
                Menopause Specialists in Dallas
              </h2>
              <Link
                href="/listings?city=Dallas&state=TX"
                className="flex items-center gap-1 text-sm font-semibold text-brand-plum hover:text-brand-plum/80"
              >
                All results <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 mb-12">
            <p className="text-gray-500 mb-4">Search for menopause specialists in Dallas below.</p>
            <Link
              href="/listings?city=Dallas&state=TX"
              className="inline-flex items-center gap-2 bg-brand-plum text-white rounded-full px-6 py-3 font-medium hover:bg-brand-plum/90"
            >
              Search Dallas Providers <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {/* Category links */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-10">
          <h2 className="font-serif text-xl font-semibold text-gray-900 mb-4">
            Find by Specialty in Dallas
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: 'MSCP-Certified Practitioners', href: '/categories/certified-menopause-practitioner' },
              { label: 'OB-GYN Menopause Specialists', href: '/categories/obgyn-menopause' },
              { label: 'HRT Prescribers', href: '/categories/hrt-doctors' },
              { label: 'Integrative Medicine', href: '/categories/integrative-medicine' },
              { label: 'Menopause Coaches', href: '/categories/menopause-coach' },
              { label: 'Telehealth Specialists', href: '/categories/telehealth' },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-sm text-brand-plum hover:underline font-medium"
              >
                {label} →
              </Link>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
            Finding a Menopause Doctor in Dallas
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "What DFW suburbs have the best menopause provider access?",
                a: "Plano and Frisco have strong concentrations of women's health practices serving north Dallas suburbs. The Colony, Allen, and McKinney are growing markets as the DFW metro expands northward. Many providers list telehealth availability, which means Dallas specialists can often serve the broader DFW metro without requiring in-person travel.",
              },
              {
                q: "Is there a Texas Medical Center equivalent in Dallas for menopause care?",
                a: "Dallas has UT Southwestern Medical Center, which is one of the nation's top academic medical centers. UT Southwestern has women's health and OB-GYN departments. For menopause-specific care, MSCP-certified providers — regardless of institution affiliation — are often the most reliably knowledgeable.",
              },
              {
                q: "Should I see a Dallas provider or use a Texas-wide telehealth platform?",
                a: "Both are valid. Dallas in-person providers are great if you want an ongoing relationship with a local physician who can do physical exams. Texas-wide telehealth platforms are faster for initial HRT prescriptions and follow-up management. Many women start with telehealth and transition to a local provider for longer-term care.",
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
          <h3 className="font-serif text-lg font-semibold text-gray-800 mb-3">More Texas & Beyond</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/menopause-doctors/texas" className="text-sm text-brand-plum hover:underline font-medium">All Texas Providers →</Link>
            <Link href="/listings?city=Houston&state=TX" className="text-sm text-brand-plum hover:underline font-medium">Houston, TX →</Link>
            <Link href="/menopause-doctors/phoenix-az" className="text-sm text-brand-plum hover:underline font-medium">Phoenix, AZ →</Link>
            <Link href="/listings" className="text-sm text-brand-plum hover:underline font-medium">All Providers →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
