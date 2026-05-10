import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Script from 'next/script'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ConsentProvider } from '@/components/gdpr/ConsentContext'
import { CookieBanner } from '@/components/gdpr/CookieBanner'
import { buildSiteSchema } from '@/lib/seo'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export const metadata: Metadata = {
  title: {
    default: 'Goaltify — Live Football Scores, News & Training Guides',
    template: '%s | Goaltify',
  },
  description:
    'Goaltify covers live football scores, World Cup news, Euro Championship results, training guides, and tactical analysis. Your ultimate football companion.',
  keywords: ['football', 'live scores', 'World Cup', 'Premier League', 'football news', 'training guides'],
  authors: [{ name: 'Goaltify' }],
  creator: 'Goaltify',
  metadataBase: new URL('https://goaltify.com'),
  openGraph: { siteName: 'Goaltify', type: 'website', locale: 'en_GB' },
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
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga-consent-init" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', wait_for_update: 500 });
              gtag('config', '${GA_ID}', { anonymize_ip: true });
            `}</Script>
          </>
        )}
      </head>
      <body className="min-h-screen flex flex-col">
        <ConsentProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieBanner />
        </ConsentProvider>
      </body>
    </html>
  )
}
