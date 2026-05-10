import Image from 'next/image'
import type { Match } from '@/types'
import { getMatchStatus, formatKickoff } from '@/lib/api-football'
import clsx from 'clsx'

interface Props {
  match: Match
}

export function LiveScoreCard({ match }: Props) {
  const status = getMatchStatus(match)
  const { home, away } = match.teams
  const { home: hGoals, away: aGoals } = match.goals

  return (
    <div className={clsx(
      'card p-3 hover:border-gray-700 transition-colors',
      status === 'live' && 'border-l-2 border-l-red-500'
    )}>

      {/* Competition + status */}
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-1.5">
          {match.league.flag && (
            <Image
              src={match.league.flag}
              alt={match.league.country}
              width={14}
              height={10}
              className="rounded-sm"
            />
          )}
          <span className="text-xs text-gray-500 truncate max-w-[160px]">
            {match.league.name}
          </span>
        </div>
        <StatusBadge match={match} status={status} />
      </div>

      {/* Teams + score */}
      <div className="flex items-center justify-between gap-2">
        <TeamRow team={home} bold={home.winner === true} />

        <div className="flex items-center gap-2 shrink-0">
          {status === 'upcoming' ? (
            <span className="text-sm font-medium text-gray-400">
              {formatKickoff(match.fixture.date)}
            </span>
          ) : (
            <div className="flex items-center gap-1.5">
              <Score goals={hGoals} winner={home.winner} />
              <span className="text-gray-600 text-sm">–</span>
              <Score goals={aGoals} winner={away.winner} />
            </div>
          )}
        </div>

        <TeamRow team={away} bold={away.winner === true} right />
      </div>
    </div>
  )
}

function TeamRow({
  team,
  bold,
  right,
}: {
  team: { name: string; logo: string }
  bold?: boolean
  right?: boolean
}) {
  return (
    <div className={clsx('flex items-center gap-2 min-w-0 flex-1', right && 'flex-row-reverse')}>
      <Image
        src={team.logo}
        alt={team.name}
        width={20}
        height={20}
        className="object-contain shrink-0"
      />
      <span className={clsx(
        'text-sm truncate',
        bold ? 'font-semibold text-white' : 'text-gray-300'
      )}>
        {team.name}
      </span>
    </div>
  )
}

function Score({
  goals,
  winner,
}: {
  goals: number | null
  winner?: boolean | null
}) {
  return (
    <span className={clsx(
      'text-lg font-bold w-5 text-center',
      winner ? 'text-white' : 'text-gray-400'
    )}>
      {goals ?? '–'}
    </span>
  )
}

function StatusBadge({
  match,
  status,
}: {
  match: Match
  status: 'live' | 'finished' | 'upcoming'
}) {
  if (status === 'live') {
    return (
      <span className="badge-live">
        <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
        {match.fixture.status.elapsed}'
      </span>
    )
  }
  if (status === 'finished') {
    return <span className="badge-ft">FT</span>
  }
  return null
}
