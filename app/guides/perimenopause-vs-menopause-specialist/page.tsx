import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Perimenopause vs Menopause: When to See a Specialist | MenopauseDirectory.co',
  description:
    'Perimenopause can start years before your last period. Know when your symptoms warrant a specialist, not just your regular doctor.',
  openGraph: {
    title: 'Perimenopause vs Menopause: When Should You See a Specialist?',
    description:
      'Perimenopause symptoms can be severe and start as early as your late 30s. Here is when to escalate to a specialist and what they can do.',
  },
}

export const revalidate = 86400

const faqData = [
  {
    q: 'What symptoms are common in perimenopause but not menopause?',
    a: 'Perimenopause is characterized by hormonal fluctuation rather than depletion — so symptoms can be more erratic and unpredictable than the steady-state of postmenopause. Common perimenopausal symptoms include: irregular periods (longer, shorter, heavier, lighter, or skipped), mid-cycle spotting, dramatic mood swings tied to cycle phase, migraines that worsen near the period, breast tenderness, and sudden-onset anxiety or panic attacks with no prior history. Hot flashes and sleep disruption are common in both phases.',
  },
  {
    q: 'How is perimenopause diagnosed?',
    a: 'There is no definitive single test. Perimenopause is a clinical diagnosis based on age, symptoms, and menstrual pattern changes. FSH and estradiol blood tests can suggest perimenopausal hormonal changes, but because estrogen fluctuates dramatically during this phase, a single test can look normal even when you are symptomatic. A provider who specializes in menopause will interpret your hormone levels in the context of your symptoms and cycle pattern — not just the lab value alone.',
  },
  {
    q: 'Can you start HRT during perimenopause?',
    a: "Yes. HRT is not exclusively for postmenopause. Many women benefit from hormonal support beginning in perimenopause, when estrogen fluctuations can be as disruptive as eventual estrogen decline. Perimenopausal HRT options include low-dose combined hormonal birth control (which also provides contraception), low-dose HRT patches, or topical estradiol. A menopause specialist can assess your individual situation and recommend the appropriate type and dose.",
  },
  {
    q: 'When do perimenopausal symptoms typically peak?',
    a: "Symptoms often peak in the 1-2 years immediately before the final menstrual period (late perimenopause). Hot flashes and sleep disruption tend to be most severe during this window. However, some women experience the worst symptoms in early perimenopause, when estrogen swings are most dramatic. There is no universal timeline — the range is wide. Symptom severity does not correlate reliably with estrogen levels alone.",
  },
  {
    q: 'At what age should I see a menopause specialist?',
    a: "There is no minimum age. If you are experiencing symptoms that suggest perimenopause — irregular periods, new hot flashes, sleep changes, mood swings, brain fog — at any age from late 30s onward, it is appropriate to seek evaluation. Women under 40 with these symptoms should be evaluated promptly for premature ovarian insufficiency (POI), which has different long-term health implications and requires specific management.",
  },
  {
    q: 'Is perimenopause the same thing as pre-menopause?',
    a: '"Pre-menopause" technically refers to the entire reproductive period before any menopausal transition begins — meaning all of a woman\'s reproductive years. Perimenopause specifically refers to the menopausal transition phase, when hormonal changes begin to occur and symptoms may be present. Most people use "pre-menopause" and "perimenopause" interchangeably in casual conversation, but clinically they are different. If your provider uses "pre-menopause" to mean the transition phase, they are using the informal definition.',
  },
]

