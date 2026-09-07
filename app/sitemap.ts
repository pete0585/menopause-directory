import type { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'
import {
  SITE_URL,
  cityPageUrl,
  getStaticCityPageSlugs,
  mergeCityPageSlugs,
} from '@/lib/city-pages'

const BASE_URL = SITE_URL

const CATEGORY_SLUGS = [
  'certified-menopause-practitioner',
  'obgyn-menopause',
  'pelvic-floor-therapist',
  'functional-medicine',
  'menopause-coach',
  'telehealth',
]

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const [{ data: listings }, { data: cityPages }] = await Promise.all([
    supabase
      .from('menopause_listings')
      .select('slug, updated_at')
      .eq('is_approved', true)
      .eq('is_active', true)
      .range(0, 49999),
    supabase
      .from('menopause_city_pages')
      .select('slug')
      .range(0, 49999),
  ])

  const listingUrls: MetadataRoute.Sitemap = (listings ?? []).map((l) => ({
    url: `${BASE_URL}/listings/${l.slug}`,
    lastModified: new Date(l.updated_at),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  const categoryUrls: MetadataRoute.Sitemap = CATEGORY_SLUGS.map((slug) => ({
    url: `${BASE_URL}/categories/${slug}`,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // Static folders under app/menopause-doctors + DB-driven [slug] city pages.
  const citySlugs = mergeCityPageSlugs(
    getStaticCityPageSlugs(),
    (cityPages ?? []).map((page) => page.slug)
  )
  const cityUrls: MetadataRoute.Sitemap = citySlugs.map((slug) => ({
    url: cityPageUrl(slug, BASE_URL),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const staticUrls: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/listings`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/submit`, changeFrequency: 'monthly', priority: 0.5 },
  ]

  return [...staticUrls, ...categoryUrls, ...cityUrls, ...listingUrls]
}
