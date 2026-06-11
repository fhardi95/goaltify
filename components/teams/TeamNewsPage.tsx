import { notFound } from 'next/navigation'
import Link from 'next/link'
import { TeamLayout } from '@/components/teams/TeamLayout'
import { getTeam, getCompetition } from '@/lib/competitions'

interface Props {
  competitionSlug: string
  teamSlug: string
}

export function TeamNewsPage({ competitionSlug, teamSlug }: Props) {
  const team = getTeam(teamSlug)
  const comp = getCompetition(competitionSlug)
  if (!team || !comp || team.competitionSlug !== comp.slug) notFound()

  return (
    <TeamLayout team={team} competition={comp} activeTab="news">
      <h2 className="text-lg font-bold text-white mb-4">{team.name} — Latest News</h2>
      <div className="card p-6 text-center text-gray-500 text-sm">
        <p className="mb-2">News articles coming soon.</p>
        <p className="text-xs text-gray-600">Connect a CMS or news API to populate this section.</p>
        <Link href={`/competitions/${comp.slug}/news`} className="inline-block mt-4 text-xs text-brand-400 hover:text-brand-300">← View {comp.name} news</Link>
      </div>
    </TeamLayout>
  )
}
