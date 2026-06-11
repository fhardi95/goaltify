import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { FAQSection } from '@/components/blog/FAQSection'
import { buildMetadata, buildArticleSchema } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'England Football Team — Full Squad, Players & World Cup 2026',
  description:
    'Full England national football team squad for World Cup 2026. Player profiles, positions, ages, clubs and stats for every Three Lions player on Goaltify.',
  canonical: 'https://www.goaltify.com/teams/england',
  keywords: [
    'England football team',
    'England squad 2026',
    'England World Cup squad',
    'Three Lions players',
    'England national team players',
    'England squad list',
  ],
})

// ─── Squad data ───────────────────────────────────────────────────────────────
// API-Football player IDs included for photo URLs
const SQUAD: {
  pos: string
  posOrder: number
  number: number
  name: string
  dob: string
  age: number
  club: string
  clubFlag: string
  caps: number
  goals: number
  playerId: number
}[] = [
  // Goalkeepers
  { pos: 'GK', posOrder: 1, number: 1,  name: 'Jordan Pickford',    dob: '07/03/1994', age: 32, club: 'Everton',           clubFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', caps: 75,  goals: 0,  playerId: 2931  },
  { pos: 'GK', posOrder: 1, number: 13, name: 'Nick Pope',          dob: '19/04/1992', age: 34, club: 'Newcastle Utd',     clubFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', caps: 10,  goals: 0,  playerId: 18940 },
  { pos: 'GK', posOrder: 1, number: 23, name: 'Dean Henderson',     dob: '12/03/1997', age: 29, club: 'Crystal Palace',    clubFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', caps: 3,   goals: 0,  playerId: 18771 },
  // Defenders
  { pos: 'RB', posOrder: 2, number: 2,  name: 'Trent Alexander-Arnold', dob: '07/10/1998', age: 27, club: 'Real Madrid',  clubFlag: '🇪🇸', caps: 32,  goals: 3,  playerId: 19230 },
  { pos: 'CB', posOrder: 2, number: 5,  name: 'John Stones',        dob: '28/05/1994', age: 32, club: 'Man City',         clubFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', caps: 74,  goals: 3,  playerId: 627   },
  { pos: 'CB', posOrder: 2, number: 6,  name: 'Harry Maguire',      dob: '05/03/1993', age: 33, club: 'Man Utd',          clubFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', caps: 63,  goals: 7,  playerId: 184   },
  { pos: 'LB', posOrder: 2, number: 3,  name: 'Luke Shaw',          dob: '12/07/1995', age: 30, club: 'Man Utd',          clubFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', caps: 32,  goals: 1,  playerId: 882   },
  { pos: 'CB', posOrder: 2, number: 4,  name: 'Marc Guéhi',         dob: '13/07/2000', age: 25, club: 'Newcastle Utd',    clubFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', caps: 18,  goals: 1,  playerId: 198019},
  { pos: 'RB', posOrder: 2, number: 22, name: 'Reece James',        dob: '08/12/1999', age: 26, club: 'Chelsea',          clubFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', caps: 22,  goals: 2,  playerId: 198012},
  { pos: 'CB', posOrder: 2, number: 12, name: 'Ezri Konsa',         dob: '23/10/1997', age: 28, club: 'Aston Villa',      clubFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', caps: 8,   goals: 0,  playerId: 198014},
  // Midfielders
  { pos: 'CM', posOrder: 3, number: 8,  name: 'Declan Rice',        dob: '14/01/1999', age: 27, club: 'Arsenal',          clubFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', caps: 52,  goals: 4,  playerId: 19220 },
  { pos: 'CM', posOrder: 3, number: 11, name: 'Jude Bellingham',    dob: '29/06/2003', age: 22, club: 'Real Madrid',      clubFlag: '🇪🇸', caps: 39,  goals: 14, playerId: 306   },
  { pos: 'CM', posOrder: 3, number: 7,  name: 'Jack Grealish',      dob: '10/09/1995', age: 30, club: 'Man City',         clubFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', caps: 43,  goals: 5,  playerId: 19237 },
  { pos: 'CM', posOrder: 3, number: 16, name: 'Conor Gallagher',    dob: '06/02/2000', age: 26, club: 'Atletico Madrid',  clubFlag: '🇪🇸', caps: 18,  goals: 2,  playerId: 198011},
  { pos: 'AM', posOrder: 3, number: 10, name: 'Phil Foden',         dob: '28/05/2000', age: 25, club: 'Man City',         clubFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', caps: 42,  goals: 10, playerId: 1485  },
  { pos: 'CM', posOrder: 3, number: 14, name: 'Curtis Jones',       dob: '30/01/2001', age: 25, club: 'Liverpool',        clubFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', caps: 10,  goals: 1,  playerId: 198018},
  { pos: 'CM', posOrder: 3, number: 15, name: 'Adam Wharton',       dob: '13/04/2004', age: 22, club: 'Crystal Palace',   clubFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', caps: 6,   goals: 0,  playerId: 350001},
  // Forwards
  { pos: 'RW', posOrder: 4, number: 17, name: 'Bukayo Saka',        dob: '05/09/2001', age: 24, club: 'Arsenal',          clubFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', caps: 48,  goals: 18, playerId: 1118  },
  { pos: 'ST', posOrder: 4, number: 9,  name: 'Harry Kane',         dob: '28/07/1993', age: 32, club: 'Bayern Munich',    clubFlag: '🇩🇪', caps: 101, goals: 68, playerId: 2295  },
  { pos: 'LW', posOrder: 4, number: 20, name: 'Jarrod Bowen',       dob: '20/12/1996', age: 29, club: 'West Ham',         clubFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', caps: 20,  goals: 5,  playerId: 198017},
  { pos: 'ST', posOrder: 4, number: 18, name: 'Ollie Watkins',      dob: '30/12/1995', age: 30, club: 'Aston Villa',      clubFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', caps: 16,  goals: 7,  playerId: 198015},
  { pos: 'LW', posOrder: 4, number: 21, name: 'Anthony Gordon',     dob: '24/02/2001', age: 25, club: 'Newcastle Utd',    clubFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', caps: 12,  goals: 3,  playerId: 198016},
  { pos: 'ST', posOrder: 4, number: 19, name: 'Cole Palmer',        dob: '06/05/2002', age: 24, club: 'Chelsea',          clubFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', caps: 18,  goals: 8,  playerId: 198013},
]

const POS_LABELS: Record<string, string> = {
  GK: 'Goalkeeper', CB: 'Centre-back', RB: 'Right-back', LB: 'Left-back',
  CM: 'Central Midfielder', AM: 'Attacking Midfielder', DM: 'Defensive Midfielder',
  RW: 'Right Winger', LW: 'Left Winger', ST: 'Striker',
}

const POS_COLORS: Record<string, string> = {
  GK: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  CB: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  RB: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  LB: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  CM: 'bg-green-500/20 text-green-400 border-green-500/30',
  AM: 'bg-green-500/20 text-green-400 border-green-500/30',
  DM: 'bg-green-500/20 text-green-400 border-green-500/30',
  RW: 'bg-red-500/20 text-red-400 border-red-500/30',
  LW: 'bg-red-500/20 text-red-400 border-red-500/30',
  ST: 'bg-red-500/20 text-red-400 border-red-500/30',
}

const SECTION_LABELS: Record<number, string> = {
  1: '🧤 Goalkeepers',
  2: '🛡️ Defenders',
  3: '⚙️ Midfielders',
  4: '⚡ Forwards',
}

const FAQS = [
  {
    question: 'Who is the captain of the England national football team?',
    answer: 'Harry Kane is the England captain. He is also England\'s all-time record goalscorer with over 68 international goals, surpassing Wayne Rooney\'s previous record of 53.'
  },
  {
    question: 'How many players are in the England World Cup 2026 squad?',
    answer: 'FIFA allows 26-player squads for the World Cup 2026. England\'s squad includes 3 goalkeepers, 9 defenders, 8 midfielders and 6 forwards.'
  },
  {
    question: 'Who is England\'s manager for the World Cup 2026?',
    answer: 'England are managed by Lee Carsley, who took charge after Gareth Southgate stepped down following Euro 2024. Carsley previously managed the England Under-21 side.'
  },
  {
    question: 'Has England ever won the World Cup?',
    answer: 'Yes — England won the FIFA World Cup in 1966 on home soil at Wembley, defeating West Germany 4-2 in the final. It remains England\'s only major international trophy.'
  },
  {
    question: 'What group is England in at World Cup 2026?',
    answer: 'The World Cup 2026 group stage draw will determine England\'s group. The tournament is co-hosted by the USA, Canada and Mexico with 48 teams competing from June 11 to July 19, 2026.'
  },
]

// Group squad by position order
const grouped = SQUAD.reduce((acc, p) => {
  if (!acc[p.posOrder]) acc[p.posOrder] = []
  acc[p.posOrder].push(p)
  return acc
}, {} as Record<number, typeof SQUAD>)

export default function EnglandTeamPage() {
  const schema = buildArticleSchema({
    title: 'England Football Team — Full Squad & World Cup 2026',
    description: 'Full England national football team squad for World Cup 2026.',
    canonical: 'https://www.goaltify.com/teams/england',
    publishedAt: '2026-05-17',
  })

  return (
    <div className="container-site py-8 max-w-5xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-5" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-gray-300">Home</Link>
        <span>/</span>
        <Link href="/world-cup" className="hover:text-gray-300">World Cup 2026</Link>
        <span>/</span>
        <span className="text-gray-400">England</span>
      </nav>

      {/* Hero */}
      <div className="card overflow-hidden mb-8">
        <div className="bg-gradient-to-br from-blue-900/40 to-red-900/20 p-6 md:p-8">
          <div className="flex items-center gap-5">
            <div className="text-6xl md:text-7xl select-none" role="img" aria-label="England flag">🏴󠁧󠁢󠁥󠁮󠁧󠁿</div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-brand-400 bg-brand-500/10 border border-brand-500/20 px-2.5 py-1 rounded-full">
                  🌍 World Cup 2026
                </span>
                <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">UEFA</span>
              </div>
              <h1 className="text-2xl md:text-4xl font-bold text-white mb-1">England</h1>
              <p className="text-gray-400 text-sm">The Three Lions · FIFA Ranking: #5</p>
              <div className="flex flex-wrap gap-4 mt-3">
                {[
                  { label: 'World Cups', value: '16' },
                  { label: 'Best finish', value: 'Winners (1966)' },
                  { label: 'Manager', value: 'Lee Carsley' },
                  { label: 'Captain', value: 'Harry Kane' },
                ].map(s => (
                  <div key={s.label}>
                    <p className="text-xs text-gray-500">{s.label}</p>
                    <p className="text-sm font-semibold text-white">{s.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Squad overview stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {[
          { label: 'Total players', value: SQUAD.length },
          { label: 'Avg. age', value: (SQUAD.reduce((a, p) => a + p.age, 0) / SQUAD.length).toFixed(1) },
          { label: 'Total caps', value: SQUAD.reduce((a, p) => a + p.caps, 0) },
          { label: 'Top scorer', value: 'Kane (68⚽)' },
        ].map(s => (
          <div key={s.label} className="card p-4 text-center">
            <p className="text-xl font-bold text-brand-400 mb-0.5">{s.value}</p>
            <p className="text-xs text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Squad table by section */}
      <h2 className="text-xl font-bold text-white mb-4">Full Squad — World Cup 2026</h2>

      <div className="space-y-6 mb-10">
        {([1, 2, 3, 4] as const).map(order => (
          <section key={order}>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              {SECTION_LABELS[order]}
            </h3>

            {/* Desktop table */}
            <div className="card overflow-x-auto hidden sm:block">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800 text-xs text-gray-500">
                    <th className="text-left px-4 py-3 w-12">#</th>
                    <th className="text-left px-2 py-3 w-10">Pos.</th>
                    <th className="text-left px-4 py-3">Player name</th>
                    <th className="text-left px-4 py-3">Date of birth (age)</th>
                    <th className="text-left px-4 py-3">Club</th>
                    <th className="text-center py-3 w-16">Caps</th>
                    <th className="text-center py-3 w-16">Goals</th>
                  </tr>
                </thead>
                <tbody>
                  {grouped[order]?.sort((a, b) => a.number - b.number).map(player => (
                    <tr key={player.playerId} className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                      {/* Shirt number */}
                      <td className="px-4 py-3 text-gray-500 font-medium text-center">{player.number}</td>

                      {/* Position badge */}
                      <td className="px-2 py-3">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${POS_COLORS[player.pos] ?? 'bg-gray-700 text-gray-300 border-gray-600'}`}>
                          {player.pos}
                        </span>
                      </td>

                      {/* Player with photo */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="relative w-9 h-9 rounded-full overflow-hidden bg-gray-800 shrink-0">
                            <Image
                              src={`https://media.api-sports.io/football/players/${player.playerId}.png`}
                              alt={`${player.name} profile photo`}
                              fill
                              className="object-cover"
                              sizes="36px"
                              onError={undefined}
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-white leading-tight">{player.name}</p>
                            <p className="text-[10px] text-gray-500">{POS_LABELS[player.pos]}</p>
                          </div>
                        </div>
                      </td>

                      {/* DOB + age */}
                      <td className="px-4 py-3 text-gray-400 text-sm">
                        {player.dob}
                        <span className="text-gray-600 ml-1">({player.age})</span>
                      </td>

                      {/* Club */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm">{player.clubFlag}</span>
                          <span className="text-gray-300 text-sm">{player.club}</span>
                        </div>
                      </td>

                      {/* Caps */}
                      <td className="text-center py-3 text-gray-300 font-medium">{player.caps}</td>

                      {/* Goals */}
                      <td className="text-center py-3">
                        <span className={player.goals > 0 ? 'text-brand-400 font-bold' : 'text-gray-600'}>
                          {player.goals}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="sm:hidden space-y-2">
              {grouped[order]?.sort((a, b) => a.number - b.number).map(player => (
                <div key={player.playerId} className="card p-3 flex items-center gap-3">
                  <span className="text-xs text-gray-600 w-5 text-center">{player.number}</span>
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-800 shrink-0">
                    <Image
                      src={`https://media.api-sports.io/football/players/${player.playerId}.png`}
                      alt={player.name}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-white truncate">{player.name}</p>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border shrink-0 ${POS_COLORS[player.pos]}`}>{player.pos}</span>
                    </div>
                    <p className="text-xs text-gray-500">{player.club} · {player.dob} ({player.age})</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-gray-500">Caps</p>
                    <p className="text-sm font-bold text-white">{player.caps}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Top performers highlight */}
      <div className="card p-6 mb-8">
        <h2 className="text-lg font-bold text-white mb-4">⭐ Key players to watch</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { name: 'Harry Kane', stat: '68 goals', desc: 'England\'s all-time record scorer. His finishing is world-class and he\'ll be central to every England attack.', pos: 'ST' },
            { name: 'Jude Bellingham', stat: '14 goals', desc: 'The most complete midfielder of his generation. His late runs into the box and leadership are England\'s biggest weapon.', pos: 'CM' },
            { name: 'Bukayo Saka', stat: '18 goals', desc: 'Arsenal\'s talisman. One of the most consistent wide players in Europe — key to England\'s right-side attacks.', pos: 'RW' },
          ].map(p => (
            <div key={p.name} className="bg-gray-800/40 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${POS_COLORS[p.pos]}`}>{p.pos}</span>
                <span className="text-sm font-bold text-white">{p.name}</span>
              </div>
              <p className="text-brand-400 text-lg font-bold mb-1">{p.stat}</p>
              <p className="text-xs text-gray-400 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Related links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        <Link href="/world-cup" className="card p-4 hover:border-gray-700 transition-colors group">
          <p className="text-xs text-brand-400 mb-1">🌍 Tournament</p>
          <p className="text-sm font-medium text-white group-hover:text-brand-400">World Cup 2026 hub →</p>
        </Link>
        <Link href="/competitions/premier-league" className="card p-4 hover:border-gray-700 transition-colors group">
          <p className="text-xs text-brand-400 mb-1">🏴󠁧󠁢󠁥󠁮󠁧󠁿 League</p>
          <p className="text-sm font-medium text-white group-hover:text-brand-400">Premier League →</p>
        </Link>
        <Link href="/players" className="card p-4 hover:border-gray-700 transition-colors group">
          <p className="text-xs text-brand-400 mb-1">⭐ Rankings</p>
          <p className="text-sm font-medium text-white group-hover:text-brand-400">Top 20 world players →</p>
        </Link>
      </div>

      <FAQSection faqs={FAQS} />
    </div>
  )
}
