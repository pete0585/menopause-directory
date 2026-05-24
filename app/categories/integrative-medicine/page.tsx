import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import ListingCard from '@/components/ListingCard'
import type { Listing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Integrative Medicine for Menopause — Functional & Holistic Specialists | MenopauseDirectory.co',
  description:
    'Find integrative and functional medicine doctors who specialize in menopause. Whole-person care combining hormone therapy, nutrition, stress management, sleep, and gut health.',
  openGraph: {
    title: 'Integrative Medicine Menopause Specialists',
    description:
      'Integrative and functional medicine practitioners who take a whole-person approach to menopause — HRT, nutrition, sleep, and lifestyle in one comprehensive plan.',
  },
}

async function getIntegrativeListings(): Promise<Listing[]> {
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
    q: 'What is integrative medicine for menopause?',
    a: "Integrative medicine for menopause combines conventional treatments — including hormone replacement therapy when appropriate — with evidence-informed approaches like nutrition, sleep optimization, stress management, and targeted supplementation. The goal is treating the whole person, not just suppressing individual symptoms. An integrative provider will typically spend more time in a first appointment (often 60-90 minutes) reviewing your complete health picture: gut health, thyroid function, adrenal patterns, sleep quality, and stress load, in addition to estrogen and progesterone levels.",
  },
  {
    q: 'Does an integrative doctor prescribe HRT?',
    a: "Many do. Integrative medicine is not anti-HRT — it's pro-individualization. A well-trained integrative provider will discuss HRT as one tool among several and help you understand the evidence for and against it given your specific history. They may prefer bioidentical hormone options (compounded or FDA-approved), or may use HRT alongside lifestyle interventions rather than as a standalone prescription. If HRT is important to you, look for providers who explicitly list HRT prescribing in their profile.",
  },
  {
    q: 'How is integrative medicine different from functional medicine?',
    a: "The terms are often used interchangeably, but there are distinctions. Functional medicine is a specific methodology that focuses on identifying root causes of chronic conditions — it tends to involve detailed lab panels, gut microbiome analysis, and a systems-biology lens. Integrative medicine is a broader philosophy of combining conventional and complementary approaches. In practice, many menopause providers blend both frameworks, and for most patients the more important question is whether the provider is knowledgeable about menopause specifically — which the MSCP credential helps identify regardless of whether they call themselves integrative or functional.",
  },
]

export default async function IntegrativeMedicinePage() {
  const listings = await getIntegrativeListings()

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
            <span className="text-gray-600">Integrative Medicine</span>
          </nav>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Integrative Medicine Menopause Specialists
          </h1>
          <div className="text-gray-600 leading-relaxed space-y-3">
            <p>
              Integrative and functional medicine practitioners take a whole-person approach to menopause
              — combining conventional hormone therapy with nutrition, stress management, sleep
              optimization, and targeted supplementation. Unlike a standard OB-GYN visit, an integrative
              consult often runs 45–90 minutes and digs into lifestyle, gut health, thyroid function,
              and adrenal patterns alongside estrogen and progesterone levels.
            </p>
            <p>
              These providers are especially valuable for women whose symptoms are complex, who have
              multiple overlapping conditions, or who want a care plan that goes beyond a prescription.
              Many also offer ongoing coaching and accountability — not just annual appointments.
            </p>
          </div>
        </div>

        <div className="mb-10">
          <p className="text-sm text-gray-500 mb-6">
            Showing {listings.length} active {listings.length === 1 ? 'provider' : 'providers'} — search and filter to find integrative specialists in your area
          </p>
          {listings.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
              <p className="text-gray-500 mb-4">
                Search all providers and filter by specialty to find integrative medicine options near you.
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
            Integrative Menopause Care: Your Questions
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
            <Link href="/categories/endocrinologist" className="text-sm text-brand-plum hover:underline font-medium">
              Endocrinologists →
            </Link>
            <Link href="/categories/certified-menopause-practitioner" className="text-sm text-brand-plum hover:underline font-medium">
              MSCP-Certified Practitioners →
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
