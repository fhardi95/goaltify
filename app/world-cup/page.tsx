import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/seo'

// ─── SEO Metadata ────────────────────────────────────────────────────────────
export const metadata: Metadata = buildMetadata({
  title: 'FIFA World Cup 2026 — Live Scores, Groups, Fixtures & Team Guide',
  description:
    'Complete FIFA World Cup 2026 guide. Live scores, all 12 group tables, full fixture list, team guides and expert analysis. 48 teams, 3 hosts, 104 matches — June 11 to July 19.',
  canonical: 'https://www.goaltify.com/world-cup',
  keywords: [
    'World Cup 2026',
    'FIFA World Cup 2026',
    'World Cup 2026 groups',
    'World Cup 2026 fixtures',
    'World Cup 2026 schedule',
    'World Cup 2026 teams',
    'World Cup 2026 live scores',
    'World Cup 2026 results',
    'World Cup 2026 group stage',
    'World Cup 2026 knockout',
    'World Cup 2026 dates',
    'World Cup 2026 venues',
    'FIFA World Cup groups 2026',
    'World Cup 2026 England',
    'World Cup 2026 USA',
    'World Cup 2026 Argentina',
    'World Cup 2026 Brazil',
    'World Cup 2026 France',
    'World Cup 2026 Spain',
    '2026 World Cup host countries',
    'World Cup 2026 48 teams',
    'World Cup final 2026',
    'World Cup 2026 qualifier results',
    'who qualified for World Cup 2026',
    'World Cup 2026 predictions',
  ],
})

// ─── Structured Data ─────────────────────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SportsEvent',
      name: 'FIFA World Cup 2026',
      startDate: '2026-06-11',
      endDate: '2026-07-19',
      location: {
        '@type': 'Place',
        name: 'USA, Canada & Mexico',
        address: 'North America',
      },
      organizer: {
        '@type': 'Organization',
        name: 'FIFA',
        url: 'https://www.fifa.com',
      },
      url: 'https://www.goaltify.com/world-cup',
      description:
        'The 2026 FIFA World Cup is the 23rd edition of the tournament, hosted across the USA, Canada and Mexico. 48 nations compete across 104 matches from 11 June to 19 July 2026.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'When does the FIFA World Cup 2026 start?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The FIFA World Cup 2026 starts on 11 June 2026 with the opening match — Mexico vs South Africa at Estadio Azteca in Mexico City.',
          },
        },
        {
          '@type': 'Question',
          name: 'Where is the World Cup 2026 being held?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The 2026 World Cup is co-hosted by three nations: the United States, Canada and Mexico. 16 stadiums across 16 cities will host the 104 matches.',
          },
        },
        {
          '@type': 'Question',
          name: 'How many teams are in the 2026 World Cup?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '48 teams compete in the 2026 FIFA World Cup — expanded from 32 teams. They are divided into 12 groups of four, with the top two from each group and the eight best third-placed teams advancing to a round of 32.',
          },
        },
        {
          '@type': 'Question',
          name: 'Who are the favourites to win the 2026 World Cup?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'France (FIFA ranked No. 1), Spain (No. 2), Argentina (defending champions, No. 3), England (No. 4) and Portugal (No. 5) are widely regarded as the top contenders heading into the tournament.',
          },
        },
        {
          '@type': 'Question',
          name: 'When is the World Cup 2026 final?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The World Cup 2026 final takes place on 19 July 2026 at MetLife Stadium in East Rutherford, New Jersey, USA.',
          },
        },
        {
          '@type': 'Question',
          name: 'How many matches are played in the 2026 World Cup?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '104 matches in total are played at the 2026 FIFA World Cup — up from 64 in previous tournaments — across a 39-day tournament.',
          },
        },
        {
          '@type': 'Question',
          name: 'Did England qualify for the 2026 World Cup?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. England qualified for the 2026 World Cup and are placed in Group L alongside Croatia, Ghana and Panama.',
          },
        },
        {
          '@type': 'Question',
          name: 'What group is Argentina in at the 2026 World Cup?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Defending champions Argentina are in Group J alongside Algeria, Austria and Jordan.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which teams did not qualify for the 2026 World Cup?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Notable absentees include Italy (missing their third consecutive World Cup), Denmark, Poland, Serbia, Wales, Costa Rica and Cameroon — all of whom appeared at Qatar 2022.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does the World Cup 2026 format work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The 48 teams are split into 12 groups of 4. The top 2 from each group plus the 8 best third-placed teams advance to a round of 32. This is followed by a round of 16, quarter-finals, semi-finals and the final.',
          },
        },
      ],
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

