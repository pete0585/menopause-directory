import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: "Menopause Brain Fog: What's Happening and How to Fix It | MenopauseDirectory.co",
  description:
    "Menopause brain fog — memory lapses, word-finding difficulty, and trouble concentrating — is real and common. Here is why it happens and what actually helps.",
  openGraph: {
    title: "Menopause Brain Fog: What's Actually Happening and How to Fix It",
    description:
      "Struggling with memory lapses and concentration during menopause? Here is the science behind menopause brain fog and what you can do about it.",
  },
}

const faqData = [
  {
    q: 'Is brain fog a normal part of menopause?',
    a: "Yes. Cognitive symptoms — memory lapses, word-finding difficulty, difficulty concentrating — are among the most commonly reported symptoms of perimenopause. Research from the Study of Women's Health Across the Nation (SWAN) found that verbal memory and processing speed decline during perimenopause, then often stabilize in postmenopause. For most women, it is a temporary phase, not a permanent decline.",
  },
  {
    q: 'Does HRT help with menopause brain fog?',
    a: "Research suggests HRT may help, particularly when started early in the menopause transition. The \"timing hypothesis\" holds that estrogen has neuroprotective effects when initiated close to menopause onset. Studies show women who start HRT within 10 years of menopause or before age 60 have better cognitive outcomes than those who start later. The WHI Memory Study (which showed negative results) used conjugated equine estrogen plus medroxyprogesterone in women averaging 63 — a very different picture than early initiation in younger perimenopausal women.",
  },
  {
    q: 'How long does menopause brain fog last?',
    a: "For most women, cognitive symptoms peak in perimenopause and improve in postmenopause as hormone levels stabilize at a new baseline. The timeline varies considerably — some women notice improvement within months of menopause, others take longer. Sleep quality is a major driver: if night sweats are disrupting sleep, cognitive symptoms will persist until that is addressed. Women who remain symptomatic in postmenopause should discuss this with their provider.",
  },
  {
    q: 'What supplements help with menopause brain fog?',
    a: "The evidence base for supplements in menopause brain fog is limited, but several have biologically plausible mechanisms and reasonable safety profiles. Omega-3 DHA supports neuronal membrane structure and has the strongest evidence. Magnesium glycinate supports sleep quality, which indirectly helps cognition. Adaptogens like ashwagandha and rhodiola have some evidence for stress-related cognitive effects. All supplements should be discussed with your doctor before starting, particularly if you are on other medications.",
  },
]

