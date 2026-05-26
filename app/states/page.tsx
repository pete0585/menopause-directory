import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { US_STATES } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Browse Menopause Specialists by State | MenopauseDirectory.co',
  description:
    'Find menopause specialists in every US state. Browse HRT-prescribing doctors and MSCP-certified practitioners near you.',
  openGraph: {
    title: 'Browse Menopause Specialists by State',
    description: 'Find menopause specialists in every US state.',
  },
}

function getStateName(abbr: string): string {
  return US_STATES.find((s) => s.abbr === abbr)?.name ?? abbr
}

async function getListingCountsByState(): Promise<Record<string, number>> {
  const supabase = createClient()
  const ranges = [
    [0, 999],
    [1000, 1999],
    [2000, 2999],
    [3000, 3999],
  ]

  const pages = await Promise.all(
    ranges.map(([from, to]) =>
      supabase
        .from('menopause_listings')
        .select('state')
        .eq('is_approved', true)
        .eq('is_active', true)
        .range(from, to)
    )
  )

  const counts: Record<string, number> = {}
  for (const { data } of pages) {
    if (!data) continue
    for (const row of data) {
      if (row.state) {
        counts[row.state] = (counts[row.state] ?? 0) + 1
      }
    }
  }
  return counts
}

async function getCityCountsByState(): Promise<Record<string, number>> {
  const supabase = createClient()
  const { data } = await supabase
    .from('menopause_city_pages')
    .select('state_abbr, state')
  if (!data) return {}

  const counts: Record<string, number> = {}
  for (const row of data) {
    const abbr = (() => {
      const val = row.state_abbr || row.state
      const found = US_STATES.find(
        (s) => s.abbr.toLowerCase() === val?.toLowerCase() || s.name.toLowerCase() === val?.toLowerCase()
      )
      return found?.abbr ?? val
    })()
    if (abbr) counts[abbr] = (counts[abbr] ?? 0) + 1
  }
  return counts
}

export default async function StatesPage() {
  const [listingCounts, cityCounts] = await Promise.all([
    getListingCountsByState(),
    getCityCountsByState(),
  ])

  // Merge all known states from both listing data and city pages
  const allAbbrs = new Set([...Object.keys(listingCounts), ...Object.keys(cityCounts)])

  // Build state list, filter to valid US states
  const stateList = US_STATES.filter((s) => allAbbrs.has(s.abbr))
    .map((s) => ({
      abbr: s.abbr,
      name: s.name,
      listingCount: listingCounts[s.abbr] ?? 0,
      cityCount: cityCounts[s.abbr] ?? 0,
    }))
    .sort((a, b) => a.name.localeCompare(b.name))

  const totalListings = Object.values(listingCounts).reduce((a, b) => a + b, 0)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <nav className="text-sm text-gray-400 mb-4">
          <Link href="/" className="hover:text-gray-600">Home</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-600">Browse by State</span>
        </nav>
        <h1 className="font-serif text-4xl font-bold text-gray-900 mb-3">
          Menopause Specialists by State
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl">
          {totalListings.toLocaleString()} menopause specialists across {stateList.length} states.
          Select your state to find HRT-prescribing doctors, MSCP-certified practitioners, and telehealth options.
        </p>
      </div>

      {/* State grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
        {stateList.map(({ abbr, name, listingCount, cityCount }) => (
          <Link
            key={abbr}
            href={`/listings?state=${abbr}`}
            className="flex items-center justify-between px-5 py-4 bg-white rounded-2xl border border-gray-100 hover:border-brand-plum/30 hover:shadow-md transition-all group"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-serif font-bold text-gray-900 text-lg group-hover:text-brand-plum transition-colors">
                  {name}
                </span>
                <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded font-mono">
                  {abbr}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                {listingCount > 0 && (
                  <span>{listingCount.toLocaleString()} specialist{listingCount !== 1 ? 's' : ''}</span>
                )}
                {cityCount > 0 && (
                  <span>·</span>
                )}
                {cityCount > 0 && (
                  <Link
                    href={`/cities#${abbr.toLowerCase()}`}
                    className="hover:text-brand-plum transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {cityCount} {cityCount === 1 ? 'city' : 'cities'}
                  </Link>
                )}
              </div>
            </div>
            <ArrowRight
              size={18}
              className="text-gray-300 group-hover:text-brand-plum group-hover:translate-x-0.5 transition-all flex-shrink-0"
              aria-hidden="true"
            />
          </Link>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="bg-brand-plum rounded-2xl p-8 text-center text-white">
        <h2 className="font-serif text-2xl font-bold mb-2">
          Are you a menopause specialist?
        </h2>
        <p className="text-white/80 mb-6">
          List your practice for free. Thousands of women are searching for practitioners like you.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/submit"
            className="bg-white text-brand-plum font-semibold px-6 py-3 rounded-full hover:bg-brand-cream transition-colors"
          >
            Add Your Practice Free
          </Link>
          <Link
            href="/cities"
            className="border border-white/40 text-white font-medium px-6 py-3 rounded-full hover:bg-white/10 transition-colors"
          >
            Browse by City
          </Link>
        </div>
      </div>
    </div>
  )
}
