// ─── Scores & Fixtures ───────────────────────────────────────────────────────

export interface Team {
  id: number
  name: string
  logo: string
  winner?: boolean | null
}

export interface Goals {
  home: number | null
  away: number | null
}

export interface FixtureStatus {
  long: string
  short: string
  elapsed: number | null
}

export interface Fixture {
  id: number
  date: string
  status: FixtureStatus
  venue?: { name: string; city: string }
}

export interface League {
  id: number
  name: string
  country: string
  logo: string
  flag?: string
  season: number
  round?: string
}

export interface Match {
  fixture: Fixture
  league: League
  teams: { home: Team; away: Team }
  goals: Goals
}

// ─── News ────────────────────────────────────────────────────────────────────

export interface NewsArticle {
  source: { id: string | null; name: string }
  author: string | null
  title: string
  description: string | null
  url: string
  urlToImage: string | null
  publishedAt: string
  content: string | null
}

// ─── SEO ─────────────────────────────────────────────────────────────────────

export interface SEOProps {
  title: string
  description: string
  canonical?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  publishedAt?: string
  modifiedAt?: string
  keywords?: string[]
  faqSchema?: Array<{ question: string; answer: string }>
}
