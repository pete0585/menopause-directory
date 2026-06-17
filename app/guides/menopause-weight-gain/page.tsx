import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Menopause and Weight Gain: What the Research Says | MenopauseDirectory.co',
  description:
    "Most women gain 5-10 lbs during menopause transition — but the cause isn't what you think. Here is what the research actually shows about hormones, metabolism, and what works.",
  openGraph: {
    title: 'Menopause and Weight Gain: What the Research Says',
    description:
      "Menopause weight gain is real — but the cause is more complex than declining estrogen alone. Here is the current evidence and what actually helps.",
  },
}

const faqData = [
  {
    q: 'Does menopause cause weight gain?',
    a: "Menopause is associated with weight gain, but the relationship is more nuanced than it often appears. Research — including the Study of Women's Health Across the Nation (SWAN) — shows that total body weight increase during menopause transition is modest (roughly 4-5 lbs on average) and not dramatically different from age-related weight gain in men. What IS specific to menopause is redistribution: body fat shifts from hips and thighs toward the abdomen. This central adiposity is the clinically significant change — it increases cardiovascular and metabolic risk independent of total body weight.",
  },
  {
    q: 'Does HRT prevent weight gain during menopause?',
    a: "HRT does not prevent all menopause-related weight gain, but it does mitigate fat redistribution. Studies show that women on estrogen therapy accumulate significantly less visceral (abdominal) fat compared to those not on HRT. Estrogen influences fat deposition patterns — declining estrogen favors abdominal fat storage. HRT doesn't override calories-in/calories-out, but it can mean a healthier body composition pattern even without dramatic weight changes. Progestogens vary — micronized progesterone (Prometrium) appears more metabolically neutral than synthetic progestins.",
  },
  {
    q: 'Why does my metabolism slow down during menopause?',
    a: "Several mechanisms converge. First, muscle mass naturally declines with age (sarcopenia), and estrogen has a modest muscle-preserving effect — so its decline accelerates this process. Less muscle = lower resting metabolic rate. Second, declining estrogen affects thyroid-binding proteins and can unmask subclinical hypothyroidism in susceptible women. Third, poor sleep (a near-universal menopause symptom) disrupts ghrelin and leptin — the hormones that regulate appetite and satiety. A sleep-deprived perimenopausal woman is fighting her hunger signals, her metabolism, and her fat distribution patterns simultaneously.",
  },
  {
    q: 'What exercise is most effective for menopause weight gain?',
    a: "Resistance training (strength training) is the highest-value intervention for menopause body composition — more so than cardio alone. This is because the core problem is muscle loss, not just caloric surplus. Two to three sessions per week of progressive resistance training preserves and builds muscle mass, raises resting metabolic rate, and improves insulin sensitivity. Cardio matters for cardiovascular health and stress management. High-intensity interval training (HIIT) has shown benefits in menopause-specific studies. Walking is underrated for its insulin-sensitizing effect, particularly after meals.",
  },
  {
    q: 'Does GLP-1 medication help with menopause weight gain?',
    a: "GLP-1 receptor agonists (semaglutide, tirzepatide) are effective for weight reduction and are increasingly discussed in the context of menopause. They work independently of hormones and can address the caloric surplus side of the equation effectively. However, they do not address the hormonal or metabolic mechanisms specific to menopause. The current evidence base — and most menopause specialists — supports using HRT and GLP-1s together in appropriate candidates rather than treating them as mutually exclusive. GLP-1 medications require a prescription and medical oversight.",
  },
]

