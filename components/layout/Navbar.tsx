'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'

const COMPETITIONS = [
  { label: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 Premier League', href: '/competitions/premier-league' },
  { label: '🇩🇪 Bundesliga', href: '/competitions/bundesliga' },
  { label: '🇪🇸 La Liga', href: '/competitions/la-liga' },
  { label: '🇮🇹 Serie A', href: '/competitions/serie-a' },
  { label: '🇫🇷 Ligue 1', href: '/competitions/ligue-1' },
]

const NAV_LINKS = [
  { label: 'Live scores', href: '/live-scores' },
  { label: 'News', href: '/news' },
  { label: 'Players', href: '/players' },
  { label: 'Academy', href: '/academy' },
  { label: 'Shop', href: '/shop' },
  { label: 'Tools', href: '/tools' },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [compOpen, setCompOpen] = useState(false)
  const dropRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setCompOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-gray-950/95 backdrop-blur border-b border-gray-800">
      <div className="container-site">
        <div className="flex items-center justify-between h-14">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight shrink-0">
            <span className="text-2xl">⚽</span>
            <span>
              <span className="text-brand-400">Goal</span>
              <span className="text-white">tify</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                {label}
              </Link>
            ))}

            {/* Competitions dropdown */}
            <div ref={dropRef} className="relative">
              <button
                onClick={() => setCompOpen(v => !v)}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors flex items-center gap-1 ${
                  compOpen ? 'bg-gray-800 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                Competitions
                <svg className={`w-3 h-3 transition-transform ${compOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {compOpen && (
                <div className="absolute top-full left-0 mt-1 w-52 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl overflow-hidden z-50">
                  <div className="p-1">
                    {COMPETITIONS.map(c => (
                      <Link
                        key={c.href}
                        href={c.href}
                        onClick={() => setCompOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        {c.label}
                      </Link>
                    ))}
                    <div className="border-t border-gray-800 mt-1 pt-1">
                      <Link
                        href="/world-cup"
                        onClick={() => setCompOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-brand-400 hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        🌍 World Cup 2026
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <Link
              href="/newsletter"
              className="text-sm px-4 py-1.5 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-medium transition-colors"
            >
              Newsletter
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            className="md:hidden p-2 text-gray-400 hover:text-white"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-800 py-3 space-y-0.5">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg"
              >
                {label}
              </Link>
            ))}

            {/* Mobile competitions section */}
            <div className="px-3 pt-2">
              <p className="text-xs text-gray-600 font-semibold uppercase tracking-wider mb-2">Competitions</p>
              {COMPETITIONS.map(c => (
                <Link
                  key={c.href}
                  href={c.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 text-sm text-gray-300 hover:text-white border-b border-gray-800 last:border-0"
                >
                  {c.label}
                </Link>
              ))}
              <Link
                href="/world-cup"
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-sm text-brand-400"
              >
                🌍 World Cup 2026
              </Link>
            </div>

            <Link
              href="/newsletter"
              onClick={() => setMobileOpen(false)}
              className="block mt-2 px-3 py-2 text-sm text-center bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-medium"
            >
              Newsletter
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
