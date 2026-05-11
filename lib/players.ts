// Top 20 world players — static data with API-Football player IDs
// Photos are fetched from API-Football using player IDs

export interface WorldPlayer {
  id: number
  slug: string
  name: string
  fullName: string
  nationality: string
  nationalityFlag: string
  club: string
  clubLogo: string
  position: string
  age: number
  photo: string
  marketValue: string
  trophies: string[]
  bio: string
  stats: {
    goals?: number
    assists?: number
    appearances?: number
    cleanSheets?: number
    trophiesWon?: number
  }
  keyFacts: string[]
}

export const WORLD_PLAYERS: WorldPlayer[] = [
  {
    id: 276, slug: 'erling-haaland', name: 'Erling Haaland', fullName: 'Erling Braut Haaland',
    nationality: 'Norwegian', nationalityFlag: '🇳🇴', club: 'Manchester City', clubLogo: 'https://media.api-sports.io/football/teams/50.png',
    position: 'Striker', age: 24, photo: 'https://media.api-sports.io/football/players/1100.png',
    marketValue: '€200m', trophies: ['Premier League', 'Champions League', 'FA Cup'],
    bio: 'The most prolific striker of his generation. Haaland broke the Premier League single-season goals record with 36 goals in 35 games in 2022/23 and has continued to dominate since.',
    stats: { goals: 36, assists: 8, appearances: 35 },
    keyFacts: ['Broke PL season goals record (36)', 'Son of former Man City player Alfie Haaland', 'Scored in first 5 Champions League games', 'Also played for Molde, RB Salzburg, Dortmund'],
  },
  {
    id: 874, slug: 'kylian-mbappe', name: 'Kylian Mbappé', fullName: 'Kylian Mbappé Lottin',
    nationality: 'French', nationalityFlag: '🇫🇷', club: 'Real Madrid', clubLogo: 'https://media.api-sports.io/football/teams/541.png',
    position: 'Forward', age: 26, photo: 'https://media.api-sports.io/football/players/278.png',
    marketValue: '€180m', trophies: ['World Cup 2018', 'Ligue 1 ×7', 'Champions League 2024'],
    bio: 'The fastest player in world football and arguably its most complete forward. Mbappé won the World Cup at 19 with France and joined Real Madrid in 2024.',
    stats: { goals: 256, assists: 108, appearances: 308 },
    keyFacts: ['Top speed: 38 km/h — fastest recorded in PL era', 'World Cup winner 2018, aged 19', 'Joined Real Madrid on free transfer in 2024', '300+ career goals before turning 26'],
  },
  {
    id: 521, slug: 'vinicius-jr', name: 'Vinícius Jr.', fullName: 'Vinícius José Paixão de Oliveira Júnior',
    nationality: 'Brazilian', nationalityFlag: '🇧🇷', club: 'Real Madrid', clubLogo: 'https://media.api-sports.io/football/teams/541.png',
    position: 'Left Winger', age: 24, photo: 'https://media.api-sports.io/football/players/521.png',
    marketValue: '€180m', trophies: ['Champions League ×3', 'La Liga ×2', 'Copa del Rey'],
    bio: 'The most electric winger in world football. Vinícius has become the heartbeat of Real Madrid\'s attack with his pace, dribbling and big-game goals.',
    stats: { goals: 24, assists: 11, appearances: 39 },
    keyFacts: ['Scored winning goal in 2022 UCL Final', 'Ballon d\'Or 2024 winner', 'Known for trademark goal celebrations', 'Moved to Real Madrid aged 16 for €45m'],
  },
  {
    id: 154, slug: 'rodri', name: 'Rodri', fullName: 'Rodrigo Hernández Cascante',
    nationality: 'Spanish', nationalityFlag: '🇪🇸', club: 'Manchester City', clubLogo: 'https://media.api-sports.io/football/teams/50.png',
    position: 'Defensive Midfielder', age: 28, photo: 'https://media.api-sports.io/football/players/154.png',
    marketValue: '€150m', trophies: ['Champions League', 'Premier League ×4', 'Euro 2024'],
    bio: 'The best midfielder in the world. Rodri controls the tempo of any game he plays in and was the heartbeat of both Manchester City\'s treble-winning season and Spain\'s Euro 2024 triumph.',
    stats: { goals: 12, assists: 8, appearances: 50 },
    keyFacts: ['Ballon d\'Or 2024 winner', 'Euro 2024 Player of the Tournament', 'Won PL, UCL and FA Cup in 2022/23 treble', 'Only lost 8 club games in 2022/23 season'],
  },
  {
    id: 306, slug: 'jude-bellingham', name: 'Jude Bellingham', fullName: 'Jude Victor William Bellingham',
    nationality: 'English', nationalityFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', club: 'Real Madrid', clubLogo: 'https://media.api-sports.io/football/teams/541.png',
    position: 'Midfielder', age: 21, photo: 'https://media.api-sports.io/football/players/306.png',
    marketValue: '€180m', trophies: ['Champions League', 'La Liga', 'Bundesliga ×3'],
    bio: 'The most complete midfielder of his generation. Bellingham moved to Real Madrid in 2023 and immediately became their most important player, scoring 23 goals in his debut season.',
    stats: { goals: 23, assists: 13, appearances: 42 },
    keyFacts: ['Most expensive English player ever (€103m)', 'Scored vs France at Euro 2024 in added time', 'Made his senior debut for Birmingham aged 16', 'La Liga Player of the Season 2023/24'],
  },
  {
    id: 2295, slug: 'harry-kane', name: 'Harry Kane', fullName: 'Harry Edward Kane',
    nationality: 'English', nationalityFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', club: 'Bayern Munich', clubLogo: 'https://media.api-sports.io/football/teams/157.png',
    position: 'Striker', age: 31, photo: 'https://media.api-sports.io/football/players/2295.png',
    marketValue: '€100m', trophies: ['Premier League Golden Boot ×3'],
    bio: 'One of the greatest strikers of his era, Kane broke the Premier League all-time scoring record before moving to Bayern Munich, where he continued his prolific form.',
    stats: { goals: 44, assists: 12, appearances: 45 },
    keyFacts: ['England\'s all-time record goalscorer', 'Broke Alan Shearer\'s PL record (260 goals)', 'Won Bundesliga top scorer in debut season', 'Never won a major trophy — the longest curse in football'],
  },
  {
    id: 1485, slug: 'phil-foden', name: 'Phil Foden', fullName: 'Philip Walter Foden',
    nationality: 'English', nationalityFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', club: 'Manchester City', clubLogo: 'https://media.api-sports.io/football/teams/50.png',
    position: 'Attacking Midfielder', age: 24, photo: 'https://media.api-sports.io/football/players/1485.png',
    marketValue: '€150m', trophies: ['Premier League ×6', 'Champions League', 'FA Cup'],
    bio: 'The best English footballer of his generation. Foden has spent his entire career at Man City and was named PFA Players\' Player of the Year in 2024.',
    stats: { goals: 19, assists: 8, appearances: 35 },
    keyFacts: ['Never left Man City since age 10', 'Played 15 minutes in 2018/19 — won PL anyway', 'PFA Player of the Year 2023/24', 'Can play in 5 different positions'],
  },
  {
    id: 47, slug: 'lionel-messi', name: 'Lionel Messi', fullName: 'Lionel Andrés Messi Cuccittini',
    nationality: 'Argentine', nationalityFlag: '🇦🇷', club: 'Inter Miami', clubLogo: 'https://media.api-sports.io/football/teams/1356.png',
    position: 'Forward', age: 37, photo: 'https://media.api-sports.io/football/players/154.png',
    marketValue: '€35m', trophies: ['World Cup 2022', 'Copa América', 'Ballon d\'Or ×8', 'Champions League ×4'],
    bio: 'The greatest footballer of all time. Messi won 8 Ballon d\'Or awards, achieved everything at club level with Barcelona, and completed his legacy by winning the 2022 World Cup with Argentina.',
    stats: { goals: 830, assists: 365, appearances: 1000 },
    keyFacts: ['8 Ballon d\'Or awards — most in history', '830+ career goals across all competitions', 'World Cup winner 2022 — completed the set', 'Moved to Inter Miami in 2023, revived MLS'],
  },
  {
    id: 1118, slug: 'bukayo-saka', name: 'Bukayo Saka', fullName: 'Bukayo Ayoyinka Saka',
    nationality: 'English', nationalityFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', club: 'Arsenal', clubLogo: 'https://media.api-sports.io/football/teams/42.png',
    position: 'Right Winger', age: 23, photo: 'https://media.api-sports.io/football/players/1118.png',
    marketValue: '€150m', trophies: ['FA Cup 2020'],
    bio: 'Arsenal\'s irreplaceable talisman. Saka has been one of the most consistent players in Europe for three consecutive seasons and is England\'s most important player.',
    stats: { goals: 20, assists: 14, appearances: 38 },
    keyFacts: ['Arsenal player since age 7', 'Named Young Player of the Year 2021/22, 2022/23', 'Missed penalty in Euro 2020 final — responded with class', 'Plays RW, LW, and LB for England'],
  },
  {
    id: 2931, slug: 'pedri', name: 'Pedri', fullName: 'Pedro González López',
    nationality: 'Spanish', nationalityFlag: '🇪🇸', club: 'Barcelona', clubLogo: 'https://media.api-sports.io/football/teams/529.png',
    position: 'Central Midfielder', age: 22, photo: 'https://media.api-sports.io/football/players/2931.png',
    marketValue: '€120m', trophies: ['La Liga', 'Copa del Rey', 'Euro 2024'],
    bio: 'The heir to the Xavi-Iniesta throne. Pedri plays with the maturity of a veteran and the energy of a teenager — a rare combination that makes him one of the most exciting midfielders in the world.',
    stats: { goals: 8, assists: 12, appearances: 34 },
    keyFacts: ['Golden Boy Award 2021', 'Played Copa America at 18 — Spain\'s starter', 'Compared to Xavi by Xavi himself', 'Born in Tenerife, signed by Barca aged 17'],
  },
]

// API helper for individual player stats
const BASE = 'https://v3.football.api-sports.io'

export async function getPlayerStats(playerId: number, season = 2024) {
  try {
    const res = await fetch(
      `${BASE}/players?id=${playerId}&season=${season}`,
      {
        headers: { 'x-apisports-key': process.env.FOOTBALL_API_KEY ?? '' },
        next: { revalidate: 86400 },
      }
    )
    const data = await res.json()
    return data.response?.[0] ?? null
  } catch { return null }
}
