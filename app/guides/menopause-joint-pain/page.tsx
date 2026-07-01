import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: "Menopause and Joint Pain: What's the Connection? | MenopauseDirectory.co",
  description:
    "Joint pain and stiffness are among the most underrecognized menopause symptoms — and one of the most responsive to hormone therapy. Here is what's happening and what actually helps.",
  openGraph: {
    title: 'Menopause and Joint Pain: The Estrogen Connection',
    description:
      "Joint pain in perimenopause is real and common — and one of the most underrecognized menopause symptoms. Here is what the research says.",
  },
}

const faqData = [
  {
    q: 'Is joint pain a normal menopause symptom?',
    a: "Yes. Joint pain, stiffness, and aching — sometimes called 'menopause arthralgia' — is one of the most commonly reported but least publicized menopause symptoms. Large-scale studies including the Study of Women's Health Across the Nation (SWAN) found that joint pain increases significantly during perimenopause and early postmenopause. It affects an estimated 50-60% of perimenopausal women. It is not 'just aging' — estrogen decline specifically drives joint inflammation and changes in connective tissue.",
  },
  {
    q: 'Does hormone therapy help with menopause joint pain?',
    a: "Evidence suggests yes — estrogen has anti-inflammatory properties and estrogen receptors are present in joint cartilage, synovial membrane, and surrounding connective tissue. Observational data from the Women's Health Initiative and other studies found that women on HRT reported less joint pain than non-users. Randomized controlled trials have shown improvements in joint stiffness and pain with HRT, particularly in the hands and knees. If joint pain is part of your symptom picture, it is worth discussing with your menopause provider as a specific indication for treatment.",
  },
  {
    q: 'How do I know if my joint pain is from menopause or arthritis?',
    a: "Menopause-related joint pain tends to be bilateral and migratory — moving between joints, affecting multiple joints, and occurring without significant swelling or warmth. It is often worse in the morning and improves with movement. Rheumatoid arthritis, by contrast, typically involves more significant swelling, warmth, and persistent morning stiffness, and shows on bloodwork (elevated CRP, positive anti-CCP or rheumatoid factor). If you have significant joint swelling, warmth, or progressive joint damage on imaging, evaluation by a rheumatologist alongside a menopause specialist is appropriate.",
  },
  {
    q: 'What non-hormonal options help with menopause joint pain?',
    a: "Resistance training is the highest-evidence non-hormonal approach — it builds muscle around joints, reduces inflammation, and improves insulin sensitivity (which affects joint health). Omega-3 fatty acids (2-3g EPA+DHA daily from fish oil) have good evidence for reducing inflammatory joint symptoms. Maintaining a healthy weight reduces mechanical load on weight-bearing joints. Anti-inflammatory diets (Mediterranean-style, reducing processed foods and refined carbohydrates) have moderate evidence. NSAIDs provide symptomatic relief but don't address the hormonal root cause. Collagen peptide supplementation has emerging evidence for joint connective tissue support.",
  },
]

