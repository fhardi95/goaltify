'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'

const COMPETITIONS = [
  { label: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 Premier League', href: '/competitions/premier-league' },
  { label: '🇩🇪 Bundesliga',      href: '/competitions/bundesliga' },
  { label: '🇪🇸 La Liga',         href: '/competitions/la-liga' },
  { label: '🇮🇹 Serie A',         href: '/competitions/serie-a' },
  { label: '🇫🇷 Ligue 1',         href: '/competitions/ligue-1' },
]

const NAV_LINKS = [
  { label: 'Scores',       href: '/live-scores' },
  { label: 'News',         href: '/news' },
  { label: 'World Cup',    href: '/world-cup' },
  { label: 'Players',      href: '/players' },
  { label: 'Academy',      href: '/academy' },
  { label: 'Shop',         href: '/shop' },
  { label: 'Tools',        href: '/tools' },
]

const COMP_STRIP = [
  { label: '🌍 World Cup 2026',     href: '/world-cup' },
  { label: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 Premier League',  href: '/competitions/premier-league' },
  { label: '🇪🇸 La Liga',           href: '/competitions/la-liga' },
  { label: '🇩🇪 Bundesliga',        href: '/competitions/bundesliga' },
  { label: '🇮🇹 Serie A',           href: '/competitions/serie-a' },
  { label: '🇫🇷 Ligue 1',           href: '/competitions/ligue-1' },
  { label: '🏆 Champions League',   href: '/competitions/champions-league' },
]

// Scrolling ticker items
const TICKER_ITEMS = [
  'Man City 3–1 Arsenal · FT',
  'Liverpool 2–2 Chelsea · FT',
  'Real Madrid 4–0 Atletico · FT',
  'Bayern 2–1 Dortmund · FT',
  'PSG 3–0 Lyon · FT',
  'England 2–1 Scotland · FT · WC2026 Group L',
]

export function Navbar() {
  const [mobileOpen, setMobileOpen]   = useState(false)
  const [compOpen, setCompOpen]       = useState(false)
  const pathname                      = usePathname()
  const dropRef                       = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setCompOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS]

  return (
    <>
      {/* ── Live ticker ── */}
      <div className="ticker-wrap">
        <div className="ticker-label">Scores</div>
        <div className="ticker-track">
          {doubled.map((item, i) => (
            <span key={i} className="ticker-item">{item}</span>
          ))}
        </div>
      </div>

      {/* ── Main header ── */}
      <header className="site-header">
        <div className="header-inner">

          {/* Logo */}
          <Link href="/" className="site-logo">
            <div className="logo-icon">⚽</div>
            <span>Goal<span className="accent">tify</span></span>
          </Link>

          {/* Desktop nav */}
          <nav className="nav-primary hidden md:flex">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={isActive(href) ? 'active' : ''}
              >
                {label}
              </Link>
            ))}

            {/* Competitions dropdown */}
            <div ref={dropRef} className="relative">
              <button
                onClick={() => setCompOpen(v => !v)}
                className={`px-3.5 h-full flex items-center gap-1 font-['Oswald'] text-[13px] font-medium tracking-[0.06em] uppercase transition-colors border-b-[3px] -mb-[3px] ${
                  compOpen
                    ? 'text-white border-[var(--brand)]'
                    : 'text-[#ccc] border-transparent hover:text-white hover:border-[var(--brand)]'
                }`}
              >
                Competitions
                <svg className={`w-3 h-3 transition-transform ${compOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {compOpen && (
                <div className="absolute top-full left-0 mt-0 w-56 bg-[var(--surface-1)] border border-[var(--border)] shadow-2xl z-50 border-t-2 border-t-[var(--brand)]">
                  {COMPETITIONS.map(c => (
                    <Link
                      key={c.href}
                      href={c.href}
                      onClick={() => setCompOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 text-sm text-[#bbb] hover:text-white hover:bg-[var(--surface-2)] transition-colors border-b border-[var(--border-sub)] last:border-0 font-['Oswald'] font-medium tracking-wide"
                    >
                      {c.label}
                    </Link>
                  ))}
                  <Link
                    href="/world-cup"
                    onClick={() => setCompOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 text-sm text-[var(--brand)] hover:bg-[var(--surface-2)] transition-colors font-['Oswald'] font-semibold tracking-wide"
                  >
                    🌍 World Cup 2026
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Watch Live CTA */}
          <Link href="/live-scores" className="header-cta hidden md:block">
            Watch Live
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden ml-auto p-2 text-[#ccc] hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed top-[80px] left-0 right-0 z-50 bg-[var(--surface-1)] border-b border-[var(--border)]">
          <nav className="flex flex-col divide-y divide-[var(--border-sub)]">
            {[...NAV_LINKS, { label: 'Competitions', href: '/competitions/premier-league' }].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`px-5 py-3.5 font-['Oswald'] text-sm font-medium tracking-wide uppercase ${
                  isActive(href) ? 'text-white border-l-2 border-[var(--brand)]' : 'text-[#bbb]'
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/live-scores"
              onClick={() => setMobileOpen(false)}
              className="mx-4 my-3 block text-center bg-[var(--brand)] text-white font-['Oswald'] text-sm font-semibold tracking-widest uppercase py-3"
            >
              Watch Live
            </Link>
          </nav>
        </div>
      )}

      {/* ── Competition strip ── */}
      <div className="comp-strip">
        <div className="comp-strip-inner">
          {COMP_STRIP.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`comp-tab ${isActive(href) ? 'active' : ''}`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
