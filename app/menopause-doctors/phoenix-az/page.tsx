import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import ListingCard from '@/components/ListingCard'
import type { Listing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Menopause Doctors in Phoenix, AZ — Find HRT Specialists | MenopauseDirectory.co',
  description:
    'Find menopause specialists, MSCP-certified practitioners, and HRT-prescribing doctors in Phoenix and across Arizona. Scottsdale (3 providers), Tucson (4 providers), and more.',
  openGraph: {
    title: 'Menopause Doctors in Phoenix, AZ',
    description:
      'Find menopause specialists and HRT-friendly doctors across Arizona. Phoenix metro, Scottsdale, Tucson, and more. MSCP-certified and telehealth available.',
  },
}

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
    .limit(12)
  return (data as Listing[]) ?? []
}

export default async function PhoenixMenopausePage() {
  const listings = await getArizonaListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I find an HRT prescriber in the Phoenix metro area?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Use MenopauseDirectory.co to search for HRT-prescribing providers in Arizona. The Phoenix metro — including Scottsdale, Mesa, Gilbert, Tempe, and Chandler — has a growing number of menopause specialists. Filter by \"Prescribes HRT\" to find providers who actively offer hormone replacement therapy.",
        },
      },
      {
        '@type': 'Question',
        name: 'Does Scottsdale or Tucson have more menopause specialists than central Phoenix?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Both Scottsdale and Tucson have strong provider concentrations — Scottsdale has 3 listed providers and Tucson has 4. Scottsdale's affluent demographics have driven demand for concierge and functional medicine practices that include menopause care. Tucson benefits from proximity to the University of Arizona medical community.",
        },
      },
      {
        '@type': 'Question',
        name: 'Can I see an Arizona menopause specialist by telehealth?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Many Arizona-based providers offer telehealth statewide, making it easier for patients in Flagstaff, Prescott, Yuma, or rural areas to access menopause specialists without traveling to the Phoenix or Tucson metros.',
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
          <span className="text-gray-600">Phoenix & Arizona</span>
        </nav>

        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-brand-rose mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Phoenix, AZ</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Menopause Doctors in Phoenix & Arizona
          </h1>
          <p className="text-gray-600 leading-relaxed">
            The greater Phoenix metro — including Scottsdale, Mesa, Gilbert, Tempe, Chandler — has a
            growing number of menopause specialists serving the rapidly expanding Valley population.
            Tucson also has a strong provider base anchored by the University of Arizona medical
            community. Whether you're seeking an HRT prescriber, an MSCP-certified OB-GYN, or a
            functional medicine provider, Arizona's options are expanding quickly.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>Scottsdale: 3 providers listed</span>
            <span>·</span>
            <span>Tucson: 4 providers listed</span>
            <span>·</span>
            <span>Telehealth statewide</span>
          </div>
        </div>

        {/* City quick links */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-10">
          <h2 className="font-serif text-xl font-semibold text-gray-900 mb-4">Browse by City in Arizona</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: 'Phoenix', href: '/listings?city=Phoenix&state=AZ' },
              { label: 'Scottsdale', href: '/listings?city=Scottsdale&state=AZ' },
              { label: 'Tucson', href: '/listings?city=Tucson&state=AZ' },
              { label: 'Mesa', href: '/listings?city=Mesa&state=AZ' },
              { label: 'Tempe', href: '/listings?city=Tempe&state=AZ' },
              { label: 'All Arizona', href: '/listings?state=AZ' },
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

        {listings.length > 0 ? (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-bold text-gray-900">
                Menopause Specialists in Arizona
              </h2>
              <Link
                href="/listings?state=AZ"
                className="flex items-center gap-1 text-sm font-semibold text-brand-plum hover:text-brand-plum/80"
              >
                All Arizona results <ArrowRight className="h-4 w-4" />
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
            <p className="text-gray-500 mb-4">Search for menopause specialists across Arizona below.</p>
            <Link
              href="/listings?state=AZ"
              className="inline-flex items-center gap-2 bg-brand-plum text-white rounded-full px-6 py-3 font-medium hover:bg-brand-plum/90"
            >
              Search Arizona Providers <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {/* FAQ */}
        <div className="max-w-3xl">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
            Menopause Care in Phoenix & Arizona: FAQ
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Why does Scottsdale have a stronger menopause provider concentration than central Phoenix?",
                a: "Scottsdale's demographic profile — higher income, health-conscious population, many retirees — has driven demand for concierge medicine and functional health practices that include menopause care as a specialty. Many practices in the Scottsdale corridor specifically market to perimenopause and menopause management.",
              },
              {
                q: "What is the University of Arizona's role in Tucson menopause care?",
                a: "The University of Arizona College of Medicine in Tucson anchors the region's academic medical community. UArizona Health Sciences has OB-GYN and women's health departments. Proximity to a research university often means more providers staying current on evidence-based menopause care, including HRT guidelines.",
              },
              {
                q: "Does the Arizona heat make menopause symptoms worse?",
                a: "Heat can exacerbate hot flashes and night sweats for some women — and Phoenix summers are extreme. Arizona-based menopause providers are typically familiar with this compounding factor and may factor in climate when discussing symptom management and HRT timing.",
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
          <h3 className="font-serif text-lg font-semibold text-gray-800 mb-3">Browse Other Cities</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/menopause-doctors/dallas-tx" className="text-sm text-brand-plum hover:underline font-medium">Dallas, TX →</Link>
            <Link href="/menopause-doctors/denver-co" className="text-sm text-brand-plum hover:underline font-medium">Denver, CO →</Link>
            <Link href="/menopause-doctors/seattle-wa" className="text-sm text-brand-plum hover:underline font-medium">Seattle, WA →</Link>
            <Link href="/listings" className="text-sm text-brand-plum hover:underline font-medium">All Providers →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