export default function MenopauseBrainFogPage() {
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

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-gray-600">Home</Link>
          {' › '}
          <Link href="/listings" className="hover:text-gray-600">Find a Specialist</Link>
          {' › '}
          <span className="text-gray-600">Menopause Brain Fog</span>
        </nav>

        <header className="mb-10">
          <h1 className="font-serif text-4xl font-bold text-gray-900 leading-tight sm:text-5xl text-balance">
            Menopause Brain Fog: What&apos;s Actually Happening and How to Fix It
          </h1>
          <p className="mt-4 text-xl text-gray-600 leading-relaxed">
            Walking into a room and forgetting why. Losing words mid-sentence. Reading a paragraph
            three times and retaining nothing. Menopause brain fog is real, it is common, and it
            is not a sign that something is permanently wrong with your brain. Here is what is
            actually happening — and what the evidence says about interventions.
          </p>
        </header>

        <div className="space-y-10 text-gray-600 leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
              What is menopause brain fog?
            </h2>
            <p className="mb-4">
              Menopause brain fog encompasses a cluster of cognitive symptoms that commonly emerge
              during perimenopause: difficulty with verbal memory (finding words, recalling names),
              reduced processing speed, trouble sustaining focus, and a general sense that your mind
              is not as sharp as it used to be. These symptoms are distinct from the normal,
              gradual cognitive changes of aging.
            </p>
            <p>
              Brain fog typically peaks during perimenopause — the transition period before periods
              stop — when hormone levels fluctuate erratically rather than declining smoothly.
              This volatility, rather than low estrogen per se, appears to drive much of the
              cognitive disruption. Most women find symptoms improve once they reach postmenopause
              and hormone levels stabilize at their new (lower) baseline.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
              Why estrogen affects your brain
            </h2>
            <p className="mb-4">
              Estrogen receptors are distributed throughout the brain, with particularly high
              concentrations in the hippocampus — the brain region most important for memory
              formation and retrieval. Estrogen supports cognitive function through multiple
              mechanisms:
            </p>
            <div className="space-y-4">
              {[
                {
                  title: 'Glucose metabolism in neurons',
                  detail: "Estrogen enhances neurons' ability to use glucose as fuel. As estrogen declines, some neurons shift to less efficient energy substrates. Brain imaging studies show reduced glucose uptake in the default mode network (resting state brain regions) in perimenopausal women.",
                },
                {
                  title: 'Neurotransmitter regulation',
                  detail: "Estrogen modulates serotonin, dopamine, and acetylcholine — neurotransmitters important for mood, motivation, and memory. Declining estrogen can affect the sensitivity of receptors for these systems, contributing to both cognitive and mood symptoms.",
                },
                {
                  title: 'Synaptic plasticity',
                  detail: "Estrogen promotes dendritic spine density in hippocampal neurons — essentially supporting the physical infrastructure of memory formation. Declining estrogen reduces this structural support, which may partly explain reduced verbal memory in perimenopause.",
                },
              ].map(({ title, detail }) => (
                <div key={title} className="bg-pink-50 rounded-xl border border-pink-100 p-5">
                  <p className="font-semibold text-gray-800 mb-2">{title}</p>
                  <p className="text-sm text-gray-600">{detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
              What the research says about HRT and cognitive function
            </h2>
            <p className="mb-4">
              The evidence on HRT and cognition is nuanced and depends heavily on timing. The
              &ldquo;critical window&rdquo; or &ldquo;timing hypothesis&rdquo; is now the dominant
              framework in the research community: estrogen therapy appears to have neuroprotective
              effects when initiated close to menopause onset, but not when initiated late.
            </p>
            <p className="mb-4">
              The Women&apos;s Health Initiative Memory Study (WHIMS), which initially raised concerns
              about HRT and cognition, enrolled women averaging age 63 — already years into
              postmenopause. More recent observational studies and randomized trials in recently
              menopausal women show a different picture: HRT initiated within 10 years of menopause
              is associated with maintained or improved cognitive performance compared to non-users.
            </p>
            <p>
              The type of progestogen also matters. Micronized progesterone (Prometrium) appears more
              neurologically neutral than synthetic progestins like medroxyprogesterone acetate —
              which was used in the WHI and WHIMS studies.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
              Lifestyle approaches that help
            </h2>
            <div className="space-y-4">
              {[
                {
                  intervention: 'Sleep (non-negotiable)',
                  evidence: 'STRONG',
                  detail: "Night sweats and insomnia directly fragment the slow-wave and REM sleep that consolidates memory. Treating vasomotor symptoms (with HRT or other approaches) improves sleep, which improves cognitive function. Sleep deprivation is one of the most powerful acute causes of brain fog — addressing it has immediate effects.",
                },
                {
                  intervention: 'Resistance training',
                  evidence: 'STRONG',
                  detail: "Strength training increases BDNF (brain-derived neurotrophic factor), a protein that supports hippocampal neuron growth and survival. Studies specifically in perimenopausal and postmenopausal women show improved executive function and memory with regular resistance training.",
                },
                {
                  intervention: 'Omega-3 DHA',
                  evidence: 'MODERATE',
                  detail: "DHA is the primary structural fatty acid in neuronal membranes. Adequate DHA intake supports the membrane fluidity that affects neurotransmitter receptor function. Food sources (fatty fish 2x/week) or supplementation (1-2g DHA daily) are reasonable approaches with good safety profiles.",
                },
                {
                  intervention: 'Time-restricted eating',
                  evidence: 'EARLY',
                  detail: "Metabolic health strongly influences brain function, and insulin resistance — which increases in menopause — is associated with cognitive decline. Time-restricted eating (typically a 16:8 or 14:10 window) improves insulin sensitivity and has emerging evidence for cognitive benefits in midlife women.",
                },
              ].map(({ intervention, evidence, detail }) => (
                <div key={intervention} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-gray-800">{intervention}</p>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      evidence === 'STRONG' ? 'bg-green-50 text-green-700' :
                      evidence === 'MODERATE' ? 'bg-yellow-50 text-yellow-700' :
                      'bg-gray-50 text-gray-600'
                    }`}>
                      {evidence}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
              When brain fog becomes concerning
            </h2>
            <p className="mb-4">
              Menopause-related brain fog is typically characterized by slowed processing and
              word-finding difficulty — you know you know something but it takes longer to
              retrieve. True memory loss — forgetting conversations that happened, getting lost
              in familiar places, not recognizing people you know — is a different clinical picture
              and warrants evaluation by your primary care provider or a neurologist.
            </p>
            <p>
              If you are in perimenopause and your cognitive symptoms are significantly affecting
              your work or daily life, or if you are worried about dementia risk, discuss it
              explicitly with your menopause specialist. Cognitive symptoms are a legitimate reason
              to consider HRT — not just a side issue to tolerate.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
              Talking to your doctor about menopause and brain fog
            </h2>
            <p className="mb-4">
              Many women are told that brain fog is &ldquo;just aging&rdquo; or dismissed outright.
              Come prepared with specifics: how long symptoms have been present, which domains are
              affected (memory, attention, word-finding), how symptoms affect your work or daily
              function, and what you have already tried.
            </p>
            <div className="bg-pink-50 rounded-xl p-5">
              <p className="font-semibold text-gray-800 mb-3">Questions to ask your provider:</p>
              <ul className="space-y-2">
                {[
                  "Could my cognitive symptoms be related to hormonal changes?",
                  "Would HRT be appropriate for me given my symptom profile and health history?",
                  "Should I rule out thyroid issues or other causes of cognitive symptoms?",
                  "What is your approach to the timing hypothesis and cognitive outcomes?",
                  "Are there cognitive testing tools that could give us a baseline?",
                ].map((q) => (
                  <li key={q} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-pink-500 mt-0.5">→</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
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
            Find a menopause doctor who understands brain health
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Cognitive symptoms are a legitimate reason to seek menopause care. Find a specialist
            who takes brain fog seriously and can discuss HRT and other approaches with you.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/listings" className="inline-flex items-center gap-2 bg-pink-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-pink-700">
              Find a Menopause Specialist <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/guides/menopause-and-sleep" className="text-sm text-pink-600 hover:text-pink-700 font-medium self-center">Menopause and Sleep →</Link>
            <Link href="/guides/is-hrt-safe" className="text-sm text-pink-600 hover:text-pink-700 font-medium self-center">Is HRT Safe? →</Link>
          </div>
        </div>
      </article>
    </>
  )
}
