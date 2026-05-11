import type { Metadata } from 'next'
import { TeamOverviewPage } from '@/components/teams/TeamOverviewPage'
import { getTeam, getCompetition } from '@/lib/competitions'
import { buildMetadata } from '@/lib/seo'

interface Props { params: Promise<{ team: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { team: teamSlug } = await params
  const team = getTeam(teamSlug)
  const comp = getCompetition('bundesliga')
  if (!team || !comp) return {}
  return buildMetadata({
    title: `${team.name} — Overview | ${comp.name} | Goaltify`,
    description: `${team.name} overview: recent results, upcoming fixtures and latest news on Goaltify.`,
    canonical: `https://goaltify.com/competitions/${comp.slug}/teams/${team.slug}`,
    keywords: [team.name, comp.name, `${team.name} fixtures`],
  })
}

export default async function Page({ params }: Props) {
  const { team } = await params
  return <TeamOverviewPage competitionSlug="bundesliga" teamSlug={team} />
}
