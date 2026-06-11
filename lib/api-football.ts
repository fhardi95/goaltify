import type { Match } from '@/types'

// ─── football-data.org API wrapper ───────────────────────────────────────────
// Docs: https://www.football-data.org/documentation/api
// Free tier: 10 req/min, top competitions forever free, no live-score delay
//
// Competition IDs (football-data.org):
//   2000 = FIFA World Cup
//   2001 = UEFA Champions League
//   2002 = Bundesliga
//   2003 = Eredivisie
//   2013 = Brasileirão
//   2014 = La Liga
//   2015 = Ligue 1
//   2016 = EFL Championship
//   2017 = Primeira Liga
//   2018 = European Championship
//   2019 = Serie A
//   2021 = Premier League
//   2146 = Copa Libertadores
//   PL   = Premier League (also accepted as string)

const BASE = 'https://api.football-data.org/v4'

function getHeaders() {
  return {
    'X-Auth-Token': process.env.FOOTBALL_DATA_API_KEY ?? '',
  }
}

// ─── Competition map: slug → football-data competition ID ─────────────────────
export const FEATURED_COMPETITIONS: Record<string, number> = {
  WORLD_CUP:         2000,
  EURO_CHAMPIONSHIP: 2018,
  CHAMPIONS_LEAGUE:  2001,
  PREMIER_LEAGUE:    2021,
  LA_LIGA:           2014,
  SERIE_A:           2019,
  BUNDESLIGA:        2002,
  LIGUE_1:           2015,
  CHAMPIONSHIP:      2016,
}

// Slug → competition ID (used by LiveScoresFeed tournament filter)
export const TOURNAMENT_COMPETITION_IDS: Record<string, number> = {
  'world-cup-2026':   2000,
  'champions-league': 2001,
  'euro':             2018,
  'premier-league':   2021,
  'la-liga':          2014,
  'serie-a':          2019,
  'bundesliga':       2002,
  'ligue-1':          2015,
  'championship':     2016,
  // Note: europa-league and fa-cup are not on the free tier of football-data.org
  // They are omitted to avoid 403 errors. Upgrade to paid plan to re-enable.
}

// ─── Shape normaliser ─────────────────────────────────────────────────────────
// football-data.org returns a different shape from api-football.com.
// We normalise to the existing Match type so nothing else in the codebase changes.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normaliseMatch(m: any, competitionName: string, competitionArea: string): Match {
  const statusMap: Record<string, string> = {
    SCHEDULED:   'NS',
    TIMED:       'NS',
    IN_PLAY:     'LIVE',
    PAUSED:      'HT',
    FINISHED:    'FT',
    POSTPONED:   'PST',
    SUSPENDED:   'SUSP',
    CANCELLED:   'CANC',
  }

  const short = statusMap[m.status] ?? 'NS'

  // Derive elapsed minutes from live status
  let elapsed: number | null = null
  if (m.status === 'IN_PLAY' || m.status === 'PAUSED') {
    // football-data.org does not expose elapsed minutes on the free tier,
    // so we mark live matches without a minute count.
    elapsed = null
  }

  return {
    fixture: {
      id:     m.id,
      date:   m.utcDate,
      status: {
        long:    m.status,
        short,
        elapsed,
      },
      venue: m.venue ? { name: m.venue, city: '' } : undefined,
    },
    league: {
      id:      m.competition?.id ?? 0,
      name:    competitionName,
      country: competitionArea,
      logo:    m.competition?.emblem ?? '',
      flag:    undefined,
      season:  m.season?.startDate ? parseInt(m.season.startDate.slice(0, 4)) : new Date().getFullYear(),
      round:   m.matchday ? `Matchday ${m.matchday}` : undefined,
    },
    teams: {
      home: {
        id:     m.homeTeam?.id ?? 0,
        name:   m.homeTeam?.shortName ?? m.homeTeam?.name ?? 'TBD',
        logo:   m.homeTeam?.crest ?? '',
        winner: m.score?.winner === 'HOME_TEAM' ? true
               : m.score?.winner === 'AWAY_TEAM' ? false
               : null,
      },
      away: {
        id:     m.awayTeam?.id ?? 0,
        name:   m.awayTeam?.shortName ?? m.awayTeam?.name ?? 'TBD',
        logo:   m.awayTeam?.crest ?? '',
        winner: m.score?.winner === 'AWAY_TEAM' ? true
               : m.score?.winner === 'HOME_TEAM' ? false
               : null,
      },
    },
    goals: {
      home: m.score?.fullTime?.home ?? m.score?.halfTime?.home ?? null,
      away: m.score?.fullTime?.away ?? m.score?.halfTime?.away ?? null,
    },
  }
}

