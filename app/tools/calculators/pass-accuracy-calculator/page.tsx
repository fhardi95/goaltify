'use client'

import { useState } from 'react'
import Link from 'next/link'

const BENCHMARKS = [
  { player: 'Toni Kroos', pct: 93, role: 'Deep midfielder' },
  { player: 'Luka Modrić', pct: 89, role: 'Central midfielder' },
  { player: 'Kevin De Bruyne', pct: 85, role: 'Attacking midfielder' },
  { player: 'Premier League avg', pct: 82, role: 'All outfield positions' },
  { player: 'Premier League winger', pct: 76, role: 'Wide forward' },
  { player: 'Premier League striker', pct: 72, role: 'Centre forward' },
]

export default function PassAccuracyCalculatorPage() {
  const [attempted, setAttempted] = useState('')
  const [completed, setCompleted] = useState('')

  const att = parseInt(attempted) || 0
  const comp = parseInt(completed) || 0
  const accuracy = att > 0 ? Math.min(100, Math.round((comp / att) * 100)) : null

  const comparison = accuracy !== null
    ? BENCHMARKS.find(b => accuracy >= b.pct - 3 && accuracy <= b.pct + 5)?.player ?? (accuracy >= 90 ? 'Elite level' : accuracy >= 80 ? 'Professional standard' : 'Room to improve')
    : null

  return (
    <div className="container-site py-8 max-w-4xl">
      <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-5">
        <Link href="/" className="hover:text-gray-300">Home</Link>
        <span>/</span>
        <Link href="/tools" className="hover:text-gray-300">Tools</Link>
        <span>/</span>
        <span className="text-gray-400">Pass Accuracy Calculator</span>
      </nav>

      <h1 className="text-2xl font-bold text-white mb-2">Pass Accuracy Calculator</h1>
      <p className="text-gray-400 text-sm mb-8 max-w-2xl">Enter your passes attempted and completed to calculate your pass accuracy percentage, and see how it compares to professional players.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="card p-5">
          <h2 className="text-base font-semibold text-white mb-4">Your stats</h2>
          <div className="space-y-4 mb-5">
            <div>
              <label className="text-xs font-medium text-gray-400 block mb-1.5">Passes attempted</label>
              <input
                type="number"
                min="0"
                value={attempted}
                onChange={e => setAttempted(e.target.value)}
                placeholder="e.g. 55"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-brand-500"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-400 block mb-1.5">Passes completed</label>
              <input
                type="number"
                min="0"
                value={completed}
                onChange={e => setCompleted(e.target.value)}
                placeholder="e.g. 46"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          {accuracy !== null && (
            <div className="bg-gray-800/60 rounded-xl p-5 text-center">
              <p className="text-xs text-gray-500 mb-1">Pass accuracy</p>
              <p className={`text-5xl font-bold mb-1 ${accuracy >= 85 ? 'text-green-400' : accuracy >= 75 ? 'text-yellow-400' : 'text-red-400'}`}>
                {accuracy}%
              </p>
              <p className="text-sm text-gray-400">{comparison}</p>
            </div>
          )}
        </div>

        <div className="card p-5">
          <h2 className="text-base font-semibold text-white mb-4">Professional benchmarks</h2>
          <div className="space-y-3">
            {BENCHMARKS.map(b => (
              <div key={b.player} className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">{b.player}</p>
                  <p className="text-xs text-gray-500">{b.role}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <div className="w-20 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-500 rounded-full" style={{ width: `${(b.pct - 60) * 2.5}%` }} />
                  </div>
                  <span className="text-xs font-medium text-white w-8">{b.pct}%</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-600 mt-4">Note: context matters. A striker completing 72% of short passes in tight spaces may be as effective as a midfielder completing 90% of easy sideways balls.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Link href="/tools/calculators/xg-calculator" className="card p-4 hover:border-gray-700 transition-colors group">
          <p className="text-xs text-brand-400 mb-1">📊 Related tool</p>
          <p className="text-sm font-medium text-white group-hover:text-brand-400">xG Calculator →</p>
        </Link>
        <Link href="/tools/calculators/sprint-speed-converter" className="card p-4 hover:border-gray-700 transition-colors group">
          <p className="text-xs text-brand-400 mb-1">⚡ Related tool</p>
          <p className="text-sm font-medium text-white group-hover:text-brand-400">Sprint Speed Converter →</p>
        </Link>
      </div>
    </div>
  )
}
