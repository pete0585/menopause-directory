import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import ListingCard from '@/components/ListingCard'
import type { Listing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Endocrinologists for Menopause — Find a Hormone Specialist | MenopauseDirectory.co',
  description:
    'Find endocrinologists who specialize in menopause, perimenopause, premature ovarian insufficiency (POI), and surgical menopause. Hormone specialists who understand the full picture.',
  openGraph: {
    title: 'Find an Endocrinologist for Menopause',
    description:
      'Endocrinologists specialize in hormones — including the complex hormonal changes of perimenopause and menopause. Find one who focuses on women\'s hormonal health.',
  },
}

async function getEndocrinologistListings(): Promise<Listing[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('menopause_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .eq('practitioner_type', 'endocrinologist')
    .order('listing_tier', { ascending: false })
    .order('is_verified', { ascending: false })
    .limit(30)
  return (data as Listing[]) ?? []
}

const faqData = [
  {
    q: 'Should I see an endocrinologist for menopause?',
    a: 'Most women get excellent menopause care from an OB-GYN or NP who has specialized in menopause. An endocrinologist is especially valuable when: you have premature ovarian insufficiency (POI, before age 40), you have diabetes or thyroid disease alongside your menopause symptoms, your hormone levels are unusual or complex, or your symptoms don\'t respond to standard management. For straightforward perimenopause and menopause, an MSCP-certified OB-GYN or NP is often the more practical choice.',
  },
  {
    q: 'What is the difference between an endocrinologist and an OB-GYN for menopause?',
    a: 'An endocrinologist specializes in the entire endocrine (hormone) system: thyroid, adrenal, pituitary, pancreas, and reproductive hormones. They have deep expertise in complex hormonal interactions. An OB-GYN specializes in women\'s reproductive health — many have deep menopause expertise, especially those with MSCP certification. For most women, a menopause-specialized OB-GYN or NP is the right first step. An endocrinologist is the right referral for complex cases.',
  },
  {
    q: 'What is premature ovarian insufficiency and why does it need an endocrinologist?',
    a: 'Premature ovarian insufficiency (POI) is menopause occurring before age 40, affecting about 1% of women. It\'s distinct from typical menopause in important ways: it can be intermittent (some women with POI ovulate occasionally), it carries different cardiovascular and bone health risks, and the management needs to account for fertility preservation in women who want children. Endocrinologists and reproductive endocrinologists have the specialized training for this complexity.',
  },
  {
    q: 'Do endocrinologists prescribe HRT for menopause?',
    a: 'Yes, endocrinologists can and do prescribe HRT when appropriate. Their approach often focuses more on the hormonal picture overall — including thyroid, adrenal, and metabolic factors — alongside reproductive hormones. If you have complex hormone issues beyond menopause, this comprehensive view is an advantage.',
  },
]

export default async function EndocrinologistPage() {
  const listings = await getEndocrinologistListings()

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
            <span className="text-gray-600">Endocrinologists for Menopause</span>
          </nav>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Find an Endocrinologist for Menopause
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Endocrinologists are hormone specialists. When menopause intersects with thyroid issues, adrenal
            concerns, POI, or unusual hormonal patterns, they bring expertise that goes beyond what most
            OB-GYNs can offer. These are the cases where they're the right call.
          </p>
        </div>

        <div className="mb-10">
          <p className="text-sm text-gray-500 mb-6">
            {listings.length} endocrinologist{listings.length !== 1 ? 's' : ''} listed
          </p>
          {listings.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
              <p className="text-gray-500 mb-4">
                Search for endocrinologists near you or explore other specialist types.
              </p>
              <Link
                href="/listings?practitioner_type=endocrinologist"
                className="inline-flex items-center gap-2 bg-brand-plum text-white rounded-full px-6 py-3 font-medium hover:bg-brand-plum/90"
              >
                Search Endocrinologists <ArrowRight className="h-4 w-4" />
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
            Endocrinologists and Menopause: FAQ
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
            <Link href="/categories/hrt-doctors" className="text-sm text-brand-plum hover:underline font-medium">
              HRT Prescribers →
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
