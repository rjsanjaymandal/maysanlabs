import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/private/', '/api/'],
      },
      {
        userAgent: ['GPTBot', 'CCBot', 'Google-Extended', 'PerplexityBot', 'anthropic-ai', 'ClaudeBot', 'OAI-SearchBot'],
        allow: '/',
      }
    ],
    sitemap: 'https://maysanlabs.com/sitemap.xml',
    host: 'https://maysanlabs.com',
  }
}
