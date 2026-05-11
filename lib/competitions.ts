// ─── Competition config ───────────────────────────────────────────────────────

export interface Competition {
  slug: string
  name: string
  shortName: string
  country: string
  flag: string
  leagueId: number
  season: number
  color: string
  description: string
  keywords: string[]
}

export const COMPETITIONS: Competition[] = [
  {
    slug: 'premier-league',
    name: 'Premier League',
    shortName: 'PL',
    country: 'England',
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    leagueId: 39,
    season: 2025,
    color: '#3d195b',
    description: 'The Premier League is England\'s top-flight football division, featuring 20 clubs competing from August to May.',
    keywords: ['Premier League', 'Premier League table', 'Premier League fixtures', 'Premier League scores', 'English football'],
  },
  {
    slug: 'bundesliga',
    name: 'Bundesliga',
    shortName: 'BL',
    country: 'Germany',
    flag: '🇩🇪',
    leagueId: 78,
    season: 2025,
    color: '#d20515',
    description: 'The Bundesliga is Germany\'s premier football league, known for its passionate fan culture and high-scoring matches.',
    keywords: ['Bundesliga', 'Bundesliga table', 'Bundesliga fixtures', 'German football', 'Bundesliga scores'],
  },
  {
    slug: 'la-liga',
    name: 'La Liga',
    shortName: 'LL',
    country: 'Spain',
    flag: '🇪🇸',
    leagueId: 140,
    season: 2025,
    color: '#ee8707',
    description: 'La Liga is Spain\'s top professional football division, home to Real Madrid and Barcelona.',
    keywords: ['La Liga', 'La Liga table', 'La Liga fixtures', 'Spanish football', 'La Liga scores'],
  },
  {
    slug: 'serie-a',
    name: 'Serie A',
    shortName: 'SA',
    country: 'Italy',
    flag: '🇮🇹',
    leagueId: 135,
    season: 2025,
    color: '#024494',
    description: 'Serie A is Italy\'s top professional football league, renowned for its tactical sophistication.',
    keywords: ['Serie A', 'Serie A table', 'Serie A fixtures', 'Italian football', 'Serie A scores'],
  },
  {
    slug: 'ligue-1',
    name: 'Ligue 1',
    shortName: 'L1',
    country: 'France',
    flag: '🇫🇷',
    leagueId: 61,
    season: 2025,
    color: '#dba111',
    description: 'Ligue 1 is France\'s top-flight professional football league.',
    keywords: ['Ligue 1', 'Ligue 1 table', 'Ligue 1 fixtures', 'French football', 'Ligue 1 scores'],
  },
]

export function getCompetition(slug: string): Competition | undefined {
  return COMPETITIONS.find(c => c.slug === slug)
}

// ─── API-Football helpers ─────────────────────────────────────────────────────

const BASE = 'https://v3.football.api-sports.io'
const headers = () => ({ 'x-apisports-key': process.env.FOOTBALL_API_KEY ?? '' })

export interface Standing {
  rank: number
  team: { id: number; name: string; logo: string }
  points: number
  goalsDiff: number
  played: number
  win: number
  draw: number
  lose: number
  goals: { for: number; against: number }
  form: string
  description: string | null
}

export interface FixtureResult {
  fixture: { id: number; date: string; status: { short: string; elapsed: number | null } }
  teams: { home: { id: number; name: string; logo: string; winner: boolean | null }; away: { id: number; name: string; logo: string; winner: boolean | null } }
  goals: { home: number | null; away: number | null }
  league: { round: string }
}

export interface TopScorer {
  player: { id: number; name: string; photo: string; nationality: string; age: number; position: string }
  statistics: Array<{ goals: { total: number | null }; assists: number | null; games: { appearences: number | null }; team: { name: string; logo: string } }>
}

export async function getStandings(leagueId: number, season: number): Promise<Standing[]> {
  try {
    const res = await fetch(`${BASE}/standings?league=${leagueId}&season=${season}`, {
      headers: headers(),
      next: { revalidate: 3600 },
    })
    const data = await res.json()
    return data.response?.[0]?.league?.standings?.[0] ?? []
  } catch { return [] }
}

export async function getFixtures(leagueId: number, season: number, next?: number, last?: number): Promise<FixtureResult[]> {
  const params = new URLSearchParams({ league: String(leagueId), season: String(season) })
  if (next) params.set('next', String(next))
  if (last) params.set('last', String(last))
  try {
    const res = await fetch(`${BASE}/fixtures?${params}`, {
      headers: headers(),
      next: { revalidate: 300 },
    })
    const data = await res.json()
    return data.response ?? []
  } catch { return [] }
}

export async function getTopScorers(leagueId: number, season: number): Promise<TopScorer[]> {
  try {
    const res = await fetch(`${BASE}/players/topscorers?league=${leagueId}&season=${season}`, {
      headers: headers(),
      next: { revalidate: 86400 },
    })
    const data = await res.json()
    return data.response ?? []
  } catch { return [] }
}

// ─── Form helpers ─────────────────────────────────────────────────────────────

export function formColor(char: string) {
  if (char === 'W') return 'bg-green-500'
  if (char === 'D') return 'bg-gray-500'
  return 'bg-red-500'
}

export function descriptionColor(desc: string | null) {
  if (!desc) return ''
  if (desc.includes('Champions League')) return 'border-l-blue-500'
  if (desc.includes('Europa League') && !desc.includes('Conference')) return 'border-l-orange-500'
  if (desc.includes('Conference')) return 'border-l-green-400'
  if (desc.includes('Relegation')) return 'border-l-red-500'
  return ''
}

export function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
}
