import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { TeamLayout } from '@/components/teams/TeamLayout'
import { getTeam, getCompetition, getStandings, descriptionColor, formColor, TEAMS } from '@/lib/competitions'
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
    title: `${team.name} Standings | ${comp.name} Table 2025/26 | Goaltify`,
    description: `${team.name} position in the ${comp.name} 2025/26 standings table with full league table.`,
    canonical: `https://goaltify.com/competitions/${comp.slug}/teams/${team.slug}/standings`,
    keywords: [`${team.name} table`, `${team.name} position`, `${comp.name} standings`],
  })
}

export default async function TeamStandings({ params }: Props) {
  const team = getTeam(params.team)
  const comp = getCompetition(params.competition)
  if (!team || !comp || team.competitionSlug !== comp.slug) notFound()

  const standings = await getStandings(comp.leagueId, comp.season)

  return (
    <TeamLayout team={team} competition={comp} activeTab="standings">
      <h2 className="text-lg font-bold text-white mb-4">{comp.name} Table — 2025/26</h2>

      <div className="card overflow-x-auto">
        <table className="w-full text-xs min-w-[560px]">
          <thead>
            <tr className="border-b border-gray-800 text-gray-500">
              <th className="text-left px-3 py-3 w-10">Pos</th>
              <th className="text-left px-3 py-3">Team</th>
              <th className="text-center py-3 w-10">P</th>
              <th className="text-center py-3 w-10">W</th>
              <th className="text-center py-3 w-10">D</th>
              <th className="text-center py-3 w-10">L</th>
              <th className="text-center py-3 w-10">+/-</th>
              <th className="text-center py-3 w-12 font-bold text-white">Pts</th>
              <th className="text-right px-3 py-3 w-24 hidden sm:table-cell">Form</th>
            </tr>
          </thead>
          <tbody>
            {standings.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-8 text-gray-600">
                  Add FOOTBALL_API_KEY to see live standings
                </td>
              </tr>
            ) : standings.map(row => {
              const isCurrentTeam = row.team.name.toLowerCase().includes(team.name.toLowerCase()) ||
                team.name.toLowerCase().includes(row.team.name.toLowerCase())
              return (
                <tr
                  key={row.team.id}
                  className={`border-b border-gray-800 border-l-2 ${descriptionColor(row.description)} ${
                    isCurrentTeam
                      ? 'bg-brand-400/10 hover:bg-brand-400/15'
                      : 'hover:bg-gray-800/30'
                  }`}
                >
                  <td className="px-3 py-2.5 text-gray-400">{row.rank}</td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <Image src={row.team.logo} alt={row.team.name} width={16} height={16} className="object-contain" unoptimized />
                      <span className={`font-medium ${isCurrentTeam ? 'text-brand-400' : 'text-white'}`}>
                        {row.team.name}
                        {isCurrentTeam && <span className="ml-1 text-[9px] text-brand-400 opacity-70">◀</span>}
                      </span>
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
                        <span
                          key={i}
                          className={`w-4 h-4 rounded-full text-[8px] font-bold text-white flex items-center justify-center ${formColor(f)}`}
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-center">
        <Link
          href={`/competitions/${comp.slug}/standings`}
          className="text-xs text-brand-400 hover:text-brand-300"
        >
          ← Full {comp.name} table
        </Link>
      </div>
    </TeamLayout>
  )
}
