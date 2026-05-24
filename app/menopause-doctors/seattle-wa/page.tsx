import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import ListingCard from '@/components/ListingCard'
import type { Listing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Menopause Doctors in Seattle, WA — Find HRT Specialists | MenopauseDirectory.co',
  description:
    'Find menopause specialists, MSCP-certified practitioners, and HRT-prescribing doctors in Seattle, Washington. 7+ providers listed across the Seattle metro. Telehealth options available.',
  openGraph: {
    title: 'Menopause Doctors in Seattle, WA',
    description:
      'Find menopause specialists and HRT-friendly doctors in Seattle. MSCP-certified, telehealth available, accepting new patients.',
  },
}

async function getSeattleListings(): Promise<Listing[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('menopause_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .eq('city', 'Seattle')
    .eq('state', 'WA')
    .order('listing_tier', { ascending: false })
    .order('is_verified', { ascending: false })
    .limit(12)
  return (data as Listing[]) ?? []
}

export default async function SeattleMenopausePage() {
  const listings = await getSeattleListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I find an HRT prescriber in Seattle?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use MenopauseDirectory.co to search for HRT-prescribing providers in Seattle. Filter by "Prescribes HRT" to find doctors, NPs, and licensed prescribers who actively offer hormone replacement therapy. Seattle has strong academic medical centers at UW Medicine and Swedish Hospital, plus a growing number of independent women\'s health practices.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are there MSCP-certified menopause practitioners in Seattle?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The Menopause Society Certified Practitioner (MSCP) credential is the gold standard in menopause care training. Filter by "MSCP Certified" on the directory to find credentialed providers in the Seattle metro area.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I see a Seattle menopause specialist by telehealth?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Many Seattle-area menopause specialists offer telehealth statewide across Washington. This is particularly valuable for women on the Eastside (Bellevue, Redmond, Kirkland) or in communities across the Puget Sound who want access to Seattle specialists without the commute.',
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
          <span className="text-gray-600">Seattle, WA</span>
        </nav>

        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-brand-rose mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Seattle, WA</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Menopause Doctors in Seattle, WA
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Seattle's strong concentration of academic medical centers — UW Medicine, Swedish, Virginia
            Mason — and independent women's health practices means menopause-specialized care is
            accessible across the Puget Sound metro, from Capitol Hill and Fremont to the Eastside
            (Bellevue, Redmond, Kirkland).
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>7+ providers listed</span>
            <span>·</span>
            <span>MSCP-certified available</span>
            <span>·</span>
            <span>Telehealth options</span>
          </div>
          <p className="mt-3 text-sm text-gray-500">
            Spokane, WA also has 3 providers listed.{' '}
            <Link href="/listings?city=Spokane&state=WA" className="text-brand-plum hover:underline font-medium">
              Browse Spokane providers →
            </Link>
          </p>
        </div>

        {listings.length > 0 ? (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-bold text-gray-900">
                Menopause Specialists in Seattle
              </h2>
              <Link
                href="/listings?city=Seattle&state=WA"
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
            <p className="text-gray-500 mb-4">Search for menopause specialists in Seattle below.</p>
            <Link
              href="/listings?city=Seattle&state=WA"
              className="inline-flex items-center gap-2 bg-brand-plum text-white rounded-full px-6 py-3 font-medium hover:bg-brand-plum/90"
            >
              Search Seattle Providers <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {/* Category links */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-10">
          <h2 className="font-serif text-xl font-semibold text-gray-900 mb-4">
            Find by Specialty in Seattle
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: 'MSCP-Certified Practitioners', href: '/categories/certified-menopause-practitioner' },
              { label: 'OB-GYN Menopause Specialists', href: '/categories/obgyn-menopause' },
              { label: 'Pelvic Floor Therapists', href: '/categories/pelvic-floor-therapist' },
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
            Finding a Menopause Doctor in Seattle
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "What menopause care is available at UW Medicine or Swedish?",
                a: "Both UW Medicine and Swedish have women's health departments that include OB-GYN providers. For menopause-specific care, look for providers who specifically list menopause management in their scope of practice, or who hold the MSCP credential — that's the clearest signal of dedicated menopause training regardless of institution affiliation.",
              },
              {
                q: "Is there good menopause care on the Eastside (Bellevue, Redmond, Kirkland)?",
                a: "Yes. The Eastside has its own growing network of women's health providers, and many Seattle-based specialists offer telehealth that covers Eastside patients. If you prefer in-person care closer to home, search the directory filtered by those cities.",
              },
              {
                q: "What should I look for in a Seattle menopause specialist?",
                a: "MSCP certification is the clearest credential. Beyond that, look for providers who explicitly mention HRT management, hormone balance, or menopause in their profile — not just general OB-GYN care. Reviews and patient experience matter too: providers who spend adequate time listening and explaining are worth a bit of extra travel.",
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
            <Link href="/menopause-doctors/denver-co" className="text-sm text-brand-plum hover:underline font-medium">Denver, CO →</Link>
            <Link href="/menopause-doctors/chicago-il" className="text-sm text-brand-plum hover:underline font-medium">Chicago, IL →</Link>
            <Link href="/menopause-doctors/boston-ma" className="text-sm text-brand-plum hover:underline font-medium">Boston, MA →</Link>
            <Link href="/listings" className="text-sm text-brand-plum hover:underline font-medium">All Providers →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
