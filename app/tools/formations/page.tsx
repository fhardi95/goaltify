'use client'

import { useState } from 'react'
import Link from 'next/link'

type Formation = '4-3-3' | '4-4-2' | '4-2-3-1' | '3-5-2' | '5-3-2' | '4-5-1'

const FORMATIONS: Record<Formation, { label: string; positions: { x: number; y: number; role: string }[] }> = {
  '4-3-3': {
    label: '4-3-3 — Attacking, high press',
    positions: [
      { x: 50, y: 88, role: 'GK' },
      { x: 15, y: 68, role: 'LB' }, { x: 35, y: 72, role: 'CB' }, { x: 65, y: 72, role: 'CB' }, { x: 85, y: 68, role: 'RB' },
      { x: 25, y: 48, role: 'CM' }, { x: 50, y: 44, role: 'CM' }, { x: 75, y: 48, role: 'CM' },
      { x: 15, y: 22, role: 'LW' }, { x: 50, y: 18, role: 'ST' }, { x: 85, y: 22, role: 'RW' },
    ],
  },
  '4-4-2': {
    label: '4-4-2 — Balanced, classic',
    positions: [
      { x: 50, y: 88, role: 'GK' },
      { x: 15, y: 68, role: 'LB' }, { x: 35, y: 72, role: 'CB' }, { x: 65, y: 72, role: 'CB' }, { x: 85, y: 68, role: 'RB' },
      { x: 15, y: 44, role: 'LM' }, { x: 35, y: 48, role: 'CM' }, { x: 65, y: 48, role: 'CM' }, { x: 85, y: 44, role: 'RM' },
      { x: 35, y: 20, role: 'ST' }, { x: 65, y: 20, role: 'ST' },
    ],
  },
  '4-2-3-1': {
    label: '4-2-3-1 — Defensive stability',
    positions: [
      { x: 50, y: 88, role: 'GK' },
      { x: 15, y: 68, role: 'LB' }, { x: 35, y: 72, role: 'CB' }, { x: 65, y: 72, role: 'CB' }, { x: 85, y: 68, role: 'RB' },
      { x: 35, y: 55, role: 'DM' }, { x: 65, y: 55, role: 'DM' },
      { x: 15, y: 36, role: 'LW' }, { x: 50, y: 33, role: 'AM' }, { x: 85, y: 36, role: 'RW' },
      { x: 50, y: 16, role: 'ST' },
    ],
  },
  '3-5-2': {
    label: '3-5-2 — Wing dominance',
    positions: [
      { x: 50, y: 88, role: 'GK' },
      { x: 25, y: 70, role: 'CB' }, { x: 50, y: 74, role: 'CB' }, { x: 75, y: 70, role: 'CB' },
      { x: 10, y: 48, role: 'LWB' }, { x: 30, y: 52, role: 'CM' }, { x: 50, y: 48, role: 'CM' }, { x: 70, y: 52, role: 'CM' }, { x: 90, y: 48, role: 'RWB' },
      { x: 35, y: 20, role: 'ST' }, { x: 65, y: 20, role: 'ST' },
    ],
  },
  '5-3-2': {
    label: '5-3-2 — Defensive solidity',
    positions: [
      { x: 50, y: 88, role: 'GK' },
      { x: 10, y: 65, role: 'LWB' }, { x: 27, y: 70, role: 'CB' }, { x: 50, y: 73, role: 'CB' }, { x: 73, y: 70, role: 'CB' }, { x: 90, y: 65, role: 'RWB' },
      { x: 25, y: 46, role: 'CM' }, { x: 50, y: 42, role: 'CM' }, { x: 75, y: 46, role: 'CM' },
      { x: 35, y: 20, role: 'ST' }, { x: 65, y: 20, role: 'ST' },
    ],
  },
  '4-5-1': {
    label: '4-5-1 — Midfield control',
    positions: [
      { x: 50, y: 88, role: 'GK' },
      { x: 15, y: 68, role: 'LB' }, { x: 35, y: 72, role: 'CB' }, { x: 65, y: 72, role: 'CB' }, { x: 85, y: 68, role: 'RB' },
      { x: 10, y: 44, role: 'LM' }, { x: 28, y: 48, role: 'CM' }, { x: 50, y: 44, role: 'CM' }, { x: 72, y: 48, role: 'CM' }, { x: 90, y: 44, role: 'RM' },
      { x: 50, y: 16, role: 'ST' },
    ],
  },
}

