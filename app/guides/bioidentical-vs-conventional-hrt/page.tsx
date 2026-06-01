import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Bioidentical vs. Conventional HRT: What Is the Difference? | MenopauseDirectory.co',
  description:
    'Bioidentical HRT and conventional HRT are not as different as the marketing suggests — but some distinctions matter. Here is what the evidence actually shows.',
  openGraph: {
    title: 'Bioidentical vs. Conventional HRT: What the Evidence Shows',
    description:
      'The bioidentical vs. conventional HRT debate generates more marketing than science. Here is what the evidence actually says and what actually matters when choosing.',
  },
}

const faqData = [
  {
    q: 'What does "bioidentical" actually mean?',
    a: "Bioidentical means the hormone is chemically identical to the hormone produced by the human body. Estradiol (the primary form of estrogen) and micronized progesterone (Prometrium) are bioidentical and are also FDA-approved medications. The term \"bioidentical\" is sometimes used specifically to mean compounded hormones — but FDA-approved bioidentical options exist and are often preferable to compounded versions for most patients because they have standardized dosing and quality control.",
  },
  {
    q: 'Is bioidentical HRT safer than conventional HRT?',
    a: "FDA-approved bioidentical hormones (estradiol + micronized progesterone) have a more favorable safety profile than the specific conventional formulations studied in the 2002 WHI study — which used conjugated equine estrogen plus synthetic medroxyprogesterone acetate. The meaningful distinction is between micronized progesterone and synthetic progestins: multiple studies have found that micronized progesterone carries a more favorable breast cancer risk profile than synthetic progestins. This is not a compounded vs. commercial distinction — it is a progesterone type distinction, and FDA-approved micronized progesterone (Prometrium) is available commercially.",
  },
  {
    q: 'Are compounded bioidentical hormones better than FDA-approved options?',
    a: "Not necessarily — and in some cases they carry additional risks. Compounded hormones are custom-mixed by a pharmacy and are not reviewed by the FDA for safety, efficacy, or quality control. Dosing can vary between batches. The Menopause Society explicitly advises that FDA-approved hormone therapy is preferred over compounded formulations for most patients, because the safety data on compounded hormones is limited. There are legitimate uses for compounding — non-standard delivery routes, specific dose adjustments, or cases where commercial options are unavailable — but the idea that compounded = safer is not supported by evidence.",
  },
  {
    q: 'What does BHRT mean in practice?',
    a: "BHRT stands for bioidentical hormone replacement therapy. In mainstream clinical settings it usually refers to FDA-approved bioidentical hormones like estradiol patches/gels and micronized progesterone. In some alternative medicine contexts, BHRT specifically means custom-compounded hormones, often with saliva testing as the basis for dosing — a practice the Menopause Society does not endorse, since saliva hormone levels do not accurately reflect circulating levels. When a provider says they offer BHRT, it is worth asking specifically: do you use FDA-approved options, compounded, or both?",
  },
]

