import type { Metadata } from 'next'
import { TeamStandingsPage } from '@/components/teams/TeamStandingsPage'
import { getTeam, getCompetition } from '@/lib/competitions'
import { buildMetadata } from '@/lib/seo'

interface Props { params: Promise<{ team: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { team: teamSlug } = await params
  const team = getTeam(teamSlug)
  const comp = getCompetition('premier-league')
  if (!team || !comp) return {}
  return buildMetadata({
    title: `${team.name} Standings | ${comp.name} Table | Goaltify`,
    description: `${team.name} position in the ${comp.name} 2025/26 table.`,
    canonical: `https://goaltify.com/competitions/${comp.slug}/teams/${team.slug}/standings`,
    keywords: [`${team.name} table`, `${comp.name} standings`],
  })
}


export async function generateStaticParams() {
  return ['manchester-united','liverpool','chelsea','arsenal','manchester-city','tottenham','aston-villa','newcastle','west-ham','everton','brentford','wolves','fulham','brighton','crystal-palace','southampton','nottingham-forest','leicester','ipswich','bournemouth'].map(team => ({ team }))
}

export default async function Page({ params }: Props) {
  const { team } = await params
  return <TeamStandingsPage competitionSlug="premier-league" teamSlug={team} />
}
