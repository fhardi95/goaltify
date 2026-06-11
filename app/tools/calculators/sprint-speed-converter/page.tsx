'use client'

import { useState } from 'react'
import Link from 'next/link'

const BENCHMARKS = [
  { name: 'Kylian Mbappé', speed: 38.0, unit: 'km/h' },
  { name: 'Alphonso Davies', speed: 36.5, unit: 'km/h' },
  { name: 'Adama Traoré', speed: 36.2, unit: 'km/h' },
  { name: 'Average PL winger', speed: 32.0, unit: 'km/h' },
  { name: 'Average PL player', speed: 28.5, unit: 'km/h' },
  { name: 'Average Sunday League', speed: 24.0, unit: 'km/h' },
]

export default function SprintSpeedConverterPage() {
  const [value, setValue] = useState('')
  const [unit, setUnit] = useState<'kmh' | 'mph' | 'ms'>('kmh')

  const num = parseFloat(value) || 0
  const kmh = unit === 'kmh' ? num : unit === 'mph' ? num * 1.60934 : num * 3.6
  const mph = kmh / 1.60934
  const ms = kmh / 3.6

  const closest = kmh > 0 ? BENCHMARKS.reduce((prev, curr) =>
    Math.abs(curr.speed - kmh) < Math.abs(prev.speed - kmh) ? curr : prev
  ) : null

  return (
    <div className="container-site py-8 max-w-4xl">
      <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-5">
        <Link href="/" className="hover:text-gray-300">Home</Link>
        <span>/</span>
        <Link href="/tools" className="hover:text-gray-300">Tools</Link>
        <span>/</span>
        <span className="text-gray-400">Sprint Speed Converter</span>
      </nav>

      <h1 className="text-2xl font-bold text-white mb-2">Sprint Speed Converter</h1>
      <p className="text-gray-400 text-sm mb-8 max-w-2xl">Convert sprint speeds between km/h, mph and m/s, and compare against professional footballers.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="card p-5">
          <h2 className="text-base font-semibold text-white mb-4">Convert speed</h2>
          <div className="flex gap-2 mb-4">
            {(['kmh', 'mph', 'ms'] as const).map(u => (
              <button key={u} onClick={() => setUnit(u)}
                className={`flex-1 py-1.5 text-xs rounded-lg font-medium transition-colors ${unit === u ? 'bg-brand-500 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}>
                {u === 'kmh' ? 'km/h' : u === 'mph' ? 'mph' : 'm/s'}
              </button>
            ))}
          </div>
          <input
            type="number"
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder={`Enter speed in ${unit === 'kmh' ? 'km/h' : unit === 'mph' ? 'mph' : 'm/s'}`}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-brand-500 mb-4"
          />
          {num > 0 && (
            <div className="space-y-2">
              {[
                { label: 'km/h', val: kmh.toFixed(2) },
                { label: 'mph', val: mph.toFixed(2) },
                { label: 'm/s', val: ms.toFixed(2) },
              ].map(r => (
                <div key={r.label} className="flex justify-between bg-gray-800/60 rounded-lg px-4 py-2">
                  <span className="text-xs text-gray-400">{r.label}</span>
                  <span className="text-sm font-bold text-white">{r.val}</span>
                </div>
              ))}
              {closest && (
                <p className="text-xs text-center text-gray-500 pt-1">
                  Similar to <span className="text-brand-400">{closest.name}</span> ({closest.speed} km/h)
                </p>
              )}
            </div>
          )}
        </div>

        <div className="card p-5">
          <h2 className="text-base font-semibold text-white mb-4">Top football sprint speeds</h2>
          <div className="space-y-3">
            {BENCHMARKS.map((b, i) => (
              <div key={b.name} className="flex items-center gap-3">
                <span className="text-xs text-gray-600 w-4">{i + 1}</span>
                <div className="flex-1">
                  <p className="text-sm text-white">{b.name}</p>
                  <div className="w-full h-1.5 bg-gray-800 rounded-full mt-1 overflow-hidden">
                    <div className="h-full bg-brand-500 rounded-full" style={{ width: `${((b.speed - 20) / 20) * 100}%` }} />
                  </div>
                </div>
                <span className="text-xs font-bold text-white shrink-0">{b.speed} km/h</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Link href="/tools/calculators/xg-calculator" className="card p-4 hover:border-gray-700 group">
          <p className="text-xs text-brand-400 mb-1">📊 Related tool</p>
          <p className="text-sm font-medium text-white group-hover:text-brand-400">xG Calculator →</p>
        </Link>
        <Link href="/academy/training/pre-match-warm-up-routine" className="card p-4 hover:border-gray-700 group">
          <p className="text-xs text-brand-400 mb-1">🏃 Related guide</p>
          <p className="text-sm font-medium text-white group-hover:text-brand-400">Speed training drills →</p>
        </Link>
      </div>
    </div>
  )
}
