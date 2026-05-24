import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import ListingCard from '@/components/ListingCard'
import type { Listing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Doctors Who Prescribe HRT — Find HRT-Friendly Providers | MenopauseDirectory.co',
  description:
    'Find doctors, NPs, and other licensed providers who prescribe hormone replacement therapy (HRT) for menopause. Filtered for practitioners who actively offer and manage HRT.',
  openGraph: {
    title: 'Find a Doctor Who Prescribes HRT',
    description:
      'Not every doctor will prescribe HRT. Find providers who actively offer hormone therapy — OB-GYNs, NPs, functional medicine doctors, and more.',
  },
}

async function getHrtListings(): Promise<Listing[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('menopause_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .eq('hrt_prescriber', true)
    .order('listing_tier', { ascending: false })
    .order('is_verified', { ascending: false })
    .limit(30)
  return (data as Listing[]) ?? []
}

const faqData = [
  {
    q: 'Why don\'t all doctors prescribe HRT?',
    a: 'The 2002 Women\'s Health Initiative study was widely misinterpreted to mean HRT was dangerous for all women. That interpretation has since been significantly revised by the medical community — the risks are highly dependent on the type of HRT, the woman\'s age, and when she starts relative to menopause. But the damage was done: a generation of physicians became HRT-averse, and medical school curriculum never fully caught up. Providers who prescribe HRT today have typically sought out the updated evidence on their own.',
  },
  {
    q: 'What types of providers can prescribe HRT?',
    a: 'Any licensed prescriber can write for HRT: MDs, DOs, NPs (nurse practitioners), and PAs (physician assistants). The type of license matters less than the provider\'s knowledge and comfort with menopause management. Many of the most knowledgeable HRT prescribers are NPs who built menopause-focused practices. MSCP-certified providers of any license type have demonstrated the most comprehensive menopause training.',
  },
  {
    q: 'What kinds of HRT do providers prescribe?',
    a: 'The main categories are: systemic estrogen (patches, gels, sprays, oral tablets) with or without progesterone; low-dose vaginal estrogen (cream, ring, tablet — treats local symptoms without systemic absorption); bioidentical hormones (custom compounded); and testosterone (off-label but increasingly prescribed for libido and energy). Your provider should explain the options and help you choose based on your symptoms, history, and preferences.',
  },
  {
    q: 'Is telehealth available for HRT prescriptions?',
    a: 'Yes. Many HRT prescribers offer telehealth consultations, and federal regulations allow Schedule III and IV controlled substances (including testosterone) to be prescribed via telehealth through 2025. Most HRT medications are not controlled substances and can be prescribed freely via telehealth. Several providers in this directory serve patients statewide or nationally via telehealth.',
  },
  {
    q: 'What should I bring to my first HRT consultation?',
    a: 'Your symptom history (when they started, what they are, severity), your current medications, your personal and family medical history (especially cardiovascular, breast cancer, blood clots), any labs you\'ve had recently, and a list of your questions. Good questions: "What type of HRT do you typically start patients on and why?" "How will we monitor my response and adjust dosing?" "What are the actual risks for someone with my profile?"',
  },
]

export default async function HrtDoctorsPage() {
  const listings = await getHrtListings()

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
            <span className="text-gray-600">Doctors Who Prescribe HRT</span>
          </nav>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Find a Doctor Who Prescribes HRT
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Not every doctor will prescribe hormone replacement therapy. Many who trained before 2010 carry
            outdated fear of HRT from the misinterpreted WHI study. These providers have done the work to
            understand the modern evidence — and they'll actually prescribe.
          </p>
        </div>

        <div className="mb-10">
          <p className="text-sm text-gray-500 mb-6">
            {listings.length} {listings.length === 1 ? 'provider' : 'providers'} who actively prescribe HRT
          </p>
          {listings.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
              <p className="text-gray-500 mb-4">
                Search all providers and filter by "Prescribes HRT" to find options near you.
              </p>
              <Link
                href="/listings?hrt_prescriber=true"
                className="inline-flex items-center gap-2 bg-brand-plum text-white rounded-full px-6 py-3 font-medium hover:bg-brand-plum/90"
              >
                Search HRT Prescribers <ArrowRight className="h-4 w-4" />
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
            HRT Prescribers: Your Questions
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
            <Link href="/categories/certified-menopause-practitioner" className="text-sm text-brand-plum hover:underline font-medium">
              MSCP-Certified Practitioners →
            </Link>
            <Link href="/categories/obgyn-menopause" className="text-sm text-brand-plum hover:underline font-medium">
              OB-GYN Menopause Specialists →
            </Link>
            <Link href="/categories/telehealth" className="text-sm text-brand-plum hover:underline font-medium">
              Telehealth Options →
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
