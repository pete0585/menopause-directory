import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import ListingCard from '@/components/ListingCard'
import type { Listing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Menopause Doctors in Colorado Springs, CO — Find HRT Specialists | MenopauseDirectory.co',
  description:
    'Find menopause specialists, MSCP-certified practitioners, and HRT prescribers in Colorado Springs, Colorado. 45+ providers listed. Telehealth options available statewide.',
  openGraph: {
    title: 'Menopause Doctors in Colorado Springs, CO',
    description:
      'Find menopause specialists and HRT-friendly doctors in Colorado Springs. MSCP-certified, telehealth available, accepting new patients.',
  },
}

async function getColoradoSpringsListings(): Promise<Listing[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('menopause_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .eq('city', 'Colorado Springs')
    .eq('state', 'CO')
    .order('listing_tier', { ascending: false })
    .order('is_verified', { ascending: false })
    .limit(12)
  return (data as Listing[]) ?? []
}

export default async function ColoradoSpringsMenopausePage() {
  const listings = await getColoradoSpringsListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I find an HRT prescriber in Colorado Springs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use MenopauseDirectory.co to search HRT-prescribing providers in Colorado Springs. Filter by "Prescribes HRT" to find OB-GYNs, NPs, and other licensed prescribers in the Colorado Springs metro — including providers affiliated with UCHealth, Penrose-St. Francis, and independent women\'s health practices.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are there MSCP-certified menopause practitioners in Colorado Springs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Use the MSCP filter in the directory to find Menopause Society Certified Practitioners in the Colorado Springs area. MSCP is the gold-standard credential for menopause care training — providers with this designation have completed extensive menopause-specific education.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I see a Colorado Springs menopause doctor by telehealth?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Many Colorado Springs providers offer telehealth for patients across Colorado — useful for residents of Pueblo, Fountain, Woodland Park, and surrounding areas where specialist access is limited.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does Colorado Medicaid cover menopause care and HRT in Colorado Springs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Colorado Medicaid (Health First Colorado) covers OB-GYN visits where menopause can be evaluated and treated. Coverage for specific HRT medications depends on your managed care plan and formulary. Ask providers if they accept Health First Colorado before scheduling.',
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
          <Link href="/menopause-doctors/colorado" className="hover:text-gray-600">Colorado</Link>
          {' › '}
          <span className="text-gray-600">Colorado Springs</span>
        </nav>

        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-brand-rose mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Colorado Springs, CO</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Menopause Doctors in Colorado Springs, CO
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Colorado Springs has a well-established women's health network anchored by UCHealth Memorial
            and Penrose-St. Francis, alongside a growing community of independent and integrative
            practices. With a large active military and veteran population at Fort Liberty (formerly Fort
            Carson) and Peterson Space Force Base, many providers in the area are experienced with
            Tricare coverage and the health needs of military families in the perimenopause and menopause
            transition.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>{listings.length > 0 ? `${listings.length}+` : '45+'} providers listed</span>
            <span>·</span>
            <span>HRT prescribers available</span>
            <span>·</span>
            <span>Telehealth options</span>
          </div>
        </div>

        {listings.length > 0 ? (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-bold text-gray-900">
                Menopause Specialists in Colorado Springs
              </h2>
              <Link
                href="/listings?city=Colorado+Springs&state=CO"
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
          <div className="mb-12 rounded-2xl border border-gray-100 p-12 text-center">
            <p className="text-gray-500 mb-4">Search Colorado Springs menopause specialists below.</p>
            <Link
              href="/listings?city=Colorado+Springs&state=CO"
              className="inline-flex items-center gap-2 bg-brand-plum text-white rounded-full px-6 py-3 font-medium hover:bg-brand-plum/90"
            >
              Search Colorado Springs Providers <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <div className="mb-12 space-y-4">
          <h2 className="font-serif text-2xl font-bold text-gray-900">
            Finding a Menopause Specialist in Colorado Springs
          </h2>
          {faqLd.mainEntity.map((item) => (
            <div key={item.name} className="rounded-2xl border border-gray-100 p-6">
              <h3 className="font-serif text-base font-semibold text-gray-900 mb-2">{item.name}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h3 className="font-serif text-lg font-semibold text-gray-900 mb-4">More in Colorado</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/menopause-doctors/denver-co" className="text-sm text-brand-plum hover:underline font-medium">Denver, CO →</Link>
            <Link href="/menopause-doctors/colorado" className="text-sm text-brand-plum hover:underline font-medium">All Colorado Providers →</Link>
            <Link href="/listings" className="text-sm text-brand-plum hover:underline font-medium">All Providers →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
