'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { X, SlidersHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'
import { US_STATES } from '@/lib/utils'
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

const INSURANCE_OPTIONS = [
  'Aetna',
  'Blue Cross Blue Shield',
  'Cigna',
  'Humana',
  'Kaiser Permanente',
  'Medicaid',
  'Medicare',
  'Tricare',
  'United Healthcare',
]

interface FilterSidebarProps {
  onClose?: () => void
  mobile?: boolean
}

export default function FilterSidebar({ onClose, mobile = false }: FilterSidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updateFilter = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value === null || value === '') {
        params.delete(key)
      } else {
        params.set(key, value)
      }
      router.push(`${pathname}?${params.toString()}`)
    },
    [router, pathname, searchParams],
  )

  const clearAll = useCallback(() => {
    const params = new URLSearchParams()
    const city = searchParams.get('city')
    if (city) params.set('city', city)
    router.push(`${pathname}?${params.toString()}`)
  }, [router, pathname, searchParams])

  const hasFilters = [
    'state',
    'practitioner_type',
    'mscp_certified',
    'hrt_prescriber',
    'accepts_telehealth',
    'accepting_new_patients',
    'isswsh_member',
    'insurance',
  ].some((k) => searchParams.has(k))

  const activeType = searchParams.get('practitioner_type')

  return (
    <aside className={mobile ? 'p-4' : 'w-full'}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-gray-400" />
          <span className="font-semibold text-gray-900 text-sm uppercase tracking-wider">Filter Results</span>
        </div>
        <div className="flex gap-2">
          {hasFilters && (
            <button
              onClick={clearAll}
              className="text-xs text-brand-rose hover:text-brand-rose-dark flex items-center gap-1"
            >
              <X size={12} />
              Clear filters
            </button>
          )}
          {onClose && (
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {/* State */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">State</h3>
          <select
            value={searchParams.get('state') ?? ''}
            onChange={(e) => updateFilter('state', e.target.value || null)}
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-plum/30"
          >
            <option value="">All states</option>
            {US_STATES.map((s) => (
              <option key={s.abbr} value={s.abbr}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Provider Type */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Provider Type</h3>
          <div className="space-y-2">
            {PRACTITIONER_FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => updateFilter('practitioner_type', activeType === f.value ? null : f.value)}
                className={cn(
                  'w-full text-left text-sm px-3 py-2 rounded-lg transition-colors',
                  activeType === f.value
                    ? 'bg-brand-plum text-white font-medium'
                    : 'text-gray-700 hover:bg-brand-cream-dark',
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Credentials & Care */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Credentials & Care</h3>
          <div className="space-y-2">
            {[
              { key: 'mscp_certified', label: 'MSCP Certified' },
              { key: 'hrt_prescriber', label: 'Prescribes HRT' },
              { key: 'isswsh_member', label: 'ISSWSH Member' },
              { key: 'accepts_telehealth', label: 'Telehealth Available' },
              { key: 'accepting_new_patients', label: 'Accepting New Patients' },
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={searchParams.get(key) === 'true'}
                  onChange={(e) => updateFilter(key, e.target.checked ? 'true' : null)}
                  className="w-4 h-4 rounded border-gray-300 text-brand-plum focus:ring-brand-plum/30 cursor-pointer"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Insurance */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Insurance Accepted</h3>
          <select
            value={searchParams.get('insurance') ?? ''}
            onChange={(e) => updateFilter('insurance', e.target.value || null)}
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-plum/30"
          >
            <option value="">Any insurance</option>
            {INSURANCE_OPTIONS.map((ins) => (
              <option key={ins} value={ins}>
                {ins}
              </option>
            ))}
          </select>
        </div>
      </div>
    </aside>
  )
}
