import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Finding Menopause Doctors That Accept Insurance for HRT | MenopauseDirectory.co',
  description:
    'HRT is often covered by insurance — but finding a menopause-knowledgeable provider who accepts your plan takes some strategy. Here is how to navigate insurance and find the right provider.',
  openGraph: {
    title: 'Finding Menopause Doctors That Accept Insurance for HRT',
    description:
      'HRT medications and visits are often covered. Here is how to verify coverage and find an in-network menopause specialist.',
  },
}

export const revalidate = 86400

const faqData = [
  {
    q: 'Does insurance cover hormone replacement therapy (HRT)?',
    a: 'In most cases, yes — partially. HRT medications (estradiol patches, estradiol pills, vaginal estrogen, progesterone) are typically covered by commercial insurance with a prescription, often at the generic tier ($10–$50/month). Provider visits are also usually covered as specialist or primary care visits. What insurance generally does NOT cover: compounded bioidentical hormones from a compounding pharmacy (which are not FDA-approved and not covered as a standard pharmacy benefit), and some newer formulations may require prior authorization.',
  },
  {
    q: 'Why are some menopause specialists cash-pay only?',
    a: "Many of the best menopause specialists — particularly those with MSCP credentials who specialize exclusively in hormonal health — operate as cash-pay or concierge practices. This is partly because insurance reimbursement for comprehensive menopause consultations does not compensate adequately for the time required to do them well (60-90 minute initial visits vs. standard 15-minute slots). If a specialist is cash-pay, ask about superbills — they can provide a detailed invoice that you submit to your insurance for potential out-of-network reimbursement.",
  },
  {
    q: 'How do I find an in-network menopause provider?',
    a: "Call your insurance's member services number and ask: 'Do you have a list of menopause specialists or women's health providers who specialize in perimenopause and menopause?' Standard insurance directories list OB-GYNs but rarely flag which ones are menopause-focused. A better approach: use our directory to find menopause specialists near you, then call their offices to verify which insurance plans they accept. Many in-network OB-GYNs or internists with menopause experience are not listed as 'menopause specialists' in insurance directories.",
  },
  {
    q: 'What does a menopause consultation visit cost without insurance?',
    a: 'Cash-pay menopause consultation visits range from $150 to $400 for an initial 60-90 minute appointment, and $100 to $250 for follow-ups. Telehealth menopause consultations tend to run $100 to $200 per session. Some direct-pay menopause practices offer membership models ($75-150/month) that include unlimited messaging and quarterly appointments — which can be more affordable for ongoing management.',
  },
  {
    q: 'Will my insurance cover compounded bioidentical hormones?',
    a: "Generally no. Compounded hormones (custom-formulated at a compounding pharmacy) are not FDA-approved drugs and are not covered as a standard pharmacy benefit by most insurance plans. FDA-approved bioidentical hormones — like Estrace, Climara patches, or Prometrium (micronized progesterone) — are the same molecular structure as compounded ones and are covered by most plans. Ask your provider to prescribe FDA-approved bioidentical hormones rather than compounded ones if insurance coverage is important to you.",
  },
  {
    q: 'Does Medicare cover menopause care and HRT?',
    a: "Medicare Part B covers medically necessary physician visits for menopause management. Medicare Part D covers FDA-approved HRT medications at the formulary tier appropriate for each drug. However, Medicare does not cover compounded hormones. Women approaching Medicare eligibility (65+) who are still in perimenopause or receiving HRT should check their Part D plan's formulary to confirm their specific medications are covered.",
  },
]

