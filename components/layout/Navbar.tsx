'use client'

import Link from 'next/link'
import { useState } from 'react'

const NAV_LINKS = [
  { label: 'Live scores', href: '/live-scores' },
  { label: 'News', href: '/news' },
  { label: 'Academy', href: '/academy' },
  { label: 'Shop', href: '/shop' },
  { label: 'Tools', href: '/tools' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-gray-950/95 backdrop-blur border-b border-gray-800">
      <div className="container-site">
        <div className="flex items-center justify-between h-14">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <span className="text-2xl">⚽</span>
            <span>
              <span className="text-brand-400">Goal</span>
              <span className="text-white">tify</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/newsletter"
              className="text-sm px-4 py-1.5 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-medium transition-colors"
            >
              Newsletter
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="md:hidden p-2 text-gray-400 hover:text-white"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-gray-800 py-3 space-y-1">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg"
              >
                {label}
              </Link>
            ))}
            <Link
              href="/newsletter"
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