// ─── Data ─────────────────────────────────────────────────────────────────────
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
  {
    q: 'When does the FIFA World Cup 2026 start?',
    a: 'The tournament kicks off on 11 June 2026 with the opening match — Mexico vs South Africa at Estadio Azteca, Mexico City. The tournament runs until 19 July 2026.',
  },
  {
    q: 'Where is the 2026 World Cup being held?',
    a: 'Three nations co-host: the United States (78 matches, including all knockout games from the quarter-finals onward), Canada (13 matches) and Mexico (13 matches). Sixteen stadiums across 16 cities are used.',
  },
  {
    q: 'How many teams are in the 2026 World Cup?',
    a: '48 teams — up from 32. They are divided into 12 groups of 4. The top 2 from each group plus the 8 best third-placed teams advance to a new round of 32.',
  },
  {
    q: 'Who are the favourites to win?',
    a: 'France (FIFA No. 1), Spain (No. 2), defending champions Argentina (No. 3), England (No. 4) and Portugal (No. 5) lead the rankings. FIFA has ensured the top-ranked teams are in separate pathways so Argentina and Spain cannot meet before the final.',
  },
  {
    q: 'When is the World Cup 2026 final?',
    a: 'The final is on 19 July 2026 at MetLife Stadium, East Rutherford, New Jersey, USA.',
  },
  {
    q: 'What group is England in?',
    a: 'England are in Group L alongside Croatia, Ghana and Panama.',
  },
  {
    q: 'What group is Argentina in?',
    a: 'Defending champions Argentina are in Group J alongside Algeria, Austria and Jordan.',
  },
  {
    q: 'Which big teams did NOT qualify?',
    a: 'Italy (missing a third straight World Cup), Denmark, Poland, Serbia, Wales, Costa Rica and Cameroon all failed to qualify. Italy\'s absence is the biggest story — they won the 2006 World Cup.',
  },
  {
    q: 'How does the World Cup 2026 format work?',
    a: '12 groups of 4 teams. Top 2 from each group (24 teams) plus the 8 best third-placed teams = 32 teams enter a round of 32, then round of 16, quarter-finals, semi-finals and final.',
  },
  {
    q: 'How many matches are in the 2026 World Cup?',
    a: '104 matches in total across 39 days — up from 64 matches at Qatar 2022.',
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function WorldCupPage() {
  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container-site py-8">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <div className="card p-6 md:p-8 mb-8 border-brand-500/30 bg-gradient-to-br from-gray-900 to-brand-900/20">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🌍</span>
            <span className="text-xs font-medium text-brand-400 bg-brand-500/10 border border-brand-500/20 px-2.5 py-1 rounded-full">
              Live coverage
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            FIFA World Cup 2026
          </h1>
          <p className="text-gray-400 text-sm max-w-xl leading-relaxed">
            The biggest World Cup in history — 48 teams, 3 host nations, 104 matches.
            Goaltify has live scores, group tables, fixtures and analysis throughout the tournament.
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

            {/* ── Live scores CTA ────────────────────────────────────────── */}
            <div className="card p-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-semibold text-white mb-1">
                  World Cup 2026 live scores
                </h2>
                <p className="text-xs text-gray-400">
                  All fixtures updated in real-time on our live scores page.
                </p>
              </div>
              <Link
                href="/live-scores"
                className="shrink-0 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Live scores →
              </Link>
            </div>

            {/* ── SEO Introduction paragraph ─────────────────────────────── */}
            <section aria-label="About the FIFA World Cup 2026">
              <h2 className="text-lg font-semibold text-white mb-3">
                Everything you need for the FIFA World Cup 2026
              </h2>
              <div className="card p-5 space-y-3 text-sm text-gray-400 leading-relaxed">
                <p>
                  The <strong className="text-white">FIFA World Cup 2026</strong> is the 23rd edition
                  of football's greatest tournament and the most ambitious in history. Running from{' '}
                  <strong className="text-white">11 June to 19 July 2026</strong>, the competition
                  expands to <strong className="text-white">48 teams for the first time</strong>,
                  split into <strong className="text-white">12 groups of four</strong> across 104
                  matches over 39 days.
                </p>
                <p>
                  Three nations share hosting duties: the{' '}
                  <strong className="text-white">United States</strong> — staging 78 matches
                  including every knockout game from the quarter-finals onward —{' '}
                  <strong className="text-white">Canada</strong> and{' '}
                  <strong className="text-white">Mexico</strong>, each hosting 13 matches.
                  The opening game is <strong className="text-white">Mexico vs South Africa</strong>{' '}
                  at Estadio Azteca on 11 June, while the{' '}
                  <strong className="text-white">World Cup final on 19 July</strong> takes place at
                  MetLife Stadium in New Jersey.
                </p>
                <p>
                  Defending champions <strong className="text-white">Argentina</strong> (Group J) will
                  look to retain the trophy lifted by Lionel Messi at Qatar 2022. They face stiff
                  competition from FIFA No. 1{' '}
                  <strong className="text-white">France</strong> (Group I),{' '}
                  <strong className="text-white">Spain</strong> (Group H),{' '}
                  <strong className="text-white">England</strong> (Group L) and{' '}
                  <strong className="text-white">Portugal</strong> (Group K). Notable absentees
                  include <strong className="text-white">Italy</strong>, missing their third
                  consecutive World Cup after losing to Bosnia &amp; Herzegovina on penalties in the
                  play-offs.
                </p>
                <p>
                  Goaltify covers every angle: live scores updated in real-time, group-stage tables,
                  fixture lists, team-by-team guides, xG statistics, tactical breakdowns and daily
                  news throughout the tournament. Bookmark this page as your{' '}
                  <strong className="text-white">World Cup 2026 hub</strong>.
                </p>
              </div>
            </section>

            {/* ── Group Stage ────────────────────────────────────────────── */}
            <section aria-label="World Cup 2026 group stage">
              <h2 className="text-lg font-semibold text-white mb-4">
                World Cup 2026 group stage — all 12 groups
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {GROUPS.map(group => (
                  <div key={group.name} className="card p-4">
                    <h3 className="text-xs font-bold text-brand-400 mb-2 uppercase tracking-wide">
                      Group {group.name}
                    </h3>
                    {group.teams.map((t, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 py-1.5 border-b border-gray-800 last:border-0"
                      >
                        <span className="text-xs text-gray-600 w-3">{i + 1}</span>
                        <span className="text-xs text-gray-300">{t}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-600 mt-3">
                Top 2 from each group + 8 best third-placed teams advance to the round of 32. Full
                fixtures and standings updated live.
              </p>
            </section>

            {/* ── Key Dates ──────────────────────────────────────────────── */}
            <section aria-label="World Cup 2026 key dates">
              <h2 className="text-lg font-semibold text-white mb-4">Key dates</h2>
              <div className="card divide-y divide-gray-800">
                {[
                  { date: '11 Jun 2026', event: 'Opening match — Mexico vs South Africa (Estadio Azteca)' },
                  { date: '12 Jun 2026', event: 'USA vs Paraguay • Canada vs Bosnia & Herzegovina' },
                  { date: '13 Jun 2026', event: 'England vs Croatia • Brazil vs Morocco' },
                  { date: '24 Jun 2026', event: 'Group stage concludes' },
                  { date: '27 Jun 2026', event: 'Round of 32 begins' },
                  { date: '~9 Jul 2026', event: 'Quarter-finals' },
                  { date: '~15 Jul 2026', event: 'Semi-finals' },
                  { date: '19 Jul 2026', event: 'Final — MetLife Stadium, New Jersey' },
                ].map(({ date, event }) => (
                  <div key={date} className="flex gap-4 px-5 py-3">
                    <span className="text-xs text-brand-400 font-semibold whitespace-nowrap w-24 shrink-0">
                      {date}
                    </span>
                    <span className="text-xs text-gray-300">{event}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* ── FAQ ────────────────────────────────────────────────────── */}
            <section aria-label="World Cup 2026 frequently asked questions">
              <h2 className="text-lg font-semibold text-white mb-4">
                World Cup 2026 — frequently asked questions
              </h2>
              <div className="space-y-3">
                {FAQS.map(({ q, a }) => (
                  <details
                    key={q}
                    className="card group open:border-brand-500/40 transition-colors"
                  >
                    <summary className="flex items-center justify-between gap-3 p-4 cursor-pointer list-none select-none">
                      <span className="text-sm font-medium text-white">{q}</span>
                      <span className="text-gray-600 group-open:rotate-45 transition-transform shrink-0 text-lg leading-none">
                        +
                      </span>
                    </summary>
                    <p className="px-4 pb-4 text-sm text-gray-400 leading-relaxed">{a}</p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          {/* ── Sidebar ────────────────────────────────────────────────────── */}
          <aside className="space-y-4">
            <div className="card p-5">
              <h3 className="text-sm font-semibold text-white mb-3">World Cup 2026 coverage</h3>
              <div className="space-y-2">
                {[
                  { label: 'Live scores', href: '/live-scores' },
                  { label: 'World Cup fixtures', href: '/live-scores?tournament=world-cup-2026' },
                  { label: 'World Cup news', href: '/news?category=news' },
                  { label: 'Tactical analysis', href: '/news?category=tactics' },
                  { label: 'Player ratings', href: '/news' },
                  { label: 'xG Calculator', href: '/tools/calculators/xg-calculator' },
                  { label: 'Academy — High press explained', href: '/academy/tactics/high-press-explained' },
                  { label: 'Academy — 4-3-3 guide', href: '/academy/tactics/4-3-3-formation-guide' },
                ].map(l => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-brand-400 transition-colors py-1 border-b border-gray-800 last:border-0"
                  >
                    <span className="text-gray-700">→</span> {l.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Favourites widget */}
            <div className="card p-5">
              <h3 className="text-sm font-semibold text-white mb-3">🏆 Top contenders</h3>
              <div className="space-y-2">
                {[
                  { team: 'France', rank: 1, group: 'I' },
                  { team: 'Spain', rank: 2, group: 'H' },
                  { team: 'Argentina', rank: 3, group: 'J' },
                  { team: 'England', rank: 4, group: 'L' },
                  { team: 'Portugal', rank: 5, group: 'K' },
                  { team: 'Brazil', rank: 6, group: 'C' },
                ].map(({ team, rank, group }) => (
                  <div
                    key={team}
                    className="flex items-center justify-between py-1.5 border-b border-gray-800 last:border-0"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-600 w-4">#{rank}</span>
                      <span className="text-sm text-gray-300">{team}</span>
                    </div>
                    <span className="text-xs text-brand-400 bg-brand-500/10 border border-brand-500/20 px-1.5 py-0.5 rounded">
                      Grp {group}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-600 mt-2">FIFA rankings — April 2026</p>
            </div>

            {/* Newsletter */}
            <div className="card p-5">
              <h3 className="text-sm font-semibold text-white mb-2">📬 World Cup updates</h3>
              <p className="text-xs text-gray-400 mb-3">
                Daily World Cup digest straight to your inbox during the tournament. Scores, goals,
                analysis.
              </p>
              <Link
                href="/newsletter"
                className="block text-center text-xs py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-medium transition-colors"
              >
                Subscribe free →
              </Link>
            </div>

            {/* Stadium fact */}
            <div className="card p-5">
              <h3 className="text-sm font-semibold text-white mb-2">🏟️ 16 venues</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                AT&amp;T Stadium (Arlington) hosts the most matches — <strong className="text-white">9 games</strong>.
                The final is at MetLife Stadium, New Jersey. All venues renamed to city names for
                the tournament to avoid ambush marketing.
              </p>
            </div>
          </aside>
        </div>

        {/* ── Bottom SEO copy ───────────────────────────────────────────────── */}
        <section
          aria-label="World Cup 2026 guide"
          className="mt-12 border-t border-gray-800 pt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div>
            <h3 className="text-sm font-semibold text-white mb-2">
              World Cup 2026 format explained
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              For the first time, the FIFA World Cup features 48 nations in 12 groups. Every team
              plays three group games. The top two from each group plus the 8 best third-placed
              teams advance — 32 teams in total — to the new round of 32, then round of 16,
              quarter-finals, semi-finals and the final on 19 July.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-2">
              World Cup 2026 host cities
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              The US hosts across 11 cities: New York/New Jersey, Los Angeles, Dallas, San
              Francisco, Seattle, Miami, Boston, Atlanta, Houston, Philadelphia and Kansas City.
              Mexico hosts in Mexico City, Guadalajara and Monterrey. Canada hosts in Toronto and
              Vancouver.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-2">Follow on Goaltify</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Goaltify covers the World Cup 2026 end-to-end: live scores updated in real-time,
              group tables, fixture lists, xG stats and expected-goals analysis, tactical breakdowns
              from our academy, and post-match player ratings after every game. Bookmark us and
              subscribe to our newsletter for daily tournament updates.
            </p>
          </div>
        </section>
      </div>
    </>
  )
}
