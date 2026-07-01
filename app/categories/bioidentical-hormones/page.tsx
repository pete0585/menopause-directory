import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import ListingCard from '@/components/ListingCard'
import type { Listing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Bioidentical Hormone Therapy (BHRT) Doctors | Menopause Directory',
  description:
    'Find menopause doctors who specialize in bioidentical hormone replacement therapy (BHRT). FDA-approved and compounded BHRT options — find a provider who understands your preferences.',
  openGraph: {
    title: 'Menopause Doctors Who Specialize in Bioidentical Hormone Therapy (BHRT)',
    description:
      'Find BHRT specialists and menopause doctors who prescribe bioidentical hormones. FDA-approved options and compounded BHRT available.',
  },
}

async function getBhrtListings(): Promise<Listing[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('menopause_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .order('listing_tier', { ascending: false })
    .order('is_verified', { ascending: false })
    .limit(20)
  return (data as Listing[]) ?? []
}

const faqData = [
  {
    q: 'Is BHRT the same as regular HRT?',
    a: "BHRT uses hormones that are chemically identical in molecular structure to those produced by your body — primarily estradiol and progesterone. The term \"bioidentical\" refers to this molecular identity, not to whether the product is compounded or FDA-approved. Conventional HRT includes both bioidentical options (like Estrace/estradiol and Prometrium/micronized progesterone) and non-bioidentical options (like conjugated equine estrogen from horse urine, and synthetic progestins like medroxyprogesterone acetate). So some conventional HRT is bioidentical, and some BHRT is FDA-approved.",
  },
  {
    q: 'Is bioidentical hormone therapy FDA-approved?',
    a: "Some bioidentical hormones are FDA-approved, tested, and regulated — including Estrace (oral estradiol), Climara and Vivelle-Dot (estradiol patches), EstroGel and Divigel (estradiol gels), and Prometrium (micronized progesterone). Compounded BHRT — custom-made hormone preparations from a compounding pharmacy — is not FDA-approved. The FDA has raised concerns about compounded hormones because they are not subject to the same standardized testing for safety, efficacy, and dosing accuracy. However, compounding can serve patients with specific needs that standard formulations don't meet.",
  },
  {
    q: 'How is BHRT different from synthetic HRT?',
    a: "The molecular difference is what matters. Bioidentical estradiol binds to estrogen receptors identically to the estrogen your ovaries produced. Synthetic progestins like medroxyprogesterone acetate (MPA) have a different molecular structure and bind to multiple hormone receptors beyond progesterone, which may explain the different cardiovascular and breast effects seen in studies like the WHI that used MPA. Micronized progesterone (bioidentical) has a more favorable safety profile in most research than synthetic progestins. Ask your provider specifically about the type of progesterone being recommended.",
  },
]

export default async function BioidenticalHormonesPage() {
  const listings = await getBhrtListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
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
          <span className="text-gray-600">Bioidentical Hormone Therapy</span>
        </nav>

        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8 mb-10">
          <h1 className="font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
            Menopause Doctors Who Specialize in Bioidentical Hormone Therapy (BHRT)
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl leading-relaxed">
            Bioidentical hormone therapy uses hormones that are chemically identical to those your
            body produces. Many women seek out BHRT after not tolerating older synthetic options,
            or because they prefer a more individualized approach to dosing and delivery. This
            directory lists menopause specialists who prescribe bioidentical estradiol, progesterone,
            and testosterone — in both FDA-approved and compounded formulations.
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>{listings.length > 0 ? `${listings.length}+` : '100+'} providers listed</span>
            <span>·</span>
            <span>FDA-approved and compounded options</span>
            <span>·</span>
            <span>Telehealth available</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="font-serif text-2xl font-semibold text-gray-800 mb-4">
                What is bioidentical hormone therapy?
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Bioidentical hormones are structurally identical to the hormones your ovaries produced.
                The three main hormones used in BHRT are estradiol (the primary estrogen), progesterone,
                and testosterone. &ldquo;Bioidentical&rdquo; is a descriptor of molecular structure — it does
                not automatically mean compounded, natural, or safer.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                By contrast, older hormone therapy options included conjugated equine estrogen (derived
                from pregnant mares&apos; urine and containing a mix of estrogens not identical to human
                estradiol) and synthetic progestins like medroxyprogesterone acetate — which have a
                different molecular structure and bind to receptors differently than natural progesterone.
              </p>
              <p className="text-gray-600 leading-relaxed">
                The good news: FDA-approved bioidentical options are widely available and well-studied.
                You do not need to go to a compounding pharmacy to access bioidentical hormone therapy.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-gray-800 mb-4">
                Who should consider BHRT?
              </h2>
              <div className="space-y-3">
                {[
                  {
                    candidate: "Women who didn't tolerate synthetic HRT",
                    detail: "Some women experience side effects with synthetic progestins (mood changes, bloating, breast tenderness) that resolve when switching to micronized progesterone. Similarly, some women prefer estradiol over conjugated equine estrogen.",
                  },
                  {
                    candidate: "Women who prefer bioidentical formulations",
                    detail: "Knowing that the hormones you are taking are chemically identical to what your body produced matters to many women. This is a valid preference, and many excellent menopause specialists share this orientation.",
                  },
                  {
                    candidate: "Women with specific dosing or delivery needs",
                    detail: "Compounding is appropriate when a patient needs a specific dose, delivery method, or combination not available in commercial products — for example, a very low estradiol dose for sensitivity, or a combination cream. This should be prescribed by a knowledgeable provider and filled by an accredited compounding pharmacy.",
                  },
                ].map(({ candidate, detail }) => (
                  <div key={candidate} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                    <p className="font-semibold text-gray-800 mb-1">{candidate}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{detail}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-gray-800 mb-4">
                What to ask a BHRT doctor
              </h2>
              <div className="bg-pink-50 rounded-xl p-5">
                <ul className="space-y-3">
                  {[
                    "Are you prescribing FDA-approved bioidenticals (Estrace, Climara, Prometrium) or compounded preparations — and why?",
                    "How do you monitor hormone levels after starting? What labs do you use and how often?",
                    "What is your approach to progesterone — micronized progesterone or a synthetic progestin?",
                    "What baseline labs do you run before starting hormone therapy?",
                    "If compounding, which pharmacy do you use — and are they PCAB-accredited?",
                    "How do you adjust dosing over time, and what does follow-up look like?",
                  ].map((q) => (
                    <li key={q} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-pink-500 mt-0.5 flex-shrink-0">→</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          <div className="space-y-5">
            <div className="bg-white rounded-xl border border-pink-100 p-5 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-3">FDA-approved bioidentical options</h3>
              <ul className="space-y-2">
                {[
                  { name: 'Estrace', note: 'Oral estradiol' },
                  { name: 'Climara / Vivelle-Dot', note: 'Estradiol patches' },
                  { name: 'EstroGel / Divigel', note: 'Estradiol gels' },
                  { name: 'Evamist', note: 'Estradiol spray' },
                  { name: 'Prometrium', note: 'Micronized progesterone' },
                  { name: 'Bijuva', note: 'Combined estradiol + progesterone' },
                ].map((item) => (
                  <li key={item.name} className="text-sm">
                    <span className="font-medium text-gray-800">{item.name}</span>
                    <span className="text-gray-500"> — {item.note}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href="/listings"
              className="inline-flex w-full items-center justify-center gap-2 bg-pink-600 text-white px-5 py-3 rounded-xl font-semibold text-sm hover:bg-pink-700"
            >
              Browse All Providers <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {listings.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-semibold text-gray-800">
                Find a BHRT-Friendly Menopause Doctor
              </h2>
              <Link
                href="/listings"
                className="flex items-center gap-1 text-sm font-semibold text-pink-500 hover:text-pink-600"
              >
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
          {faqData.map((faq) => (
            <div key={faq.q} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-serif text-base font-semibold text-gray-800 mb-2">{faq.q}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="bg-brand-plum rounded-2xl p-8 text-center text-white mb-8">
          <h2 className="font-serif text-2xl font-bold mb-3">List your practice</h2>
          <p className="text-white/80 mb-6">
            Are you a menopause specialist who prescribes bioidentical hormones?
            Add your practice to this directory — thousands of women are searching for you.
          </p>
          <Link
            href="/submit"
            className="inline-flex items-center gap-2 bg-white text-brand-plum font-semibold px-6 py-3 rounded-full hover:bg-pink-50 transition-colors"
          >
            Add Your Practice Free <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h3 className="font-serif text-lg font-semibold text-gray-800 mb-4">Related</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/guides/is-hrt-safe" className="text-sm text-pink-600 hover:text-pink-700 font-medium">Is HRT Safe? →</Link>
            <Link href="/guides/hrt-safety-by-age" className="text-sm text-pink-600 hover:text-pink-700 font-medium">HRT Safety by Age →</Link>
            <Link href="/categories/hrt-doctors" className="text-sm text-pink-600 hover:text-pink-700 font-medium">HRT Prescribers →</Link>
            <Link href="/guides/how-to-find-hrt-friendly-doctor" className="text-sm text-pink-600 hover:text-pink-700 font-medium">How to Find an HRT Doctor →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