export default function HrtDoctorsInsurancePage() {
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
          <span className="text-neutral-800">HRT and Insurance Coverage</span>
        </nav>

        <header className="mb-10">
          <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl leading-tight">
            Finding Menopause Doctors That Accept Insurance for HRT
          </h1>
          <p className="mt-4 text-neutral-600 leading-relaxed text-lg">
            HRT visits and medications are often covered by insurance — but finding a
            menopause-knowledgeable provider who accepts your plan takes some navigation. Here
            is what to know and how to find the right doctor.
          </p>
        </header>

        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              What insurance typically covers — and what it does not
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-neutral-200 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-violet-700 text-white">
                    <th className="text-left px-4 py-3 font-semibold">Item</th>
                    <th className="text-left px-4 py-3 font-semibold">Typically Covered</th>
                    <th className="text-left px-4 py-3 font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { item: 'OB-GYN or PCP menopause visit', covered: 'Yes', notes: 'Standard specialist copay applies' },
                    { item: 'Estradiol patches (generic)', covered: 'Yes (Tier 1-2)', notes: 'Usually $10-40/month with copay' },
                    { item: 'Oral estradiol (generic Estrace)', covered: 'Yes (Tier 1)', notes: 'Often $5-15/month' },
                    { item: 'Vaginal estrogen (Estrace cream, Vagifem)', covered: 'Usually yes', notes: 'May need PA for branded versions' },
                    { item: 'Micronized progesterone (Prometrium)', covered: 'Usually yes', notes: 'Generic often covered' },
                    { item: 'Compounded bioidentical hormones', covered: 'No', notes: 'Not FDA-approved; not a standard benefit' },
                    { item: 'Hormone blood testing', covered: 'Usually yes', notes: 'Medical necessity must be documented' },
                    { item: 'Telehealth menopause visit', covered: 'Often yes (post-COVID)', notes: 'Verify with your plan' },
                  ].map((row, i) => (
                    <tr key={row.item} className={i % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                      <td className="px-4 py-3 font-medium text-neutral-800">{row.item}</td>
                      <td className="px-4 py-3 text-neutral-600">{row.covered}</td>
                      <td className="px-4 py-3 text-neutral-500 text-xs">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              How to find an in-network menopause specialist
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              Insurance directories rarely flag which providers specialize in menopause. The most
              reliable approach:
            </p>
            <ol className="space-y-3">
              {[
                'Search our directory for menopause specialists in your area.',
                "Call the office directly: 'Do you accept [insurance plan]? Do you have providers who specialize in perimenopause and HRT?'",
                'If they are out-of-network, ask for a superbill — you can submit for out-of-network reimbursement.',
                'Ask your current OB-GYN or primary care physician for a referral to a colleague who specializes in menopause.',
                'Check The Menopause Society (NAMS) provider finder at menopause.org for MSCP-certified providers near you.',
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-neutral-600">
                  <span className="font-bold text-violet-600 shrink-0 mt-0.5">{i + 1}.</span>
                  <span className="text-sm leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              When cash-pay may be worth it
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              Many of the most experienced menopause specialists operate cash-pay practices because
              insurance reimbursement does not support the 60-90 minute consultations proper menopause
              care requires. If your in-network options are not working:
            </p>
            <div className="space-y-3">
              {[
                { option: 'Superbill reimbursement', detail: 'Ask the cash-pay specialist for a superbill. Submit to your insurance for out-of-network benefits. Reimbursement varies — typically 50-80% of "reasonable and customary" rates after your out-of-network deductible.' },
                { option: 'HSA/FSA funds', detail: 'Medical visits for menopause management are HSA/FSA-eligible. Prescription HRT is also HSA/FSA eligible. This effectively reduces your out-of-pocket cost by your marginal tax rate (often 22-30%).' },
                { option: 'Telehealth concierge menopause services', detail: 'Platforms like Midi Health, Alloy, Gennev, and others offer telehealth menopause care at $100-200/month, including HRT prescriptions. Some accept insurance; most have transparent cash-pay pricing.' },
              ].map((item) => (
                <div key={item.option} className="rounded-xl border border-neutral-200 bg-white p-5">
                  <p className="font-semibold text-neutral-800">{item.option}</p>
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
              Find a Menopause Provider Near You
            </h2>
            <p className="text-violet-100 mb-6">
              Browse our directory and filter by insurance acceptance, telehealth, and location
              to find a menopause specialist who works with your plan.
            </p>
            <Link
              href="/listings"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 font-semibold text-violet-700 hover:bg-violet-50 transition-colors"
            >
              Browse Providers Near Me <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="pt-8 border-t border-neutral-200">
            <h3 className="text-lg font-semibold text-neutral-800 mb-3">Related Guides</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/guides/menopause-doctor-vs-gynecologist" className="text-sm text-violet-700 hover:text-violet-800 font-medium">Menopause Specialist vs Gynecologist →</Link>
              <Link href="/guides/bioidentical-vs-conventional-hrt" className="text-sm text-violet-700 hover:text-violet-800 font-medium">Bioidentical vs Conventional HRT →</Link>
              <Link href="/guides/what-is-mscp" className="text-sm text-violet-700 hover:text-violet-800 font-medium">What Is an MSCP? →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