export default function MenopauseJointPainPage() {
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
          <span className="text-gray-600">Menopause and Joint Pain</span>
        </nav>

        <header className="mb-10">
          <h1 className="font-serif text-4xl font-bold text-gray-900 leading-tight sm:text-5xl text-balance">
            Menopause and Joint Pain: The Estrogen Connection
          </h1>
          <p className="mt-4 text-xl text-gray-600 leading-relaxed">
            Waking up with stiff, aching hands. Knees that protest going down stairs. A back that
            didn&apos;t used to complain. Joint pain is one of the most common — and most underrecognized —
            symptoms of perimenopause. And unlike most symptoms, it often gets attributed to aging rather
            than hormones. Here is what is actually happening and what the evidence says.
          </p>
        </header>

        <div className="space-y-10 text-gray-600 leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
              Why estrogen protects your joints
            </h2>
            <p className="mb-4">
              Estrogen is not just a reproductive hormone — it is a systemic anti-inflammatory agent
              with receptors throughout the musculoskeletal system. Estrogen receptors have been
              identified in joint cartilage, synovial membrane (the tissue lining joints), bone,
              and surrounding connective tissue. Estrogen&apos;s roles in joint health include:
            </p>
            <div className="space-y-4">
              {[
                {
                  title: 'Cartilage maintenance',
                  detail: "Estrogen promotes the production of proteoglycans — the molecules that keep cartilage hydrated and cushioning. When estrogen declines, cartilage can become thinner and more prone to degradation. Studies using MRI have documented measurable cartilage volume loss in the years around menopause.",
                },
                {
                  title: 'Inflammation regulation',
                  detail: "Estrogen suppresses the production of pro-inflammatory cytokines including IL-1, IL-6, and TNF-alpha — the same cytokines that drive joint inflammation in conditions like rheumatoid arthritis. As estrogen declines, this protective effect diminishes, and joint inflammation increases.",
                },
                {
                  title: 'Synovial fluid production',
                  detail: "Synovial fluid lubricates joints and transports nutrients to cartilage. Estrogen supports the cells (synoviocytes) that produce this fluid. Declining estrogen can reduce synovial fluid quality and quantity, contributing to joint stiffness — particularly noticeable as morning stiffness.",
                },
                {
                  title: 'Connective tissue integrity',
                  detail: "Estrogen supports collagen production throughout the body. Declining estrogen accelerates collagen loss in tendons and ligaments, contributing to joint instability and a subjective sense of joints feeling 'looser' or less stable.",
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
              What menopause joint pain feels like
            </h2>
            <p className="mb-4">
              Menopause-related joint pain has a recognizable pattern that distinguishes it from
              classical osteoarthritis or rheumatoid arthritis:
            </p>
            <div className="space-y-3">
              {[
                {
                  feature: 'Bilateral and symmetric',
                  detail: 'Affects both hands, both knees, or both hips simultaneously — rather than one side only',
                },
                {
                  feature: 'Migratory',
                  detail: 'Pain moves between joints over time — one week the hands, next the knees, then the shoulders',
                },
                {
                  feature: 'Morning stiffness that improves',
                  detail: 'Joints are stiffer and more painful in the morning and typically improve with movement and warming up',
                },
                {
                  feature: 'Without significant swelling',
                  detail: "Joint pain without the prominent swelling, warmth, and redness typical of inflammatory arthritis — though some mild swelling can occur",
                },
                {
                  feature: 'In the hands and small joints',
                  detail: 'Finger joints, wrists, and knuckles are very commonly affected — often mistaken for early osteoarthritis',
                },
              ].map((item) => (
                <div key={item.feature} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                  <p className="font-semibold text-gray-800 text-sm">{item.feature}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
              What the research says about HRT and joint health
            </h2>
            <p className="mb-4">
              The evidence for hormone therapy&apos;s benefit on joint pain is consistent across
              observational and randomized data. Women on HRT consistently report less joint pain
              than non-users at similar stages of menopause. In the Women&apos;s Health Initiative (WHI)
              study — which has been widely cited for its findings on breast cancer risk — women on
              HRT reported significantly less joint pain, stiffness, and physical limitation than
              those on placebo.
            </p>
            <p className="mb-4">
              Randomized controlled trials of transdermal estradiol have shown improvements in
              joint pain scores, particularly in the hands. The effect is typically noticed within
              3-6 months of starting HRT. For women whose primary motivation for avoiding HRT has
              been concerns about breast cancer, understanding the full risk-benefit picture —
              including the protective effects on joints, bones, and cardiovascular health — is
              important context for the conversation with your provider.
            </p>
            <p>
              The timing of HRT initiation matters for joint health as it does for cardiovascular
              and cognitive benefits: starting earlier in the menopause transition appears to
              provide more protection than starting years into postmenopause.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
              Approaches to menopause joint pain
            </h2>
            <div className="space-y-4">
              {[
                {
                  approach: 'Hormone therapy',
                  evidence: 'STRONG',
                  detail: "The most effective intervention for hormonally-driven joint pain. Transdermal estradiol (patches or gel) is preferred by many providers for joint symptoms due to stable delivery and avoidance of first-pass liver metabolism.",
                },
                {
                  approach: 'Resistance training',
                  evidence: 'STRONG',
                  detail: "Builds muscle around joints, reduces mechanical load, improves insulin sensitivity (which reduces systemic inflammation), and increases BDNF and other protective factors. Twice-weekly full-body strength training is the minimum effective dose.",
                },
                {
                  approach: 'Omega-3 fatty acids',
                  evidence: 'MODERATE',
                  detail: "EPA and DHA reduce pro-inflammatory cytokine production. 2-3g combined EPA+DHA daily from fish oil is the therapeutic dose used in clinical studies. Effects on joint symptoms typically develop over 8-12 weeks.",
                },
                {
                  approach: 'Weight management',
                  evidence: 'STRONG for weight-bearing joints',
                  detail: "Each pound of excess weight adds approximately 4 pounds of force on knee joints. Weight loss has a direct, mechanical benefit for knee and hip pain — and reduces systemic inflammation.",
                },
                {
                  approach: 'Anti-inflammatory diet',
                  evidence: 'MODERATE',
                  detail: "Reducing ultra-processed foods, refined carbohydrates, and seed oils while increasing vegetables, fatty fish, and olive oil reduces systemic inflammatory markers. The Mediterranean dietary pattern has the most evidence.",
                },
              ].map(({ approach, evidence, detail }) => (
                <div key={approach} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-gray-800">{approach}</p>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      evidence.startsWith('STRONG') ? 'bg-green-50 text-green-700' :
                      'bg-yellow-50 text-yellow-700'
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
              When to see a rheumatologist
            </h2>
            <p className="mb-4">
              Menopause-related joint pain is distinct from inflammatory arthritis — but they can
              coexist, and perimenopause is also the age when rheumatoid arthritis commonly develops
              in women (peak onset 40-60). If you have:
            </p>
            <div className="bg-pink-50 rounded-xl p-5">
              <ul className="space-y-2">
                {[
                  "Significant joint swelling with warmth and redness",
                  "Morning stiffness lasting more than 60 minutes",
                  "Positive rheumatoid factor, anti-CCP, or elevated inflammatory markers on bloodwork",
                  "Rapid joint damage or severe pain out of proportion to symptoms",
                  "Symptoms not improving with menopause treatment",
                ].map((sign) => (
                  <li key={sign} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-pink-500 mt-0.5">→</span>
                    <span>{sign}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-4">
              ...evaluation by a rheumatologist is appropriate alongside your menopause care. The
              conditions are not mutually exclusive, and both can benefit from early treatment.
            </p>
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
            Find a menopause specialist who takes joint pain seriously
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Joint pain is a legitimate indication for menopause treatment. Find a provider who
            will assess your full symptom picture — not just hot flashes.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/listings" className="inline-flex items-center gap-2 bg-pink-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-pink-700">
              Find a Menopause Specialist <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/guides/is-hrt-safe" className="text-sm text-pink-600 hover:text-pink-700 font-medium self-center">Is HRT Safe? →</Link>
            <Link href="/guides/menopause-weight-gain" className="text-sm text-pink-600 hover:text-pink-700 font-medium self-center">Menopause and Weight Gain →</Link>
          </div>
        </div>
      </article>
    </>
  )
}
