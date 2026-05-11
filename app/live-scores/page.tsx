import type { Metadata } from 'next'
import { LiveScoresFeed } from '@/components/scores/LiveScoresFeed'
import { buildMetadata } from '@/lib/seo'
import Link from 'next/link'

// ─── SEO Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = buildMetadata({
  title: 'Live Football Scores Today — Premier League',
  description:
    'Live football scores updated every 60 seconds. Follow the FIFA World Cup 2026, Premier League, Champions League, La Liga, Bundesliga, Real-time results.',
  canonical: 'https://www.goaltify.com/live-scores',
  keywords: [
    // High-volume head terms
    'live football scores',
    'live scores today',
    'football scores today',
    'live football scores today',
    'football results today',
    'live score football',
    'football live score',
    // World Cup 2026 — peak traffic opportunity
    'World Cup 2026 live scores',
    'World Cup live score',
    'World Cup 2026 results',
    'World Cup 2026 scores today',
    'FIFA World Cup live',
    'World Cup 2026 fixtures today',
    // Premier League
    'Premier League live scores',
    'Premier League scores today',
    'Premier League results today',
    'EPL live score',
    // Champions League
    'Champions League live scores',
    'UCL live score',
    'Champions League results today',
    // Other major leagues
    'La Liga live scores',
    'Bundesliga live scores',
    'Serie A live scores',
    'Ligue 1 live scores',
    // Long-tail
    'football scores updated every 60 seconds',
    'live football results UK time',
    'football match scores now',
    'today football score',
    'live match scores football',
    'football livescore',
  ],
})

