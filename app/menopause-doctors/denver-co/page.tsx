import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import ListingCard from '@/components/ListingCard'
import type { Listing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Menopause Doctors in Denver, CO — HRT Specialists | MenopauseDirectory.co',
  description:
    'Find menopause specialists, MSCP-certified practitioners, and HRT-prescribing doctors in Denver, Colorado. 6+ providers listed in Denver metro. Aurora CO also has 6 providers.',
  openGraph: {
    title: 'Menopause Doctors in Denver, CO',
    description:
      'Find menopause specialists and HRT-friendly doctors in Denver. MSCP-certified, telehealth available, accepting new patients.',
  },
}

async function getDenverListings(): Promise<Listing[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('menopause_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .eq('city', 'Denver')
    .eq('state', 'CO')
    .order('listing_tier', { ascending: false })
    .order('is_verified', { ascending: false })
    .limit(12)
  return (data as Listing[]) ?? []
}

export default async function DenverMenopausePage() {
  const listings = await getDenverListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I find an HRT prescriber in Denver?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Use MenopauseDirectory.co to search for HRT-prescribing providers in Denver. Filter by \"Prescribes HRT\" to find doctors, NPs, and other licensed prescribers who offer hormone replacement therapy. Denver's health-conscious culture has driven a growing number of functional medicine and integrative practices that specialize in hormone balance.",
        },
      },
      {
        '@type': 'Question',
        name: 'Are there MSCP-certified menopause practitioners in Denver?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The Menopause Society Certified Practitioner (MSCP) credential is the gold standard in menopause care. Filter by "MSCP Certified" on the directory to find credentialed providers in the Denver metro.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I see a Denver menopause specialist by telehealth?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Many Denver-area menopause specialists offer telehealth appointments available statewide in Colorado. This is especially useful for women in mountain communities or rural areas who want access to Denver-based specialists without the drive.',
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
          <span className="text-gray-600">Denver, CO</span>
        </nav>

        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-brand-rose mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Denver, CO</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Menopause Doctors in Denver, CO
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Denver's health-conscious culture and altitude-aware medical community mean a growing number
            of menopause specialists — OB-GYNs, functional medicine doctors, and NPs who specialize in
            hormone balance. Whether you're looking for an MSCP-certified practitioner, an HRT prescriber,
            or a provider who takes an integrative approach, Denver has solid options.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>6+ providers listed in Denver metro</span>
            <span>·</span>
            <span>MSCP-certified available</span>
            <span>·</span>
            <span>Telehealth options</span>
          </div>
          <p className="mt-3 text-sm text-gray-500">
            Aurora, CO also has 6 providers listed.{' '}
            <Link href="/listings?city=Aurora&state=CO" className="text-brand-plum hover:underline font-medium">
              Browse Aurora providers →
            </Link>
          </p>
        </div>

        {listings.length > 0 ? (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-bold text-gray-900">
                Menopause Specialists in Denver
              </h2>
              <Link
                href="/listings?city=Denver&state=CO"
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
            <p className="text-gray-500 mb-4">Search for menopause specialists in Denver below.</p>
            <Link
              href="/listings?city=Denver&state=CO"
              className="inline-flex items-center gap-2 bg-brand-plum text-white rounded-full px-6 py-3 font-medium hover:bg-brand-plum/90"
            >
              Search Denver Providers <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {/* Category links */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-10">
          <h2 className="font-serif text-xl font-semibold text-gray-900 mb-4">
            Find by Specialty in Denver
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: 'MSCP-Certified Practitioners', href: '/categories/certified-menopause-practitioner' },
              { label: 'OB-GYN Menopause Specialists', href: '/categories/obgyn-menopause' },
              { label: 'Integrative Medicine', href: '/categories/integrative-medicine' },
              { label: 'Functional Medicine', href: '/categories/functional-medicine' },
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
            Finding a Menopause Doctor in Denver
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "What types of menopause providers are most common in Denver?",
                a: "Denver has a strong functional medicine and integrative health community, which means you'll find more providers who take a whole-person approach to menopause — combining HRT options with nutrition, sleep, and lifestyle guidance. Traditional OB-GYNs and endocrinologists who focus on menopause are also well-represented.",
              },
              {
                q: "Does altitude affect menopause symptoms in Denver?",
                a: "Some research suggests high altitude can affect sleep quality and cardiovascular function — both of which are also impacted by menopause. Denver-area providers who are familiar with altitude physiology may be better equipped to tease apart what's altitude-related vs. hormone-related in your symptom picture.",
              },
              {
                q: "Can a Denver provider prescribe HRT via telehealth?",
                a: "Yes. Many Colorado-based providers offer telehealth statewide, making it easier to access Denver menopause specialists if you're in Boulder, Fort Collins, Colorado Springs, or mountain communities. Look for providers who list telehealth availability in their profile.",
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
            <Link href="/menopause-doctors/chicago-il" className="text-sm text-brand-plum hover:underline font-medium">Chicago, IL →</Link>
            <Link href="/menopause-doctors/seattle-wa" className="text-sm text-brand-plum hover:underline font-medium">Seattle, WA →</Link>
            <Link href="/menopause-doctors/boston-ma" className="text-sm text-brand-plum hover:underline font-medium">Boston, MA →</Link>
            <Link href="/listings" className="text-sm text-brand-plum hover:underline font-medium">All Providers →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
