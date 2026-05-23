import { Suspense } from 'react'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import ListingCard from '@/components/ListingCard'
import FilterSidebar from '@/components/FilterSidebar'
import SearchBar from '@/components/SearchBar'
import type { Listing, PractitionerType } from '@/lib/types'
import { PRACTITIONER_TYPE_LABELS } from '@/lib/utils'

interface PageProps {
  searchParams: {
    city?: string
    state?: string
    practitioner_type?: string
    mscp_certified?: string
    accepts_telehealth?: string
    accepting_new_patients?: string
    hrt_prescriber?: string
    q?: string
  }
}

export function generateMetadata({ searchParams }: PageProps): Metadata {
  const location = searchParams.city ? `in ${searchParams.city}` : 'Near You'
  const type = searchParams.practitioner_type
    ? PRACTITIONER_TYPE_LABELS[searchParams.practitioner_type as PractitionerType]
    : 'Menopause Specialists'

  return {
    title: `Find ${type} ${location}`,
    description: `Browse ${type.toLowerCase()} ${location}. Filter by MSCP certification, HRT prescribing, telehealth availability, and more.`,
  }
}

async function getListings(filters: PageProps['searchParams']): Promise<Listing[]> {
  const supabase = createClient()
  let query = supabase
    .from('listings')
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .order('listing_tier', { ascending: false })
    .order('is_verified', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(50)

  if (filters.city) {
    query = query.ilike('city', `%${filters.city}%`)
  }
  if (filters.state) {
    query = query.ilike('state', `%${filters.state}%`)
  }
  if (filters.practitioner_type) {
    query = query.eq('practitioner_type', filters.practitioner_type)
  }
  if (filters.mscp_certified === 'true') {
    query = query.eq('mscp_certified', true)
  }
  if (filters.accepts_telehealth === 'true') {
    query = query.eq('accepts_telehealth', true)
  }
  if (filters.accepting_new_patients === 'true') {
    query = query.eq('accepting_new_patients', true)
  }
  if (filters.hrt_prescriber === 'true') {
    query = query.eq('hrt_prescriber', true)
  }
  if (filters.q) {
    query = query.textSearch('search_vector', filters.q, { type: 'websearch' })
  }

  const { data } = await query
  return (data as Listing[]) ?? []
}

export default async function ListingsPage({ searchParams }: PageProps) {
  const listings = await getListings(searchParams)

  const activeType = searchParams.practitioner_type
  const locationLabel = searchParams.city
    ? `in ${searchParams.city}${searchParams.state ? `, ${searchParams.state}` : ''}`
    : ''
  const typeLabel = activeType
    ? PRACTITIONER_TYPE_LABELS[activeType as PractitionerType]
    : 'Menopause Specialists'

  const activeFilters = [
    searchParams.mscp_certified === 'true' && 'MSCP Certified',
    searchParams.hrt_prescriber === 'true' && 'HRT Prescribers',
    searchParams.accepts_telehealth === 'true' && 'Telehealth',
    searchParams.accepting_new_patients === 'true' && 'Accepting Patients',
  ].filter(Boolean) as string[]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-gray-900 mb-2">
          {typeLabel} {locationLabel}
        </h1>
        <p className="text-gray-500">
          {listings.length} {listings.length === 1 ? 'provider' : 'providers'} found
          {activeFilters.length > 0 && (
            <span className="ml-2 text-brand-plum">
              · Filtered by: {activeFilters.join(', ')}
            </span>
          )}
        </p>
        <div className="mt-4 max-w-2xl">
          <Suspense fallback={null}>
            <SearchBar variant="compact" />
          </Suspense>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <div className="hidden lg:block w-60 flex-shrink-0">
          <div className="sticky top-24">
            <Suspense fallback={null}>
              <FilterSidebar />
            </Suspense>
          </div>
        </div>

        {/* Mobile filters */}
        <div className="lg:hidden w-full mb-6">
          <details className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <summary className="px-4 py-3 text-sm font-medium text-gray-700 cursor-pointer list-none flex items-center justify-between">
              <span>Filters {activeFilters.length > 0 && `(${activeFilters.length} active)`}</span>
              <span className="text-gray-400">▾</span>
            </summary>
            <div className="px-4 pb-4 border-t border-gray-100">
              <Suspense fallback={null}>
                <FilterSidebar />
              </Suspense>
            </div>
          </details>
        </div>

        {/* Listings grid */}
        <div className="flex-1 min-w-0">
          {listings.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
              <div className="text-4xl mb-4">🌿</div>
              <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                Try broadening your search — remove some filters, or search a nearby city.
              </p>
              <a
                href="/listings"
                className="inline-block bg-brand-plum text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-brand-plum-dark transition-colors"
              >
                Clear all filters
              </a>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
