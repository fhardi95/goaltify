import type { Match } from '@/types'

const BASE = 'https://v3.football.api-sports.io'

const headers = {
  'x-apisports-key': process.env.FOOTBALL_API_KEY ?? '',
}

// Featured league IDs for Goaltify
export const FEATURED_LEAGUES = {
  WORLD_CUP: 1,
  EURO_CHAMPIONSHIP: 4,
  CHAMPIONS_LEAGUE: 2,
  PREMIER_LEAGUE: 39,
  LA_LIGA: 140,
  SERIE_A: 135,
  BUNDESLIGA: 78,
  LIGUE_1: 61,
}

export async function getLiveMatches(): Promise<Match[]> {
  const res = await fetch(`${BASE}/fixtures?live=all`, {
    headers,
    next: { revalidate: 60 },
  })
  if (!res.ok) return []
  const data = await res.json()
  return data.response ?? []
}

export async function getFixturesByDate(date: string): Promise<Match[]> {
  const res = await fetch(`${BASE}/fixtures?date=${date}`, {
    headers,
    next: { revalidate: 300 },
  })
  if (!res.ok) return []
  const data = await res.json()
  return data.response ?? []
}

export async function getFixturesByLeague(leagueId: number, season: number): Promise<Match[]> {
  const res = await fetch(`${BASE}/fixtures?league=${leagueId}&season=${season}&next=10`, {
    headers,
    next: { revalidate: 3600 },
  })
  if (!res.ok) return []
  const data = await res.json()
  return data.response ?? []
}

export async function getTodayMatches(): Promise<Match[]> {
  const today = new Date().toISOString().split('T')[0]
  return getFixturesByDate(today)
}

export function getMatchStatus(match: Match): 'live' | 'finished' | 'upcoming' {
  const s = match.fixture.status.short
  if (['1H', '2H', 'ET', 'BT', 'P', 'LIVE'].includes(s)) return 'live'
  if (['FT', 'AET', 'PEN'].includes(s)) return 'finished'
  return 'upcoming'
}

export function formatKickoff(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/London',
  })
}
