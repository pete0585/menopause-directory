'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'
import { Search, MapPin, ChevronDown } from 'lucide-react'
import { PRACTITIONER_TYPE_LABELS } from '@/lib/utils'
import type { PractitionerType } from '@/lib/types'

interface SearchBarProps {
  variant?: 'hero' | 'compact'
}

const PRACTITIONER_OPTIONS: { value: PractitionerType | ''; label: string }[] = [
  { value: '', label: 'All Specialists' },
  { value: 'obgyn', label: 'OB-GYN' },
  { value: 'np', label: 'Nurse Practitioner' },
  { value: 'functional_medicine', label: 'Functional Medicine' },
  { value: 'pelvic_floor_pt', label: 'Pelvic Floor PT' },
  { value: 'coach', label: 'Menopause Coach' },
  { value: 'endocrinologist', label: 'Endocrinologist' },
]

export default function SearchBar({ variant = 'hero' }: SearchBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const [location, setLocation] = useState(searchParams.get('city') ?? '')
  const [type, setType] = useState(searchParams.get('practitioner_type') ?? '')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (location.trim()) params.set('city', location.trim())
    if (type) params.set('practitioner_type', type)
    startTransition(() => {
      router.push(`/listings?${params.toString()}`)
    })
  }

  if (variant === 'compact') {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City or state"
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-plum/30 focus:border-brand-plum"
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="bg-brand-plum text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-plum-dark transition-colors disabled:opacity-60"
        >
          <Search size={16} />
        </button>
      </form>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-xl border border-gray-100 p-2 flex flex-col sm:flex-row gap-2"
    >
      <div className="relative flex-1">
        <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-rose" />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="City, state, or zip code"
          className="w-full pl-11 pr-4 py-4 text-base text-gray-800 placeholder:text-gray-400 focus:outline-none rounded-xl"
        />
      </div>

      <div className="h-px sm:h-auto sm:w-px bg-gray-100 mx-1" />

      <div className="relative flex-1">
        <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full pl-4 pr-10 py-4 text-base text-gray-800 appearance-none focus:outline-none rounded-xl bg-transparent"
        >
          {PRACTITIONER_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="bg-brand-plum hover:bg-brand-plum-dark text-white font-semibold px-8 py-4 rounded-xl transition-colors disabled:opacity-60 flex items-center gap-2 justify-center"
      >
        <Search size={18} />
        <span>Search</span>
      </button>
    </form>
  )
}
