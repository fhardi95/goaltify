import type { MetadataRoute } from 'next'

const BASE_URL = 'https://www.goaltify.com'

const STATIC_PAGES: MetadataRoute.Sitemap = [
  { url: BASE_URL,                          lastModified: new Date(), changeFrequency: 'hourly',  priority: 1.0 },
  { url: `${BASE_URL}/live-scores`,         lastModified: new Date(), changeFrequency: 'always',  priority: 0.9 },
  { url: `${BASE_URL}/news`,                lastModified: new Date(), changeFrequency: 'hourly',  priority: 0.9 },
  { url: `${BASE_URL}/world-cup`,           lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9 },
  { url: `${BASE_URL}/euros`,               lastModified: new Date(), changeFrequency: 'daily',   priority: 0.8 },
  { url: `${BASE_URL}/players`,             lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
  { url: `${BASE_URL}/academy`,             lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
  { url: `${BASE_URL}/academy/dribbling`,   lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
  { url: `${BASE_URL}/academy/training`,    lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
  { url: `${BASE_URL}/academy/tactics`,     lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
  { url: `${BASE_URL}/academy/fitness`,     lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
  { url: `${BASE_URL}/tools`,               lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
  { url: `${BASE_URL}/tools/formations`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE_URL}/shop`,                lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.6 },
  { url: `${BASE_URL}/newsletter`,          lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  { url: `${BASE_URL}/privacy`,             lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
  { url: `${BASE_URL}/terms`,               lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
  { url: `${BASE_URL}/contact`,             lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
]

// Competitions (5 leagues × 5 tabs)
const LEAGUES = ['premier-league', 'bundesliga', 'la-liga', 'serie-a', 'ligue-1']
const LEAGUE_TABS = ['', '/news', '/matches', '/standings', '/top-players']
const COMPETITION_PAGES: MetadataRoute.Sitemap = LEAGUES.flatMap(league =>
  LEAGUE_TABS.map(tab => ({
    url: `${BASE_URL}/competitions/${league}${tab}`,
    lastModified: new Date(),
    changeFrequency: tab === '' || tab === '/matches' || tab === '/standings' ? 'daily' as const : 'weekly' as const,
    priority: tab === '' ? 0.8 : 0.7,
  }))
)

// Team pages
const TEAM_PAGES: MetadataRoute.Sitemap = [
  { url: `${BASE_URL}/teams/england`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
]

// World players
const PLAYER_SLUGS = [
  'erling-haaland-276', 'kylian-mbappe-874', 'vinicius-jr-521', 'rodri-154',
  'jude-bellingham-306', 'harry-kane-2295', 'phil-foden-1485', 'lionel-messi-47',
  'bukayo-saka-1118', 'pedri-2931',
]
const PLAYER_PAGES: MetadataRoute.Sitemap = PLAYER_SLUGS.map(slug => ({
  url: `${BASE_URL}/players/${slug}`,
  lastModified: new Date(),
  changeFrequency: 'weekly' as const,
  priority: 0.7,
}))

// Academy sub-articles
const DRIBBLING_GUIDES = [
  'how-to-dribble-past-a-defender', 'stepover-tutorial', 'how-to-nutmeg',
  'first-touch-drills', 'how-to-shoot-with-power', 'how-to-take-a-free-kick',
].map(slug => ({ url: `${BASE_URL}/academy/dribbling/${slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 }))

const TRAINING_GUIDES = [
  'pre-match-warm-up-routine', 'speed-training-drills', 'injury-prevention-for-footballers',
  'football-diet-plan', 'strength-training-for-footballers', 'weekly-football-training-plan',
].map(slug => ({ url: `${BASE_URL}/academy/training/${slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 }))

const TACTICS_GUIDES = [
  '4-3-3-formation-guide', '4-4-2-formation-guide', 'high-press-explained',
  'counter-pressing-gegenpressing', 'how-to-defend-set-pieces',
].map(slug => ({ url: `${BASE_URL}/academy/tactics/${slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 }))

const FITNESS_GUIDES = [
  'football-fitness-test', 'cardio-for-footballers', 'stretching-routine',
  'mental-fitness-football', 'recovery-after-a-match',
].map(slug => ({ url: `${BASE_URL}/academy/fitness/${slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 }))

const TOOL_PAGES: MetadataRoute.Sitemap = [
  'xg-calculator', 'pass-accuracy-calculator', 'sprint-speed-converter', 'football-metric-glossary',
].map(slug => ({ url: `${BASE_URL}/tools/calculators/${slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 }))

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...STATIC_PAGES,
    ...COMPETITION_PAGES,
    ...TEAM_PAGES,
    ...PLAYER_PAGES,
    ...DRIBBLING_GUIDES,
    ...TRAINING_GUIDES,
    ...TACTICS_GUIDES,
    ...FITNESS_GUIDES,
    ...TOOL_PAGES,
  ]
}
