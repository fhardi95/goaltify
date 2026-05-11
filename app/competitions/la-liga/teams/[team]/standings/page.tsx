import type { Metadata } from 'next'
import { TeamStandingsPage } from '@/components/teams/TeamStandingsPage'
import { getTeam, getCompetition } from '@/lib/competitions'
import { buildMetadata } from '@/lib/seo'

interface Props { params: Promise<{ team: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { team: teamSlug } = await params
  const team = getTeam(teamSlug)
  const comp = getCompetition('la-liga')
  if (!team || !comp) return {}
  return buildMetadata({
    title: `${team.name} Standings | ${comp.name} Table | Goaltify`,
    description: `${team.name} position in the ${comp.name} 2025/26 table.`,
    canonical: `https://goaltify.com/competitions/${comp.slug}/teams/${team.slug}/standings`,
    keywords: [`${team.name} table`, `${comp.name} standings`],
  })
}

export default async function Page({ params }: Props) {
  const { team } = await params
  return <TeamStandingsPage competitionSlug="la-liga" teamSlug={team} />
}
