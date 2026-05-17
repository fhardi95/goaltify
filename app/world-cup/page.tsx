import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'FIFA World Cup 2026 — Live Scores, Groups & Team Guides',
  description:
    'Complete FIFA World Cup 2026 guide. Live scores, full fixture list, team guides and expert analysis. 48 teams, 3 hosts, 104 matches — June 11 to July 19.',
  canonical: 'https://www.goaltify.com/world-cup',
  keywords: [
    'World Cup 2026','FIFA World Cup 2026','World Cup 2026 groups','World Cup 2026 fixtures',
    'World Cup 2026 schedule','World Cup 2026 teams','World Cup 2026 live scores',
    'World Cup 2026 results','World Cup 2026 group stage','World Cup 2026 knockout',
    'World Cup 2026 dates','World Cup 2026 venues','FIFA World Cup groups 2026',
    'World Cup 2026 England','World Cup 2026 USA','World Cup 2026 Argentina',
    'World Cup 2026 Brazil','World Cup 2026 France','World Cup 2026 Spain',
    '2026 World Cup host countries','World Cup 2026 48 teams','World Cup final 2026',
    'World Cup 2026 qualifier results','who qualified for World Cup 2026','World Cup 2026 predictions',
  ],
})

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SportsEvent',
      name: 'FIFA World Cup 2026',
      startDate: '2026-06-11',
      endDate: '2026-07-19',
      location: { '@type': 'Place', name: 'USA, Canada & Mexico', address: 'North America' },
      organizer: { '@type': 'Organization', name: 'FIFA', url: 'https://www.fifa.com' },
      url: 'https://www.goaltify.com/world-cup',
      description: 'The 2026 FIFA World Cup hosted across the USA, Canada and Mexico. 48 nations compete across 104 matches from 11 June to 19 July 2026.',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.goaltify.com' },
        { '@type': 'ListItem', position: 2, name: 'World Cup 2026', item: 'https://www.goaltify.com/world-cup' },
      ],
    },
  ],
}

// Team links — only pages that exist get a link
const TEAM_PAGES: Record<string, string> = {
  'England': '/teams/england',
}

const GROUPS = [
  { name: 'A', teams: ['Mexico', 'South Korea', 'South Africa', 'Czechia'] },
  { name: 'B', teams: ['Canada', 'Switzerland', 'Qatar', 'Bosnia & Herzegovina'] },
  { name: 'C', teams: ['Brazil', 'Morocco', 'Haiti', 'Scotland'] },
  { name: 'D', teams: ['USA', 'Paraguay', 'Australia', 'Türkiye'] },
  { name: 'E', teams: ['Germany', 'Ivory Coast', 'Ecuador', 'Curaçao'] },
  { name: 'F', teams: ['Netherlands', 'Sweden', 'Tunisia', 'TBC'] },
  { name: 'G', teams: ['Belgium', 'Egypt', 'Iran', 'New Zealand'] },
  { name: 'H', teams: ['Spain', 'Saudi Arabia', 'Uruguay', 'Cape Verde'] },
  { name: 'I', teams: ['France', 'Senegal', 'Norway', 'Iraq'] },
  { name: 'J', teams: ['Argentina', 'Algeria', 'Austria', 'Jordan'] },
  { name: 'K', teams: ['Portugal', 'DR Congo', 'Colombia', 'Uzbekistan'] },
  { name: 'L', teams: ['England', 'Croatia', 'Ghana', 'Panama'] },
]

const QUICK_FACTS = [
  { label: 'Host nations', value: 'USA, Canada & Mexico' },
  { label: 'Teams', value: '48 (expanded from 32)' },
  { label: 'Groups', value: '12 groups of 4' },
  { label: 'Matches', value: '104 total' },
  { label: 'Start date', value: '11 June 2026' },
  { label: 'Final', value: '19 July 2026 — MetLife Stadium' },
  { label: 'Venues', value: '16 stadiums' },
  { label: 'Duration', value: '39 days' },
]

