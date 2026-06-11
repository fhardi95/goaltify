import type { Metadata } from 'next'
import { TeamNewsPage } from '@/components/teams/TeamNewsPage'
import { getTeam, getCompetition } from '@/lib/competitions'
import { buildMetadata } from '@/lib/seo'

interface Props { params: Promise<{ team: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { team: teamSlug } = await params
  const team = getTeam(teamSlug)
  const comp = getCompetition('ligue-1')
  if (!team || !comp) return {}
  return buildMetadata({
    title: `${team.name} News | ${comp.name} | Goaltify`,
    description: `Latest ${team.name} news on Goaltify.`,
    canonical: `https://goaltify.com/competitions/${comp.slug}/teams/${team.slug}/news`,
    keywords: [`${team.name} news`],
  })
}


export async function generateStaticParams() {
  return ['paris-saint-germain','lyon','marseille','nice','lille','monaco','rennes','lens','montpellier','toulouse'].map(team => ({ team }))
}

export default async function Page({ params }: Props) {
  const { team } = await params
  return <TeamNewsPage competitionSlug="ligue-1" teamSlug={team} />
}
