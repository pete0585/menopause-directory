import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Do You Need a Menopause Specialist or Your Regular Gynecologist? | MenopauseDirectory.co',
  description:
    'Many gynecologists have limited menopause training. A menopause specialist (MSCP or NAMS-certified) has deeper expertise in HRT, perimenopause, and long-term hormonal health. Here is when to seek a specialist.',
  openGraph: {
    title: 'Menopause Specialist vs Gynecologist: Which Do You Need?',
    description:
      'Your regular OB-GYN may not be enough. Here is what a menopause specialist brings that most gynecologists do not.',
  },
}

export const revalidate = 86400

const faqData = [
  {
    q: 'What is a menopause specialist?',
    a: "A menopause specialist is a physician, NP, or CNM with advanced training in perimenopause and menopause management — including hormone therapy, non-hormonal treatment options, and the long-term health implications of estrogen decline. Many menopause specialists hold credentials from the Menopause Society (formerly NAMS): the MSCP designation (Menopause Society Certified Practitioner). This is the gold standard in menopause care.",
  },
  {
    q: 'Why would my gynecologist not know enough about menopause?',
    a: "Obstetrics and gynecology training focuses heavily on reproductive care — pregnancy, birth, and fertility. Menopause management is a relatively small part of OB-GYN residency. Surveys consistently show that most OB-GYNs feel undertrained in menopause care. A 2019 survey found that only 20% of OB-GYN residency programs offered a dedicated menopause curriculum. This does not mean your gynecologist can't help — it means you should evaluate whether their comfort level with HRT and menopause symptoms matches what you need.",
  },
  {
    q: 'Can my primary care doctor manage my menopause?',
    a: "Yes — if they have menopause-specific knowledge. Some internists and family practice physicians are highly skilled in menopause care, particularly those who have sought additional training or MSCP certification. The credential and the comfort level matter more than the specialty. If your primary care physician is prescribing HRT based on the 2002 WHI study without discussing updated evidence (2024 guidance from The Menopause Society), that is a signal to look for someone with more current training.",
  },
  {
    q: 'What does an MSCP credential mean?',
    a: "The MSCP (Menopause Society Certified Practitioner) is the certification from The Menopause Society (NAMS). It requires passing a comprehensive exam on menopause science and management. MSCPs include gynecologists, internists, family medicine physicians, NPs, and CNMs. The credential signals that this provider has made menopause care a specialty area and passed a rigorous knowledge assessment. It is not the only way to find a good menopause provider, but it is a reliable signal.",
  },
  {
    q: 'How do I know if my current doctor is menopause-knowledgeable?',
    a: "Ask these questions at your appointment: 'Are you comfortable prescribing body-identical hormone therapy?' 'What is your general approach to HRT for perimenopausal symptoms?' 'Do you follow The Menopause Society's 2022 Position Statement on HRT?' A provider who dismisses HRT based on outdated WHI data, refuses to discuss estrogen options, or tells you to 'just wait it out' without discussing modern evidence is not current in menopause care.",
  },
  {
    q: 'When should I definitely see a menopause specialist?',
    a: "Seek a menopause specialist if: your symptoms are significantly impacting your quality of life and your current provider is not offering effective options; you have been told you are not a 'candidate' for HRT without detailed discussion of your risk profile; you have surgical menopause and need immediate, aggressive hormonal support; you are under 45 with premature ovarian insufficiency (POI); or your current provider seems uncertain or dismissive about menopause treatment.",
  },
]