const FAQS = [
  { q: 'When does the FIFA World Cup 2026 start?', a: 'The tournament kicks off on 11 June 2026 with the opening match — Mexico vs South Africa at Estadio Azteca, Mexico City. The tournament runs until 19 July 2026.' },
  { q: 'Where is the 2026 World Cup being held?', a: 'Three nations co-host: the United States (78 matches, including all knockout games from the quarter-finals onward), Canada (13 matches) and Mexico (13 matches). Sixteen stadiums across 16 cities are used.' },
  { q: 'How many teams are in the 2026 World Cup?', a: '48 teams — up from 32. They are divided into 12 groups of 4. The top 2 from each group plus the 8 best third-placed teams advance to a new round of 32.' },
  { q: 'Who are the favourites to win?', a: 'France (FIFA No. 1), Spain (No. 2), defending champions Argentina (No. 3), England (No. 4) and Portugal (No. 5) lead the rankings.' },
  { q: 'When is the World Cup 2026 final?', a: 'The final is on 19 July 2026 at MetLife Stadium, East Rutherford, New Jersey, USA.' },
  { q: 'What group is England in?', a: 'England are in Group L alongside Croatia, Ghana and Panama. View the full England squad at goaltify.com/teams/england.' },
  { q: 'What group is Argentina in?', a: 'Defending champions Argentina are in Group J alongside Algeria, Austria and Jordan.' },
  { q: 'Which big teams did NOT qualify?', a: "Italy (missing a third straight World Cup), Denmark, Poland, Serbia, Wales, Costa Rica and Cameroon all failed to qualify." },
  { q: 'How does the World Cup 2026 format work?', a: '12 groups of 4 teams. Top 2 from each group (24 teams) plus the 8 best third-placed teams = 32 teams enter a round of 32, then round of 16, quarter-finals, semi-finals and final.' },
  { q: 'How many matches are in the 2026 World Cup?', a: '104 matches in total across 39 days — up from 64 matches at Qatar 2022.' },
]

