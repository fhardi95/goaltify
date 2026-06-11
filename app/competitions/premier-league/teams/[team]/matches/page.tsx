import type { Metadata } from 'next'
import { TeamMatchesPage } from '@/components/teams/TeamMatchesPage'
import { getTeam, getCompetition } from '@/lib/competitions'
import { buildMetadata } from '@/lib/seo'

interface Props { params: Promise<{ team: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { team: teamSlug } = await params
  const team = getTeam(teamSlug)
  const comp = getCompetition('premier-league')
  if (!team || !comp) return {}
  return buildMetadata({
    title: `${team.name} Fixtures & Results | ${comp.name} | Goaltify`,
    description: `${team.name} fixtures and results in the ${comp.name} 2025/26.`,
    canonical: `https://goaltify.com/competitions/${comp.slug}/teams/${team.slug}/matches`,
    keywords: [`${team.name} fixtures`, `${team.name} results`],
  })
}


export async function generateStaticParams() {
  return ['manchester-united','liverpool','chelsea','arsenal','manchester-city','tottenham','aston-villa','newcastle','west-ham','everton','brentford','wolves','fulham','brighton','crystal-palace','southampton','nottingham-forest','leicester','ipswich','bournemouth'].map(team => ({ team }))
}

export default async function Page({ params }: Props) {
  const { team } = await params
  return <TeamMatchesPage competitionSlug="premier-league" teamSlug={team} />
}
