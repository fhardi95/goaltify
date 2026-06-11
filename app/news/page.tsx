import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllArticles } from '@/lib/articles'

export const metadata: Metadata = {
  title: 'Football News — Transfers, Match Reports & Analysis',
  description:
    'The latest football news from the Premier League, World Cup, Euros and Champions League. Transfer updates, match reports and tactical analysis on Goaltify.',
  keywords: ['football news', 'transfer news', 'Premier League news', 'Champions League news'],
}

const CATEGORIES = [
  { key: 'news', label: 'Latest news', icon: '📰' },
  { key: 'transfers', label: 'Transfers', icon: '🔄' },
  { key: 'analytics', label: 'Analytics', icon: '📊' },
  { key: 'tactics', label: 'Tactics', icon: '🗺️' },
] as const

export default function NewsPage() {
  const articles = getAllArticles()
  const featured = articles.filter(a => a.featured).slice(0, 1)[0] ?? articles[0]
  const rest = articles.filter(a => a.slug !== featured?.slug)

  return (
    <div className="container-site py-8">
      <h1 className="text-2xl font-bold text-white mb-6">Football News</h1>

      {/* Category filters */}
      <div className="flex gap-2 flex-wrap mb-8">
        <Link href="/news" className="px-3 py-1.5 text-xs rounded-full bg-brand-500 text-white font-medium">All</Link>
        {CATEGORIES.map(c => (
          <Link
            key={c.key}
            href={`/news?category=${c.key}`}
            className="px-3 py-1.5 text-xs rounded-full bg-gray-800 text-gray-400 hover:text-white transition-colors"
          >
            {c.icon} {c.label}
          </Link>
        ))}
      </div>

      {articles.length === 0 ? (
        <div className="card p-10 text-center">
          <p className="text-gray-500 text-sm">No articles yet — the auto-generator will publish the first batch soon.</p>
          <p className="text-xs text-gray-600 mt-2">Check back after running the GitHub Actions workflow.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured article */}
          {featured && (
            <Link href={`/news/${featured.slug}`} className="lg:col-span-2 card overflow-hidden group hover:border-gray-700 transition-colors">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-brand-400 font-medium capitalize">{featured.category}</span>
                  <span className="text-gray-600">·</span>
                  <span className="text-xs text-gray-500">{new Date(featured.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  {featured.featured && <span className="ml-auto text-xs bg-brand-500/20 text-brand-400 px-2 py-0.5 rounded-full border border-brand-500/30">Featured</span>}
                </div>
                <h2 className="text-xl font-bold text-white group-hover:text-brand-400 transition-colors mb-2 leading-snug">{featured.title}</h2>
                <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed">{featured.description}</p>
                <div className="flex items-center gap-3 mt-4 text-xs text-gray-500">
                  <span>By {featured.author}</span>
                  <span>·</span>
                  <span>{featured.readingTime} min read</span>
                </div>
              </div>
            </Link>
          )}

          {/* Sidebar list */}
          <div className="space-y-2">
            {rest.slice(0, 6).map(article => (
              <Link key={article.slug} href={`/news/${article.slug}`} className="card p-3 flex gap-3 hover:border-gray-700 transition-colors group">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-xs text-brand-400 capitalize">{article.category}</span>
                    <span className="text-gray-700">·</span>
                    <span className="text-xs text-gray-600">{article.readingTime}m</span>
                  </div>
                  <h3 className="text-sm font-medium text-white group-hover:text-brand-400 transition-colors line-clamp-2 leading-snug">{article.title}</h3>
                </div>
              </Link>
            ))}
          </div>

          {/* All articles grid */}
          {rest.length > 6 && (
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-gray-800">
              {rest.slice(6).map(article => (
                <Link key={article.slug} href={`/news/${article.slug}`} className="card p-4 hover:border-gray-700 transition-colors group">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-brand-400 capitalize">{article.category}</span>
                    <span className="text-gray-700">·</span>
                    <span className="text-xs text-gray-600">{new Date(article.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-white group-hover:text-brand-400 transition-colors line-clamp-2">{article.title}</h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{article.description}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