export default function WorldCupPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="container-site py-8">

        {/* Hero */}
        <div className="card p-6 md:p-8 mb-8 border-brand-500/30 bg-gradient-to-br from-gray-900 to-brand-900/20">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🌍</span>
            <span className="text-xs font-medium text-brand-400 bg-brand-500/10 border border-brand-500/20 px-2.5 py-1 rounded-full">Live coverage</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">FIFA World Cup 2026</h1>
          <p className="text-gray-400 text-sm max-w-xl leading-relaxed">
            The biggest World Cup in history — 48 teams, 3 host nations, 104 matches. Goaltify has live scores, group tables, fixtures and analysis throughout the tournament.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
            {QUICK_FACTS.map(f => (
              <div key={f.label} className="bg-gray-800/50 rounded-lg px-3 py-2">
                <p className="text-xs text-gray-500">{f.label}</p>
                <p className="text-sm font-semibold text-white">{f.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-8">

            {/* Live scores CTA */}
            <div className="card p-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-semibold text-white mb-1">World Cup 2026 live scores</h2>
                <p className="text-xs text-gray-400">All fixtures updated in real-time on our live scores page.</p>
              </div>
              <Link href="/live-scores" className="shrink-0 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium rounded-lg transition-colors">
                Live scores →
              </Link>
            </div>

            {/* SEO intro */}
            <section aria-label="About the FIFA World Cup 2026">
              <h2 className="text-lg font-semibold text-white mb-3">Everything you need for the FIFA World Cup 2026</h2>
              <div className="card p-5 space-y-3 text-sm text-gray-400 leading-relaxed">
                <p>The <strong className="text-white">FIFA World Cup 2026</strong> is the 23rd edition of football's greatest tournament. Running from <strong className="text-white">11 June to 19 July 2026</strong>, the competition expands to <strong className="text-white">48 teams for the first time</strong>, split into <strong className="text-white">12 groups of four</strong> across 104 matches over 39 days.</p>
                <p>Three nations share hosting duties: the <strong className="text-white">United States</strong> — staging 78 matches including every knockout game from the quarter-finals onward — <strong className="text-white">Canada</strong> and <strong className="text-white">Mexico</strong>, each hosting 13 matches. The <strong className="text-white">World Cup final on 19 July</strong> takes place at MetLife Stadium in New Jersey.</p>
                <p>Defending champions <strong className="text-white">Argentina</strong> (Group J) will look to retain the trophy. They face stiff competition from FIFA No. 1 <strong className="text-white">France</strong> (Group I), <strong className="text-white">Spain</strong> (Group H), <strong className="text-white">England</strong> (Group L) and <strong className="text-white">Portugal</strong> (Group K).</p>
              </div>
            </section>

            {/* Group Stage — with England link */}
            <section aria-label="World Cup 2026 group stage">
              <h2 className="text-lg font-semibold text-white mb-4">World Cup 2026 group stage — all 12 groups</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {GROUPS.map(group => (
                  <div key={group.name} className={`card p-4 ${group.name === 'L' ? 'border-brand-500/40' : ''}`}>
                    <h3 className="text-xs font-bold text-brand-400 mb-2 uppercase tracking-wide flex items-center justify-between">
                      Group {group.name}
                      {group.name === 'L' && <span className="text-[9px] text-gray-500 normal-case font-normal">🏴󠁧󠁢󠁥󠁮󠁧󠁿 England's group</span>}
                    </h3>
                    {group.teams.map((t, i) => {
                      const teamLink = TEAM_PAGES[t]
                      return (
                        <div key={i} className="flex items-center gap-2 py-1.5 border-b border-gray-800 last:border-0">
                          <span className="text-xs text-gray-600 w-3">{i + 1}</span>
                          {teamLink ? (
                            <Link href={teamLink} className="text-xs text-brand-400 hover:text-brand-300 font-medium flex items-center gap-1 transition-colors">
                              {t}
                              <span className="text-[9px] text-gray-600">→</span>
                            </Link>
                          ) : (
                            <span className="text-xs text-gray-300">{t}</span>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-600 mt-3">Top 2 from each group + 8 best third-placed teams advance to the round of 32. Click team names for squad guides.</p>
            </section>

            {/* England highlight card */}
            <div className="card p-5 border-blue-500/30 bg-gradient-to-r from-blue-900/10 to-red-900/10">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">🏴󠁧󠁢󠁥󠁮󠁧󠁿</span>
                  <div>
                    <h3 className="text-base font-bold text-white">England — World Cup 2026</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Group L · FIFA Ranking #4 · Captain: Harry Kane</p>
                    <div className="flex gap-2 mt-1.5">
                      <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full">vs Croatia</span>
                      <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full">vs Ghana</span>
                      <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full">vs Panama</span>
                    </div>
                  </div>
                </div>
                <Link href="/teams/england" className="shrink-0 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap">
                  Full squad →
                </Link>
              </div>
            </div>

            {/* Key Dates */}
            <section aria-label="World Cup 2026 key dates">
              <h2 className="text-lg font-semibold text-white mb-4">Key dates</h2>
              <div className="card divide-y divide-gray-800">
                {[
                  { date: '11 Jun 2026', event: 'Opening match — Mexico vs South Africa (Estadio Azteca)' },
                  { date: '13 Jun 2026', event: 'England vs Croatia • Brazil vs Morocco' },
                  { date: '24 Jun 2026', event: 'Group stage concludes' },
                  { date: '27 Jun 2026', event: 'Round of 32 begins' },
                  { date: '~9 Jul 2026', event: 'Quarter-finals' },
                  { date: '~15 Jul 2026', event: 'Semi-finals' },
                  { date: '19 Jul 2026', event: 'Final — MetLife Stadium, New Jersey' },
                ].map(({ date, event }) => (
                  <div key={date} className="flex gap-4 px-5 py-3">
                    <span className="text-xs text-brand-400 font-semibold whitespace-nowrap w-24 shrink-0">{date}</span>
                    <span className="text-xs text-gray-300">{event}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section aria-label="World Cup 2026 FAQ">
              <h2 className="text-lg font-semibold text-white mb-4">World Cup 2026 — frequently asked questions</h2>
              <div className="space-y-3">
                {FAQS.map(({ q, a }) => (
                  <details key={q} className="card group open:border-brand-500/40 transition-colors">
                    <summary className="flex items-center justify-between gap-3 p-4 cursor-pointer list-none select-none">
                      <span className="text-sm font-medium text-white">{q}</span>
                      <span className="text-gray-600 group-open:rotate-45 transition-transform shrink-0 text-lg leading-none">+</span>
                    </summary>
                    <p className="px-4 pb-4 text-sm text-gray-400 leading-relaxed">{a}</p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">

            {/* England squad CTA */}
            <div className="card p-4 border-brand-500/30">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🏴󠁧󠁢󠁥󠁮󠁧󠁿</span>
                <h3 className="text-sm font-semibold text-white">England squad guide</h3>
              </div>
              <p className="text-xs text-gray-400 mb-3">Full 26-man squad with player photos, positions, ages, clubs and caps.</p>
              <Link href="/teams/england" className="block text-center text-xs py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-medium transition-colors">
                View England squad →
              </Link>
            </div>

            <div className="card p-5">
              <h3 className="text-sm font-semibold text-white mb-3">World Cup 2026 coverage</h3>
              <div className="space-y-2">
                {[
                  { label: 'Live scores', href: '/live-scores' },
                  { label: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 England squad', href: '/teams/england' },
                  { label: 'World Cup news', href: '/news?category=news' },
                  { label: 'Tactical analysis', href: '/news?category=tactics' },
                  { label: 'xG Calculator', href: '/tools/calculators/xg-calculator' },
                  { label: '4-3-3 formation guide', href: '/academy/tactics/4-3-3-formation-guide' },
                ].map(l => (
                  <Link key={l.href} href={l.href} className="flex items-center gap-2 text-sm text-gray-400 hover:text-brand-400 transition-colors py-1 border-b border-gray-800 last:border-0">
                    <span className="text-gray-700">→</span> {l.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="card p-5">
              <h3 className="text-sm font-semibold text-white mb-3">🏆 Top contenders</h3>
              <div className="space-y-2">
                {[
                  { team: 'France', rank: 1, group: 'I', flag: '🇫🇷' },
                  { team: 'Spain', rank: 2, group: 'H', flag: '🇪🇸' },
                  { team: 'Argentina', rank: 3, group: 'J', flag: '🇦🇷' },
                  { team: 'England', rank: 4, group: 'L', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', link: '/teams/england' },
                  { team: 'Portugal', rank: 5, group: 'K', flag: '🇵🇹' },
                  { team: 'Brazil', rank: 6, group: 'C', flag: '🇧🇷' },
                ].map(({ team, rank, group, flag, link }) => (
                  <div key={team} className="flex items-center justify-between py-1.5 border-b border-gray-800 last:border-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-600 w-4">#{rank}</span>
                      <span className="text-sm">{flag}</span>
                      {link ? (
                        <Link href={link} className="text-sm text-brand-400 hover:text-brand-300 font-medium transition-colors">{team}</Link>
                      ) : (
                        <span className="text-sm text-gray-300">{team}</span>
                      )}
                    </div>
                    <span className="text-xs text-brand-400 bg-brand-500/10 border border-brand-500/20 px-1.5 py-0.5 rounded">Grp {group}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-600 mt-2">FIFA rankings — April 2026</p>
            </div>

            <div className="card p-5">
              <h3 className="text-sm font-semibold text-white mb-2">📬 World Cup updates</h3>
              <p className="text-xs text-gray-400 mb-3">Daily World Cup digest straight to your inbox during the tournament.</p>
              <Link href="/newsletter" className="block text-center text-xs py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-medium transition-colors">
                Subscribe free →
              </Link>
            </div>
          </aside>
        </div>

        {/* Bottom SEO */}
        <section className="mt-12 border-t border-gray-800 pt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-white mb-2">World Cup 2026 format explained</h3>
            <p className="text-xs text-gray-500 leading-relaxed">For the first time, the FIFA World Cup features 48 nations in 12 groups. Every team plays three group games. The top two from each group plus the 8 best third-placed teams advance — 32 teams in total — to the new round of 32, then round of 16, quarter-finals, semi-finals and the final on 19 July.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-2">World Cup 2026 host cities</h3>
            <p className="text-xs text-gray-500 leading-relaxed">The US hosts across 11 cities: New York/New Jersey, Los Angeles, Dallas, San Francisco, Seattle, Miami, Boston, Atlanta, Houston, Philadelphia and Kansas City. Mexico hosts in Mexico City, Guadalajara and Monterrey. Canada hosts in Toronto and Vancouver.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-2">Follow on Goaltify</h3>
            <p className="text-xs text-gray-500 leading-relaxed">Goaltify covers the World Cup 2026 end-to-end: live scores updated in real-time, group tables, fixture lists, xG stats, tactical breakdowns and team squad guides including the full <Link href="/teams/england" className="text-brand-400 hover:underline">England squad</Link>. Bookmark us and subscribe to our newsletter for daily tournament updates.</p>
          </div>
        </section>
      </div>
    </>
  )
}
