import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

const BASE_URL = 'https://maysanlabs.com'

// Pages that should be excluded from the sitemap
const EXCLUDED_ROUTES = new Set(['/_not-found', '/global-error', '/error', '/start', '/careers/apply'])

const ROUTE_CONFIG: Record<string, { priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }> = {
  '/':             { priority: 1.0, changeFrequency: 'weekly' },
  '/services':     { priority: 0.9, changeFrequency: 'weekly' },
  '/about':        { priority: 0.8, changeFrequency: 'monthly' },
  '/architecture': { priority: 0.7, changeFrequency: 'monthly' },
  '/blog':         { priority: 0.8, changeFrequency: 'daily' },
  '/insights':     { priority: 0.7, changeFrequency: 'weekly' },
  '/case-studies': { priority: 0.9, changeFrequency: 'weekly' },
  '/careers':      { priority: 0.7, changeFrequency: 'weekly' },
  '/products':     { priority: 0.9, changeFrequency: 'weekly' },
  '/products/edu-maysan': { priority: 0.8, changeFrequency: 'monthly' },
  '/products/flash-fashion': { priority: 0.8, changeFrequency: 'monthly' },
  '/pricing':      { priority: 0.8, changeFrequency: 'weekly' },
  '/privacy':      { priority: 0.3, changeFrequency: 'yearly' },
  '/terms':        { priority: 0.3, changeFrequency: 'yearly' },
  '/contact':      { priority: 0.7, changeFrequency: 'monthly' },
  '/tools': { priority: 0.8, changeFrequency: 'weekly' },
  '/tools/site-checker': { priority: 0.8, changeFrequency: 'weekly' },
  '/tools/headless-roi': { priority: 0.7, changeFrequency: 'weekly' },
  '/tools/scope-estimator': { priority: 0.7, changeFrequency: 'weekly' },
  '/tools/privacy-generator': { priority: 0.6, changeFrequency: 'monthly' },
  '/tools/og-generator': { priority: 0.6, changeFrequency: 'monthly' },
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

import { blogPosts } from '@/lib/blog-data'
import { caseStudies } from '@/lib/case-studies-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const appDir = path.join(process.cwd(), 'src', 'app')
  const routes = discoverRoutes(appDir)

  // Add dynamic blog routes
  blogPosts.forEach(post => {
    routes.push({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  })

  // Add case study routes with images
  caseStudies.forEach(study => {
    routes.push({
      url: `${BASE_URL}/case-studies/${study.slug}`,
      lastModified: new Date(study.year),
      changeFrequency: 'monthly',
      priority: 0.8,
      images: [`${BASE_URL}/og-image.png`],
    })
  })

  // Add product routes with images
  const productRoutes = [
    { slug: 'flash-fashion', name: 'Maysan Shop', lastmod: new Date('2025-01-01') },
    { slug: 'edu-maysan', name: 'Edu-Maysan', lastmod: new Date('2025-01-01') },
  ]
  productRoutes.forEach(p => {
    routes.push({
      url: `${BASE_URL}/products/${p.slug}`,
      lastModified: p.lastmod,
      changeFrequency: 'monthly',
      priority: 0.8,
      images: [`${BASE_URL}/og-image.png`],
    })
  })

  // Sort by priority descending for cleaner output
  routes.sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))

  return routes
}
