import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import type { Listing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Menopause Doctors in Kansas City, MO — Find HRT Specialists | MenopauseDirectory.co',
  description:
    'Find menopause specialists, MSCP-certified practitioners, and HRT prescribers in Kansas City, MO and KS. Providers across the metro including Overland Park and Leawood. Telehealth available.',
  openGraph: {
    title: 'Menopause Doctors in Kansas City, MO',
    description:
      'Find menopause specialists and HRT-friendly doctors in Kansas City, Missouri and Kansas. MSCP-certified, telehealth available, accepting new patients.',
  },
}

async function getKansasCityListings(): Promise<Listing[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('menopause_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .eq('city', 'Kansas City')
    .in('state', ['MO', 'KS'])
    .order('listing_tier', { ascending: false })
    .order('is_verified', { ascending: false })
    .limit(10)
  return (data as Listing[]) ?? []
}

export default async function KansasCityMenopausePage() {
  const listings = await getKansasCityListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many menopause specialists are in Kansas City?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `MenopauseDirectory.co lists ${listings.length > 0 ? `${listings.length}+` : 'a growing number of'} menopause specialists in the Kansas City metro. The area spans both Missouri and Kansas, with major health systems including Saint Luke\'s Health System and the University of Kansas Health System providing women\'s health programs with menopause expertise. Independent and integrative practices round out the Kansas City menopause care landscape.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Do Kansas City doctors prescribe bioidentical hormones?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. A number of Kansas City-area menopause providers offer bioidentical hormone therapy — including FDA-approved bioidentical estradiol (patches, gels, rings) and micronized progesterone (Prometrium). Some also work with compounding pharmacies for customized preparations. Use the directory to find providers who offer bioidentical options, and see our guide on bioidentical vs. conventional HRT for the clinical comparison.",
        },
      },
      {
        '@type': 'Question',
        name: 'Is there a menopause clinic in Overland Park?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Overland Park — on the Kansas side of the metro — has multiple providers offering menopause care and HRT. AdventHealth and Ascension Via Christi both have suburban Kansas City locations. A growing number of independent OB-GYNs and nurse practitioners also practice in Overland Park, Leawood, Olathe, and other Johnson County communities.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I see a Kansas City menopause specialist by telehealth?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Many Kansas City-area providers offer telehealth — accessible for patients throughout Missouri and Kansas. Telehealth is particularly practical for HRT follow-up appointments and for patients in suburban or rural areas of either state who want access to a menopause-knowledgeable provider without driving to the city.',
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
          <Link href="/listings?state=MO" className="hover:text-gray-600">Missouri</Link>
          {' › '}
          <span className="text-gray-600">Kansas City</span>
        </nav>

        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-brand-rose mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Kansas City, MO/KS</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Find a Menopause Doctor in Kansas City, MO
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Kansas City straddles two states but functions as one metro for healthcare purposes. Whether
            you are in Kansas City, Missouri or across the state line in Overland Park, Leawood, or Olathe,
            Kansas, the metro has a solid network of menopause-focused providers. Saint Luke&apos;s Health System
            and the University of Kansas Health System anchor the academic side — with a growing number of
            independent OB-GYNs and nurse practitioners offering more personalized, longer-appointment care
            for women navigating perimenopause and menopause.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>{listings.length > 0 ? `${listings.length}+` : 'Multiple'} providers listed</span>
            <span>·</span>
            <span>MO and KS providers</span>
            <span>·</span>
            <span>Telehealth available</span>
          </div>
        </div>

        {listings.length > 0 ? (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-bold text-gray-900">
                Menopause Specialists in Kansas City
              </h2>
              <Link
                href="/listings?city=Kansas+City"
                className="flex items-center gap-1 text-sm font-semibold text-brand-plum hover:text-brand-plum/80"
              >
                All results <ArrowRight className="h-4 w-4" />
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
                  <p className="text-sm text-gray-400 mt-1">{listing.city}, {listing.state}</p>
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
        ) : (
          <div className="mb-12 rounded-2xl border border-gray-100 p-12 text-center">
            <p className="text-gray-500 mb-4">Search Kansas City menopause specialists below.</p>
            <Link
              href="/listings?city=Kansas+City"
              className="inline-flex items-center gap-2 bg-brand-plum text-white rounded-full px-6 py-3 font-medium hover:bg-brand-plum/90"
            >
              Search Kansas City Providers <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <div className="mb-12 space-y-4">
          <h2 className="font-serif text-2xl font-bold text-gray-900">
            Finding a Menopause Specialist in Kansas City
          </h2>
          {faqLd.mainEntity.map((item) => (
            <div key={item.name} className="rounded-2xl border border-gray-100 p-6">
              <h3 className="font-serif text-base font-semibold text-gray-900 mb-2">{item.name}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h3 className="font-serif text-lg font-semibold text-gray-900 mb-4">Related</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/listings?state=MO" className="text-sm text-brand-plum hover:underline font-medium">All Missouri Providers →</Link>
            <Link href="/listings?state=KS" className="text-sm text-brand-plum hover:underline font-medium">All Kansas Providers →</Link>
            <Link href="/guides/bioidentical-vs-conventional-hrt" className="text-sm text-brand-plum hover:underline font-medium">Bioidentical vs. Conventional HRT →</Link>
            <Link href="/guides/how-to-find-hrt-friendly-doctor" className="text-sm text-brand-plum hover:underline font-medium">How to Find an HRT-Friendly Doctor →</Link>
            <Link href="/listings" className="text-sm text-brand-plum hover:underline font-medium">All Providers →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
