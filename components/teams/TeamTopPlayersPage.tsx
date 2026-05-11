import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { TeamLayout } from '@/components/teams/TeamLayout'
import { getTeam, getCompetition, getTopScorers } from '@/lib/competitions'

interface Props {
  competitionSlug: string
  teamSlug: string
}

export async function TeamTopPlayersPage({ competitionSlug, teamSlug }: Props) {
  const team = getTeam(teamSlug)
  const comp = getCompetition(competitionSlug)
  if (!team || !comp || team.competitionSlug !== comp.slug) notFound()

  const allScorers = await getTopScorers(comp.leagueId, comp.season)
  const teamScorers = allScorers.filter(p =>
    p.statistics[0]?.team?.name?.toLowerCase().includes(team.name.toLowerCase()) ||
    team.name.toLowerCase().includes(p.statistics[0]?.team?.name?.toLowerCase() ?? '')
  )

  return (
    <TeamLayout team={team} competition={comp} activeTab="top-players">
      <h2 className="text-lg font-bold text-white mb-4">{team.name} — Top Players</h2>
      {teamScorers.length === 0 ? (
        <div className="card p-6 text-center">
          <p className="text-sm text-gray-500 mb-2">No player data available.</p>
          <p className="text-xs text-gray-600">Add FOOTBALL_API_KEY to see top scorers.</p>
          <Link href={`/competitions/${comp.slug}/top-players`} className="inline-block mt-4 text-xs text-brand-400 hover:text-brand-300">← View {comp.name} top scorers</Link>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-800 text-gray-500">
                <th className="text-left px-4 py-3">Player</th>
                <th className="text-center py-3 w-14">Goals</th>
                <th className="text-center py-3 w-14">Assists</th>
                <th className="text-center py-3 w-14 hidden sm:table-cell">Apps</th>
              </tr>
            </thead>
            <tbody>
              {teamScorers.map((p, i) => (
                <tr key={p.player.id} className="border-b border-gray-800 hover:bg-gray-800/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-600 w-4 text-right">{i + 1}</span>
                      <Image src={p.player.photo} alt={p.player.name} width={28} height={28} className="rounded-full object-cover" unoptimized />
                      <div>
                        <p className="text-white font-medium">{p.player.name}</p>
                        <p className="text-[10px] text-gray-500">{p.player.position} · {p.player.nationality}</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-center py-3 font-bold text-white">{p.statistics[0]?.goals?.total ?? 0}</td>
                  <td className="text-center py-3 text-gray-400">{p.statistics[0]?.assists ?? 0}</td>
                  <td className="text-center py-3 text-gray-400 hidden sm:table-cell">{p.statistics[0]?.games?.appearences ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="mt-4 text-center">
        <Link href={`/competitions/${comp.slug}/top-players`} className="text-xs text-brand-400 hover:text-brand-300">← {comp.name} top scorers</Link>
      </div>
    </TeamLayout>
  )
}
