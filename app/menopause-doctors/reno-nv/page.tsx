import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import ListingCard from '@/components/ListingCard'
import type { Listing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Find a Menopause Doctor in Reno, NV | Menopause Directory',
  description:
    'Find menopause specialists, HRT prescribers, and MSCP-certified practitioners in Reno, Nevada. Serving Sparks, Carson City, Fernley, Fallon. Telehealth available.',
  openGraph: {
    title: 'Find a Menopause Doctor in Reno, NV',
    description:
      'Find menopause specialists and HRT-friendly doctors in Reno, NV. Telehealth available.',
  },
}

async function getRenoListings(): Promise<Listing[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('menopause_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .in('city', ['Reno', 'Sparks', 'Carson City', 'Fernley', 'Fallon'])
    .eq('state', 'NV')
    .order('listing_tier', { ascending: false })
    .order('is_verified', { ascending: false })
    .limit(12)
  return (data as Listing[]) ?? []
}

export default async function RenoMenopausePage() {
  const listings = await getRenoListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
            {
        '@type': 'Question',
        name: 'How do I find a menopause doctor in Reno, NV?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Renown Health (Renown Regional Medical Center and Women\'s Health clinics) and Saint Mary\'s Regional Medical Center are Reno\'s main healthcare anchors with OB/GYN programs. The private OB/GYN and internal medicine community in Reno also includes providers experienced in HRT prescribing. This directory lists Reno and Sparks providers who specialize in perimenopause and menopause management, including those accepting new patients.",
        },
      },
      {
        '@type': 'Question',
        name: 'Does Nevada require insurance to cover menopause care?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Nevada-regulated health insurance plans must comply with ACA Section 2713 preventive care mandates, covering women\'s preventive health services including OB/GYN visits at no cost-sharing for in-network providers. Nevada Medicaid (Nevada Check Up and Nevada Medicaid) covers OB/GYN services. Major Reno insurers include Hometown Health (Renown\'s health plan), UnitedHealthcare, Anthem, and Aetna. Confirm HRT medication coverage separately with your pharmacy benefit manager.",
        },
      },
      {
        '@type': 'Question',
        name: 'Is telehealth available for menopause care in the Reno area?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes, and it is particularly valuable for patients in rural Northern Nevada — Fernley, Fallon, Winnemucca — who lack local specialists. Many Nevada-licensed providers and telehealth platforms prescribe HRT remotely with appropriate lab work. Nevada\'s telehealth prescribing laws are favorable for hormone therapy. Reno patients can also access California-licensed providers via telehealth given proximity to the Sacramento and Bay Area markets.",
        },
      },
      {
        '@type': 'Question',
        name: 'What about menopause care for women in the Tahoe area?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Women in the Lake Tahoe basin (South Lake Tahoe CA, Stateline NV, Incline Village NV) typically seek care in either Reno or Sacramento. Renown Health and Saint Mary\'s in Reno are the closest major hospital systems. Several Reno OB/GYNs see Tahoe-area patients in person or via telehealth. Altitude-related sleep disruption can complicate menopause symptom assessment — mentioning your altitude to your provider is useful.",
        },
      }
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-gray-600">Home</Link>
          <span>/</span>
          <Link href="/listings" className="hover:text-gray-600">Find a Specialist</Link>
          <span>/</span>
          <Link href="/listings?state=NV" className="hover:text-gray-600">Nevada</Link>
          <span>/</span>
          <span className="text-gray-600">Reno</span>
        </nav>

        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8 mb-10">
          <div className="flex items-center gap-2 text-pink-500 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Reno, NV</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
            Find a Menopause Doctor in Reno, NV
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl leading-relaxed">
            Reno has a smaller but growing women's health infrastructure anchored by Renown Health and Saint Mary's Regional Medical Center. The Reno-Sparks metro is Nevada's second largest metro and draws patients from across Northern Nevada and the Sierra. The region's dry desert climate can intensify certain menopause symptoms — particularly vaginal dryness and skin changes — making specialist access important.
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>{listings.length > 0 ? `${listings.length}+` : '20+'} providers listed</span>
            <span>·</span>
            <span>HRT prescribers</span>
            <span>·</span>
            <span>MSCP-certified options</span>
            <span>·</span>
            <span>Telehealth available</span>
          </div>
        </div>

        {listings.length > 0 ? (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-semibold text-gray-800">
                Menopause Specialists in Reno, NV
              </h2>
              <Link
                href="/listings?state=NV"
                className="flex items-center gap-1 text-sm font-semibold text-pink-500 hover:text-pink-600"
              >
                See all Nevada providers <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </div>
        ) : (
          <div className="card p-12 text-center mb-12">
            <p className="text-gray-500 mb-4">Search menopause specialists in Reno below.</p>
            <Link href="/listings?state=NV" className="inline-flex items-center gap-2 bg-pink-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-pink-700">
              Search Nevada Providers <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <div className="space-y-5 mb-12">
          <h2 className="font-serif text-2xl font-semibold text-gray-800">
            Menopause Care in Reno
          </h2>
          {faqLd.mainEntity.map((faq) => (
            <div key={faq.name} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-serif text-base font-semibold text-gray-800 mb-2">{faq.name}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{faq.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h3 className="font-serif text-lg font-semibold text-gray-800 mb-4">Nevada Menopause Providers</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/listings?state=NV" className="text-sm text-pink-600 hover:text-pink-700 font-medium">All Nevada Providers →</Link>
            <Link href="/guides/is-hrt-safe" className="text-sm text-pink-600 hover:text-pink-700 font-medium">Is HRT Safe? →</Link>
            <Link href="/categories/telehealth-menopause" className="text-sm text-pink-600 hover:text-pink-700 font-medium">Telehealth Menopause Care →</Link>
            <Link href="/guides/how-to-find-hrt-friendly-doctor" className="text-sm text-pink-600 hover:text-pink-700 font-medium">How to Find an HRT Doctor →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
