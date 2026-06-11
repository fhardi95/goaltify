import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { LiveScoresFeed } from '@/components/scores/LiveScoresFeed'
import { NewsCard } from '@/components/news/NewsCard'
import type { NewsArticle } from '@/types'

export const metadata: Metadata = {
  title: 'FIFA World Cup 2026 – Live Scores, Groups & News | Goaltify',
  description:
    'FIFA World Cup 2026 live scores, group stage tables, match results and football news — all free on Goaltify. 48 teams, 12 groups. Starts 11 June 2026.',
}

async function getNews(): Promise<NewsArticle[]> {
  const apiKey = process.env.NEWS_API_KEY
  if (!apiKey) return MOCK_NEWS
  try {
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=football+world+cup+2026&language=en&sortBy=publishedAt&pageSize=7&apiKey=${apiKey}`,
      { next: { revalidate: 1800 } }
    )
    const data = await res.json()
    return data.articles ?? MOCK_NEWS
  } catch {
    return MOCK_NEWS
  }
}

const ACADEMY_GUIDES = [
  { title: 'How to dribble past a defender', description: '5 elite winger techniques to beat opponents 1v1.', href: '/academy/dribbling/how-to-dribble-past-a-defender', tag: 'Skills', icon: '⚽' },
  { title: 'How to calculate xG',            description: 'The metric that changed how we watch football.',    href: '/tools/calculators/xg-calculator',                tag: 'Analytics', icon: '📊' },
  { title: 'The perfect pre-match warm-up',  description: 'Science-backed 20-minute preparation routine.',    href: '/academy/training/pre-match-warm-up-routine',     tag: 'Training', icon: '🏃' },
  { title: 'Best 4-3-3 formation guide',     description: 'How to set up, coach and play against it.',        href: '/academy/tactics/4-3-3-formation-guide',          tag: 'Tactics', icon: '🗺️' },
]

const WC_GROUPS = [
  { name: 'GROUP A', teams: ['Mexico', 'South Korea', 'South Africa', 'Czechia'] },
  { name: 'GROUP B', teams: ['Canada', 'Switzerland', 'Qatar', 'Bosnia & Herzegovina'] },
  { name: 'GROUP C', teams: ['Brazil', 'Morocco', 'Haiti', 'Scotland'] },
  { name: 'GROUP D', teams: ['USA', 'Paraguay', 'Australia', 'Türkiye'] },
  { name: 'GROUP E', teams: ['Germany', 'Ivory Coast', 'Ecuador', 'Curaçao'] },
  { name: 'GROUP F', teams: ['Netherlands', 'Sweden', 'Tunisia', 'TBC'] },
  { name: 'GROUP G', teams: ['Belgium', 'Egypt', 'Iran', 'New Zealand'] },
  { name: 'GROUP H', teams: ['Spain', 'Saudi Arabia', 'Uruguay', 'Cape Verde'] },
  { name: 'GROUP I', teams: ['France', 'Senegal', 'Norway', 'Iraq'] },
  { name: 'GROUP J', teams: ['Argentina', 'Algeria', 'Austria', 'Jordan'] },
  { name: 'GROUP K', teams: ['Portugal', 'DR Congo', 'Colombia', 'Uzbekistan'] },
  { name: 'GROUP L', teams: ['England', 'Croatia', 'Ghana', 'Panama'], highlight: true },
]

const FAQS = [
  { q: 'When does the FIFA World Cup 2026 start and end?', a: 'The FIFA World Cup 2026 runs from 11 June to 19 July 2026, spanning 39 days across 16 host cities in the United States, Canada, and Mexico.' },
  { q: 'How many teams are in the 2026 World Cup?', a: 'For the first time in history, 48 national teams will compete at the FIFA World Cup 2026, up from the previous format of 32 teams.' },
  { q: 'How many matches are played at World Cup 2026?', a: 'A total of 104 matches will be played at the 2026 FIFA World Cup — the most in tournament history.' },
  { q: 'Which countries are hosting the 2026 World Cup?', a: 'The 2026 FIFA World Cup is co-hosted by three nations: the United States (78 matches), Canada (13 matches), and Mexico (13 matches).' },
  { q: 'Where is the 2026 World Cup final being played?', a: 'The FIFA World Cup 2026 final on 19 July 2026 will be held at MetLife Stadium in East Rutherford, New Jersey, with a capacity of over 82,000.' },
  { q: 'Who are the favourites to win the World Cup 2026?', a: 'Defending champions Argentina, FIFA No. 1 France, Spain, England, Brazil, and Germany are widely considered the strongest contenders.' },
]

export default async function HomePage() {
  const news = await getNews()
  const [featuredNews, ...restNews] = news

  return (
    <>
      {/* ── Score strip ── */}
      <div className="score-strip">
        <div className="score-strip-inner">
          {/* Featured scores are rendered here – in production, map real scores */}
          <div className="score-card featured">
            <div className="score-card-comp">World Cup · Group L</div>
            <div className="score-teams">
              <div className="score-team"><span className="score-team-name winner">England</span><span className="score-val">2</span></div>
              <div className="score-team"><span className="score-team-name">Scotland</span><span className="score-val">1</span></div>
            </div>
            <div className="score-status status-ft">Full Time</div>
          </div>
          <div className="score-card featured">
            <div className="score-card-comp">World Cup · Group A</div>
            <div className="score-teams">
              <div className="score-team"><span className="score-team-name winner">Brazil</span><span className="score-val">3</span></div>
              <div className="score-team"><span className="score-team-name">Morocco</span><span className="score-val">1</span></div>
            </div>
            <div className="score-status status-ft">Full Time</div>
          </div>
          <div className="score-card">
            <div className="score-card-comp">World Cup · Group I</div>
            <div className="score-teams">
              <div className="score-team"><span className="score-team-name">France</span><span className="score-val">1</span></div>
              <div className="score-team"><span className="score-team-name">Senegal</span><span className="score-val">1</span></div>
            </div>
            <div className="score-status status-live">
              <span className="live-dot" /> 74'
            </div>
          </div>
          <div className="score-card">
            <div className="score-card-comp">World Cup · Group H</div>
            <div className="score-teams">
              <div className="score-team"><span className="score-team-name">Spain</span><span className="score-val">–</span></div>
              <div className="score-team"><span className="score-team-name">Saudi Arabia</span><span className="score-val">–</span></div>
            </div>
            <div className="score-status status-upcoming">20:00 BST</div>
          </div>
          <Link href="/live-scores" className="score-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'Oswald, sans-serif', fontSize: 12, fontWeight: 600, color: 'var(--brand)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              All Scores →
            </span>
          </Link>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="main-grid">
        <main>

          {/* Hero article */}
          <div className="section-head">
            <div className="section-title">Top Story</div>
            <Link href="/news" className="section-link">All News →</Link>
          </div>

          {featuredNews && (
            <div className="hero-article">
              <div className="hero-img">
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 120, opacity: 0.1 }}>🏆</div>
                <div className="hero-img-overlay" />
                <div className="hero-img-content">
                  <span className="hero-badge">World Cup 2026</span>
                  <h1 className="hero-headline">{featuredNews.title}</h1>
                  <div className="hero-meta">{featuredNews.source?.name} · {new Date(featuredNews.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</div>
                </div>
              </div>
              <div className="hero-body">
                <p className="hero-desc">{featuredNews.description}</p>
              </div>
            </div>
          )}

          {/* News list */}
          <div style={{ marginBottom: 24 }}>
            <div className="news-grid">
              {restNews.slice(0, 5).map((article, i) => (
                <a key={i} href={article.url ?? '#'} className="news-item" target="_blank" rel="noopener noreferrer">
                  <div className="news-thumb">⚽</div>
                  <div className="news-content">
                    <div className="news-comp">{article.source?.name ?? 'Football News'}</div>
                    <div className="news-hl">{article.title}</div>
                    <div className="news-meta">{new Date(article.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Live scores feed */}
          <div style={{ marginBottom: 24 }}>
            <div className="section-head">
              <div className="section-title">
                <span className="live-dot" style={{ marginRight: 4 }} /> Live Scores
              </div>
              <Link href="/live-scores" className="section-link">All Scores →</Link>
            </div>
            <Suspense fallback={null}>
              <LiveScoresFeed />
            </Suspense>
          </div>

          {/* Academy */}
          <div style={{ marginBottom: 24 }}>
            <div className="section-head">
              <div className="section-title">Academy Guides</div>
              <Link href="/academy" className="section-link">All Guides →</Link>
            </div>
            <div className="academy-grid">
              {ACADEMY_GUIDES.map(guide => (
                <Link key={guide.href} href={guide.href} className="academy-card">
                  <div className="academy-tag">{guide.tag}</div>
                  <div className="academy-title">{guide.title}</div>
                  <div className="academy-desc">{guide.description}</div>
                  <div className="academy-icon">{guide.icon}</div>
                </Link>
              ))}
            </div>
          </div>

        </main>

        {/* ── Sidebar ── */}
        <aside className="sidebar" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* WC Groups */}
          <div>
            <div className="section-head">
              <div className="section-title">WC 2026 Groups</div>
              <Link href="/world-cup" className="section-link">Full Draw →</Link>
            </div>
            <div className="card" style={{ overflow: 'hidden' }}>
              {WC_GROUPS.slice(0, 4).map(group => (
                <div key={group.name} style={{ padding: '12px 14px', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ fontFamily: 'Oswald, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: group.highlight ? '#fff' : 'var(--brand)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                    {group.highlight && <span style={{ background: 'var(--brand)', color: '#fff', fontSize: 9, padding: '1px 5px', fontWeight: 700 }}>ENG</span>}
                    {group.name}
                  </div>
                  <ol style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                    {group.teams.map((team, i) => (
                      <li key={team} style={{ fontSize: 12, color: '#bbb', padding: '3px 0', borderBottom: '1px solid var(--border-sub)', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 10, color: '#555', width: 14 }}>{i + 1}</span>
                        {team}
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
              <Link href="/world-cup" style={{ display: 'block', padding: '10px 14px', fontSize: 11, fontFamily: 'Oswald, sans-serif', fontWeight: 600, color: 'var(--brand)', letterSpacing: '0.06em', textTransform: 'uppercase', textAlign: 'center', textDecoration: 'none', background: 'var(--surface-3)' }}>
                All 12 Groups →
              </Link>
            </div>
          </div>

          {/* WC Key stats */}
          <div>
            <div className="section-head">
              <div className="section-title">WC 2026 Fast Facts</div>
            </div>
            <div className="card" style={{ overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--border)' }}>
                {[
                  { label: 'Teams',       value: '48' },
                  { label: 'Matches',     value: '104' },
                  { label: 'Host nations',value: '3' },
                  { label: 'Days',        value: '39' },
                ].map(f => (
                  <div key={f.label} style={{ background: 'var(--surface-1)', padding: '12px 10px', textAlign: 'center' }}>
                    <div style={{ fontFamily: 'Oswald, sans-serif', fontSize: 28, fontWeight: 700, color: 'var(--brand)', lineHeight: 1 }}>{f.value}</div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 3, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{f.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ padding: '10px 14px', borderTop: '1px solid var(--border)' }}>
                <div style={{ fontFamily: 'Oswald, sans-serif', fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Final · 19 Jul 2026</div>
                <div style={{ fontFamily: 'Oswald, sans-serif', fontSize: 14, color: '#ddd', fontWeight: 600 }}>MetLife Stadium, New Jersey</div>
              </div>
            </div>
          </div>

        </aside>
      </div>

      {/* ── WC Groups full section ── */}
      <section style={{ borderTop: '1px solid var(--border)', background: 'var(--surface-0)', marginTop: 4 }}>
        <div className="container-site" style={{ paddingTop: 40, paddingBottom: 40 }}>
          <div className="section-head">
            <div className="section-title">World Cup 2026 — All 12 Groups</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 1, background: 'var(--border)' }}>
            {WC_GROUPS.map(group => (
              <div key={group.name} style={{ background: 'var(--surface-1)', padding: '14px 16px' }}>
                <div style={{ fontFamily: 'Oswald, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: group.highlight ? '#fff' : 'var(--brand)', marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>{group.name}</span>
                  {group.highlight && <span style={{ fontSize: 9, background: 'var(--brand)', color: '#fff', padding: '2px 6px', fontWeight: 700 }}>ENG</span>}
                </div>
                <ol style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  {group.teams.map((team, i) => (
                    <li key={team} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#bbb', padding: '5px 0', borderBottom: '1px solid var(--border-sub)' }}>
                      <span style={{ fontSize: 10, color: '#555', width: 16 }}>{i + 1}</span>
                      {team}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ borderTop: '1px solid var(--border)', background: 'var(--surface-1)', marginTop: 4 }}>
        <div className="container-site" style={{ paddingTop: 40, paddingBottom: 48 }}>
          <div className="section-head">
            <div className="section-title">World Cup 2026 — FAQ</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: 'var(--border)' }}>
            {FAQS.map((faq, i) => (
              <details key={i} style={{ background: 'var(--surface-1)' }}>
                <summary style={{ padding: '16px 18px', cursor: 'pointer', fontSize: 14, fontFamily: 'Oswald, sans-serif', fontWeight: 600, color: '#e8e8e8', letterSpacing: '0.02em', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', userSelect: 'none' }}>
                  {faq.q}
                  <span style={{ color: 'var(--brand)', fontSize: 18, flexShrink: 0, marginLeft: 12 }}>+</span>
                </summary>
                <p style={{ padding: '0 18px 16px', fontSize: 13, color: '#aaa', lineHeight: 1.7, borderTop: '1px solid var(--border-sub)', paddingTop: 12 }}>
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section style={{ borderTop: '1px solid var(--border)', background: 'var(--surface-0)' }}>
        <div className="container-site" style={{ paddingTop: 48, paddingBottom: 48, textAlign: 'center' }}>
          <div style={{ fontFamily: 'Oswald, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--brand)', marginBottom: 10 }}>Newsletter</div>
          <h2 style={{ fontFamily: 'Oswald, sans-serif', fontSize: 32, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Never Miss a Goal</h2>
          <p style={{ fontSize: 14, color: '#888', marginBottom: 24, maxWidth: 380, margin: '0 auto 24px' }}>
            World Cup 2026 live score alerts, transfer news, and exclusive training guides — delivered weekly.
          </p>
          <div style={{ display: 'flex', gap: 0, justifyContent: 'center', maxWidth: 420, margin: '0 auto' }}>
            <input
              type="email"
              placeholder="your@email.com"
              style={{ flex: 1, padding: '12px 16px', background: 'var(--surface-1)', border: '1px solid var(--border)', borderRight: 'none', color: '#fff', fontSize: 13, outline: 'none' }}
            />
            <button
              style={{ padding: '12px 24px', background: 'var(--brand)', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'Oswald, sans-serif', fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', flexShrink: 0 }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

const MOCK_NEWS: NewsArticle[] = [
  { source: { id: null, name: 'BBC Sport' }, author: 'BBC Sport', title: 'England edge Scotland to top Group L as World Cup fever grips the nation', description: 'The Three Lions produced a gritty performance at MetLife Stadium to claim their opening group win, with goals from Kane and Saka sealing three vital points.', url: '#', urlToImage: null, publishedAt: new Date(Date.now() - 3_600_000).toISOString(), content: null },
  { source: { id: null, name: 'Sky Sports' }, author: 'Sky Sports', title: 'Real Madrid reach Champions League final with stunning comeback', description: 'Real Madrid produce another miraculous European night to advance to the Champions League final.', url: '#', urlToImage: null, publishedAt: new Date(Date.now() - 7_200_000).toISOString(), content: null },
  { source: { id: null, name: 'The Guardian' }, author: 'The Guardian', title: 'Transfer news: Premier League clubs eye World Cup breakout stars', description: 'Several top-flight clubs are tracking outstanding performers from the summer tournament.', url: '#', urlToImage: null, publishedAt: new Date(Date.now() - 10_800_000).toISOString(), content: null },
  { source: { id: null, name: 'ESPN' }, author: 'ESPN', title: "Brazil's Vinicius Jr masterclass sets early World Cup benchmark", description: "The Real Madrid forward ran riot in Group A, setting the tone for what promises to be a thrilling tournament.", url: '#', urlToImage: null, publishedAt: new Date(Date.now() - 14_400_000).toISOString(), content: null },
  { source: { id: null, name: 'Goal.com' }, author: 'Goal', title: "Mbappé sets new Champions League scoring record", description: 'The French star surpasses another landmark in European competition this season.', url: '#', urlToImage: null, publishedAt: new Date(Date.now() - 18_000_000).toISOString(), content: null },
  { source: { id: null, name: 'Fabrizio Romano' }, author: 'Fabrizio Romano', title: 'Here we go: Premier League club confirms summer signing', description: 'Exclusive: deal agreed, medical scheduled for next week.', url: '#', urlToImage: null, publishedAt: new Date(Date.now() - 21_600_000).toISOString(), content: null },
]
