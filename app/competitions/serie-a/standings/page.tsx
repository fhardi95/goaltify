import type { Metadata } from 'next'
import Image from 'next/image'
import { CompetitionLayout } from '@/components/competitions/CompetitionLayout'
import { getCompetition, getStandings, descriptionColor, formColor } from '@/lib/competitions'
import { buildMetadata } from '@/lib/seo'
const comp = getCompetition('serie-a')!
export const metadata: Metadata = buildMetadata({
  title: 'Serie A Table 2025/26 — Live Standings | Goaltify',
  description: 'Serie A 2025/26 standings table with points, goal difference, form and European qualification places.',
  canonical: 'https://goaltify.com/competitions/serie-a/standings',
  keywords: ['Serie A table', 'Serie A standings 2025/26', 'Serie A table today'],
})
const ZONE_KEYS = [{color:'bg-blue-500',label:'Champions League'},{color:'bg-orange-500',label:'UEFA Europa League'},{color:'bg-green-400',label:'Conference League'},{color:'bg-red-500',label:'Relegation'}]
export default async function SAStandings() {
  const standings = await getStandings(comp.leagueId, comp.season)
  return (
    <CompetitionLayout competition={comp} activeTab="standings">
      <h2 className="text-lg font-bold text-white mb-4">Serie A Table — 2025/26</h2>
      <div className="flex flex-wrap gap-4 mb-4">{ZONE_KEYS.map(z=><div key={z.label} className="flex items-center gap-1.5"><span className={`w-3 h-3 rounded-sm ${z.color}`}/><span className="text-xs text-gray-400">{z.label}</span></div>)}</div>
      <div className="card overflow-x-auto">
        <table className="w-full text-xs min-w-[640px]">
          <thead><tr className="border-b border-gray-800 text-gray-500">
            <th className="text-left px-3 py-3">Pos</th><th className="text-left px-3 py-3">Team</th>
            <th className="text-center py-3">P</th><th className="text-center py-3">W</th><th className="text-center py-3">D</th><th className="text-center py-3">L</th>
            <th className="text-center py-3">F</th><th className="text-center py-3">A</th><th className="text-center py-3">+/-</th>
            <th className="text-center py-3 text-white font-bold">Pts</th><th className="text-right px-3 py-3">Form</th>
          </tr></thead>
          <tbody>
            {standings.length === 0 ? <tr><td colSpan={11} className="text-center py-12 text-gray-500">Add FOOTBALL_API_KEY for live standings</td></tr>
            : standings.map(row=>(
              <tr key={row.team.id} className={`border-b border-gray-800 hover:bg-gray-800/30 border-l-2 ${descriptionColor(row.description)}`}>
                <td className="px-3 py-3 text-gray-400">{row.rank}</td>
                <td className="px-3 py-3"><div className="flex items-center gap-2"><Image src={row.team.logo} alt={row.team.name} width={20} height={20} className="object-contain shrink-0"/><span className="font-semibold text-white">{row.team.name}</span></div></td>
                <td className="text-center py-3 text-gray-300">{row.played}</td><td className="text-center py-3 text-gray-300">{row.win}</td>
                <td className="text-center py-3 text-gray-300">{row.draw}</td><td className="text-center py-3 text-gray-300">{row.lose}</td>
                <td className="text-center py-3 text-gray-300">{row.goals.for}</td><td className="text-center py-3 text-gray-300">{row.goals.against}</td>
                <td className={`text-center py-3 font-medium ${row.goalsDiff>0?'text-green-400':row.goalsDiff<0?'text-red-400':'text-gray-400'}`}>{row.goalsDiff>0?`+${row.goalsDiff}`:row.goalsDiff}</td>
                <td className="text-center py-3 font-bold text-white text-sm">{row.points}</td>
                <td className="px-3 py-3"><div className="flex gap-0.5 justify-end">{row.form?.split('').slice(-5).map((f,i)=><span key={i} className={`w-5 h-5 rounded-full text-[9px] font-bold text-white flex items-center justify-center ${formColor(f)}`}>{f}</span>)}</div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CompetitionLayout>
  )
}
