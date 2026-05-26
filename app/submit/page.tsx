import type { Metadata } from 'next'
import { BadgeCheck, Clock, Star } from 'lucide-react'
import SubmitForm from '@/components/SubmitForm'

export const metadata: Metadata = {
  title: 'List Your Practice — Add Your Menopause Specialty',
  description:
    'Add your menopause practice to MenopauseDirectory.co. Free listings available. Verified listings with priority placement start at $149/year.',
}

export default function SubmitPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid lg:grid-cols-5 gap-12">
        {/* Left: form */}
        <div className="lg:col-span-3">
          <h1 className="font-serif text-3xl font-bold text-gray-900 mb-2">
            List Your Practice
          </h1>
          <p className="text-gray-500 mb-8">
            Connect with women who are actively searching for a menopause specialist like you. Free to list, no credit card required.
          </p>
          <SubmitForm />
        </div>

        {/* Right: context */}
        <div className="lg:col-span-2">
          <div className="sticky top-24 space-y-5">
            <div className="bg-brand-cream rounded-2xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Listing Tiers</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Clock size={16} className="text-gray-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Free Listing</p>
                    <p className="text-xs text-gray-500 mt-0.5">Basic profile with your name, specialty, and location. Reviewed and approved within 48 hours.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-plum/10 flex items-center justify-center flex-shrink-0">
                    <BadgeCheck size={16} className="text-brand-plum" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Verified — $149/year</p>
                    <p className="text-xs text-gray-500 mt-0.5">Priority placement in search results, Verified badge, full profile with bio, photo, and direct booking link.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Why List Here?</h3>
              <ul className="space-y-2.5">
                {[
                  'Women actively searching for menopause specialists — high-intent traffic',
                  'The alternative (NAMS portal) is members-only and barely functional',
                  'MSCP credential badge displayed prominently',
                  'HRT prescriber filter sends the right patients directly to you',
                  '$149/year pays for itself with a single new patient',
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <Star size={13} className="text-brand-rose flex-shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-xs text-gray-400 text-center leading-relaxed">
              By submitting, you confirm that the information you provide is accurate and that you are the listed practitioner or an authorized representative.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
