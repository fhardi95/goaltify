import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'FIFA World Cup 2026 — Scores, News & Guide',
  description: 'Everything you need for the FIFA World Cup 2026. Live scores, group tables, fixtures, team guides and analysis on Goaltify.',
  canonical: 'https://www.goaltify.com/world-cup',
  keywords: ['World Cup 2026', 'FIFA World Cup', 'World Cup scores', 'World Cup fixtures', 'World Cup groups'],
})

const GROUPS = ['A','B','C','D','E','F','G','H','I'].map(g => ({
  name: `Group ${g}`,
  teams: ['TBC', 'TBC', 'TBC', 'TBC'],
}))

const QUICK_FACTS = [
  { label: 'Host nations', value: 'USA, Canada & Mexico' },
  { label: 'Teams', value: '48 (expanded from 32)' },
  { label: 'Matches', value: '104 total' },
  { label: 'Start date', value: '11 June 2026' },
  { label: 'Final', value: '19 July 2026' },
  { label: 'Venues', value: '16 stadiums' },
]

export default function WorldCupPage() {
  return (
    <div className="container-site py-8">
      {/* Hero */}
      <div className="card p-6 md:p-8 mb-8 border-brand-500/30 bg-gradient-to-br from-gray-900 to-brand-900/20">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">🌍</span>
          <span className="text-xs font-medium text-brand-400 bg-brand-500/10 border border-brand-500/20 px-2.5 py-1 rounded-full">Live coverage</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">FIFA World Cup 2026</h1>
        <p className="text-gray-400 text-sm max-w-xl leading-relaxed">
          The biggest World Cup in history — 48 teams, 3 host nations, 104 matches. Goaltify has live scores, group tables, fixtures and analysis throughout the tournament.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-5">
          {QUICK_FACTS.map(f => (
            <div key={f.label} className="bg-gray-800/50 rounded-lg px-3 py-2">
              <p className="text-xs text-gray-500">{f.label}</p>
              <p className="text-sm font-semibold text-white">{f.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Live scores CTA */}
          <div className="card p-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold text-white mb-1">World Cup live scores</h2>
              <p className="text-xs text-gray-400">All fixtures updated in real-time on our live scores page.</p>
            </div>
            <Link href="/live-scores" className="shrink-0 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium rounded-lg transition-colors">
              Live scores →
            </Link>
          </div>

          {/* Groups placeholder */}
          <section>
            <h2 className="text-lg font-semibold text-white mb-4">Group stage</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {GROUPS.map(group => (
                <div key={group.name} className="card p-4">
                  <h3 className="text-xs font-bold text-brand-400 mb-2">{group.name}</h3>
                  {group.teams.map((t, i) => (
                    <div key={i} className="flex items-center gap-2 py-1 border-b border-gray-800 last:border-0">
                      <span className="text-xs text-gray-600">{i + 1}</span>
                      <span className="text-xs text-gray-400">{t}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-600 mt-2">Groups confirmed after draw. Full team guides coming soon.</p>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          <div className="card p-5">
            <h3 className="text-sm font-semibold text-white mb-3">World Cup coverage</h3>
            <div className="space-y-2">
              {[
                { label: 'Live scores', href: '/live-scores' },
                { label: 'World Cup news', href: '/news?category=news' },
                { label: 'Tactical analysis', href: '/news?category=tactics' },
                { label: 'Player ratings', href: '/news' },
                { label: 'xG Calculator', href: '/tools/calculators/xg-calculator' },
              ].map(l => (
                <Link key={l.href} href={l.href} className="flex items-center gap-2 text-sm text-gray-400 hover:text-brand-400 transition-colors py-1 border-b border-gray-800 last:border-0">
                  <span className="text-gray-700">→</span> {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="card p-5">
            <h3 className="text-sm font-semibold text-white mb-2">📬 World Cup updates</h3>
            <p className="text-xs text-gray-400 mb-3">Daily World Cup digest straight to your inbox during the tournament.</p>
            <Link href="/newsletter" className="block text-center text-xs py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-medium transition-colors">
              Subscribe free →
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}
