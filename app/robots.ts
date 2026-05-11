import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',        // Never expose API routes to crawlers
          '/admin/',      // Future admin panel
          '/_next/',      // Next.js internals
          '/private/',    // Any private pages
        ],
      },
      {
        // Block AI training bots — protects your original content
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'Google-Extended',
          'CCBot',
          'anthropic-ai',
          'Claude-Web',
          'Omgilibot',
          'FacebookBot',
          'Bytespider',
        ],
        disallow: '/',
      },
    ],
    sitemap: 'https://goaltify.com/sitemap.xml',
    host: 'https://goaltify.com',
  }
}
