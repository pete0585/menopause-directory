import { existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://menopausedirectory.co'

/**
 * Static `page.tsx` folders under `app/menopause-doctors`.
 * Excludes the DB-driven `[slug]` route. Used as a production fallback
 * when the app directory is not available to the sitemap function.
 */
export const STATIC_CITY_PAGE_SLUGS = [
  'albuquerque-nm',
  'arizona',
  'atlanta-ga',
  'austin-tx',
  'baltimore-md',
  'baton-rouge-la',
  'baton-rouge-louisiana',
  'boston-ma',
  'california',
  'charlotte-nc',
  'chicago-il',
  'colorado',
  'colorado-springs-co',
  'columbus-oh',
  'dallas-tx',
  'denver-co',
  'el-paso-tx',
  'florida',
  'fresno-ca',
  'indianapolis-in',
  'kansas-city-mo',
  'los-angeles-ca',
  'lubbock-texas',
  'maryland',
  'miami-fl',
  'minneapolis-mn',
  'nashville-tn',
  'new-orleans-la',
  'new-york',
  'ohio',
  'oklahoma-city-ok',
  'phoenix-az',
  'pittsburgh-pa',
  'reno-nevada',
  'reno-nv',
  'sacramento-ca',
  'salt-lake-city-ut',
  'san-francisco-ca',
  'seattle-wa',
  'tampa-fl',
  'texas',
  'virginia',
  'washington-dc',
] as const

export function cityPagePath(slug: string): string {
  return `/menopause-doctors/${slug}`
}

export function cityPageUrl(slug: string, baseUrl: string = SITE_URL): string {
  return `${baseUrl.replace(/\/$/, '')}${cityPagePath(slug)}`
}

function readStaticSlugsFromDisk(): string[] {
  const dir = join(process.cwd(), 'app/menopause-doctors')
  if (!existsSync(dir)) return []

  try {
    return readdirSync(dir, { withFileTypes: true })
      .filter(
        (entry) =>
          entry.isDirectory() &&
          !entry.name.startsWith('[') &&
          existsSync(join(dir, entry.name, 'page.tsx'))
      )
      .map((entry) => entry.name)
  } catch {
    return []
  }
}

/** All static city/state doctor page slugs (disk + committed fallback). */
export function getStaticCityPageSlugs(): string[] {
  const slugs = new Set<string>(STATIC_CITY_PAGE_SLUGS)
  for (const slug of readStaticSlugsFromDisk()) slugs.add(slug)
  return [...slugs].sort()
}

export function mergeCityPageSlugs(
  ...groups: Array<Iterable<string> | null | undefined>
): string[] {
  const slugs = new Set<string>()
  for (const group of groups) {
    if (!group) continue
    for (const slug of group) {
      const normalized = slug.trim()
      if (normalized) slugs.add(normalized)
    }
  }
  return [...slugs].sort()
}
