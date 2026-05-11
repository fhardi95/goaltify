import type { Metadata } from 'next'
import Link from 'next/link'
import { LiveScoresFeed } from '@/components/scores/LiveScoresFeed'
import { NewsCard } from '@/components/news/NewsCard'
import type { NewsArticle } from '@/types'

export const metadata: Metadata = {
  title: 'Goaltify — Live Football Scores, News & Training Guides',
  description:
    'Follow live football scores from the World Cup, Euros & Premier League. Read the latest transfer news, match analysis and training guides on Goaltify.',
}

// Fetch news server-side (replace with your NewsAPI key in .env)
async function getNews(): Promise<NewsArticle[]> {
  const apiKey = process.env.NEWS_API_KEY
  if (!apiKey) return MOCK_NEWS

  try {
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=football&language=en&sortBy=publishedAt&pageSize=7&apiKey=${apiKey}`,
      { next: { revalidate: 1800 } }
    )
    const data = await res.json()
    return data.articles ?? MOCK_NEWS
  } catch {
    return MOCK_NEWS
  }
}

const ACADEMY_GUIDES = [
  {
    title: 'How to dribble past a defender',
    description: 'Master 5 techniques used by elite wingers to beat opponents 1v1.',
    href: '/academy/dribbling/how-to-dribble-past-a-defender',
    icon: '⚽',
    tag: 'Skills',
  },
  {
    title: 'How to calculate xG in football',
    description: 'Understand expected goals — the metric that changed how we watch football.',
    href: '/tools/calculators/xg-calculator',
    icon: '📊',
    tag: 'Analytics',
  },
  {
    title: 'The perfect pre-match warm-up',
    description: 'A science-backed 20-minute routine to prepare your body and mind.',
    href: '/academy/training/pre-match-warm-up',
    icon: '🏃',
    tag: 'Training',
  },
  {
    title: 'Best 4-3-3 formation guide',
    description: 'How to set up, coach, and play against the world\'s most popular formation.',
    href: '/academy/tactics/4-3-3-formation-guide',
    icon: '🗺️',
    tag: 'Tactics',
  },
]

export default async function HomePage() {
  const news = await getNews()
  const [featuredNews, ...restNews] = news

  return (
    <>
      {/* ── Hero ── */}
      <section className="border-b border-gray-800 bg-gray-950">
        <div className="container-site py-10 md:py-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-brand-400 bg-brand-500/10 border border-brand-500/20 px-3 py-1 rounded-full mb-4">
              <span className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-pulse" />
              Live scores updated every 60 seconds
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3">
              Your football home.<br />
              <span className="text-brand-400">Goals, news & guides.</span>
            </h1>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-6">
              Live scores from the World Cup to the Premier League, the latest transfer news,
              and step-by-step training guides — all in one place.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/live-scores"
                className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-medium text-sm transition-colors"
              >
                View all scores
              </Link>
              <Link
                href="/academy"
                className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium text-sm transition-colors"
              >
                Explore Academy
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main content ── */}
      <div className="container-site py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left: Live scores (2/3 width) */}
          <div className="lg:col-span-2 space-y-8">
            <LiveScoresFeed />

            {/* Academy teaser */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">Academy guides</h2>
                <Link href="/academy" className="text-sm text-brand-400 hover:text-brand-300">
                  View all →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ACADEMY_GUIDES.map(guide => (
                  <Link
                    key={guide.href}
                    href={guide.href}
                    className="card p-4 hover:border-gray-700 transition-colors group"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{guide.icon}</span>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-brand-400 font-medium">{guide.tag}</span>
                        </div>
                        <h3 className="text-sm font-semibold text-white group-hover:text-brand-400 transition-colors mb-1">
                          {guide.title}
                        </h3>
                        <p className="text-xs text-gray-500 line-clamp-2">{guide.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* Right: News sidebar (1/3 width) */}
          <aside className="space-y-4">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-lg font-semibold text-white">Latest news</h2>
              <Link href="/news" className="text-sm text-brand-400 hover:text-brand-300">
                All news →
              </Link>
            </div>

            {featuredNews && <NewsCard article={featuredNews} featured />}

            <div className="space-y-2">
              {restNews.slice(0, 5).map((article, i) => (
                <NewsCard key={i} article={article} />
              ))}
            </div>
          </aside>
        </div>
      </div>

      {/* ── Newsletter CTA ── */}
      <section className="border-t border-gray-800 bg-gray-900/50 mt-8">
        <div className="container-site py-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Never miss a goal</h2>
          <p className="text-gray-400 mb-6 max-w-md mx-auto text-sm">
            Get the biggest football stories, live score alerts, and exclusive guides delivered weekly.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand-500"
            />
            <button
              type="submit"
              className="px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-medium text-sm transition-colors whitespace-nowrap"
            >
              Subscribe free
            </button>
          </form>
        </div>
      </section>
    </>
  )
}

// Mock data used when NEWS_API_KEY is not set
const MOCK_NEWS: NewsArticle[] = [
  {
    source: { id: null, name: 'BBC Sport' },
    author: 'BBC Sport',
    title: 'Champions League: Real Madrid reach final with stunning comeback',
    description: 'Real Madrid produce another miraculous European night to advance to the Champions League final.',
    url: '#',
    urlToImage: null,
    publishedAt: new Date(Date.now() - 3_600_000).toISOString(),
    content: null,
  },
  {
    source: { id: null, name: 'Sky Sports' },
    author: 'Sky Sports',
    title: 'Transfer news: Premier League clubs eye World Cup stars',
    description: 'Several top-flight clubs are tracking outstanding performers from the summer tournament.',
    url: '#',
    urlToImage: null,
    publishedAt: new Date(Date.now() - 7_200_000).toISOString(),
    content: null,
  },
  {
    source: { id: null, name: 'The Guardian' },
    author: 'The Guardian',
    title: 'England manager names squad for upcoming qualifiers',
    description: 'The Three Lions prepare for a crucial double-header with two young call-ups.',
    url: '#',
    urlToImage: null,
    publishedAt: new Date(Date.now() - 10_800_000).toISOString(),
    content: null,
  },
  {
    source: { id: null, name: 'ESPN' },
    author: 'ESPN',
    title: 'La Liga title race: Barcelona and Real Madrid level on points',
    description: 'With three games to go, the title could go either way in Spain\'s top flight.',
    url: '#',
    urlToImage: null,
    publishedAt: new Date(Date.now() - 18_000_000).toISOString(),
    content: null,
  },
  {
    source: { id: null, name: 'Goal.com' },
    author: 'Goal',
    title: 'Mbappé sets new Champions League scoring record',
    description: 'The French star surpasses another landmark in European competition this season.',
    url: '#',
    urlToImage: null,
    publishedAt: new Date(Date.now() - 21_600_000).toISOString(),
    content: null,
  },
  {
    source: { id: null, name: 'Fabrizio Romano' },
    author: 'Fabrizio Romano',
    title: 'Here we go: Premier League club confirms summer signing',
    description: 'Exclusive: deal agreed, medical scheduled for next week. Here we go confirmed.',
    url: '#',
    urlToImage: null,
    publishedAt: new Date(Date.now() - 25_200_000).toISOString(),
    content: null,
  },
  {
    source: { id: null, name: 'Marca' },
    author: 'Marca',
    title: 'Vinicius Jr wins Ballon d\'Or: full ceremony highlights',
    description: 'The Brazilian winger claims football\'s most prestigious individual award.',
    url: '#',
    urlToImage: null,
    publishedAt: new Date(Date.now() - 28_800_000).toISOString(),
    content: null,
  },
]
