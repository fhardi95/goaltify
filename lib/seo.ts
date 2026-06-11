import type { SEOProps } from '@/types'

const SITE_NAME = 'Goaltify'
const SITE_URL = 'https://goaltify.com'
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`

export function buildMetadata(seo: SEOProps) {
  const title = seo.title.includes(SITE_NAME)
    ? seo.title
    : `${seo.title} | ${SITE_NAME}`

  return {
    title,
    description: seo.description,
    keywords: seo.keywords?.join(', '),
    alternates: {
      canonical: seo.canonical ?? SITE_URL,
    },
    openGraph: {
      title,
      description: seo.description,
      url: seo.canonical ?? SITE_URL,
      siteName: SITE_NAME,
      images: [{ url: seo.ogImage ?? DEFAULT_OG_IMAGE, width: 1200, height: 630 }],
      type: seo.ogType ?? 'website',
      ...(seo.publishedAt && { publishedTime: seo.publishedAt }),
      ...(seo.modifiedAt && { modifiedTime: seo.modifiedAt }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: seo.description,
      images: [seo.ogImage ?? DEFAULT_OG_IMAGE],
    },
  }
}

export function buildArticleSchema({
  title,
  description,
  canonical,
  publishedAt,
  modifiedAt,
  ogImage,
}: SEOProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: canonical,
    image: ogImage ?? DEFAULT_OG_IMAGE,
    datePublished: publishedAt,
    dateModified: modifiedAt ?? publishedAt,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
  }
}

export function buildFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  }
}

export function buildSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}
