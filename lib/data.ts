import { createClient } from './supabase/server'

export async function getListingCount(): Promise<number> {
  const supabase = createClient()
  const { count } = await supabase
    .from('menopause_listings')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true)
    .eq('is_approved', true)
  return count ?? 0
}
