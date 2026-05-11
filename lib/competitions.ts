// ─── Team config ─────────────────────────────────────────────────────────────

export interface Team {
  id: number
  slug: string
  name: string
  shortName: string
  logo: string
  competitionSlug: string
}

export const TEAMS: Team[] = [
  // Premier League
  { id: 33, slug: 'manchester-united', name: 'Manchester United', shortName: 'MUN', logo: 'https://media.api-sports.io/football/teams/33.png', competitionSlug: 'premier-league' },
  { id: 40, slug: 'liverpool', name: 'Liverpool', shortName: 'LIV', logo: 'https://media.api-sports.io/football/teams/40.png', competitionSlug: 'premier-league' },
  { id: 49, slug: 'chelsea', name: 'Chelsea', shortName: 'CHE', logo: 'https://media.api-sports.io/football/teams/49.png', competitionSlug: 'premier-league' },
  { id: 42, slug: 'arsenal', name: 'Arsenal', shortName: 'ARS', logo: 'https://media.api-sports.io/football/teams/42.png', competitionSlug: 'premier-league' },
  { id: 50, slug: 'manchester-city', name: 'Manchester City', shortName: 'MCI', logo: 'https://media.api-sports.io/football/teams/50.png', competitionSlug: 'premier-league' },
  { id: 47, slug: 'tottenham', name: 'Tottenham', shortName: 'TOT', logo: 'https://media.api-sports.io/football/teams/47.png', competitionSlug: 'premier-league' },
  { id: 66, slug: 'aston-villa', name: 'Aston Villa', shortName: 'AVL', logo: 'https://media.api-sports.io/football/teams/66.png', competitionSlug: 'premier-league' },
  { id: 34, slug: 'newcastle', name: 'Newcastle', shortName: 'NEW', logo: 'https://media.api-sports.io/football/teams/34.png', competitionSlug: 'premier-league' },
  { id: 48, slug: 'west-ham', name: 'West Ham', shortName: 'WHU', logo: 'https://media.api-sports.io/football/teams/48.png', competitionSlug: 'premier-league' },
  { id: 45, slug: 'everton', name: 'Everton', shortName: 'EVE', logo: 'https://media.api-sports.io/football/teams/45.png', competitionSlug: 'premier-league' },
  { id: 35, slug: 'brentford', name: 'Brentford', shortName: 'BRE', logo: 'https://media.api-sports.io/football/teams/55.png', competitionSlug: 'premier-league' },
  { id: 39, slug: 'wolves', name: 'Wolves', shortName: 'WOL', logo: 'https://media.api-sports.io/football/teams/39.png', competitionSlug: 'premier-league' },
  { id: 36, slug: 'fulham', name: 'Fulham', shortName: 'FUL', logo: 'https://media.api-sports.io/football/teams/36.png', competitionSlug: 'premier-league' },
  { id: 62, slug: 'brighton', name: 'Brighton', shortName: 'BHA', logo: 'https://media.api-sports.io/football/teams/51.png', competitionSlug: 'premier-league' },
  { id: 52, slug: 'crystal-palace', name: 'Crystal Palace', shortName: 'CRY', logo: 'https://media.api-sports.io/football/teams/52.png', competitionSlug: 'premier-league' },
  { id: 41, slug: 'southampton', name: 'Southampton', shortName: 'SOU', logo: 'https://media.api-sports.io/football/teams/41.png', competitionSlug: 'premier-league' },
  { id: 44, slug: 'nottingham-forest', name: "Nott'm Forest", shortName: 'NFO', logo: 'https://media.api-sports.io/football/teams/65.png', competitionSlug: 'premier-league' },
  { id: 46, slug: 'leicester', name: 'Leicester City', shortName: 'LEI', logo: 'https://media.api-sports.io/football/teams/46.png', competitionSlug: 'premier-league' },
  { id: 37, slug: 'ipswich', name: 'Ipswich Town', shortName: 'IPS', logo: 'https://media.api-sports.io/football/teams/57.png', competitionSlug: 'premier-league' },
  { id: 38, slug: 'bournemouth', name: 'Bournemouth', shortName: 'BOU', logo: 'https://media.api-sports.io/football/teams/35.png', competitionSlug: 'premier-league' },
  // La Liga
  { id: 529, slug: 'barcelona', name: 'Barcelona', shortName: 'BAR', logo: 'https://media.api-sports.io/football/teams/529.png', competitionSlug: 'la-liga' },
  { id: 541, slug: 'real-madrid', name: 'Real Madrid', shortName: 'RMA', logo: 'https://media.api-sports.io/football/teams/541.png', competitionSlug: 'la-liga' },
  { id: 530, slug: 'atletico-madrid', name: 'Atlético Madrid', shortName: 'ATM', logo: 'https://media.api-sports.io/football/teams/530.png', competitionSlug: 'la-liga' },
  { id: 532, slug: 'valencia', name: 'Valencia', shortName: 'VAL', logo: 'https://media.api-sports.io/football/teams/532.png', competitionSlug: 'la-liga' },
  { id: 543, slug: 'real-betis', name: 'Real Betis', shortName: 'BET', logo: 'https://media.api-sports.io/football/teams/543.png', competitionSlug: 'la-liga' },
  { id: 538, slug: 'sevilla', name: 'Sevilla', shortName: 'SEV', logo: 'https://media.api-sports.io/football/teams/536.png', competitionSlug: 'la-liga' },
  { id: 536, slug: 'villarreal', name: 'Villarreal', shortName: 'VIL', logo: 'https://media.api-sports.io/football/teams/533.png', competitionSlug: 'la-liga' },
  { id: 548, slug: 'athletic-bilbao', name: 'Athletic Club', shortName: 'ATH', logo: 'https://media.api-sports.io/football/teams/531.png', competitionSlug: 'la-liga' },
  { id: 546, slug: 'real-sociedad', name: 'Real Sociedad', shortName: 'RSO', logo: 'https://media.api-sports.io/football/teams/548.png', competitionSlug: 'la-liga' },
  { id: 547, slug: 'girona', name: 'Girona', shortName: 'GIR', logo: 'https://media.api-sports.io/football/teams/547.png', competitionSlug: 'la-liga' },
  // Bundesliga
  { id: 157, slug: 'bayern-munich', name: 'Bayern Munich', shortName: 'BAY', logo: 'https://media.api-sports.io/football/teams/157.png', competitionSlug: 'bundesliga' },
  { id: 165, slug: 'borussia-dortmund', name: 'Borussia Dortmund', shortName: 'BVB', logo: 'https://media.api-sports.io/football/teams/165.png', competitionSlug: 'bundesliga' },
  { id: 173, slug: 'rb-leipzig', name: 'RB Leipzig', shortName: 'RBL', logo: 'https://media.api-sports.io/football/teams/173.png', competitionSlug: 'bundesliga' },
  { id: 168, slug: 'bayer-leverkusen', name: 'Bayer Leverkusen', shortName: 'LEV', logo: 'https://media.api-sports.io/football/teams/168.png', competitionSlug: 'bundesliga' },
  { id: 169, slug: 'eintracht-frankfurt', name: 'Eintracht Frankfurt', shortName: 'SGE', logo: 'https://media.api-sports.io/football/teams/169.png', competitionSlug: 'bundesliga' },
  { id: 161, slug: 'vfb-stuttgart', name: 'VfB Stuttgart', shortName: 'VFB', logo: 'https://media.api-sports.io/football/teams/161.png', competitionSlug: 'bundesliga' },
  { id: 182, slug: 'wolfsburg', name: 'Wolfsburg', shortName: 'WOB', logo: 'https://media.api-sports.io/football/teams/182.png', competitionSlug: 'bundesliga' },
  { id: 163, slug: 'borussia-monchengladbach', name: "Borussia M'gladbach", shortName: 'BMG', logo: 'https://media.api-sports.io/football/teams/163.png', competitionSlug: 'bundesliga' },
  { id: 172, slug: 'union-berlin', name: 'Union Berlin', shortName: 'UNB', logo: 'https://media.api-sports.io/football/teams/172.png', competitionSlug: 'bundesliga' },
  { id: 162, slug: 'werder-bremen', name: 'Werder Bremen', shortName: 'SVW', logo: 'https://media.api-sports.io/football/teams/162.png', competitionSlug: 'bundesliga' },
  // Serie A
  { id: 489, slug: 'ac-milan', name: 'AC Milan', shortName: 'MIL', logo: 'https://media.api-sports.io/football/teams/489.png', competitionSlug: 'serie-a' },
  { id: 505, slug: 'inter-milan', name: 'Inter Milan', shortName: 'INT', logo: 'https://media.api-sports.io/football/teams/505.png', competitionSlug: 'serie-a' },
  { id: 496, slug: 'juventus', name: 'Juventus', shortName: 'JUV', logo: 'https://media.api-sports.io/football/teams/496.png', competitionSlug: 'serie-a' },
  { id: 497, slug: 'as-roma', name: 'AS Roma', shortName: 'ROM', logo: 'https://media.api-sports.io/football/teams/497.png', competitionSlug: 'serie-a' },
  { id: 492, slug: 'napoli', name: 'Napoli', shortName: 'NAP', logo: 'https://media.api-sports.io/football/teams/492.png', competitionSlug: 'serie-a' },
  { id: 487, slug: 'lazio', name: 'Lazio', shortName: 'LAZ', logo: 'https://media.api-sports.io/football/teams/487.png', competitionSlug: 'serie-a' },
  { id: 488, slug: 'fiorentina', name: 'Fiorentina', shortName: 'FIO', logo: 'https://media.api-sports.io/football/teams/488.png', competitionSlug: 'serie-a' },
  { id: 500, slug: 'atalanta', name: 'Atalanta', shortName: 'ATA', logo: 'https://media.api-sports.io/football/teams/500.png', competitionSlug: 'serie-a' },
  { id: 499, slug: 'torino', name: 'Torino', shortName: 'TOR', logo: 'https://media.api-sports.io/football/teams/499.png', competitionSlug: 'serie-a' },
  { id: 502, slug: 'bologna', name: 'Bologna', shortName: 'BOL', logo: 'https://media.api-sports.io/football/teams/502.png', competitionSlug: 'serie-a' },
  // Ligue 1
  { id: 85, slug: 'paris-saint-germain', name: 'Paris Saint-Germain', shortName: 'PSG', logo: 'https://media.api-sports.io/football/teams/85.png', competitionSlug: 'ligue-1' },
  { id: 80, slug: 'lyon', name: 'Lyon', shortName: 'OLY', logo: 'https://media.api-sports.io/football/teams/80.png', competitionSlug: 'ligue-1' },
  { id: 81, slug: 'marseille', name: 'Marseille', shortName: 'OM', logo: 'https://media.api-sports.io/football/teams/81.png', competitionSlug: 'ligue-1' },
  { id: 84, slug: 'nice', name: 'Nice', shortName: 'NIC', logo: 'https://media.api-sports.io/football/teams/84.png', competitionSlug: 'ligue-1' },
  { id: 79, slug: 'lille', name: 'Lille', shortName: 'LIL', logo: 'https://media.api-sports.io/football/teams/79.png', competitionSlug: 'ligue-1' },
  { id: 91, slug: 'monaco', name: 'Monaco', shortName: 'MON', logo: 'https://media.api-sports.io/football/teams/91.png', competitionSlug: 'ligue-1' },
  { id: 94, slug: 'rennes', name: 'Rennes', shortName: 'REN', logo: 'https://media.api-sports.io/football/teams/94.png', competitionSlug: 'ligue-1' },
  { id: 93, slug: 'lens', name: 'Lens', shortName: 'LNS', logo: 'https://media.api-sports.io/football/teams/93.png', competitionSlug: 'ligue-1' },
  { id: 82, slug: 'montpellier', name: 'Montpellier', shortName: 'MPL', logo: 'https://media.api-sports.io/football/teams/82.png', competitionSlug: 'ligue-1' },
  { id: 89, slug: 'toulouse', name: 'Toulouse', shortName: 'TOU', logo: 'https://media.api-sports.io/football/teams/89.png', competitionSlug: 'ligue-1' },
]

export function getTeamsByCompetition(competitionSlug: string): Team[] {
  return TEAMS.filter(t => t.competitionSlug === competitionSlug)
}

export function getTeam(slug: string): Team | undefined {
  return TEAMS.find(t => t.slug === slug)
}

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
