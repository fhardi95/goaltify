'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useConsent } from './ConsentContext'

export function CookieBanner() {
  const { hasDecided, acceptAll, acceptEssential } = useConsent()
  const [showDetails, setShowDetails] = useState(false)

  if (hasDecided) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6"
    >
      <div className="max-w-2xl mx-auto bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">

        {/* Main banner */}
        <div className="p-5">
          <div className="flex items-start gap-3 mb-3">
            <span className="text-2xl" aria-hidden="true">🍪</span>
            <div>
              <h2 className="text-base font-semibold text-white mb-1">
                We use cookies on Goaltify
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                We use cookies to show live scores, remember your preferences, and (with your permission)
                measure site traffic to improve Goaltify. Your data stays private and is never sold.
              </p>
            </div>
          </div>

          {/* Details toggle */}
          {showDetails && (
            <div className="mt-3 mb-4 space-y-2 text-xs text-gray-400 border-t border-gray-800 pt-3">
              <div className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <div>
                  <span className="text-gray-300 font-medium">Essential cookies</span> — always active.
                  Required for the site to work: live scores, session, security.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">○</span>
                <div>
                  <span className="text-gray-300 font-medium">Analytics cookies</span> — optional.
                  Google Analytics to understand which pages are most useful (anonymised).
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">○</span>
                <div>
                  <span className="text-gray-300 font-medium">Advertising cookies</span> — optional.
                  Used if we show ads (Google AdSense). Helps keep Goaltify free.
                </div>
              </div>
              <p className="pt-1">
                You can change your preferences any time in our{' '}
                <Link href="/privacy" className="text-brand-400 hover:underline">Privacy Policy</Link>.
              </p>
            </div>
          )}

          <button
            onClick={() => setShowDetails(v => !v)}
            className="text-xs text-brand-400 hover:text-brand-300 mb-4 flex items-center gap-1"
          >
            {showDetails ? '▲ Hide details' : '▼ What cookies do we use?'}
          </button>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={acceptAll}
              className="flex-1 py-2.5 px-4 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold rounded-xl transition-colors"
            >
              Accept all cookies
            </button>
            <button
              onClick={acceptEssential}
              className="flex-1 py-2.5 px-4 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-medium rounded-xl border border-gray-700 transition-colors"
            >
              Essential only
            </button>
          </div>

          <p className="text-xs text-gray-600 mt-3 text-center">
            By continuing to browse without choosing, only essential cookies are set.{' '}
            <Link href="/privacy" className="hover:text-gray-400 underline">Privacy Policy</Link>
            {' · '}
            <Link href="/terms" className="hover:text-gray-400 underline">Terms</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
