'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export type ConsentLevel = 'all' | 'essential' | null

interface ConsentContextType {
  consent: ConsentLevel
  acceptAll: () => void
  acceptEssential: () => void
  resetConsent: () => void
  hasDecided: boolean
}

const ConsentContext = createContext<ConsentContextType | null>(null)

const CONSENT_KEY = 'goaltify_cookie_consent'
const CONSENT_VERSION = '1' // bump this to re-show banner after policy changes

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentLevel>(null)
  const [hasDecided, setHasDecided] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (parsed.version === CONSENT_VERSION) {
          setConsent(parsed.level)
          setHasDecided(true)
        }
      }
    } catch {
      // localStorage not available (SSR or private mode)
    }
  }, [])

  const save = (level: ConsentLevel) => {
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify({ level, version: CONSENT_VERSION, date: new Date().toISOString() }))
    } catch {}
    setConsent(level)
    setHasDecided(true)

    // Fire analytics if accepted
    if (level === 'all' && typeof window !== 'undefined') {
      // Google Analytics consent mode
      if (window.gtag) {
        window.gtag('consent', 'update', {
          analytics_storage: 'granted',
          ad_storage: 'granted',
        })
      }
    }
  }

  return (
    <ConsentContext.Provider value={{
      consent,
      hasDecided,
      acceptAll: () => save('all'),
      acceptEssential: () => save('essential'),
      resetConsent: () => {
        try { localStorage.removeItem(CONSENT_KEY) } catch {}
        setConsent(null)
        setHasDecided(false)
      },
    }}>
      {children}
    </ConsentContext.Provider>
  )
}

export function useConsent() {
  const ctx = useContext(ConsentContext)
  if (!ctx) throw new Error('useConsent must be used within ConsentProvider')
  return ctx
}

// Extend Window for gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}