// ─── Fetch helpers ────────────────────────────────────────────────────────────

/** Fetch all matches for a single competition on a given date */
async function getMatchesByCompetition(
  competitionId: number,
  dateFrom: string,
  dateTo: string,
  revalidate: number = 60,
): Promise<Match[]> {
  const url = `${BASE}/competitions/${competitionId}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}&status=SCHEDULED,TIMED,IN_PLAY,PAUSED,FINISHED`
  const res = await fetch(url, {
    headers: getHeaders(),
    next: { revalidate },
  })
  if (!res.ok) return []
  const data = await res.json()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data.matches ?? []).map((m: any) =>
    normaliseMatch(m, data.competition?.name ?? '', data.competition?.area?.name ?? '')
  )
}

/** Fetch today's matches across all featured competitions */
export async function getTodayMatches(): Promise<Match[]> {
  const today = new Date().toISOString().split('T')[0]
  const results = await Promise.allSettled(
    Object.values(FEATURED_COMPETITIONS).map(id =>
      getMatchesByCompetition(id, today, today, 60)
    )
  )
  return results
    .filter((r): r is PromiseFulfilledResult<Match[]> => r.status === 'fulfilled')
    .flatMap(r => r.value)
}

/** Fetch live matches — football-data.org free tier uses IN_PLAY status filter */
export async function getLiveMatches(): Promise<Match[]> {
  const today = new Date().toISOString().split('T')[0]
  const results = await Promise.allSettled(
    Object.values(FEATURED_COMPETITIONS).map(async id => {
      const url = `${BASE}/competitions/${id}/matches?dateFrom=${today}&dateTo=${today}&status=IN_PLAY,PAUSED`
      const res = await fetch(url, { headers: getHeaders(), cache: 'no-store' })
      if (!res.ok) return []
      const data = await res.json()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (data.matches ?? []).map((m: any) =>
        normaliseMatch(m, data.competition?.name ?? '', data.competition?.area?.name ?? '')
      )
    })
  )
  return results
    .filter((r): r is PromiseFulfilledResult<Match[]> => r.status === 'fulfilled')
    .flatMap(r => r.value)
}

/** Fetch upcoming fixtures for a competition */
export async function getFixturesByLeague(competitionId: number, _season?: number): Promise<Match[]> {
  const today = new Date()
  const dateFrom = today.toISOString().split('T')[0]
  const dateTo = new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  return getMatchesByCompetition(competitionId, dateFrom, dateTo, 3600)
}

// ─── Status helpers (unchanged API — same logic works with normalised data) ───

export function getMatchStatus(match: Match): 'live' | 'finished' | 'upcoming' {
  const s = match.fixture.status.short
  if (['LIVE', 'HT', '1H', '2H', 'ET', 'BT', 'P', 'IN_PLAY', 'PAUSED'].includes(s)) return 'live'
  if (['FT', 'AET', 'PEN', 'FINISHED'].includes(s)) return 'finished'
  return 'upcoming'
}

export function formatKickoff(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString('en-GB', {
    hour:     '2-digit',
    minute:   '2-digit',
    timeZone: 'Europe/London',
  })
}
