import type { Metadata } from 'next'
import Image from 'next/image'
import { CompetitionLayout } from '@/components/competitions/CompetitionLayout'
import { getCompetition, getFixtures, formatDate } from '@/lib/competitions'
import { buildMetadata } from '@/lib/seo'

const comp = getCompetition('premier-league')!

export const metadata: Metadata = buildMetadata({
  title: 'Premier League Fixtures & Results 2025/26',
  description: 'All Premier League 2025/26 fixtures and results. Upcoming matches, kick-off times and latest scores on Goaltify.',
  canonical: 'https://goaltify.com/competitions/premier-league/matches',
  keywords: ['Premier League fixtures', 'Premier League results', 'Premier League schedule 2025/26'],
})

export default async function PremierLeagueMatches() {
  const [upcoming, recent] = await Promise.all([
    getFixtures(comp.leagueId, comp.season, 20),
    getFixtures(comp.leagueId, comp.season, undefined, 10),
  ])

  const MatchRow = ({ m }: { m: (typeof upcoming)[0] }) => {
    const isFinished = ['FT', 'AET', 'PEN'].includes(m.fixture.status.short)
    const isLive = ['1H', '2H', 'ET', 'P'].includes(m.fixture.status.short)

    return (
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-800 last:border-0 hover:bg-gray-800/20 transition-colors">
        <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
          <span className={`text-sm truncate text-right ${m.teams.home.winner ? 'font-bold text-white' : 'text-gray-400'}`}>{m.teams.home.name}</span>
          <Image src={m.teams.home.logo} alt={m.teams.home.name} width={20} height={20} className="object-contain shrink-0" />
        </div>

        <div className="flex items-center gap-1.5 shrink-0 w-24 justify-center">
          {isFinished ? (
            <div className="flex items-center gap-1.5">
              <span className="text-base font-bold text-white">{m.goals.home}</span>
              <span className="text-gray-600 text-xs">–</span>
              <span className="text-base font-bold text-white">{m.goals.away}</span>
            </div>
          ) : isLive ? (
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
              <span className="text-sm font-bold text-red-400">{m.goals.home ?? 0}–{m.goals.away ?? 0}</span>
              <span className="text-xs text-red-400">{m.fixture.status.elapsed}'</span>
            </div>
          ) : (
            <span className="text-xs text-gray-400 text-center">{new Date(m.fixture.date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</span>
          )}
        </div>

        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Image src={m.teams.away.logo} alt={m.teams.away.name} width={20} height={20} className="object-contain shrink-0" />
          <span className={`text-sm truncate ${m.teams.away.winner ? 'font-bold text-white' : 'text-gray-400'}`}>{m.teams.away.name}</span>
        </div>
      </div>
    )
  }

  const groupByRound = (fixtures: typeof upcoming) => {
    const groups: Record<string, typeof upcoming> = {}
    fixtures.forEach(f => {
      const round = f.league.round ?? 'Unknown'
      if (!groups[round]) groups[round] = []
      groups[round].push(f)
    })
    return groups
  }

  const upcomingGroups = groupByRound(upcoming)
  const recentGroups = groupByRound(recent)

  return (
    <CompetitionLayout competition={comp} activeTab="matches">
      <div className="space-y-6">

        {recent.length > 0 && (
          <section>
            <h2 className="text-base font-bold text-white mb-3">Recent Results</h2>
            {Object.entries(recentGroups).reverse().map(([round, matches]) => (
              <div key={round} className="card overflow-hidden mb-3">
                <div className="px-4 py-2 bg-gray-800/50 border-b border-gray-800">
                  <p className="text-xs font-medium text-gray-400">{round}</p>
                </div>
                {matches.map(m => <MatchRow key={m.fixture.id} m={m} />)}
              </div>
            ))}
          </section>
        )}

        <section>
          <h2 className="text-base font-bold text-white mb-3">Upcoming Fixtures</h2>
          {upcoming.length === 0 ? (
            <div className="card p-8 text-center text-gray-600 text-sm">Add FOOTBALL_API_KEY to see live fixtures</div>
          ) : Object.entries(upcomingGroups).map(([round, matches]) => (
            <div key={round} className="card overflow-hidden mb-3">
              <div className="px-4 py-2 bg-gray-800/50 border-b border-gray-800">
                <p className="text-xs font-medium text-gray-400">{round}</p>
              </div>
              {matches.map(m => (
                <div key={m.fixture.id} className="border-b border-gray-800 last:border-0">
                  <p className="text-[10px] text-gray-600 px-4 pt-2">{formatDate(m.fixture.date)}</p>
                  <MatchRow m={m} />
                </div>
              ))}
            </div>
          ))}
        </section>
      </div>
    </CompetitionLayout>
  )
}
