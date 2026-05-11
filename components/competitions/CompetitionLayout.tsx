import Link from 'next/link'
import type { Competition } from '@/lib/competitions'

interface Props {
  competition: Competition
  activeTab: 'overview' | 'news' | 'matches' | 'standings' | 'top-players'
  children: React.ReactNode
}

const TABS = [
  { key: 'overview', label: 'Overview', href: '' },
  { key: 'news', label: 'News', href: '/news' },
  { key: 'matches', label: 'Matches', href: '/matches' },
  { key: 'standings', label: 'Standings', href: '/standings' },
  { key: 'top-players', label: 'Top Players', href: '/top-players' },
] as const

export function CompetitionLayout({ competition, activeTab, children }: Props) {
  const base = `/competitions/${competition.slug}`

  return (
    <div>
      {/* Competition hero header */}
      <div className="border-b border-gray-800 bg-gray-900/40">
        <div className="container-site py-5">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-3xl">{competition.flag}</span>
            <div>
              <h1 className="text-xl font-bold text-white">{competition.name}</h1>
              <p className="text-xs text-gray-500">{competition.country} · 2025/26 Season</p>
            </div>
            <span
              className="ml-auto text-xs font-bold px-2.5 py-1 rounded-full text-white"
              style={{ background: competition.color }}
            >
              {competition.shortName}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="container-site">
          <div className="flex gap-0 overflow-x-auto">
            {TABS.map(tab => (
              <Link
                key={tab.key}
                href={`${base}${tab.href}`}
                className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? 'border-brand-400 text-brand-400'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div className="container-site py-6">
        {children}
      </div>
    </div>
  )
}
