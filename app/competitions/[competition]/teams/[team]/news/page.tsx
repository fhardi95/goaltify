import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { TeamLayout } from '@/components/teams/TeamLayout'
import { getTeam, getCompetition, TEAMS } from '@/lib/competitions'
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
    title: `${team.name} News | ${comp.name} | Goaltify`,
    description: `Latest ${team.name} news, transfers, injuries and match previews on Goaltify.`,
    canonical: `https://goaltify.com/competitions/${comp.slug}/teams/${team.slug}/news`,
    keywords: [`${team.name} news`, `${team.name} transfers`, `${team.name} latest`],
  })
}

export default function TeamNews({ params }: Props) {
  const team = getTeam(params.team)
  const comp = getCompetition(params.competition)
  if (!team || !comp || team.competitionSlug !== comp.slug) notFound()

  return (
    <TeamLayout team={team} competition={comp} activeTab="news">
      <h2 className="text-lg font-bold text-white mb-4">{team.name} — Latest News</h2>
      <div className="card p-6 text-center text-gray-500 text-sm">
        <p className="mb-2">News articles coming soon.</p>
        <p className="text-xs text-gray-600">Connect a CMS or news API to populate this section.</p>
        <Link
          href={`/competitions/${comp.slug}/news`}
          className="inline-block mt-4 text-xs text-brand-400 hover:text-brand-300"
        >
          ← View {comp.name} news
        </Link>
      </div>
    </TeamLayout>
  )
}