// ─── Structured Data ─────────────────────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'Live Football Scores Today',
      description:
        'Real-time live football scores for the FIFA World Cup 2026, Premier League, Champions League and 500+ competitions worldwide. Updated every 60 seconds.',
      url: 'https://www.goaltify.com/live-scores',
      publisher: {
        '@type': 'Organization',
        name: 'Goaltify',
        url: 'https://www.goaltify.com',
      },
      about: [
        { '@type': 'SportsEvent', name: 'FIFA World Cup 2026' },
        { '@type': 'SportsOrganization', name: 'Premier League' },
        { '@type': 'SportsOrganization', name: 'UEFA Champions League' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How often are live football scores updated on Goaltify?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Goaltify live scores update every 60 seconds, giving you near real-time results including goal scorers, cards, substitutions and match statistics across all covered competitions.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which football competitions does Goaltify cover?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Goaltify covers live scores for the FIFA World Cup 2026, Premier League, UEFA Champions League, La Liga, Bundesliga, Serie A, Ligue 1, FA Cup, Europa League, EFL Championship and hundreds more competitions worldwide.',
          },
        },
        {
          '@type': 'Question',
          name: 'Are World Cup 2026 scores available on Goaltify?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Goaltify provides live scores for all 104 FIFA World Cup 2026 matches, from the group stage opener on 11 June 2026 through to the final on 19 July 2026 at MetLife Stadium, New Jersey.',
          },
        },
        {
          '@type': 'Question',
          name: 'What time zone are the live scores shown in?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'All kick-off times and live scores on Goaltify are displayed in UK time (GMT/BST) by default. World Cup 2026 matches in North America will therefore show as evening and late-night kick-offs for UK visitors.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I see live Premier League scores on Goaltify?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Premier League live scores are fully covered on Goaltify, including real-time goals, goal scorers, yellow and red cards, and half-time and full-time results for every match of the season.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does Goaltify show Champions League live scores?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. UEFA Champions League live scores are available on Goaltify throughout the competition, from the group stages through to the knockout rounds and the final.',
          },
        },
        {
          '@type': 'Question',
          name: "How can I follow a specific team's live score?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Use the competition filter on the live scores page to narrow down by league or tournament. You can quickly find your team's match and follow it in real time throughout the game.",
          },
        },
        {
          '@type': 'Question',
          name: 'Are live scores free on Goaltify?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. All live football scores on Goaltify are completely free to access. No account or subscription is required.',
          },
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.goaltify.com' },
        { '@type': 'ListItem', position: 2, name: 'Live Scores', item: 'https://www.goaltify.com/live-scores' },
      ],
    },
  ],
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const COMPETITIONS = [
  { name: 'FIFA World Cup 2026', badge: '🌍', href: '/live-scores?tournament=world-cup-2026', hot: true },
  { name: 'Premier League', badge: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', href: '/live-scores?tournament=premier-league', hot: false },
  { name: 'Champions League', badge: '⭐', href: '/live-scores?tournament=champions-league', hot: false },
  { name: 'La Liga', badge: '🇪🇸', href: '/live-scores?tournament=la-liga', hot: false },
  { name: 'Bundesliga', badge: '🇩🇪', href: '/live-scores?tournament=bundesliga', hot: false },
  { name: 'Serie A', badge: '🇮🇹', href: '/live-scores?tournament=serie-a', hot: false },
  { name: 'Ligue 1', badge: '🇫🇷', href: '/live-scores?tournament=ligue-1', hot: false },
  { name: 'Europa League', badge: '🔶', href: '/live-scores?tournament=europa-league', hot: false },
  { name: 'FA Cup', badge: '🏆', href: '/live-scores?tournament=fa-cup', hot: false },
  { name: 'EFL Championship', badge: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', href: '/live-scores?tournament=championship', hot: false },
]

const FAQS = [
  {
    q: 'How often are live scores updated?',
    a: 'Goaltify live scores refresh every 60 seconds, giving you near real-time results including goal scorers, cards, substitutions and match statistics across all covered competitions.',
  },
  {
    q: 'Which competitions are covered?',
    a: 'The FIFA World Cup 2026, Premier League, UEFA Champions League, La Liga, Bundesliga, Serie A, Ligue 1, FA Cup, Europa League, EFL Championship and hundreds of competitions worldwide.',
  },
  {
    q: 'Are World Cup 2026 live scores available?',
    a: 'Yes. All 104 FIFA World Cup 2026 matches are covered — from the group stage opener on 11 June 2026 right through to the final on 19 July at MetLife Stadium, New Jersey.',
  },
  {
    q: 'What time zone are kick-offs shown in?',
    a: 'All kick-off times are shown in UK time (GMT/BST). World Cup 2026 matches in North America will appear as evening and late-night kick-offs for UK visitors.',
  },
  {
    q: 'Are live scores free?',
    a: 'Yes. All live football scores on Goaltify are completely free — no account or subscription needed.',
  },
  {
    q: 'Can I filter by a specific league or team?',
    a: "Use the competition filter at the top of the live scores feed to narrow results by league or tournament. You'll quickly find your team's match and can follow it in real time.",
  },
  {
    q: 'Does Goaltify show Champions League live scores?',
    a: 'Yes. UEFA Champions League live scores are covered throughout the competition — group stages, knockout rounds and the final.',
  },
  {
    q: 'Can I see Premier League scores today?',
    a: 'Yes. Premier League live scores are fully covered, including real-time goals, goal scorers, yellow and red cards, and half-time and full-time results for every match of the season.',
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function LiveScoresPage() {
  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container-site py-8">

        {/* ── Header ───────────────────────────────────────────────────────── */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-400 bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Live
            </span>
            <span className="text-xs text-gray-600">Updates every 60 seconds · UK time</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">Live football scores today</h1>
          <p className="text-gray-400 text-sm max-w-xl">
            Real-time scores for the{' '}
            <Link href="/world-cup" className="text-brand-400 hover:underline">
              FIFA World Cup 2026
            </Link>
            , Premier League, Champions League, La Liga and 500+ competitions — all on one page.
          </p>
        </div>

        {/* ── Competition quick-links ──────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 mb-6">
          {COMPETITIONS.map(c => (
            <Link
              key={c.name}
              href={c.href}
              className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                c.hot
                  ? 'border-brand-500/60 bg-brand-500/10 text-brand-400 hover:bg-brand-500/20'
                  : 'border-gray-700 bg-gray-800/50 text-gray-400 hover:text-white hover:border-gray-600'
              }`}
            >
              <span>{c.badge}</span>
              {c.name}
              {c.hot && (
                <span className="text-[10px] font-semibold text-brand-300 bg-brand-500/20 px-1 rounded">
                  NOW
                </span>
              )}
            </Link>
          ))}
        </div>

        {/* ── Live scores feed ────────────────────────────────────────────── */}
        <LiveScoresFeed />

        {/* ── SEO Introduction ─────────────────────────────────────────────── */}
        <section
          aria-label="About Goaltify live football scores"
          className="mt-12 mb-8 border-t border-gray-800 pt-8"
        >
          <h2 className="text-lg font-semibold text-white mb-4">
            Live football scores — every competition, updated every minute
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3 text-sm text-gray-400 leading-relaxed">
              <p>
                Goaltify is your home for{' '}
                <strong className="text-white">live football scores today</strong>, covering every
                major competition from the{' '}
                <strong className="text-white">FIFA World Cup 2026</strong> to the{' '}
                <strong className="text-white">Premier League</strong>,{' '}
                <strong className="text-white">UEFA Champions League</strong>,{' '}
                <strong className="text-white">La Liga</strong>,{' '}
                <strong className="text-white">Bundesliga</strong>,{' '}
                <strong className="text-white">Serie A</strong> and{' '}
                <strong className="text-white">Ligue 1</strong>. Results refresh every{' '}
                <strong className="text-white">60 seconds</strong>, so you never miss a goal.
              </p>
              <p>
                With the{' '}
                <Link href="/world-cup" className="text-brand-400 hover:underline">
                  FIFA World Cup 2026
                </Link>{' '}
                kicking off on <strong className="text-white">11 June 2026</strong>, Goaltify will
                carry <strong className="text-white">live scores for all 104 matches</strong> across
                the 39-day tournament — from Mexico vs South Africa in the opener right through to
                the final at MetLife Stadium, New Jersey on{' '}
                <strong className="text-white">19 July 2026</strong>. All kick-off times are
                displayed in <strong className="text-white">UK time</strong>.
              </p>
            </div>
            <div className="space-y-3 text-sm text-gray-400 leading-relaxed">
              <p>
                Beyond the World Cup, our{' '}
                <strong className="text-white">live scores feed</strong> tracks real-time results for
                every <strong className="text-white">Premier League</strong> game of the season,
                every <strong className="text-white">Champions League</strong> night, and hundreds
                of leagues across Europe and worldwide. Each match entry shows the live score, goal
                scorers, yellow and red cards, and key match statistics — all completely{' '}
                <strong className="text-white">free, no account required</strong>.
              </p>
              <p>
                Use the competition filter above to jump straight to your league, or head to our{' '}
                <Link href="/world-cup" className="text-brand-400 hover:underline">
                  World Cup 2026 hub
                </Link>{' '}
                for group tables, fixtures and expert analysis. For tactical context on any match,
                explore the{' '}
                <Link href="/academy" className="text-brand-400 hover:underline">
                  Goaltify Academy
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* ── Coverage grid ────────────────────────────────────────────────── */}
        <section aria-label="Competitions covered" className="mb-10">
          <h2 className="text-base font-semibold text-white mb-4">Competitions covered</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {[
              { name: 'World Cup 2026', href: '/world-cup' },
              { name: 'Premier League', href: '/live-scores?tournament=premier-league' },
              { name: 'Champions League', href: '/live-scores?tournament=champions-league' },
              { name: 'Europa League', href: '/live-scores?tournament=europa-league' },
              { name: 'La Liga', href: '/live-scores?tournament=la-liga' },
              { name: 'Bundesliga', href: '/live-scores?tournament=bundesliga' },
              { name: 'Serie A', href: '/live-scores?tournament=serie-a' },
              { name: 'Ligue 1', href: '/live-scores?tournament=ligue-1' },
              { name: 'FA Cup', href: '/live-scores?tournament=fa-cup' },
              { name: 'EFL Championship', href: '/live-scores?tournament=championship' },
            ].map(c => (
              <Link
                key={c.name}
                href={c.href}
                className="card px-3 py-2.5 text-xs text-gray-400 hover:text-brand-400 transition-colors text-center"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section aria-label="Live scores frequently asked questions" className="mb-10">
          <h2 className="text-lg font-semibold text-white mb-4">
            Live football scores — frequently asked questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {FAQS.map(({ q, a }) => (
              <details key={q} className="card group open:border-brand-500/40 transition-colors">
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

        {/* ── Bottom SEO copy ───────────────────────────────────────────────── */}
        <section
          aria-label="Live scores guide"
          className="border-t border-gray-800 pt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div>
            <h3 className="text-sm font-semibold text-white mb-2">
              World Cup 2026 live scores
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              The FIFA World Cup 2026 runs from 11 June to 19 July across the USA, Canada and
              Mexico. Goaltify tracks live scores for all 104 matches in real time — group stage,
              round of 32, round of 16, quarter-finals, semi-finals and the final at MetLife
              Stadium.{' '}
              <Link href="/world-cup" className="text-brand-400 hover:underline">
                World Cup 2026 hub →
              </Link>
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-2">
              Premier League & Champions League scores
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Follow every Premier League goal and Champions League result live on Goaltify.
              Real-time scores include goal scorers, assist providers, bookings and substitutions
              — all updated within 60 seconds of the in-game action.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-2">More from Goaltify</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Pair live scores with Goaltify's{' '}
              <Link href="/news?category=tactics" className="text-brand-400 hover:underline">
                tactical analysis
              </Link>
              ,{' '}
              <Link href="/tools/calculators/xg-calculator" className="text-brand-400 hover:underline">
                xG Calculator
              </Link>{' '}
              and{' '}
              <Link href="/academy" className="text-brand-400 hover:underline">
                Academy guides
              </Link>{' '}
              for deeper insight into every match. Subscribe to the newsletter for daily score
              roundups and World Cup updates.
            </p>
          </div>
        </section>

      </div>
    </>
  )
}
