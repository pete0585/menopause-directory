import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import AdminTable from '@/components/AdminTable'
import type { Listing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Admin — MenopauseDirectory.co',
  robots: { index: false, follow: false },
}

async function getStats(supabase: ReturnType<typeof createClient>) {
  const [
    { count: total },
    { count: pending },
    { count: approved },
    { count: premium },
  ] = await Promise.all([
    supabase.from('listings').select('*', { count: 'exact', head: true }),
    supabase.from('listings').select('*', { count: 'exact', head: true }).eq('is_active', true).eq('is_approved', false),
    supabase.from('listings').select('*', { count: 'exact', head: true }).eq('is_approved', true),
    supabase.from('listings').select('*', { count: 'exact', head: true }).in('listing_tier', ['premium', 'featured']),
  ])
  return { total: total ?? 0, pending: pending ?? 0, approved: approved ?? 0, premium: premium ?? 0 }
}

export default async function AdminPage() {
  const supabase = createClient()
  const { data } = await supabase
    .from('listings')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100)

  const stats = await getStats(supabase)
  const listings = (data as Listing[]) ?? []

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Listings', value: stats.total },
          { label: 'Pending Review', value: stats.pending, highlight: stats.pending > 0 },
          { label: 'Live Listings', value: stats.approved },
          { label: 'Verified/Featured', value: stats.premium },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`bg-white rounded-xl border p-4 ${
              stat.highlight ? 'border-brand-rose/30 bg-brand-rose/5' : 'border-gray-100'
            }`}
          >
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-brand-cream rounded-2xl p-6">
        <h2 className="font-semibold text-gray-900 mb-6">Listings</h2>
        <AdminTable listings={listings} />
      </div>
    </div>
  )
}
