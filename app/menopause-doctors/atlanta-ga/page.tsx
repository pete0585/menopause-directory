import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import ListingCard from '@/components/ListingCard'
import type { Listing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Menopause Doctors in Atlanta, GA — Find HRT-Friendly Providers | MenopauseDirectory.co',
  description:
    'Find menopause specialists, MSCP-certified practitioners, and HRT-prescribing doctors in Atlanta, Georgia. 11+ providers listed. Telehealth available statewide.',
  openGraph: {
    title: 'Menopause Doctors in Atlanta, GA',
    description:
      'Find menopause specialists in Atlanta who prescribe HRT, hold MSCP certification, and offer telehealth. Accepting new patients.',
  },
}

async function getAtlantaListings(): Promise<Listing[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('menopause_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .eq('city', 'Atlanta')
    .eq('state', 'GA')
    .order('listing_tier', { ascending: false })
    .order('is_verified', { ascending: false })
    .limit(12)
  return (data as Listing[]) ?? []
}

export default async function AtlantaMenopausePage() {
  const listings = await getAtlantaListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I find a menopause specialist in Atlanta who prescribes HRT?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Search MenopauseDirectory.co for Atlanta providers and filter by "Prescribes HRT." You can also filter for MSCP-certified practitioners — they have the most specialized training in hormone therapy management.',
        },
      },
      {
        '@type': 'Question',
        name: 'What types of menopause practitioners are available in Atlanta?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Atlanta has a diverse range of menopause-knowledgeable providers including OB-GYNs with menopause specialization, MSCP-certified nurse practitioners, functional medicine doctors, pelvic floor physical therapists, and menopause coaches. The mix means you can find the right level and type of support for where you are in your journey.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is telehealth available for menopause care in Atlanta?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Several Atlanta-area menopause specialists offer telehealth, which can extend service to anywhere in Georgia. Telehealth is effective for initial consultations, HRT follow-up, symptom management, and coaching.',
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
          <span className="text-gray-600">Atlanta, GA</span>
        </nav>

        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-brand-rose mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Atlanta, GA</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Menopause Doctors in Atlanta, GA
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Atlanta's rapidly growing healthcare ecosystem includes a solid cohort of menopause-literate
            providers — from OB-GYNs who actively prescribe HRT to functional medicine doctors, pelvic floor
            specialists, and menopause coaches. If your regular doctor has dismissed your symptoms, these are
            the people worth finding.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>{listings.length > 0 ? `${listings.length}+` : 'Multiple'} providers listed</span>
            <span>·</span>
            <span>HRT prescribers available</span>
            <span>·</span>
            <span>MSCP-certified options</span>
            <span>·</span>
            <span>Telehealth available</span>
          </div>
        </div>

        {listings.length > 0 ? (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-bold text-gray-900">
                Menopause Specialists in Atlanta
              </h2>
              <Link
                href="/listings?city=Atlanta&state=GA"
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
            <p className="text-gray-500 mb-4">Search for menopause specialists in Atlanta below.</p>
            <Link
              href="/listings?city=Atlanta&state=GA"
              className="inline-flex items-center gap-2 bg-brand-plum text-white rounded-full px-6 py-3 font-medium hover:bg-brand-plum/90"
            >
              Search Atlanta Providers <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-10">
          <h2 className="font-serif text-xl font-semibold text-gray-900 mb-4">
            Browse by Specialty in Atlanta
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: 'MSCP-Certified Practitioners', href: '/categories/certified-menopause-practitioner' },
              { label: 'OB-GYN Menopause Specialists', href: '/categories/obgyn-menopause' },
              { label: 'Pelvic Floor Therapists', href: '/categories/pelvic-floor-therapist' },
              { label: 'Functional Medicine', href: '/categories/functional-medicine' },
              { label: 'Menopause Coaches', href: '/categories/menopause-coach' },
              { label: 'Telehealth Nationwide', href: '/categories/telehealth' },
            ].map(({ label, href }) => (
              <Link key={label} href={href} className="text-sm text-brand-plum hover:underline font-medium">
                {label} →
              </Link>
            ))}
          </div>
        </div>

        <div className="max-w-3xl">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
            Menopause Care in Atlanta: What to Know
          </h2>
          <div className="space-y-4">
            {[
              {
                q: 'Why do so many Atlanta women struggle to find a good menopause doctor?',
                a: 'It\'s not an Atlanta problem — it\'s a national one. Only 31% of OB-GYNs feel adequately prepared to manage menopause, according to The Menopause Society. The providers who do it well are typically those who sought out extra training, earned MSCP certification, or built their practice specifically around this patient population. This directory helps you find those people without spending weeks calling offices that don\'t specialize in menopause.',
              },
              {
                q: 'What should I expect at my first appointment with a menopause specialist in Atlanta?',
                a: 'A good first appointment should include a thorough history — your symptom timeline, current medications, cardiovascular and cancer history, and your goals. The provider should explain what HRT is and isn\'t, what alternatives exist, and give you a concrete plan. If you leave the appointment without a clear next step or with a dismissal like "your levels look normal," find someone else.',
              },
              {
                q: 'Are pelvic floor therapists in Atlanta relevant to menopause care?',
                a: 'Absolutely. Declining estrogen during menopause can cause genitourinary syndrome of menopause (GSM) — vaginal dryness, painful sex, urinary urgency and leaking, and pelvic floor dysfunction. Pelvic floor physical therapy is a first-line treatment for GSM and should be part of any comprehensive menopause care plan.',
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
      </div>
    </>
  )
}
