import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import type { Listing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Menopause Doctors in Maryland — Find HRT Specialists | MenopauseDirectory.co',
  description:
    'Find menopause specialists, MSCP-certified practitioners, and HRT prescribers across Maryland. Baltimore, Bethesda, Rockville, Annapolis, and more. Telehealth available statewide.',
  openGraph: {
    title: 'Menopause Doctors in Maryland',
    description:
      'Find menopause specialists and HRT-friendly doctors across Maryland. MSCP-certified, telehealth available, accepting new patients.',
  },
}

const MD_CITIES = [
  { city: 'Baltimore', slug: null, label: 'Baltimore' },
  { city: 'Bethesda', slug: null, label: 'Bethesda' },
  { city: 'Rockville', slug: null, label: 'Rockville' },
  { city: 'Silver Spring', slug: null, label: 'Silver Spring' },
  { city: 'Annapolis', slug: null, label: 'Annapolis' },
  { city: 'Frederick', slug: null, label: 'Frederick' },
  { city: 'Columbia', slug: null, label: 'Columbia' },
  { city: 'Gaithersburg', slug: null, label: 'Gaithersburg' },
]

async function getMarylandListings(): Promise<Listing[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('menopause_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .eq('state', 'MD')
    .order('listing_tier', { ascending: false })
    .order('is_verified', { ascending: false })
    .limit(12)
  return (data as Listing[]) ?? []
}

export default async function MarylandMenopausePage() {
  const listings = await getMarylandListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many menopause specialists are in Maryland?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Maryland has 65+ menopause specialists across the state, with the largest concentrations in Baltimore, the Montgomery County suburbs (Bethesda, Rockville, Silver Spring, Gaithersburg), and the DC metro corridor. Johns Hopkins Medicine and the University of Maryland Medical System provide strong academic anchors, while a growing number of independent OB-GYNs and nurse practitioners offer more personalized menopause care. MenopauseDirectory.co lists ${listings.length > 0 ? `${listings.length}+` : 'verified'} active providers across Maryland.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Do Maryland menopause doctors accept insurance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most Maryland menopause specialists accept major insurance plans including CareFirst BlueCross BlueShield (the dominant Maryland insurer), Aetna, Cigna, UnitedHealthcare, and Maryland Medicaid. Some specialized practices — particularly integrative and functional medicine providers — operate on a self-pay or membership model. Use the directory filters to find providers who accept your specific plan.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I see a Maryland menopause doctor via telehealth?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Many Maryland menopause specialists offer telehealth for patients throughout Maryland. This is especially convenient for women in rural Eastern Shore communities, Western Maryland, or Southern Maryland where in-person specialist access can be limited. Telehealth is also practical for busy professionals in the DC suburbs who want to minimize travel.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are there MSCP-certified menopause practitioners in Maryland?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Maryland has MSCP (Menopause Society Certified Practitioner) credentialed providers, particularly in Baltimore and the Montgomery County suburbs. Use the MSCP filter in the directory to find certified practitioners. Johns Hopkins and University of Maryland affiliates are often among the most up-to-date on current menopause evidence and HRT guidelines.',
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
          <span className="text-gray-600">Maryland</span>
        </nav>

        <div className="max-w-3xl mb-10">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Menopause Doctors in Maryland
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Maryland has a strong menopause care landscape driven by two world-class academic health systems:
            Johns Hopkins Medicine in Baltimore and the University of Maryland Medical System. The
            Montgomery County suburbs — Bethesda, Rockville, Silver Spring, and Gaithersburg — have
            a high density of women&apos;s health specialists serving the DC metro area. Beyond the academic
            centers, a growing number of independent OB-GYNs, nurse practitioners, and functional medicine
            providers offer specialized menopause care with the time and depth that hospital programs often
            cannot. Maryland has 65+ menopause specialists listed — one of the strongest mid-Atlantic states
            for menopause care access.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>Baltimore: largest concentration</span>
            <span>·</span>
            <span>Montgomery County: DC metro hub</span>
            <span>·</span>
            <span>Telehealth statewide</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-10">
          <h2 className="font-serif text-xl font-semibold text-gray-900 mb-4">Browse by City</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {MD_CITIES.map(({ city, label }) => (
              <Link
                key={city}
                href={`/listings?city=${encodeURIComponent(city)}&state=MD`}
                className="text-sm text-brand-plum hover:underline font-medium"
              >
                {label} →
              </Link>
            ))}
          </div>
        </div>

        {listings.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-bold text-gray-900">
                Menopause Specialists Across Maryland
              </h2>
              <Link
                href="/listings?state=MD"
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
                  <p className="text-sm text-gray-400 mt-1">{listing.city}, MD</p>
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
            Menopause Care in Maryland: FAQ
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
            <Link href="/menopause-doctors/baltimore-md" className="text-sm text-brand-plum hover:underline font-medium">Baltimore →</Link>
            <Link href="/menopause-doctors/boston-ma" className="text-sm text-brand-plum hover:underline font-medium">Boston →</Link>
            <Link href="/menopause-doctors/new-york" className="text-sm text-brand-plum hover:underline font-medium">New York →</Link>
            <Link href="/guides/what-is-mscp" className="text-sm text-brand-plum hover:underline font-medium">What is an MSCP? →</Link>
            <Link href="/listings" className="text-sm text-brand-plum hover:underline font-medium">All Providers →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
