import type { Metadata } from 'next'
import Link from 'next/link'
import { CompetitionLayout } from '@/components/competitions/CompetitionLayout'
import { getCompetition } from '@/lib/competitions'
import { getAllArticles } from '@/lib/articles'
import { buildMetadata } from '@/lib/seo'
const comp = getCompetition('ligue-1')!
export const metadata: Metadata = buildMetadata({
  title: 'Ligue 1 News 2025/26 — Latest Updates',
  description: 'Latest Ligue 1 news, transfer updates, match reports and analysis on Goaltify.',
  canonical: 'https://goaltify.com/competitions/ligue-1/news',
  keywords: ['Ligue 1 news', 'Ligue 1 transfers', 'Ligue 1 latest news'],
})
export default function L1News() {
  const articles = getAllArticles().filter(a => a.tags?.some(t => t.toLowerCase().includes('ligue-1'.replace('-',' '))))
  return (
    <CompetitionLayout competition={comp} activeTab="news">
      <h2 className="text-lg font-bold text-white mb-4">Ligue 1 News</h2>
      {articles.length===0?(
        <div className="card p-5"><p className="text-xs text-brand-400 mb-1">📰 Coming soon</p><p className="text-sm text-gray-300">Run the article generator to populate this section with Ligue 1 stories.</p></div>
      ):(
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map(a=><Link key={a.slug} href={`/news/${a.slug}`} className="card p-4 hover:border-gray-700 group"><p className="text-xs text-brand-400 mb-1">{new Date(a.publishedAt).toLocaleDateString('en-GB',{day:'numeric',month:'short'})}</p><h3 className="text-sm font-semibold text-white group-hover:text-brand-400 line-clamp-2">{a.title}</h3></Link>)}
        </div>
      )}
    </CompetitionLayout>
  )
}
