import type { Metadata } from 'next'
import Link from 'next/link'
import { CompetitionLayout } from '@/components/competitions/CompetitionLayout'
import { getCompetition } from '@/lib/competitions'
import { getAllArticles } from '@/lib/articles'
import { buildMetadata } from '@/lib/seo'
const comp = getCompetition('bundesliga')!
export const metadata: Metadata = buildMetadata({
  title: 'Bundesliga News 2025/26 — Latest Updates',
  description: 'Latest Bundesliga news, transfer updates, match reports and analysis on Goaltify.',
  canonical: 'https://goaltify.com/competitions/bundesliga/news',
  keywords: ['Bundesliga news', 'Bundesliga transfers', 'Bundesliga latest news'],
})
export default function BLNews() {
  const articles = getAllArticles().filter(a => a.tags?.some(t => t.toLowerCase().includes('bundesliga'.replace('-',' '))))
  return (
    <CompetitionLayout competition={comp} activeTab="news">
      <h2 className="text-lg font-bold text-white mb-4">Bundesliga News</h2>
      {articles.length===0?(
        <div className="card p-5"><p className="text-xs text-brand-400 mb-1">📰 Coming soon</p><p className="text-sm text-gray-300">Run the article generator to populate this section with Bundesliga stories.</p></div>
      ):(
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map(a=><Link key={a.slug} href={`/news/${a.slug}`} className="card p-4 hover:border-gray-700 group"><p className="text-xs text-brand-400 mb-1">{new Date(a.publishedAt).toLocaleDateString('en-GB',{day:'numeric',month:'short'})}</p><h3 className="text-sm font-semibold text-white group-hover:text-brand-400 line-clamp-2">{a.title}</h3></Link>)}
        </div>
      )}
    </CompetitionLayout>
  )
}
