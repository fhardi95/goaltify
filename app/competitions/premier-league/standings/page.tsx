import type { Metadata } from 'next'
import Image from 'next/image'
import { CompetitionLayout } from '@/components/competitions/CompetitionLayout'
import { getCompetition, getStandings, descriptionColor, formColor } from '@/lib/competitions'
import { buildMetadata } from '@/lib/seo'

const comp = getCompetition('premier-league')!

export const metadata: Metadata = buildMetadata({
  title: 'Premier League Table 2025/26 — Live Standings',
  description: 'Premier League 2025/26 table updated in real time. Full standings with points, goal difference, form guide and European places.',
  canonical: 'https://goaltify.com/competitions/premier-league/standings',
  keywords: ['Premier League table', 'Premier League standings 2025', 'Premier League table 2025/26'],
})

const ZONE_KEYS = [
  { color: 'bg-blue-500', label: 'Champions League' },
  { color: 'bg-orange-500', label: 'UEFA Europa League' },
  { color: 'bg-green-400', label: 'Europa Conference League Qualification' },
  { color: 'bg-red-500', label: 'Relegation' },
]

export default async function PremierLeagueStandings() {
  const standings = await getStandings(comp.leagueId, comp.season)

  return (
    <CompetitionLayout competition={comp} activeTab="standings">
      <h2 className="text-lg font-bold text-white mb-4">Premier League Table — 2025/26</h2>

      {/* Zone key */}
      <div className="flex flex-wrap gap-4 mb-4">
        {ZONE_KEYS.map(z => (
          <div key={z.label} className="flex items-center gap-1.5">
            <span className={`w-3 h-3 rounded-sm ${z.color}`} />
            <span className="text-xs text-gray-400">{z.label}</span>
          </div>
        ))}
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-xs min-w-[640px]">
          <thead>
            <tr className="border-b border-gray-800 text-gray-500">
              <th className="text-left px-3 py-3 w-10">Pos</th>
              <th className="text-left px-3 py-3">Team</th>
              <th className="text-center py-3 w-10">P</th>
              <th className="text-center py-3 w-10">W</th>
              <th className="text-center py-3 w-10">D</th>
              <th className="text-center py-3 w-10">L</th>
              <th className="text-center py-3 w-10">F</th>
              <th className="text-center py-3 w-10">A</th>
              <th className="text-center py-3 w-12">+/-</th>
              <th className="text-center py-3 w-12 text-white font-bold">Pts</th>
              <th className="text-right px-3 py-3 w-28">Form</th>
            </tr>
          </thead>
          <tbody>
            {standings.length === 0 ? (
              <tr>
                <td colSpan={11} className="text-center py-12 text-gray-500">
                  <p className="mb-1">Live standings require an API key</p>
                  <p className="text-xs text-gray-600">Add FOOTBALL_API_KEY to your .env.local and Vercel environment variables</p>
                </td>
              </tr>
            ) : standings.map((row, idx) => (
              <tr
                key={row.team.id}
                className={`border-b border-gray-800 hover:bg-gray-800/30 transition-colors border-l-2 ${descriptionColor(row.description)}`}
              >
                <td className="px-3 py-3 text-gray-400 font-medium">{row.rank}</td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-2">
                    <Image src={row.team.logo} alt={row.team.name} width={20} height={20} className="object-contain shrink-0" />
                    <span className="font-semibold text-white">{row.team.name}</span>
                  </div>
                </td>
                <td className="text-center py-3 text-gray-300">{row.played}</td>
                <td className="text-center py-3 text-gray-300">{row.win}</td>
                <td className="text-center py-3 text-gray-300">{row.draw}</td>
                <td className="text-center py-3 text-gray-300">{row.lose}</td>
                <td className="text-center py-3 text-gray-300">{row.goals.for}</td>
                <td className="text-center py-3 text-gray-300">{row.goals.against}</td>
                <td className={`text-center py-3 font-medium ${row.goalsDiff > 0 ? 'text-green-400' : row.goalsDiff < 0 ? 'text-red-400' : 'text-gray-400'}`}>
                  {row.goalsDiff > 0 ? `+${row.goalsDiff}` : row.goalsDiff}
                </td>
                <td className="text-center py-3 font-bold text-white text-sm">{row.points}</td>
                <td className="px-3 py-3">
                  <div className="flex gap-0.5 justify-end">
                    {row.form?.split('').slice(-5).map((f, i) => (
                      <span key={i} title={f === 'W' ? 'Win' : f === 'D' ? 'Draw' : 'Loss'}
                        className={`w-5 h-5 rounded-full text-[9px] font-bold text-white flex items-center justify-center ${formColor(f)}`}>
                        {f}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-600 mt-2 text-right">Data via API-Football · Updated hourly</p>
    </CompetitionLayout>
  )
}
