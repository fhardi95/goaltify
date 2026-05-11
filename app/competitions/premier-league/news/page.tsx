import type { Metadata } from 'next'
import Link from 'next/link'
import { CompetitionLayout } from '@/components/competitions/CompetitionLayout'
import { getCompetition } from '@/lib/competitions'
import { getAllArticles } from '@/lib/articles'
import { buildMetadata } from '@/lib/seo'

const comp = getCompetition('premier-league')!

export const metadata: Metadata = buildMetadata({
  title: 'Premier League News 2025/26 — Latest Updates',
  description: 'Latest Premier League news, transfer updates, match reports and analysis on Goaltify.',
  canonical: 'https://goaltify.com/competitions/premier-league/news',
  keywords: ['Premier League news', 'Premier League transfers', 'Premier League latest'],
})

export default function PremierLeagueNews() {
  const articles = getAllArticles().filter(a =>
    a.tags?.some(t => t.toLowerCase().includes('premier league') || t.toLowerCase().includes('england'))
  )

  return (
    <CompetitionLayout competition={comp} activeTab="news">
      <h2 className="text-lg font-bold text-white mb-4">Premier League News</h2>

      {articles.length === 0 ? (
        <div className="space-y-3">
          <div className="card p-5">
            <p className="text-xs text-brand-400 mb-1">📰 Coming soon</p>
            <p className="text-sm text-gray-300 font-medium mb-1">Premier League articles are being generated</p>
            <p className="text-xs text-gray-500">Run the article generator with <code className="bg-gray-800 px-1 rounded">node scripts/generate-articles.mjs --all</code> to populate this section.</p>
          </div>
          <div className="card p-4 flex items-center gap-3">
            <span className="text-xl">📬</span>
            <div>
              <p className="text-sm font-medium text-white">Get Premier League updates in your inbox</p>
              <p className="text-xs text-gray-400">Weekly digest every Sunday.</p>
            </div>
            <Link href="/newsletter" className="ml-auto shrink-0 text-xs px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-medium transition-colors">Subscribe →</Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map(a => (
            <Link key={a.slug} href={`/news/${a.slug}`} className="card p-4 hover:border-gray-700 group transition-colors">
              <p className="text-xs text-brand-400 mb-1">{new Date(a.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</p>
              <h3 className="text-sm font-semibold text-white group-hover:text-brand-400 transition-colors line-clamp-2">{a.title}</h3>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">{a.description}</p>
            </Link>
          ))}
        </div>
      )}
    </CompetitionLayout>
  )
}
