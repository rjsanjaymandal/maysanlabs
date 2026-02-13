import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

const BASE_URL = 'https://maysanlabs.com'

// Pages that should be excluded from the sitemap
const EXCLUDED_ROUTES = new Set(['/_not-found', '/global-error', '/error'])

// Priority and frequency overrides for specific routes
const ROUTE_CONFIG: Record<string, { priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }> = {
  '/':             { priority: 1.0, changeFrequency: 'weekly' },
  '/solutions':    { priority: 0.9, changeFrequency: 'weekly' },
  '/about':        { priority: 0.8, changeFrequency: 'monthly' },
  '/architecture': { priority: 0.7, changeFrequency: 'monthly' },
  '/insights':     { priority: 0.7, changeFrequency: 'daily' },
  '/init':         { priority: 0.5, changeFrequency: 'yearly' },
}

const DEFAULT_CONFIG = { priority: 0.6, changeFrequency: 'monthly' as const }

/**
 * Recursively discovers all page.tsx files under src/app
 * and returns their routes with real file modification times.
 */
function discoverRoutes(dir: string, basePath: string = ''): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  let items: fs.Dirent[]
  try {
    items = fs.readdirSync(dir, { withFileTypes: true })
  } catch {
    return entries
  }

  // Check if this directory has a page.tsx (i.e., it's a route)
  const pageFile = items.find(
    (item) => item.isFile() && (item.name === 'page.tsx' || item.name === 'page.ts' || item.name === 'page.jsx' || item.name === 'page.js')
  )

  if (pageFile) {
    const route = basePath || '/'
    if (!EXCLUDED_ROUTES.has(route)) {
      const filePath = path.join(dir, pageFile.name)
      const stat = fs.statSync(filePath)
      const config = ROUTE_CONFIG[route] || DEFAULT_CONFIG

      entries.push({
        url: `${BASE_URL}${route}`,
        lastModified: stat.mtime,
        changeFrequency: config.changeFrequency,
        priority: config.priority,
      })
    }
  }

  // Recurse into subdirectories (skip special Next.js dirs)
  for (const item of items) {
    if (
      item.isDirectory() &&
      !item.name.startsWith('_') &&
      !item.name.startsWith('.') &&
      !item.name.startsWith('(') && // route groups
      item.name !== 'api' &&
      item.name !== 'actions'
    ) {
      const subRoutes = discoverRoutes(
        path.join(dir, item.name),
        `${basePath}/${item.name}`
      )
      entries.push(...subRoutes)
    }
  }

  return entries
}

export default function sitemap(): MetadataRoute.Sitemap {
  const appDir = path.join(process.cwd(), 'src', 'app')
  const routes = discoverRoutes(appDir)

  // Sort by priority descending for cleaner output
  routes.sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))

  return routes
}
