import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Football Tactics & Formations Explained',
  description: 'Football tactics explained simply. Formation guides, pressing systems, set piece strategies and how top managers think about the game — all on Goaltify Academy.',
  canonical: 'https://goaltify.com/academy/tactics',
  keywords: ['football tactics', 'football formations explained', '4-3-3 formation', 'high press football', 'football tactics guide'],
})

const GUIDES = [
  { slug: '4-3-3-formation-guide', title: '4-3-3 Formation: Complete Guide', desc: 'The world\'s most popular formation — strengths, weaknesses, how to play it and how to beat it.', level: 'All levels', icon: '🗺️', readTime: 9 },
  { slug: '4-4-2-formation-guide', title: '4-4-2 Formation: The Classic Revisited', desc: 'Why the 4-4-2 never died and how modern teams are using it with a twist.', level: 'All levels', icon: '📐', readTime: 7 },
  { slug: 'high-press-explained', title: 'High Press Explained: How It Works', desc: 'Everything about gegenpressing — triggers, player roles, when it works and when it fails.', level: 'Intermediate', icon: '⚡', readTime: 8 },
  { slug: 'counter-pressing-gegenpressing', title: 'Counter-Pressing (Gegenpressing) Guide', desc: 'Klopp made it famous. Here\'s the exact mechanics behind one of football\'s most effective systems.', level: 'Advanced', icon: '🔄', readTime: 8 },
  { slug: 'how-to-defend-set-pieces', title: 'How to Defend Set Pieces', desc: 'Zonal vs man marking, organising your wall, and defending corners from first principles.', level: 'All levels', icon: '🛡️', readTime: 7 },
]

export default function TacticsPage() {
  return (
    <div className="container-site py-8">
      <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-5">
        <Link href="/" className="hover:text-gray-300">Home</Link>
        <span>/</span>
        <Link href="/academy" className="hover:text-gray-300">Academy</Link>
        <span>/</span>
        <span className="text-gray-400">Tactics</span>
      </nav>
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-3xl">🗺️</span>
          <span className="text-xs font-medium text-brand-400 bg-brand-500/10 border border-brand-500/20 px-2.5 py-1 rounded-full">Academy · Tactics</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Football Tactics & Formations</h1>
        <p className="text-gray-400 max-w-xl text-sm leading-relaxed">
          Understand the game at a deeper level. Formation breakdowns, pressing systems, and the tactical concepts used by the world's best managers — explained so anyone can follow along.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {GUIDES.map(guide => (
          <Link key={guide.slug} href={`/academy/tactics/${guide.slug}`} className="card p-5 hover:border-gray-700 transition-colors group">
            <div className="flex items-start justify-between mb-3">
              <span className="text-3xl">{guide.icon}</span>
              <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">{guide.level}</span>
            </div>
            <h2 className="text-sm font-semibold text-white group-hover:text-brand-400 transition-colors mb-2 leading-snug">{guide.title}</h2>
            <p className="text-xs text-gray-500 leading-relaxed mb-3">{guide.desc}</p>
            <span className="text-xs text-brand-400 group-hover:text-brand-300">{guide.readTime} min read →</span>
          </Link>
        ))}
      </div>
      <div className="card p-4 mt-6 flex items-center gap-3">
        <span className="text-xl">🗺️</span>
        <p className="text-sm text-gray-400 flex-1">Want to visualise any formation on a real pitch?</p>
        <Link href="/tools/formations" className="shrink-0 text-xs px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-medium transition-colors">Formation builder →</Link>
      </div>
    </div>
  )
}
