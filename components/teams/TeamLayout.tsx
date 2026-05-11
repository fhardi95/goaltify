import Link from 'next/link'
import Image from 'next/image'
import type { Team, Competition } from '@/lib/competitions'

interface Props {
  team: Team
  competition: Competition
  activeTab: 'overview' | 'news' | 'matches' | 'standings' | 'top-players'
  children: React.ReactNode
}

const TEAM_TABS = [
  { key: 'overview', label: 'Overview', href: '' },
  { key: 'news', label: 'News', href: '/news' },
  { key: 'matches', label: 'Matches', href: '/matches' },
  { key: 'standings', label: 'Standings', href: '/standings' },
  { key: 'top-players', label: 'Top Players', href: '/top-players' },
] as const

export function TeamLayout({ team, competition, activeTab, children }: Props) {
  const base = `/competitions/${competition.slug}/teams/${team.slug}`

  return (
    <div>
      {/* Team hero header */}
      <div className="border-b border-gray-800 bg-gray-900/40">
        <div className="container-site py-5">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 mb-3 text-xs text-gray-500">
            <Link href={`/competitions/${competition.slug}`} className="hover:text-brand-400 transition-colors">
              {competition.name}
            </Link>
            <span>/</span>
            <span className="text-gray-300">{team.name}</span>
          </div>

          {/* Team identity */}
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: `${competition.color}22`, border: `1px solid ${competition.color}44` }}
            >
              <Image
                src={team.logo}
                alt={team.name}
                width={48}
                height={48}
                className="object-contain"
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{team.name}</h1>
              <p className="text-xs text-gray-500 mt-0.5">
                {competition.flag} {competition.name} · {competition.country}
              </p>
            </div>
            <span
              className="ml-auto text-xs font-bold px-2.5 py-1 rounded-full text-white shrink-0"
              style={{ background: competition.color }}
            >
              {team.shortName}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="container-site">
          <div className="flex gap-0 overflow-x-auto">
            {TEAM_TABS.map(tab => (
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
