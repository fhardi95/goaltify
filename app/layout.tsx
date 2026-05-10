import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { buildSiteSchema } from '@/lib/seo'

export const metadata: Metadata = {
  title: {
    default: 'Goaltify — Football News, Live Scores & Guides',
    template: '%s | Goaltify',
  },
  description:
    'Goaltify covers live football scores, World Cup news, Euro Championship results, training guides, and tactical analysis. Your ultimate football companion.',
  keywords: ['football', 'live scores', 'World Cup', 'Premier League', 'football news', 'training guides'],
  authors: [{ name: 'Goaltify' }],
  creator: 'Goaltify',
  metadataBase: new URL('https://goaltify.com'),
  openGraph: {
    siteName: 'Goaltify',
    type: 'website',
    locale: 'en_GB',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const siteSchema = buildSiteSchema()

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
