import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import ListingCard from '@/components/ListingCard'
import type { Listing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Telehealth Menopause Care — Find Online HRT Providers | MenopauseDirectory.co',
  description:
    'Find menopause specialists who offer telehealth appointments and can prescribe HRT online. Get menopause care from home — no waiting room required.',
  openGraph: {
    title: 'Telehealth Menopause Specialists',
    description:
      'Find online menopause doctors who prescribe HRT via telehealth. Available in most US states.',
  },
}

async function getTelehealthListings(): Promise<Listing[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('menopause_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .eq('telehealth_available', true)
    .order('listing_tier', { ascending: false })
    .order('is_verified', { ascending: false })
    .limit(12)
  return (data as Listing[]) ?? []
}

export default async function TelehealthMenopausePage() {
  const listings = await getTelehealthListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Can I get HRT prescribed via telehealth?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. Many menopause specialists and OB-GYNs are now prescribing hormone therapy via telehealth — typically requiring an initial video consultation, a review of your symptoms and medical history, and baseline lab work (which can be done at a local lab or ordered as a home kit). Follow-up appointments and prescription renewals are handled online. Most states allow hormone prescribing via telehealth for established patients.",
        },
      },
      {
        '@type': 'Question',
        name: 'Is telehealth menopause care as good as in-person?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "For most menopause consultations, telehealth is equally effective. Symptom assessment, HRT prescribing, lab review, and dose adjustments do not require an in-person exam. A pelvic exam or internal assessment may be necessary for certain symptoms (unexplained bleeding, pelvic pain, prolapse) — in those cases, your telehealth provider will refer you to an in-person exam. For the majority of women seeking HRT, telehealth removes meaningful access barriers without sacrificing quality of care.",
        },
      },
      {
        '@type': 'Question',
        name: 'What states allow telehealth HRT prescribing?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Most US states allow licensed physicians and advanced practice providers (NPs, PAs) to prescribe hormone therapy via telehealth after an appropriate evaluation. Some states have stricter rules about initial prescribing without an in-person exam. During the COVID-19 public health emergency, telehealth rules were substantially relaxed, and many states have maintained this flexibility. Check with the specific provider about whether they can serve patients in your state.",
        },
      },
      {
        '@type': 'Question',
        name: 'Does insurance cover telehealth menopause appointments?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Many insurance plans now cover telehealth appointments at the same rate as in-person visits, especially for established patients or when telehealth is the medically appropriate setting. Coverage varies by plan and state. Some telehealth menopause platforms are self-pay ($50-200/session) but provide an itemized superbill you can submit to your insurance for potential reimbursement. Check with your plan before your appointment.",
        },
      },
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
          <span className="text-gray-600">Telehealth Menopause</span>
        </nav>

        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8 mb-10">
          <h1 className="font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
            Telehealth Menopause Specialists
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl leading-relaxed">
            Getting menopause care has never been more accessible. Many OB-GYNs and women&apos;s health
            specialists now offer telehealth appointments — letting you discuss symptoms, review labs, and
            start hormone therapy without leaving home. No waiting room. No drive to the office. Just a
            video call with a qualified provider who understands what you&apos;re going through.
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>{listings.length > 0 ? `${listings.length}+` : '100+'} telehealth providers</span>
            <span>·</span>
            <span>HRT prescribing available</span>
            <span>·</span>
            <span>Most US states</span>
            <span>·</span>
            <span>Insurance often accepted</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <h2 className="font-serif text-2xl font-semibold text-gray-800 mb-4">
              How Telehealth Menopause Care Works
            </h2>
            <div className="space-y-4">
              {[
                { step: '1', title: 'Book a video consultation', detail: 'Schedule with a menopause specialist or HRT-familiar OB-GYN. Many offer next-day appointments — far faster than in-person specialists in high-demand cities.' },
                { step: '2', title: 'Complete intake and lab work', detail: 'Review your symptom history, medical background, and current medications. Your provider will order baseline labs (FSH, estradiol, testosterone) if needed — done at a local lab or through a home kit.' },
                { step: '3', title: 'Discuss your options', detail: 'Your provider will explain what type of HRT fits your situation — estrogen form (patch, gel, pill), progesterone type, and dosing. Expect a 30-60 minute first appointment with a knowledgeable specialist.' },
                { step: '4', title: 'Receive your prescription', detail: 'Prescriptions go to your preferred pharmacy or a mail-order pharmacy. Follow-up appointments (every 3-6 months initially) are also handled via telehealth.' },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                  <div className="flex-shrink-0 w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold text-sm">
                    {item.step}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{item.title}</p>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-pink-100 p-5 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-3">Best for telehealth:</h3>
              <ul className="space-y-2">
                {[
                  'Women in rural areas with limited specialist access',
                  'Busy schedules that make in-person hard to schedule',
                  'Established menopause patients needing ongoing HRT management',
                  'Women who have been dismissed by their OB-GYN',
                  'Military families who move frequently',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-pink-500 mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Link href="/listings?telehealth=true" className="inline-flex w-full items-center justify-center gap-2 bg-pink-600 text-white px-5 py-3 rounded-xl font-semibold text-sm hover:bg-pink-700">
              Browse Telehealth Providers <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {listings.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-semibold text-gray-800">
                Telehealth Menopause Providers
              </h2>
              <Link href="/listings?telehealth=true" className="flex items-center gap-1 text-sm font-semibold text-pink-500 hover:text-pink-600">
                See all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4 mb-12">
          <h2 className="font-serif text-2xl font-semibold text-gray-800">Common Questions</h2>
          {faqLd.mainEntity.map((faq) => (
            <div key={faq.name} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-serif text-base font-semibold text-gray-800 mb-2">{faq.name}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{faq.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h3 className="font-serif text-lg font-semibold text-gray-800 mb-4">Related Categories</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/categories/hrt-doctors" className="text-sm text-pink-600 hover:text-pink-700 font-medium">HRT Prescribers →</Link>
            <Link href="/categories/nurse-practitioner-menopause" className="text-sm text-pink-600 hover:text-pink-700 font-medium">NP Menopause Specialists →</Link>
            <Link href="/guides/how-to-find-hrt-friendly-doctor" className="text-sm text-pink-600 hover:text-pink-700 font-medium">How to Find an HRT Doctor →</Link>
            <Link href="/guides/hrt-safety-by-age" className="text-sm text-pink-600 hover:text-pink-700 font-medium">HRT Safety by Age →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
