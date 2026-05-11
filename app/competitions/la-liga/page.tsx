import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { CompetitionLayout } from '@/components/competitions/CompetitionLayout'
import { getCompetition, getStandings, getFixtures, descriptionColor, formColor, formatDate } from '@/lib/competitions'
import { buildMetadata } from '@/lib/seo'

const comp = getCompetition('la-liga')!

export const metadata: Metadata = buildMetadata({
  title: 'La Liga 2025/26 — Table, Fixtures & News | Goaltify',
  description: 'La Liga 2025/26 coverage. Live table, upcoming fixtures, results, top scorers and latest news on Goaltify.',
  canonical: 'https://goaltify.com/competitions/la-liga',
  keywords: comp.keywords,
})

export default async function LLOverview() {
  const [standings, recent, upcoming] = await Promise.all([
    getStandings(comp.leagueId, comp.season),
    getFixtures(comp.leagueId, comp.season, undefined, 5),
    getFixtures(comp.leagueId, comp.season, 5),
  ])
  const top5 = standings.slice(0, 5)

  return (
    <CompetitionLayout competition={comp} activeTab="overview">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-white">Top 5 — Table</h2>
              <Link href="/competitions/la-liga/standings" className="text-xs text-brand-400">Full table →</Link>
            </div>
            <div className="card overflow-hidden">
              <table className="w-full text-xs">
                <thead><tr className="border-b border-gray-800 text-gray-500">
                  <th className="text-left px-3 py-2">Pos</th><th className="text-left px-3 py-2">Team</th>
                  <th className="text-center py-2">P</th><th className="text-center py-2">W</th><th className="text-center py-2">D</th><th className="text-center py-2">L</th>
                  <th className="text-center py-2">+/-</th><th className="text-center py-2 text-white font-bold">Pts</th>
                  <th className="text-right px-3 py-2 hidden sm:table-cell">Form</th>
                </tr></thead>
                <tbody>
                  {top5.length === 0 ? (
                    <tr><td colSpan={9} className="text-center py-6 text-gray-600 text-xs">Add FOOTBALL_API_KEY for live data</td></tr>
                  ) : top5.map(row => (
                    <tr key={row.team.id} className={`border-b border-gray-800 hover:bg-gray-800/30 border-l-2 ${descriptionColor(row.description)}`}>
                      <td className="px-3 py-2.5 text-gray-400">{row.rank}</td>
                      <td className="px-3 py-2.5"><div className="flex items-center gap-2"><Image src={row.team.logo} alt={row.team.name} width={16} height={16} className="object-contain" /><span className="text-white font-medium">{row.team.name}</span></div></td>
                      <td className="text-center py-2.5 text-gray-400">{row.played}</td><td className="text-center py-2.5 text-gray-400">{row.win}</td>
                      <td className="text-center py-2.5 text-gray-400">{row.draw}</td><td className="text-center py-2.5 text-gray-400">{row.lose}</td>
                      <td className="text-center py-2.5 text-gray-400">{row.goalsDiff > 0 ? `+${row.goalsDiff}` : row.goalsDiff}</td>
                      <td className="text-center py-2.5 font-bold text-white">{row.points}</td>
                      <td className="px-3 py-2.5 hidden sm:table-cell"><div className="flex gap-0.5 justify-end">{row.form?.split('').slice(-5).map((f,i)=><span key={i} className={`w-4 h-4 rounded-full text-[8px] font-bold text-white flex items-center justify-center ${formColor(f)}`}>{f}</span>)}</div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-white">Recent Results</h2>
              <Link href="/competitions/la-liga/matches" className="text-xs text-brand-400">All matches →</Link>
            </div>
            <div className="space-y-2">
              {recent.length === 0 ? <div className="card p-4 text-center text-xs text-gray-600">No data — add FOOTBALL_API_KEY</div>
              : recent.map(m=>(
                <div key={m.fixture.id} className="card p-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 flex-1 min-w-0"><Image src={m.teams.home.logo} alt={m.teams.home.name} width={18} height={18} className="object-contain shrink-0"/><span className={`text-sm truncate ${m.teams.home.winner?'font-bold text-white':'text-gray-400'}`}>{m.teams.home.name}</span></div>
                  <div className="flex items-center gap-2 shrink-0"><span className="text-sm font-bold text-white">{m.goals.home}</span><span className="text-gray-600 text-xs">–</span><span className="text-sm font-bold text-white">{m.goals.away}</span></div>
                  <div className="flex items-center gap-2 flex-1 min-w-0 justify-end"><span className={`text-sm truncate text-right ${m.teams.away.winner?'font-bold text-white':'text-gray-400'}`}>{m.teams.away.name}</span><Image src={m.teams.away.logo} alt={m.teams.away.name} width={18} height={18} className="object-contain shrink-0"/></div>
                </div>
              ))}
            </div>
          </section>
        </div>
        <aside className="space-y-4">
          <div className="card p-4">
            <h3 className="text-sm font-semibold text-white mb-3">Upcoming fixtures</h3>
            <div className="space-y-2">
              {upcoming.slice(0,5).map(m=>(
                <div key={m.fixture.id} className="border-b border-gray-800 pb-2 last:border-0 last:pb-0">
                  <p className="text-[10px] text-gray-600 mb-1">{formatDate(m.fixture.date)}</p>
                  <div className="flex items-center justify-between gap-2"><span className="text-xs text-white truncate">{m.teams.home.name}</span><span className="text-[10px] text-gray-500 shrink-0">vs</span><span className="text-xs text-white truncate text-right">{m.teams.away.name}</span></div>
                </div>
              ))}
            </div>
          </div>
          <div className="card p-4">
            <h3 className="text-sm font-semibold text-white mb-2">Quick links</h3>
            <div className="space-y-1.5">
              {[{label:'📊 Full standings',href:'/competitions/la-liga/standings'},{label:'⚽ Top scorers',href:'/competitions/la-liga/top-players'},{label:'📰 Latest news',href:'/competitions/la-liga/news'},{label:'🗓 All fixtures',href:'/competitions/la-liga/matches'}].map(l=>(
                <Link key={l.href} href={l.href} className="block text-xs text-gray-400 hover:text-brand-400 transition-colors py-1 border-b border-gray-800 last:border-0">{l.label}</Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </CompetitionLayout>
  )
}
