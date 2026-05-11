import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { TeamLayout } from '@/components/teams/TeamLayout'
import { getTeam, getCompetition, getFixtures, formatDate } from '@/lib/competitions'

interface Props {
  competitionSlug: string
  teamSlug: string
}

export async function TeamMatchesPage({ competitionSlug, teamSlug }: Props) {
  const team = getTeam(teamSlug)
  const comp = getCompetition(competitionSlug)
  if (!team || !comp || team.competitionSlug !== comp.slug) notFound()

  const [recent, upcoming] = await Promise.all([
    getFixtures(comp.leagueId, comp.season, undefined, 10),
    getFixtures(comp.leagueId, comp.season, 10),
  ])

  const teamRecent = recent.filter(m => m.teams.home.id === team.id || m.teams.away.id === team.id)
  const teamUpcoming = upcoming.filter(m => m.teams.home.id === team.id || m.teams.away.id === team.id)

  return (
    <TeamLayout team={team} competition={comp} activeTab="matches">
      <div className="space-y-8">
        <section>
          <h2 className="text-base font-bold text-white mb-3">Recent Results</h2>
          <div className="card overflow-hidden">
            {teamRecent.length === 0 ? (
              <div className="p-6 text-center text-xs text-gray-600">No recent results — add FOOTBALL_API_KEY for live data</div>
            ) : (
              <div className="divide-y divide-gray-800">
                {teamRecent.map(m => {
                  const isHome = m.teams.home.id === team.id
                  const teamSide = isHome ? m.teams.home : m.teams.away
                  const oppSide = isHome ? m.teams.away : m.teams.home
                  const teamGoals = isHome ? m.goals.home : m.goals.away
                  const oppGoals = isHome ? m.goals.away : m.goals.home
                  const won = teamSide.winner
                  const drew = teamSide.winner === false && oppSide.winner === false
                  const resultBg = won ? 'bg-green-500/10' : drew ? 'bg-yellow-500/10' : 'bg-red-500/10'
                  const resultColor = won ? 'text-green-400' : drew ? 'text-yellow-400' : 'text-red-400'
                  const resultLabel = won ? 'W' : drew ? 'D' : 'L'
                  return (
                    <div key={m.fixture.id} className={`flex items-center px-4 py-3 gap-4 ${resultBg}`}>
                      <span className={`text-xs font-bold w-4 ${resultColor}`}>{resultLabel}</span>
                      <span className="text-[10px] text-gray-500 w-28 shrink-0">{formatDate(m.fixture.date)}</span>
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <Image src={oppSide.logo} alt={oppSide.name} width={16} height={16} className="object-contain shrink-0" unoptimized />
                        <span className="text-xs text-gray-400 shrink-0">{isHome ? 'vs' : '@'}</span>
                        <span className="text-sm text-white truncate">{oppSide.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="text-sm font-bold text-white">{teamGoals}</span>
                        <span className="text-gray-600 text-xs">–</span>
                        <span className="text-sm font-bold text-white">{oppGoals}</span>
                      </div>
                      <span className="text-[10px] text-gray-600 shrink-0 hidden sm:block">{m.league.round}</span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-base font-bold text-white mb-3">Upcoming Fixtures</h2>
          <div className="card overflow-hidden">
            {teamUpcoming.length === 0 ? (
              <div className="p-6 text-center text-xs text-gray-600">No upcoming fixtures found</div>
            ) : (
              <div className="divide-y divide-gray-800">
                {teamUpcoming.map(m => {
                  const isHome = m.teams.home.id === team.id
                  const oppSide = isHome ? m.teams.away : m.teams.home
                  return (
                    <div key={m.fixture.id} className="flex items-center px-4 py-3 gap-4">
                      <span className="text-[10px] text-gray-500 w-28 shrink-0">{formatDate(m.fixture.date)}</span>
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <Image src={oppSide.logo} alt={oppSide.name} width={16} height={16} className="object-contain shrink-0" unoptimized />
                        <span className="text-xs text-gray-400 shrink-0">{isHome ? 'vs' : '@'}</span>
                        <span className="text-sm text-white truncate">{oppSide.name}</span>
                      </div>
                      <span className="text-[10px] text-gray-600 hidden sm:block">{m.league.round}</span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        <div className="text-center">
          <Link href={`/competitions/${comp.slug}/matches`} className="text-xs text-brand-400 hover:text-brand-300">← View all {comp.name} matches</Link>
        </div>
      </div>
    </TeamLayout>
  )
}
