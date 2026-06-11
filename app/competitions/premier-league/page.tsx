import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { CompetitionLayout } from '@/components/competitions/CompetitionLayout'
import { getCompetition, getStandings, getFixtures, descriptionColor, formColor, formatDate } from '@/lib/competitions'
import { buildMetadata } from '@/lib/seo'

const comp = getCompetition('premier-league')!

export const metadata: Metadata = buildMetadata({
  title: 'Premier League 2025/26 — News, Table, Fixtures & Top Scorers',
  description: 'Premier League 2025/26 live coverage on Goaltify. Latest news, standings table, fixtures, results and top scorers updated daily.',
  canonical: 'https://goaltify.com/competitions/premier-league',
  keywords: comp.keywords,
})

export default async function PremierLeagueOverview() {
  const [standings, recent, upcoming] = await Promise.all([
    getStandings(comp.leagueId, comp.season),
    getFixtures(comp.leagueId, comp.season, undefined, 5),
    getFixtures(comp.leagueId, comp.season, 5),
  ])

  const top5 = standings.slice(0, 5)

  return (
    <CompetitionLayout competition={comp} activeTab="overview">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left: mini table + recent results */}
        <div className="lg:col-span-2 space-y-6">

          {/* Mini standings */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-white">Top 5 — Table</h2>
              <Link href="/competitions/premier-league/standings" className="text-xs text-brand-400 hover:text-brand-300">Full table →</Link>
            </div>
            <div className="card overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-500">
                    <th className="text-left px-3 py-2 w-8">Pos</th>
                    <th className="text-left px-3 py-2">Team</th>
                    <th className="text-center py-2 w-8">P</th>
                    <th className="text-center py-2 w-8">W</th>
                    <th className="text-center py-2 w-8">D</th>
                    <th className="text-center py-2 w-8">L</th>
                    <th className="text-center py-2 w-10">+/-</th>
                    <th className="text-center py-2 w-10 font-bold text-white">Pts</th>
                    <th className="text-right px-3 py-2 w-24 hidden sm:table-cell">Form</th>
                  </tr>
                </thead>
                <tbody>
                  {top5.length === 0 ? (
                    <tr><td colSpan={9} className="text-center py-6 text-gray-600">Add FOOTBALL_API_KEY to see live data</td></tr>
                  ) : top5.map(row => (
                    <tr key={row.team.id} className={`border-b border-gray-800 hover:bg-gray-800/30 border-l-2 ${descriptionColor(row.description)}`}>
                      <td className="px-3 py-2.5 text-gray-400">{row.rank}</td>
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-2">
                          <Image src={row.team.logo} alt={row.team.name} width={16} height={16} className="object-contain" />
                          <span className="text-white font-medium">{row.team.name}</span>
                        </div>
                      </td>
                      <td className="text-center py-2.5 text-gray-400">{row.played}</td>
                      <td className="text-center py-2.5 text-gray-400">{row.win}</td>
                      <td className="text-center py-2.5 text-gray-400">{row.draw}</td>
                      <td className="text-center py-2.5 text-gray-400">{row.lose}</td>
                      <td className="text-center py-2.5 text-gray-400">{row.goalsDiff > 0 ? `+${row.goalsDiff}` : row.goalsDiff}</td>
                      <td className="text-center py-2.5 font-bold text-white">{row.points}</td>
                      <td className="px-3 py-2.5 hidden sm:table-cell">
                        <div className="flex gap-0.5 justify-end">
                          {row.form?.split('').slice(-5).map((f, i) => (
                            <span key={i} className={`w-4 h-4 rounded-full text-[8px] font-bold text-white flex items-center justify-center ${formColor(f)}`}>{f}</span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Recent results */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-white">Recent Results</h2>
              <Link href="/competitions/premier-league/matches" className="text-xs text-brand-400 hover:text-brand-300">All matches →</Link>
            </div>
            <div className="space-y-2">
              {recent.length === 0 ? (
                <div className="card p-4 text-center text-xs text-gray-600">No recent results — add FOOTBALL_API_KEY for live data</div>
              ) : recent.map(m => (
                <div key={m.fixture.id} className="card p-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <Image src={m.teams.home.logo} alt={m.teams.home.name} width={18} height={18} className="object-contain shrink-0" />
                    <span className={`text-sm truncate ${m.teams.home.winner ? 'font-bold text-white' : 'text-gray-400'}`}>{m.teams.home.name}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-sm font-bold text-white">{m.goals.home}</span>
                    <span className="text-gray-600 text-xs">–</span>
                    <span className="text-sm font-bold text-white">{m.goals.away}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
                    <span className={`text-sm truncate text-right ${m.teams.away.winner ? 'font-bold text-white' : 'text-gray-400'}`}>{m.teams.away.name}</span>
                    <Image src={m.teams.away.logo} alt={m.teams.away.name} width={18} height={18} className="object-contain shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right: sidebar */}
        <aside className="space-y-4">
          <div className="card p-4">
            <h3 className="text-sm font-semibold text-white mb-3">Upcoming fixtures</h3>
            <div className="space-y-2">
              {upcoming.length === 0 ? (
                <p className="text-xs text-gray-600">Add FOOTBALL_API_KEY for fixtures</p>
              ) : upcoming.slice(0, 5).map(m => (
                <div key={m.fixture.id} className="border-b border-gray-800 pb-2 last:border-0 last:pb-0">
                  <p className="text-[10px] text-gray-600 mb-1">{formatDate(m.fixture.date)}</p>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-white truncate">{m.teams.home.name}</span>
                    <span className="text-[10px] text-gray-500 shrink-0">vs</span>
                    <span className="text-xs text-white truncate text-right">{m.teams.away.name}</span>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/competitions/premier-league/matches" className="block text-center text-xs text-brand-400 hover:text-brand-300 mt-3">View all fixtures →</Link>
          </div>

          <div className="card p-4">
            <h3 className="text-sm font-semibold text-white mb-2">Quick links</h3>
            <div className="space-y-1.5">
              {[
                { label: '📊 Full standings', href: '/competitions/premier-league/standings' },
                { label: '⚽ Top scorers', href: '/competitions/premier-league/top-players' },
                { label: '📰 Latest news', href: '/competitions/premier-league/news' },
                { label: '🗓 All fixtures', href: '/competitions/premier-league/matches' },
              ].map(l => (
                <Link key={l.href} href={l.href} className="block text-xs text-gray-400 hover:text-brand-400 transition-colors py-1 border-b border-gray-800 last:border-0">{l.label}</Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </CompetitionLayout>
  )
}
