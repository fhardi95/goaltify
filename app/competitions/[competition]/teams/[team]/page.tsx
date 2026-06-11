import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { TeamLayout } from '@/components/teams/TeamLayout'
import { getTeam, getCompetition, getFixtures, formatDate, TEAMS } from '@/lib/competitions'
import { buildMetadata } from '@/lib/seo'

interface Props {
  params: { competition: string; team: string }
}

export async function generateStaticParams() {
  return TEAMS.map(t => ({
    competition: t.competitionSlug,
    team: t.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const team = getTeam(params.team)
  const comp = getCompetition(params.competition)
  if (!team || !comp) return {}
  return buildMetadata({
    title: `${team.name} — Overview | ${comp.name} | Goaltify`,
    description: `${team.name} overview: recent results, upcoming fixtures and latest news on Goaltify.`,
    canonical: `https://goaltify.com/competitions/${comp.slug}/teams/${team.slug}`,
    keywords: [team.name, comp.name, `${team.name} fixtures`, `${team.name} news`],
  })
}

export default async function TeamOverview({ params }: Props) {
  const team = getTeam(params.team)
  const comp = getCompetition(params.competition)
  if (!team || !comp || team.competitionSlug !== comp.slug) notFound()

  const [recent, upcoming] = await Promise.all([
    getFixtures(comp.leagueId, comp.season, undefined, 5),
    getFixtures(comp.leagueId, comp.season, 5),
  ])

  const teamRecent = recent.filter(
    m => m.teams.home.id === team.id || m.teams.away.id === team.id
  ).slice(0, 5)

  const teamUpcoming = upcoming.filter(
    m => m.teams.home.id === team.id || m.teams.away.id === team.id
  ).slice(0, 5)

  return (
    <TeamLayout team={team} competition={comp} activeTab="overview">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left: recent results */}
        <div className="lg:col-span-2 space-y-6">
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-white">Recent Results</h2>
              <Link
                href={`/competitions/${comp.slug}/teams/${team.slug}/matches`}
                className="text-xs text-brand-400 hover:text-brand-300"
              >
                All matches →
              </Link>
            </div>
            <div className="space-y-2">
              {teamRecent.length === 0 ? (
                <div className="card p-4 text-center text-xs text-gray-600">
                  No recent results — add FOOTBALL_API_KEY for live data
                </div>
              ) : teamRecent.map(m => {
                const isHome = m.teams.home.id === team.id
                const teamSide = isHome ? m.teams.home : m.teams.away
                const oppSide = isHome ? m.teams.away : m.teams.home
                const teamGoals = isHome ? m.goals.home : m.goals.away
                const oppGoals = isHome ? m.goals.away : m.goals.home
                const won = teamSide.winner
                const drew = teamSide.winner === false && oppSide.winner === false
                const resultColor = won ? 'text-green-400' : drew ? 'text-yellow-400' : 'text-red-400'
                const resultLabel = won ? 'W' : drew ? 'D' : 'L'
                return (
                  <div key={m.fixture.id} className="card p-3 flex items-center gap-3">
                    <span className={`text-xs font-bold w-5 text-center ${resultColor}`}>{resultLabel}</span>
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <Image src={oppSide.logo} alt={oppSide.name} width={18} height={18} className="object-contain shrink-0" unoptimized />
                      <span className="text-sm text-white truncate">
                        {isHome ? 'vs' : '@'} {oppSide.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 text-sm font-bold text-white">
                      <span>{teamGoals}</span>
                      <span className="text-gray-600 text-xs font-normal">–</span>
                      <span>{oppGoals}</span>
                    </div>
                    <span className="text-[10px] text-gray-500 shrink-0">{formatDate(m.fixture.date)}</span>
                  </div>
                )
              })}
            </div>
          </section>
        </div>

        {/* Right: sidebar */}
        <aside className="space-y-4">
          <div className="card p-4">
            <h3 className="text-sm font-semibold text-white mb-3">Upcoming Fixtures</h3>
            <div className="space-y-2">
              {teamUpcoming.length === 0 ? (
                <p className="text-xs text-gray-600">Add FOOTBALL_API_KEY for fixtures</p>
              ) : teamUpcoming.map(m => {
                const isHome = m.teams.home.id === team.id
                const oppSide = isHome ? m.teams.away : m.teams.home
                return (
                  <div key={m.fixture.id} className="border-b border-gray-800 pb-2 last:border-0 last:pb-0">
                    <p className="text-[10px] text-gray-600 mb-1">{formatDate(m.fixture.date)}</p>
                    <div className="flex items-center gap-2">
                      <Image src={oppSide.logo} alt={oppSide.name} width={14} height={14} className="object-contain shrink-0" unoptimized />
                      <span className="text-xs text-gray-400">{isHome ? 'vs' : '@'}</span>
                      <span className="text-xs text-white truncate">{oppSide.name}</span>
                    </div>
                  </div>
                )
              })}
            </div>
            <Link
              href={`/competitions/${comp.slug}/teams/${team.slug}/matches`}
              className="block text-center text-xs text-brand-400 hover:text-brand-300 mt-3"
            >
              View all fixtures →
            </Link>
          </div>

          <div className="card p-4">
            <h3 className="text-sm font-semibold text-white mb-2">Quick links</h3>
            <div className="space-y-1.5">
              {[
                { label: '📊 Standings', href: `/competitions/${comp.slug}/teams/${team.slug}/standings` },
                { label: '⚽ Top Scorers', href: `/competitions/${comp.slug}/teams/${team.slug}/top-players` },
                { label: '📰 Latest News', href: `/competitions/${comp.slug}/teams/${team.slug}/news` },
                { label: '🗓 All Fixtures', href: `/competitions/${comp.slug}/teams/${team.slug}/matches` },
                { label: `← Back to ${comp.shortName}`, href: `/competitions/${comp.slug}` },
              ].map(l => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="block text-xs text-gray-400 hover:text-brand-400 transition-colors py-1 border-b border-gray-800 last:border-0"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </TeamLayout>
  )
}
