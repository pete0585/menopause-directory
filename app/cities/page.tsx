import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { US_STATES } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Browse Menopause Specialists by City | MenopauseDirectory.co',
  description:
    'Find menopause specialists, HRT-prescribing doctors, and MSCP-certified practitioners near you. Browse cities across all 50 states.',
  openGraph: {
    title: 'Browse Menopause Specialists by City',
    description:
      'Find menopause specialists near you. Browse cities across all US states.',
  },
}

interface CityPage {
  slug: string
  city: string
  state: string
  state_abbr: string
}

function normalizeState(stateValue: string): { abbr: string; name: string } {
  const found = US_STATES.find(
    (s) =>
      s.abbr.toLowerCase() === stateValue.toLowerCase() ||
      s.name.toLowerCase() === stateValue.toLowerCase()
  )
  if (found) return { abbr: found.abbr, name: found.name }
  // Unknown value (e.g. 'ON' for Ontario) — return as-is
  return { abbr: stateValue, name: stateValue }
}

async function getCityPages(): Promise<CityPage[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('menopause_city_pages')
    .select('slug, city, state, state_abbr')
    .order('slug', { ascending: true })
  return (data as CityPage[]) ?? []
}

export default async function CitiesPage() {
  const cityPages = await getCityPages()

  // Normalize states and deduplicate cities
  const stateMap = new Map<string, { abbr: string; name: string; cities: Map<string, string> }>()

  for (const page of cityPages) {
    const stateValue = page.state_abbr || page.state
    const normalized = normalizeState(stateValue)
    const key = normalized.name

    if (!stateMap.has(key)) {
      stateMap.set(key, { abbr: normalized.abbr, name: normalized.name, cities: new Map() })
    }
    const stateEntry = stateMap.get(key)!
    // Deduplicate by city name — slugs already sorted ascending so abbr slug wins
    if (!stateEntry.cities.has(page.city)) {
      stateEntry.cities.set(page.city, page.slug)
    }
  }

  // Sort states alphabetically; sort cities within each state
  const sortedStates = Array.from(stateMap.values())
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((s) => ({
      ...s,
      cityList: Array.from(s.cities.entries())
        .map(([city, slug]) => ({ city, slug }))
        .sort((a, b) => a.city.localeCompare(b.city)),
    }))

  const totalCities = sortedStates.reduce((n, s) => n + s.cityList.length, 0)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <nav className="text-sm text-gray-400 mb-4">
          <Link href="/" className="hover:text-gray-600">Home</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-600">Browse by City</span>
        </nav>
        <h1 className="font-serif text-4xl font-bold text-gray-900 mb-3">
          Browse Menopause Specialists by City
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl">
          {totalCities} cities across {sortedStates.length} states. Find a menopause specialist,
          HRT-prescribing doctor, or MSCP-certified practitioner near you.
        </p>
      </div>

      {/* State sections */}
      <div className="space-y-10">
        {sortedStates.map(({ abbr, name, cityList }) => (
          <section key={abbr} id={abbr.toLowerCase()}>
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
              <h2 className="font-serif text-2xl font-bold text-gray-900">{name}</h2>
              <span className="text-xs font-semibold text-brand-plum bg-brand-plum/8 px-2 py-0.5 rounded-full">
                {abbr}
              </span>
              <span className="text-sm text-gray-400">
                {cityList.length} {cityList.length === 1 ? 'city' : 'cities'}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5">
              {cityList.map(({ city, slug }) => (
                <Link
                  key={slug}
                  href={`/menopause-doctors/${slug}`}
                  className="flex items-center gap-1.5 px-3 py-2.5 bg-white rounded-xl border border-gray-100 hover:border-brand-plum/30 hover:shadow-sm hover:bg-brand-cream transition-all text-sm text-gray-700 hover:text-brand-plum group"
                >
                  <MapPin
                    size={12}
                    className="text-brand-rose group-hover:text-brand-plum flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="truncate">{city}</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 bg-brand-cream rounded-2xl p-8 text-center">
        <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">
          Don't see your city?
        </h2>
        <p className="text-gray-500 mb-6">
          Search by zip code or browse all menopause specialists nationwide.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/listings"
            className="bg-brand-plum text-white font-semibold px-6 py-3 rounded-full hover:bg-brand-plum-dark transition-colors"
          >
            Search All Specialists
          </Link>
          <Link
            href="/states"
            className="border border-brand-plum/30 text-brand-plum font-medium px-6 py-3 rounded-full hover:bg-brand-plum/5 transition-colors"
          >
            Browse by State
          </Link>
        </div>
      </div>
    </div>
  )
}
