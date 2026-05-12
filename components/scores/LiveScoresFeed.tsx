'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import type { Match } from '@/types'
import { LiveScoreCard } from './LiveScoreCard'
import { getMatchStatus } from '@/lib/api-football'

// Map URL tournament slugs → API-Football league IDs
const TOURNAMENT_LEAGUE_IDS: Record<string, number> = {
  'world-cup-2026':   1,
  'champions-league': 2,
  'euro':             4,
  'premier-league':   39,
  'la-liga':          140,
  'serie-a':          135,
  'bundesliga':       78,
  'ligue-1':          61,
  'europa-league':    3,
  'fa-cup':           45,
  'championship':     40,
}

export function LiveScoresFeed() {
  const searchParams = useSearchParams()
  const tournament = searchParams.get('tournament') ?? 'all'

  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)
  const [updatedAt, setUpdatedAt] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'live' | 'upcoming' | 'finished'>('all')

  const fetchScores = useCallback(async () => {
    try {
      const res = await fetch('/api/scores?type=today')
      const data = await res.json()
      setMatches(data.matches ?? [])
      setUpdatedAt(data.updatedAt)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchScores()
    const interval = setInterval(fetchScores, 60_000)
    return () => clearInterval(interval)
  }, [fetchScores])

  // Filter by tournament slug if one is set
  const leagueId = TOURNAMENT_LEAGUE_IDS[tournament]
  const tournamentFiltered = leagueId
    ? matches.filter(m => m.league.id === leagueId)
    : matches

  // Then filter by match status
  const filtered = tournamentFiltered.filter(m => {
    if (filter === 'all') return true
    return getMatchStatus(m) === filter
  })

  const liveCount = tournamentFiltered.filter(m => getMatchStatus(m) === 'live').length

  // Human-readable label for selected tournament
  const tournamentLabel = tournament === 'all'
    ? "Today's matches"
    : tournament.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

  return (
    <div>
      {/* Header + filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-white">{tournamentLabel}</h2>
          {liveCount > 0 && (
            <span className="badge-live">
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
              {liveCount} live
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {(['all', 'live', 'upcoming', 'finished'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs px-3 py-1 rounded-full capitalize transition-colors ${
                filter === f
                  ? 'bg-brand-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
          <button
            onClick={fetchScores}
            className="ml-1 p-1.5 text-gray-500 hover:text-white transition-colors"
            title="Refresh"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      {/* Match list */}
      {loading ? (
        <div className="grid gap-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="card p-3 animate-pulse h-16 bg-gray-900" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="card p-8 text-center text-gray-500 text-sm">
          {leagueId
            ? `No ${tournamentLabel} matches today.`
            : `No ${filter === 'all' ? '' : filter} matches found today.`}
        </div>
      ) : (
        <div className="grid gap-2">
          {filtered.map(match => (
            <LiveScoreCard key={match.fixture.id} match={match} />
          ))}
        </div>
      )}

      {updatedAt && (
        <p className="text-xs text-gray-600 text-right mt-2">
          Updated {new Date(updatedAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
          {' · '}auto-refreshes every 60s
        </p>
      )}
    </div>
  )
}