export default function FormationBuilderPage() {
  const [selected, setSelected] = useState<Formation>('4-3-3')
  const formation = FORMATIONS[selected]

  return (
    <div className="container-site py-8 max-w-4xl">
      <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-5">
        <Link href="/" className="hover:text-gray-300">Home</Link>
        <span>/</span>
        <Link href="/tools" className="hover:text-gray-300">Tools</Link>
        <span>/</span>
        <span className="text-gray-400">Formation Builder</span>
      </nav>

      <h1 className="text-2xl font-bold text-white mb-2">Football Formation Builder</h1>
      <p className="text-gray-400 text-sm mb-6 max-w-2xl">Visualise any football formation. Select a formation below to see player positions on the pitch.</p>

      {/* Formation selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
        {(Object.keys(FORMATIONS) as Formation[]).map(f => (
          <button
            key={f}
            onClick={() => setSelected(f)}
            className={`py-2 px-3 rounded-lg text-xs font-medium text-left transition-colors ${
              selected === f ? 'bg-brand-500 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            <span className="font-bold">{f}</span>
          </button>
        ))}
      </div>

      <p className="text-xs text-gray-500 mb-4">{formation.label}</p>

      {/* Pitch */}
      <div className="card overflow-hidden mb-6">
        <div className="relative bg-green-900/30" style={{ paddingBottom: '65%' }}>
          {/* Pitch markings */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 65" preserveAspectRatio="none">
            {/* Outline */}
            <rect x="2" y="2" width="96" height="61" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
            {/* Centre line */}
            <line x1="50" y1="2" x2="50" y2="63" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" />
            {/* Centre circle */}
            <circle cx="50" cy="32.5" r="8" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" />
            <circle cx="50" cy="32.5" r="0.7" fill="rgba(255,255,255,0.3)" />
            {/* Penalty areas */}
            <rect x="2" y="18" width="16" height="29" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" />
            <rect x="82" y="18" width="16" height="29" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" />
            {/* Goal areas */}
            <rect x="2" y="24" width="6" height="17" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" />
            <rect x="92" y="24" width="6" height="17" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" />
            {/* Penalty spots */}
            <circle cx="12" cy="32.5" r="0.6" fill="rgba(255,255,255,0.3)" />
            <circle cx="88" cy="32.5" r="0.6" fill="rgba(255,255,255,0.3)" />
            {/* Grass stripes */}
            {[0,1,2,3,4,5].map(i => (
              <rect key={i} x="2" y={2 + i*10.2} width="96" height="5.1" fill={i%2===0 ? 'rgba(34,197,94,0.05)' : 'rgba(21,128,61,0.05)'} />
            ))}
          </svg>

          {/* Players */}
          {formation.positions.map((pos, i) => (
            <div
              key={i}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-0.5"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-brand-500 border-2 border-white/80 flex items-center justify-center shadow-lg">
                <span className="text-white text-[8px] sm:text-[9px] font-bold">{i + 1}</span>
              </div>
              <span className="text-white text-[7px] sm:text-[8px] font-semibold bg-black/50 px-1 rounded">{pos.role}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Position list */}
      <div className="card p-5 mb-6">
        <h2 className="text-sm font-semibold text-white mb-3">{selected} — Player positions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {formation.positions.map((pos, i) => (
            <div key={i} className="flex items-center gap-2 bg-gray-800/50 rounded-lg px-3 py-2">
              <span className="w-5 h-5 rounded-full bg-brand-500 flex items-center justify-center text-[9px] font-bold text-white shrink-0">{i + 1}</span>
              <span className="text-xs text-gray-300">{pos.role}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Link href="/academy/tactics/4-3-3-formation-guide" className="card p-4 hover:border-gray-700 group">
          <p className="text-xs text-brand-400 mb-1">🗺️ Read more</p>
          <p className="text-sm font-medium text-white group-hover:text-brand-400">4-3-3 Formation Guide →</p>
        </Link>
        <Link href="/tools/calculators/xg-calculator" className="card p-4 hover:border-gray-700 group">
          <p className="text-xs text-brand-400 mb-1">📊 Related tool</p>
          <p className="text-sm font-medium text-white group-hover:text-brand-400">xG Calculator →</p>
        </Link>
      </div>
    </div>
  )
}