export default function BioidenticalVsConventionalHrtPage() {
  const jsonLd = {
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-gray-600">Home</Link>
          {' › '}
          <Link href="/listings" className="hover:text-gray-600">Find a Specialist</Link>
          {' › '}
          <span className="text-gray-600">Bioidentical vs. Conventional HRT</span>
        </nav>

        <header className="mb-10">
          <h1 className="font-serif text-4xl font-bold text-gray-900 leading-tight sm:text-5xl text-balance">
            Bioidentical vs. Conventional HRT: What Is the Difference?
          </h1>
          <p className="mt-4 text-xl text-gray-600 leading-relaxed">
            The bioidentical HRT debate generates a lot of marketing and a lot of confusion. Some of the
            distinctions matter clinically. Most of the marketing does not. Here is what the evidence
            actually shows and what questions are worth asking your provider.
          </p>
        </header>

        <div className="space-y-10 text-gray-600 leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
              The Distinction That Actually Matters
            </h2>
            <p>
              The clinically meaningful distinction is not bioidentical vs. conventional. It is between
              specific types of hormones — particularly progesterone type.
            </p>
            <p className="mt-3">
              The 2002 Women's Health Initiative study that scared a generation away from HRT used
              conjugated equine estrogen (derived from horse urine) plus synthetic medroxyprogesterone
              acetate. Subsequent research has shown that medroxyprogesterone acetate and other
              synthetic progestins carry a less favorable breast cancer risk profile than micronized
              progesterone — which is bioidentical and also FDA-approved (sold as Prometrium).
            </p>
            <p className="mt-3">
              This is not a compounded vs. commercial distinction. FDA-approved micronized progesterone
              is available at any pharmacy. The question is whether your provider is prescribing
              micronized progesterone or a synthetic progestin — and if synthetic, why.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
              FDA-Approved Bioidentical Options
            </h2>
            <p>These are available at standard pharmacies without compounding:</p>
            <ul className="mt-4 space-y-3">
              {[
                {
                  name: 'Estradiol patches',
                  examples: 'Vivelle-Dot, Climara, Minivelle',
                  detail: 'Transdermal delivery — avoids first-pass liver metabolism. No increased blood clot risk the way oral estrogen carries.',
                },
                {
                  name: 'Estradiol gels',
                  examples: 'Divigel, EstroGel',
                  detail: 'Applied daily to skin. Same transdermal benefit as patches. Some women prefer gels over patches for skin tolerance.',
                },
                {
                  name: 'Estradiol sprays',
                  examples: 'Evamist',
                  detail: 'Sprayed on inner forearm. Transdermal, fast-drying.',
                },
                {
                  name: 'Micronized progesterone',
                  examples: 'Prometrium',
                  detail: 'Oral (or can be used vaginally). More favorable breast cancer risk profile than synthetic progestins. The preferred progesterone for most menopause providers following current evidence.',
                },
                {
                  name: 'Estradiol vaginal products',
                  examples: 'Vagifem, Imvexxy, Estring',
                  detail: 'Local delivery — minimal systemic absorption. Used specifically for genitourinary syndrome of menopause (vaginal dryness, pain with sex, urinary symptoms).',
                },
              ].map(({ name, examples, detail }) => (
                <li key={name} className="bg-white rounded-xl border border-gray-100 p-4">
                  <p className="font-semibold text-gray-800 mb-0.5">{name} <span className="font-normal text-gray-500 text-sm">— {examples}</span></p>
                  <p className="text-sm text-gray-600">{detail}</p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
              When Is Compounding Appropriate?
            </h2>
            <p>
              Compounded hormones have legitimate uses — they are not inherently bad, just less regulated.
              Situations where compounding may make sense:
            </p>
            <ul className="mt-4 space-y-2">
              {[
                "A patient needs a delivery route or formulation not available commercially (e.g., a specific cream concentration)",
                "Allergy to a component in commercial formulations",
                "Dose needs that fall outside standard commercial options",
                "Testosterone for women (no FDA-approved testosterone product for women exists — compounding is the only option)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <span className="text-brand-plum mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4">
              The Menopause Society recommends FDA-approved options as the first line for most patients
              and reserves compounding for cases where commercial options are inadequate. Compounded
              hormones are not inherently safer — they have less oversight, not more.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
              Questions to Ask Your Provider
            </h2>
            <ul className="mt-4 space-y-3">
              {[
                {
                  q: '"Are you prescribing micronized progesterone or a synthetic progestin?"',
                  detail: 'This is the most clinically meaningful question in the progesterone choice. Micronized progesterone (Prometrium) has a more favorable breast cancer risk profile in the evidence. If synthetic progestin is recommended, ask why.',
                },
                {
                  q: '"Is this an FDA-approved formulation or a compounded one?"',
                  detail: 'You should know what you are taking. If compounded, ask why commercial options were not sufficient and what quality control the pharmacy uses.',
                },
                {
                  q: '"Are you using saliva testing to guide dosing?"',
                  detail: 'If yes, ask for the rationale. Saliva hormone levels are not validated for HRT dosing decisions — the Menopause Society does not endorse saliva testing for this purpose. Serum or dried blood spot testing are more reliable.',
                },
              ].map(({ q, detail }) => (
                <div key={q} className="bg-white rounded-xl border border-gray-100 p-4">
                  <p className="font-semibold text-gray-800 mb-1">{q}</p>
                  <p className="text-sm text-gray-600">{detail}</p>
                </div>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-12 bg-brand-plum/10 rounded-2xl p-8 text-center">
          <h2 className="font-serif text-2xl font-bold text-brand-plum mb-3">
            Find a menopause specialist who knows the current evidence
          </h2>
          <p className="text-gray-600 mb-6">
            Providers with MSCP certification and documented HRT experience are more likely to have
            an informed conversation about these distinctions.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/listings"
              className="inline-flex items-center gap-2 bg-brand-plum text-white rounded-full px-8 py-3 font-semibold hover:bg-brand-plum/90 transition-colors"
            >
              Find a Specialist <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/categories/hrt-doctors"
              className="inline-flex items-center gap-2 border border-brand-plum text-brand-plum rounded-full px-8 py-3 font-semibold hover:bg-brand-plum/5 transition-colors"
            >
              HRT Prescribers →
            </Link>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-6">
            Bioidentical HRT FAQs
          </h2>
          <div className="space-y-4">
            {faqData.map((faq) => (
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

        <div className="mt-12 pt-8 border-t border-gray-100">
          <h3 className="font-serif text-lg font-semibold text-gray-800 mb-4">More Guides</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/guides/is-hrt-safe" className="text-sm text-brand-plum hover:underline font-medium">
              Is HRT Safe? The Updated Evidence →
            </Link>
            <Link href="/guides/hrt-what-to-expect-first-3-months" className="text-sm text-brand-plum hover:underline font-medium">
              Your First 3 Months on HRT →
            </Link>
            <Link href="/guides/how-to-find-hrt-friendly-doctor" className="text-sm text-brand-plum hover:underline font-medium">
              How to Find an HRT-Friendly Doctor →
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
