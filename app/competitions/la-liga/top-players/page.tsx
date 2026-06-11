import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CompetitionLayout } from '@/components/competitions/CompetitionLayout'
import { getCompetition, getTopScorers } from '@/lib/competitions'
import { buildMetadata } from '@/lib/seo'
const comp = getCompetition('la-liga')!
export const metadata: Metadata = buildMetadata({
  title: 'La Liga Top Scorers 2025/26',
  description: 'La Liga 2025/26 top scorers, goals, assists and appearances. Updated daily on Goaltify.',
  canonical: 'https://goaltify.com/competitions/la-liga/top-players',
  keywords: ['La Liga top scorers', 'La Liga goals 2025/26', 'La Liga golden boot'],
})
export default async function LLTopPlayers() {
  const scorers = await getTopScorers(comp.leagueId, comp.season)
  return (
    <CompetitionLayout competition={comp} activeTab="top-players">
      <h2 className="text-lg font-bold text-white mb-4">Top Scorers — 2025/26</h2>
      <div className="card overflow-x-auto">
        <table className="w-full text-sm min-w-[500px]">
          <thead><tr className="border-b border-gray-800 text-xs text-gray-500">
            <th className="text-left px-4 py-3">#</th><th className="text-left px-4 py-3">Player</th>
            <th className="text-left py-3 hidden sm:table-cell">Club</th>
            <th className="text-center py-3">Apps</th><th className="text-center py-3">Goals</th><th className="text-center py-3">Assists</th>
          </tr></thead>
          <tbody>
            {scorers.length===0?<tr><td colSpan={6} className="text-center py-12 text-gray-500 text-sm">Add FOOTBALL_API_KEY to see top scorers</td></tr>
            :scorers.slice(0,20).map((s,i)=>{
              const stats=s.statistics[0]
              const slug=s.player.name.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'')
              return(
                <tr key={s.player.id} className="border-b border-gray-800 hover:bg-gray-800/30">
                  <td className="px-4 py-3 text-gray-500">{i+1}</td>
                  <td className="px-4 py-3">
                    <Link href={`/players/${slug}-${s.player.id}`} className="flex items-center gap-3 group">
                      <Image src={s.player.photo} alt={s.player.name} width={32} height={32} className="rounded-full object-cover shrink-0"/>
                      <div><p className="font-semibold text-white group-hover:text-brand-400">{s.player.name}</p><p className="text-xs text-gray-500">{s.player.nationality}</p></div>
                    </Link>
                  </td>
                  <td className="py-3 hidden sm:table-cell"><div className="flex items-center gap-2"><Image src={stats?.team?.logo??''} alt={stats?.team?.name??''} width={16} height={16} className="object-contain"/><span className="text-xs text-gray-400">{stats?.team?.name}</span></div></td>
                  <td className="text-center py-3 text-gray-400">{stats?.games?.appearences??'–'}</td>
                  <td className="text-center py-3 font-bold text-white">{stats?.goals?.total??0}</td>
                  <td className="text-center py-3 text-gray-300">{stats?.assists??0}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </CompetitionLayout>
  )
}
