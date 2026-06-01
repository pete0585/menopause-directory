import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import ListingCard from '@/components/ListingCard'
import type { Listing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Nurse Practitioner Menopause Specialists — Find an NP for HRT | MenopauseDirectory.co',
  description:
    'Find nurse practitioners who specialize in menopause and prescribe HRT. NPs often have longer appointments, better access, and deep menopause expertise — especially in areas underserved by OB-GYNs.',
  openGraph: {
    title: 'Nurse Practitioner Menopause Specialists',
    description:
      'NPs who specialize in menopause often offer longer appointments, more personalized care, and better access than busy OB-GYN practices. Find one near you.',
  },
}

async function getNpListings(): Promise<Listing[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('menopause_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .order('listing_tier', { ascending: false })
    .order('is_verified', { ascending: false })
    .limit(12)
  return (data as Listing[]) ?? []
}

const faqData = [
  {
    q: 'Can a nurse practitioner prescribe HRT?',
    a: "Yes. Nurse practitioners (NPs) have full prescribing authority in most US states, including for hormone replacement therapy. In full-practice-authority states (over 25 states), NPs can prescribe independently without physician oversight. In restricted states, NPs prescribe under a collaborative agreement with a physician. An NP who specializes in menopause has the clinical knowledge and prescribing authority to fully manage your HRT — the scope of care is equivalent to an OB-GYN for most menopause patients.",
  },
  {
    q: 'What are the advantages of seeing an NP for menopause care?',
    a: "NPs who specialize in menopause typically have longer appointment times than busy OB-GYN practices — often 45-60 minutes for a first visit versus 15-20 minutes. They tend to take a whole-person approach, spending more time on lifestyle, sleep, mental health, and the full symptom picture alongside hormone management. Access is often better — wait times to see an NP specialist are frequently shorter than for physician specialists in the same area. For many women, an NP who has made menopause her specialty is more knowledgeable about the current evidence than a generalist OB-GYN.",
  },
  {
    q: 'What should I look for in an NP menopause specialist?',
    a: "Look for NPs who: have completed additional menopause training or hold the MSCP credential; explicitly list menopause, perimenopause, or hormone management as their specialty; have experience with HRT specifically (not just menopause symptom management); are comfortable with current evidence including transdermal delivery and micronized progesterone. An NP with MSCP certification has met the same credentialing standard as physicians with that designation.",
  },
  {
    q: 'Is an NP covered by insurance for menopause care?',
    a: "In most cases yes. NPs are recognized as licensed providers under most major insurance plans including Medicare, Medicaid, and commercial insurers. Some insurance plans may distinguish between NP and physician billing codes, but the covered services for a menopause evaluation and HRT management are generally the same. Check your specific plan — most cover NP visits at the same level as physician visits after the ACA.",
  },
]

export default async function NursePractitionerMenopausePage() {
  const listings = await getNpListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-3xl mb-10">
          <nav className="text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-gray-600">Home</Link>
            {' › '}
            <span className="text-gray-600">Nurse Practitioner Menopause Specialists</span>
          </nav>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Nurse Practitioner Menopause Specialists
          </h1>
          <div className="text-gray-600 leading-relaxed space-y-3">
            <p>
              NPs who specialize in menopause are among the most accessible and thorough providers in
              the field. Unlike a busy OB-GYN practice where menopause is one of many conditions managed
              in 15-minute slots, an NP menopause specialist typically devotes 45-60 minutes to a first
              visit and takes a systematic approach to the full symptom picture — not just the most
              obvious complaints.
            </p>
            <p>
              NPs have full prescribing authority for HRT in most states. Many hold the MSCP
              (Menopause Society Certified Practitioner) credential, the same designation available
              to physicians. For most menopause patients, the clinical distinction between an NP
              specialist and a physician specialist is minimal — and the practical distinctions
              (access, appointment length, cost) often favor the NP.
            </p>
          </div>
        </div>

        <div className="mb-10">
          <p className="text-sm text-gray-500 mb-6">
            Showing {listings.length} active providers — search and filter to find NP menopause specialists in your area
          </p>
          {listings.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
              <p className="text-gray-500 mb-4">
                Search all providers and filter by practitioner type to find NP specialists near you.
              </p>
              <Link
                href="/listings"
                className="inline-flex items-center gap-2 bg-brand-plum text-white rounded-full px-6 py-3 font-medium hover:bg-brand-plum/90"
              >
                Search All Providers <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>

        <div className="max-w-3xl">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
            NP Menopause Care: Your Questions
          </h2>
          <div className="space-y-4">
            {faqData.map((item) => (
              <details key={item.q} className="bg-white rounded-xl border border-gray-100 p-5 group">
                <summary className="font-medium text-gray-900 cursor-pointer list-none flex items-center justify-between gap-4">
                  <span>{item.q}</span>
                  <span className="text-brand-plum text-lg group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-gray-600 leading-relaxed text-sm">{item.a}</p>
              </details>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-100">
          <h3 className="font-serif text-lg font-semibold text-gray-800 mb-3">Related Categories</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/categories/hrt-doctors" className="text-sm text-brand-plum hover:underline font-medium">
              Doctors Who Prescribe HRT →
            </Link>
            <Link href="/categories/integrative-medicine" className="text-sm text-brand-plum hover:underline font-medium">
              Integrative Medicine Specialists →
            </Link>
            <Link href="/guides/what-is-mscp" className="text-sm text-brand-plum hover:underline font-medium">
              What is MSCP Certification? →
            </Link>
            <Link href="/guides/how-to-find-hrt-friendly-doctor" className="text-sm text-brand-plum hover:underline font-medium">
              How to Find an HRT-Friendly Doctor →
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
