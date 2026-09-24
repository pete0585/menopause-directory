import 'server-only'
import { createServiceClient } from './supabase/server'
import type { Listing } from './types'

const LISTING_FIELDS = 'id,slug,npi_number,full_name,credentials,practice_name,practitioner_type,bio,headshot_url,phone,website,booking_url,address_line1,address_line2,city,state,zip,lat,lng,mscp_certified,isswsh_member,hrt_prescriber,accepts_telehealth,accepting_new_patients,specialties,insurance_accepted,languages_spoken,listing_tier,is_verified,is_active,is_approved,claimed_at,created_at,updated_at'
const CITY_FIELDS = 'id,city,state,state_abbr,slug,h1_title,meta_description,intro_content,listing_count'
// This adapter intentionally exposes SELECT only. Never pass service auth or raw tables to pages.
export function createClient() {
  const db = createServiceClient()
  return {
    from(table: string) {
      const allowed = table === 'menopause_listings' ? LISTING_FIELDS : table === 'menopause_city_pages' ? CITY_FIELDS : null
      if (!allowed) throw new Error('Table is not a public directory projection')
      return {
        select(columns = '*', options?: { count?: 'exact' | 'planned' | 'estimated'; head?: boolean }) {
          const fields = columns === '*' ? allowed : columns
          if (fields.split(',').some(field => !allowed.split(',').includes(field.trim()))) throw new Error('Field is not public')
          let query = db.from(table).select(fields, options)
          if (table === 'menopause_listings') query = query.eq('is_active', true).eq('is_approved', true)
          // Preserve the existing page shapes while limiting every returned row to the projection above.
          return query.returns<(Listing & { state_abbr: string; h1_title: string; meta_description: string; intro_content: string; listing_count: number })[]>().throwOnError()
        }
      }
    },
    async rpc(name: string, args: { search_lat: number; search_lng: number; radius_miles: number }) {
      if (name !== 'find_menopause_near') throw new Error('Unsupported public search')
      const { data } = await db.rpc(name, args).throwOnError()
      const ids = (data || []).map((row: { id: string }) => row.id).slice(0, 50)
      if (!ids.length) return { data: [], error: null }
      // RPC results may contain private fields; re-read only the approved public projection.
      return db.from('menopause_listings').select(LISTING_FIELDS).in('id', ids).eq('is_active', true).eq('is_approved', true).throwOnError()
    }
  }
}
