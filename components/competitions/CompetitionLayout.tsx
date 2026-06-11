import Link from 'next/link'
import Image from 'next/image'
import type { Competition } from '@/lib/competitions'
import { getTeamsByCompetition } from '@/lib/competitions'

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
  const teams = getTeamsByCompetition(competition.slug)

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

        {/* Team logos scrollbar */}
        {teams.length > 0 && (
          <div className="container-site pb-3">
            <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {teams.map(team => (
                <Link
                  key={team.id}
                  href={`/competitions/${competition.slug}/teams/${team.slug}`}
                  className="flex flex-col items-center gap-1 group shrink-0"
                  title={team.name}
                >
                  <div className="w-9 h-9 rounded-full bg-gray-800 border border-gray-700 group-hover:border-brand-400 transition-colors flex items-center justify-center overflow-hidden">
                    <Image
                      src={team.logo}
                      alt={team.name}
                      width={28}
                      height={28}
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                  <span className="text-[9px] text-gray-500 group-hover:text-brand-400 transition-colors whitespace-nowrap font-medium">
                    {team.shortName}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

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
