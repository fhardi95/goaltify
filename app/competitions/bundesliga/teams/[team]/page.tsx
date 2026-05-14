import type { Metadata } from 'next'
import { TeamOverviewPage } from '@/components/teams/TeamOverviewPage'
import { getTeam, getCompetition } from '@/lib/competitions'
import { getTeamContent } from '@/lib/team-content'
import { buildMetadata } from '@/lib/seo'

interface Props { params: Promise<{ team: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { team: teamSlug } = await params
  const team = getTeam(teamSlug)
  const comp = getCompetition('bundesliga')
  const content = getTeamContent(teamSlug)
  if (!team || !comp) return {}
  return buildMetadata({
    title: `${team.name} — History, Stats, Squad & Fixtures | ${comp.name} | Goaltify`,
    description: content
      ? `${team.name} football club: founded ${content.founded}, stadium ${content.stadium} (${content.stadiumCapacity.toLocaleString()}). ${content.history.substring(0, 140)}...`
      : `${team.name} overview, fixtures, standings and top scorers in the ${comp.name} on Goaltify.`,
    canonical: `https://goaltify.com/competitions/${comp.slug}/teams/${team.slug}`,
    keywords: [
      team.name,
      comp.name,
      `${team.name} history`,
      `${team.name} fixtures`,
      `${team.name} squad`,
      `${team.name} stats`,
      content?.stadium ?? '',
      content?.city ?? '',
    ].filter(Boolean),
  })
}

export async function generateStaticParams() {
  return ['bayern-munich','borussia-dortmund','rb-leipzig','bayer-leverkusen','eintracht-frankfurt','vfb-stuttgart','wolfsburg','borussia-monchengladbach','union-berlin','werder-bremen'].map(team => ({ team }))
}

export default async function Page({ params }: Props) {
  const { team } = await params
  return <TeamOverviewPage competitionSlug="bundesliga" teamSlug={team} />
}