export default function MenopauseWeightGainPage() {
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
          <span className="text-gray-600">Menopause and Weight Gain</span>
        </nav>

        <header className="mb-10">
          <h1 className="font-serif text-4xl font-bold text-gray-900 leading-tight sm:text-5xl text-balance">
            Menopause and Weight Gain: What the Research Says
          </h1>
          <p className="mt-4 text-xl text-gray-600 leading-relaxed">
            Most women experience some weight change during menopause transition. But the mechanism
            is more complex than &ldquo;declining estrogen = weight gain.&rdquo; Here is what the
            evidence actually shows — and what interventions have real data behind them.
          </p>
        </header>

        <div className="space-y-10 text-gray-600 leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
              The Redistribution Problem
            </h2>
            <p className="mb-4">
              The most clinically significant change during menopause is not total body weight
              — it&apos;s where fat is stored. Before menopause, estrogen promotes peripheral fat
              storage (hips, thighs, buttocks) — the gynoid pattern. As estrogen declines, the body
              shifts toward central fat distribution — more fat accumulates in the abdomen.
            </p>
            <p>
              This matters beyond aesthetics. Visceral adipose tissue (the fat packed around
              internal organs) is metabolically active in a harmful way — it drives insulin
              resistance, inflammation, and cardiovascular risk. Women who maintain the same total
              body weight through menopause can still see deteriorating metabolic markers if their
              fat distribution has shifted centrally.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
              Why Calories Aren&apos;t the Whole Story
            </h2>
            <p className="mb-4">
              Three hormonal mechanisms converge in menopause to make weight management harder:
            </p>
            <div className="space-y-4">
              {[
                {
                  title: 'Estrogen and fat distribution',
                  body: "Estrogen directly regulates adipose tissue distribution through estrogen receptors on fat cells. Its decline removes a signal that previously directed fat storage away from the abdomen. This is not a calories problem — it's a hormonal address-change problem."
                },
                {
                  title: 'Muscle loss acceleration',
                  body: 'Estrogen has a muscle-preserving effect. Its decline accelerates age-related sarcopenia (muscle mass loss). Less muscle lowers resting metabolic rate — meaning the same caloric intake that was weight-neutral at 40 produces weight gain at 52, without any behavioral change.'
                },
                {
                  title: 'Sleep disruption and hunger hormones',
                  body: "Night sweats and insomnia — near-universal in perimenopause — chronically disrupt ghrelin (hunger hormone) and leptin (satiety hormone). Poor sleep increases hunger, reduces satiety signaling, and promotes calorie-dense food cravings. A woman doing everything 'right' but sleeping 5 fragmented hours is fighting her own hormonal appetite regulation."
                },
              ].map(({ title, body }) => (
                <div key={title} className="bg-pink-50 rounded-xl border border-pink-100 p-5">
                  <p className="font-semibold text-gray-800 mb-2">{title}</p>
                  <p className="text-sm text-gray-600">{body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
              What the Evidence Shows Actually Works
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-3 border border-gray-200 font-semibold text-gray-800">Intervention</th>
                    <th className="text-left p-3 border border-gray-200 font-semibold text-gray-800">Evidence Strength</th>
                    <th className="text-left p-3 border border-gray-200 font-semibold text-gray-800">What It Does</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Estrogen therapy (HRT)', 'STRONG', 'Reduces visceral fat accumulation, preserves lean mass'],
                    ['Resistance training', 'STRONG', 'Preserves muscle, raises metabolic rate, improves insulin sensitivity'],
                    ['Protein-forward diet (1.2-1.6g/kg)', 'STRONG', 'Preserves muscle during any weight loss attempt'],
                    ['HIIT cardio', 'MODERATE', 'Better body composition than steady-state cardio alone'],
                    ['GLP-1 medications', 'STRONG for weight loss', 'Does not address redistribution; works independently of hormones'],
                    ['Low-carb/Mediterranean diet', 'MODERATE', 'Reduces insulin resistance and inflammation; modest weight effects'],
                    ['Sleep optimization (CBT-I or HRT for night sweats)', 'MODERATE', 'Improves hunger hormone regulation'],
                  ].map(([intervention, strength, effect]) => (
                    <tr key={intervention} className="border-b border-gray-100">
                      <td className="p-3 border border-gray-200 text-gray-800 font-medium">{intervention}</td>
                      <td className="p-3 border border-gray-200 text-gray-600">{strength}</td>
                      <td className="p-3 border border-gray-200 text-gray-600">{effect}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
              Common Questions
            </h2>
            {faqData.map((faq) => (
              <div key={faq.q} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                <h3 className="font-serif text-base font-semibold text-gray-800 mb-2">{faq.q}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100">
          <h3 className="font-serif text-lg font-semibold text-gray-800 mb-4">
            Talk to a Menopause Specialist
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Weight changes during menopause are a clinical topic — not just a lifestyle one.
            A menopause specialist can evaluate your hormone levels, assess cardiovascular
            risk, and recommend a personalized approach.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/listings" className="inline-flex items-center gap-2 bg-pink-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-pink-700">
              Find a Menopause Specialist <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/guides/is-hrt-safe" className="text-sm text-pink-600 hover:text-pink-700 font-medium self-center">Is HRT Safe? →</Link>
            <Link href="/guides/menopause-and-sleep" className="text-sm text-pink-600 hover:text-pink-700 font-medium self-center">Menopause and Sleep →</Link>
          </div>
        </div>
      </article>
    </>
  )
}
