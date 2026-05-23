'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { PractitionerType } from '@/lib/types'

const PRACTITIONER_FILTERS: { value: PractitionerType; label: string }[] = [
  { value: 'obgyn', label: 'OB-GYN' },
  { value: 'np', label: 'Nurse Practitioner' },
  { value: 'functional_medicine', label: 'Functional Medicine' },
  { value: 'pelvic_floor_pt', label: 'Pelvic Floor PT' },
  { value: 'coach', label: 'Menopause Coach' },
  { value: 'endocrinologist', label: 'Endocrinologist' },
  { value: 'pa', label: 'Physician Assistant' },
  { value: 'internist', label: 'Internal Medicine' },
]

export default function FilterSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(name, value)
      } else {
        params.delete(name)
      }
      return params.toString()
    },
    [searchParams]
  )

  function toggleParam(name: string, value: string) {
    const current = searchParams.get(name)
    const next = current === value ? '' : value
    router.push(pathname + '?' + createQueryString(name, next))
  }

  function toggleBoolean(name: string) {
    const current = searchParams.get(name)
    const next = current === 'true' ? '' : 'true'
    router.push(pathname + '?' + createQueryString(name, next))
  }

  function clearAll() {
    const params = new URLSearchParams()
    const city = searchParams.get('city')
    if (city) params.set('city', city)
    router.push(pathname + '?' + params.toString())
  }

  const hasFilters = ['practitioner_type', 'mscp_certified', 'accepts_telehealth', 'accepting_new_patients', 'hrt_prescriber']
    .some((k) => searchParams.has(k))

  const activeType = searchParams.get('practitioner_type')

  return (
    <aside className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-900 text-sm uppercase tracking-wider">Filter Results</h2>
        {hasFilters && (
          <button
            onClick={clearAll}
            className="text-xs text-brand-rose hover:text-brand-rose-dark flex items-center gap-1"
          >
            <X size={12} />
            Clear filters
          </button>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Provider Type</h3>
          <div className="space-y-2">
            {PRACTITIONER_FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => toggleParam('practitioner_type', f.value)}
                className={cn(
                  'w-full text-left text-sm px-3 py-2 rounded-lg transition-colors',
                  activeType === f.value
                    ? 'bg-brand-plum text-white font-medium'
                    : 'text-gray-700 hover:bg-brand-cream-dark'
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Credentials & Care</h3>
          <div className="space-y-2">
            {[
              { key: 'mscp_certified', label: 'MSCP Certified' },
              { key: 'hrt_prescriber', label: 'Prescribes HRT' },
              { key: 'accepts_telehealth', label: 'Telehealth Available' },
              { key: 'accepting_new_patients', label: 'Accepting New Patients' },
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={searchParams.get(key) === 'true'}
                  onChange={() => toggleBoolean(key)}
                  className="w-4 h-4 rounded border-gray-300 text-brand-plum focus:ring-brand-plum/30 cursor-pointer"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">{label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}