export default function PerimenopauseSpecialistPage() {
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

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <nav className="mb-6 flex items-center gap-2 text-sm text-neutral-500">
          <Link href="/" className="hover:text-neutral-800">Home</Link>
          <span>/</span>
          <Link href="/listings" className="hover:text-neutral-800">Find a Provider</Link>
          <span>/</span>
          <span className="text-neutral-800">Perimenopause: When to See a Specialist</span>
        </nav>

        <header className="mb-10">
          <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl leading-tight">
            Perimenopause vs Menopause: When to See a Specialist
          </h1>
          <p className="mt-4 text-neutral-600 leading-relaxed text-lg">
            Perimenopause can start in your late 30s and last a decade. Many women are dismissed
            or misdiagnosed during this phase. Here is what makes perimenopause different from
            menopause — and when a specialist is the right call.
          </p>
        </header>

        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              The menopausal timeline — what each phase means
            </h2>
            <div className="space-y-3">
              {[
                { phase: 'Perimenopause (the transition)', timeline: 'Typically 4–10 years before final period', description: 'Estrogen and progesterone levels begin to fluctuate and gradually decline. Periods become irregular. Symptoms can appear years before periods stop. This phase ends 12 months after the last menstrual period.' },
                { phase: 'Menopause (one day)', timeline: 'The 12-month anniversary of your last period', description: 'Technically a single day. Average age in the US is 51 (range: 45–55). After this point, you are postmenopausal.' },
                { phase: 'Postmenopause (the rest of life)', timeline: 'From the day after menopause onward', description: 'Estrogen has permanently declined. Symptoms that persisted through perimenopause (hot flashes, vaginal dryness, sleep disruption) continue and may stabilize or worsen without treatment.' },
                { phase: 'Surgical menopause (any age)', timeline: 'Immediately after bilateral oophorectomy', description: 'Ovaries removed surgically. Estrogen drops abruptly rather than gradually. Often causes more severe symptoms and carries different long-term health considerations.' },
              ].map((item) => (
                <div key={item.phase} className="rounded-xl border border-neutral-200 bg-white p-5">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <p className="font-semibold text-neutral-900">{item.phase}</p>
                    <span className="text-xs bg-violet-100 text-violet-700 px-2 py-1 rounded-full shrink-0">{item.timeline}</span>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              When to see a specialist (not just your regular doctor)
            </h2>
            <div className="space-y-3">
              {[
                { trigger: 'Symptoms significantly impacting daily function', detail: 'If hot flashes are disrupting sleep multiple nights per week, mood changes are affecting your relationships or work, or brain fog is impacting your job performance — these warrant specialist-level care, not just reassurance.' },
                { trigger: 'Your current provider says HRT is "too risky" without individualized discussion', detail: 'HRT risk-benefit is individual. A blanket refusal based on the 2002 WHI data is not current medicine. A menopause specialist will assess your specific cardiovascular, breast cancer, and clot risk profile.' },
                { trigger: "You're under 45 with symptoms", detail: 'Early perimenopause in your late 30s or early 40s, especially with irregular periods, warrants evaluation for premature ovarian insufficiency (POI). POI has important bone, cardiovascular, and cognitive health implications.' },
                { trigger: 'Surgical menopause at any age', detail: 'Bilateral oophorectomy causes immediate, abrupt estrogen loss — not gradual decline. This requires prompt, often more aggressive hormonal management than natural menopause. Specialist involvement from the start is important.' },
                { trigger: 'Non-hormonal options are not working', detail: 'If you have tried SSRIs, SNRIs, gabapentin, or other non-hormonal options for hot flashes and they are not providing adequate relief, a menopause specialist can assess whether hormonal options are appropriate for you.' },
              ].map((item) => (
                <div key={item.trigger} className="rounded-xl border border-neutral-200 bg-white p-5">
                  <p className="font-semibold text-neutral-800">{item.trigger}</p>
                  <p className="text-sm text-neutral-600 mt-1 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-neutral-900">Frequently Asked Questions</h2>
            {faqData.map((faq) => (
              <div key={faq.q} className="rounded-xl border border-neutral-200 bg-white p-6">
                <h3 className="font-semibold text-neutral-900 mb-2">{faq.q}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="bg-violet-700 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              Find a Perimenopause Specialist Near You
            </h2>
            <p className="text-violet-100 mb-6">
              You do not have to wait until periods stop to get help. Find a menopause-knowledgeable
              provider who understands perimenopause — and is willing to treat it.
            </p>
            <Link
              href="/listings"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 font-semibold text-violet-700 hover:bg-violet-50 transition-colors"
            >
              Browse Menopause Providers <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="pt-8 border-t border-neutral-200">
            <h3 className="text-lg font-semibold text-neutral-800 mb-3">Related Guides</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/guides/perimenopause-vs-menopause" className="text-sm text-violet-700 hover:text-violet-800 font-medium">Perimenopause vs Menopause: Symptoms →</Link>
              <Link href="/guides/menopause-doctor-vs-gynecologist" className="text-sm text-violet-700 hover:text-violet-800 font-medium">Menopause Specialist vs Regular Gynecologist →</Link>
              <Link href="/guides/hrt-doctors-that-take-insurance" className="text-sm text-violet-700 hover:text-violet-800 font-medium">Finding HRT Doctors That Take Insurance →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
