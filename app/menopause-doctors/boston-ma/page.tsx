import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import ListingCard from '@/components/ListingCard'
import type { Listing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Menopause Doctors in Boston, MA — Find HRT-Friendly Providers | MenopauseDirectory.co',
  description:
    'Find menopause specialists, MSCP-certified practitioners, and HRT-prescribing doctors in Boston, Massachusetts. 11+ providers listed in the Boston metro. Telehealth options available.',
  openGraph: {
    title: 'Menopause Doctors in Boston, MA',
    description:
      'Find menopause specialists and HRT-friendly doctors in Boston. MSCP-certified, telehealth available, accepting new patients.',
  },
}

async function getBostonListings(): Promise<Listing[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('menopause_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .eq('city', 'Boston')
    .eq('state', 'MA')
    .order('listing_tier', { ascending: false })
    .order('is_verified', { ascending: false })
    .limit(12)
  return (data as Listing[]) ?? []
}

export default async function BostonMenopausePage() {
  const listings = await getBostonListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I find a menopause specialist in Boston who prescribes HRT?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use MenopauseDirectory.co to search for HRT-prescribing providers in Boston. Filter by "Prescribes HRT" to find doctors, NPs, and other licensed prescribers who offer hormone replacement therapy. Boston has strong academic medical centers and a growing number of MSCP-certified practitioners.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are there MSCP-certified menopause practitioners in Boston?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The Menopause Society Certified Practitioner (MSCP) credential represents the gold standard in menopause care. Several providers in the Boston area hold MSCP certification. Filter by "MSCP Certified" to find them.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I see a Boston menopause specialist by telehealth?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Many Boston-area menopause specialists offer telehealth appointments, which may be available statewide in Massachusetts. Telehealth is especially useful for initial consultations, follow-ups, and HRT management.',
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
          <span className="text-gray-600">Boston, MA</span>
        </nav>

        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-brand-rose mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Boston, MA</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Menopause Doctors in Boston, MA
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Boston's concentration of academic medical centers and women's health practices means a stronger
            than average selection of menopause-literate providers. Whether you're looking for an MSCP-certified
            specialist, an HRT-prescribing OB-GYN, a pelvic floor therapist, or a menopause coach — you'll
            find real options here.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>{listings.length > 0 ? `${listings.length}+` : 'Multiple'} providers listed</span>
            <span>·</span>
            <span>MSCP-certified available</span>
            <span>·</span>
            <span>HRT prescribers listed</span>
            <span>·</span>
            <span>Telehealth options</span>
          </div>
        </div>

        {listings.length > 0 ? (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-bold text-gray-900">
                Menopause Specialists in Boston
              </h2>
              <Link
                href="/listings?city=Boston&state=MA"
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
            <p className="text-gray-500 mb-4">Search for menopause specialists in Boston below.</p>
            <Link
              href="/listings?city=Boston&state=MA"
              className="inline-flex items-center gap-2 bg-brand-plum text-white rounded-full px-6 py-3 font-medium hover:bg-brand-plum/90"
            >
              Search Boston Providers <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {/* Category links */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-10">
          <h2 className="font-serif text-xl font-semibold text-gray-900 mb-4">
            Find by Specialty in Boston
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: 'MSCP-Certified Practitioners', href: '/categories/certified-menopause-practitioner' },
              { label: 'OB-GYN Menopause Specialists', href: '/categories/obgyn-menopause' },
              { label: 'Pelvic Floor Therapists', href: '/categories/pelvic-floor-therapist' },
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
            Finding a Menopause Doctor in Boston
          </h2>
          <div className="space-y-4">
            {[
              {
                q: 'Why is it so hard to find a doctor in Boston who takes menopause seriously?',
                a: 'Despite having world-class academic medical centers, Boston — like most US cities — has a gap between menopause prevalence and menopause-specialized care. Most general OB-GYNs receive fewer than 2 hours of menopause education in medical school. The doctors who do take it seriously are often the ones who sought out additional training or MSCP certification on their own. This directory helps you find them faster.',
              },
              {
                q: 'What is an MSCP and why does it matter in Boston?',
                a: 'MSCP stands for Menopause Society Certified Practitioner — the certification from The Menopause Society (formerly NAMS). It requires passing a comprehensive exam covering HRT, symptom management, cardiovascular risk, bone health, and more. In a large market like Boston, filtering for MSCP-certified providers is the fastest way to find someone with demonstrated expertise.',
              },
              {
                q: 'Do Boston menopause doctors prescribe HRT?',
                a: 'Many do, but not all. Some providers are HRT-neutral (they won\'t prescribe it but won\'t dismiss it), and some are HRT-prescribing (they actively offer and manage hormone therapy). If HRT is your goal, look for providers who list "prescribes HRT" on their profile, or filter by that preference in the search.',
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