export default function MenopauseDoctorVsGynecologistPage() {
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
        <nav className="mb-6 flex items-center gap-2 text-sm text-neutral-500 text-sm">
          <Link href="/" className="hover:text-neutral-800">Home</Link>
          <span>/</span>
          <Link href="/listings" className="hover:text-neutral-800">Find a Provider</Link>
          <span>/</span>
          <span className="text-neutral-800">Menopause Specialist vs Gynecologist</span>
        </nav>

        <header className="mb-10">
          <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl leading-tight">
            Do You Need a Menopause Specialist or Your Regular Gynecologist?
          </h1>
          <p className="mt-4 text-neutral-600 leading-relaxed text-lg">
            Most gynecologists have limited menopause training. A menopause specialist brings
            deeper expertise in HRT, perimenopause, and long-term hormonal health. Here is how
            to know which level of care you need.
          </p>
        </header>

        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              What separates menopause specialists from general gynecologists
            </h2>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border border-neutral-200 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-violet-700 text-white">
                    <th className="text-left px-4 py-3 font-semibold">Factor</th>
                    <th className="text-left px-4 py-3 font-semibold">General OB-GYN</th>
                    <th className="text-left px-4 py-3 font-semibold">Menopause Specialist</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { factor: 'Menopause training', gyn: 'Limited (varies widely)', specialist: 'Core focus — dedicated training' },
                    { factor: 'HRT comfort level', gyn: 'Often conservative', specialist: 'Evidence-based, individualized' },
                    { factor: 'Credential options', gyn: 'MD/DO in OB-GYN', specialist: 'MSCP (Menopause Society Certified)' },
                    { factor: 'Perimenopause management', gyn: 'May not recognize early signs', specialist: 'Specialty area' },
                    { factor: 'Non-hormonal options', gyn: 'May offer limited choices', specialist: 'Comprehensive treatment menu' },
                    { factor: 'Latest evidence', gyn: 'Varies by individual', specialist: 'Follows Menopause Society guidelines' },
                  ].map((row, i) => (
                    <tr key={row.factor} className={i % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                      <td className="px-4 py-3 font-medium text-neutral-800">{row.factor}</td>
                      <td className="px-4 py-3 text-neutral-600">{row.gyn}</td>
                      <td className="px-4 py-3 text-neutral-600">{row.specialist}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              Signs your current provider may not be the right fit
            </h2>
            <div className="space-y-3">
              {[
                { sign: 'Dismisses your symptoms as "just menopause"', detail: 'Menopause symptoms — hot flashes, sleep disruption, mood changes, brain fog, joint pain — are real, measurable, and treatable. If your provider is minimizing them without offering solutions, that is a red flag.' },
                { sign: 'Refuses to discuss HRT based on old data', detail: 'Many physicians still cite the 2002 Women\'s Health Initiative to refuse HRT for healthy, symptomatic women. The medical consensus has substantially shifted since then. If your provider says HRT is too dangerous without discussing your individual risk profile, get a second opinion.' },
                { sign: "Tells you to 'just wait it out'", detail: 'Perimenopause and menopause can last 5–15+ years. "Waiting it out" is not a care plan. If that is the only option offered, you deserve a provider who has more to offer.' },
                { sign: 'Unfamiliar with body-identical hormones', detail: "Body-identical (bioidentical, FDA-approved) hormones like estradiol patches and micronized progesterone have a different risk profile than the synthetic hormones studied in the WHI. If your provider doesn't know the difference, they're not current." },
              ].map((item) => (
                <div key={item.sign} className="rounded-xl border border-neutral-200 bg-white p-5">
                  <p className="font-semibold text-neutral-800">{item.sign}</p>
                  <p className="text-sm text-neutral-600 mt-1 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              How to find a menopause-knowledgeable provider
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              The Menopause Society (formerly NAMS) maintains a directory of MSCPs — providers who
              have passed the Menopause Society&apos;s certification exam. But a formal credential is
              not the only signal. Many excellent menopause providers have not sat for the MSCP exam
              but have built substantial clinical experience in hormonal health.
            </p>
            <p className="text-neutral-600 leading-relaxed">
              Our directory focuses on practitioners who specialize in menopause and perimenopause
              care — not general OB-GYNs who see menopause as a small part of their practice.
              Filter by location to find a specialist near you.
            </p>
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
              Find a Menopause Specialist Near You
            </h2>
            <p className="text-violet-100 mb-6">
              Search our directory of menopause-focused providers by location. Filter by
              telehealth, insurance acceptance, and specialization.
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
              <Link href="/guides/what-is-mscp" className="text-sm text-violet-700 hover:text-violet-800 font-medium">What Is an MSCP? →</Link>
              <Link href="/guides/hrt-doctors-that-take-insurance" className="text-sm text-violet-700 hover:text-violet-800 font-medium">Finding HRT Doctors That Accept Insurance →</Link>
              <Link href="/guides/perimenopause-vs-menopause" className="text-sm text-violet-700 hover:text-violet-800 font-medium">Perimenopause vs Menopause →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
