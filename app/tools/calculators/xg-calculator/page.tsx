'use client'

import { useState } from 'react'
import Link from 'next/link'

const SHOT_TYPES = [
  { label: 'Open play — inside box, foot', xg: 0.10 },
  { label: 'Open play — six-yard box, foot', xg: 0.45 },
  { label: 'Header — inside box', xg: 0.08 },
  { label: 'Header — six-yard box', xg: 0.25 },
  { label: 'Penalty kick', xg: 0.79 },
  { label: 'Free kick — direct, 20–25 yards', xg: 0.05 },
  { label: 'One-on-one with goalkeeper', xg: 0.60 },
  { label: 'Volley — inside box', xg: 0.09 },
  { label: 'Long shot — outside box, foot', xg: 0.03 },
  { label: 'Cutback — inside box, foot', xg: 0.21 },
]

const DISTANCE_DATA = [
  { dist: '6 yards', xg: 0.42 },
  { dist: '12 yards', xg: 0.18 },
  { dist: '18 yards', xg: 0.09 },
  { dist: '25 yards', xg: 0.04 },
  { dist: '30+ yards', xg: 0.02 },
]

export default function XGCalculatorPage() {
  const [shotType, setShotType] = useState(0)
  const [angle, setAngle] = useState<'central' | 'slight' | 'tight'>('central')
  const [pressure, setPressure] = useState<'none' | 'some' | 'heavy'>('none')

  const base = SHOT_TYPES[shotType].xg
  const angleMulti = angle === 'central' ? 1 : angle === 'slight' ? 0.75 : 0.40
  const pressureMulti = pressure === 'none' ? 1 : pressure === 'some' ? 0.80 : 0.60
  const xg = Math.min(0.99, +(base * angleMulti * pressureMulti).toFixed(2))

  const xgColor = xg >= 0.5 ? 'text-green-400' : xg >= 0.2 ? 'text-yellow-400' : 'text-red-400'
  const xgLabel = xg >= 0.5 ? 'High quality chance' : xg >= 0.2 ? 'Good chance' : xg >= 0.08 ? 'Half chance' : 'Low quality chance'

  return (
    <div className="container-site py-8 max-w-4xl">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-5">
        <Link href="/" className="hover:text-gray-300">Home</Link>
        <span>/</span>
        <Link href="/tools" className="hover:text-gray-300">Tools</Link>
        <span>/</span>
        <span className="text-gray-400">xG Calculator</span>
      </nav>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">xG Calculator & Explainer</h1>
        <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
          Expected goals (xG) measures the quality of a shot — how likely it is to result in a goal based on position, angle, and situation. Select your shot scenario below to calculate its xG value.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Calculator */}
        <div className="card p-5">
          <h2 className="text-base font-semibold text-white mb-4">Calculate shot xG</h2>

          {/* Shot type */}
          <div className="mb-4">
            <label className="text-xs font-medium text-gray-400 block mb-2">Shot type & position</label>
            <select
              value={shotType}
              onChange={e => setShotType(+e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
            >
              {SHOT_TYPES.map((s, i) => <option key={i} value={i}>{s.label}</option>)}
            </select>
          </div>

          {/* Angle */}
          <div className="mb-4">
            <label className="text-xs font-medium text-gray-400 block mb-2">Shot angle</label>
            <div className="flex gap-2">
              {(['central', 'slight', 'tight'] as const).map(a => (
                <button
                  key={a}
                  onClick={() => setAngle(a)}
                  className={`flex-1 py-1.5 text-xs rounded-lg capitalize transition-colors ${
                    angle === a ? 'bg-brand-500 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          {/* Pressure */}
          <div className="mb-5">
            <label className="text-xs font-medium text-gray-400 block mb-2">Defensive pressure</label>
            <div className="flex gap-2">
              {(['none', 'some', 'heavy'] as const).map(p => (
                <button
                  key={p}
                  onClick={() => setPressure(p)}
                  className={`flex-1 py-1.5 text-xs rounded-lg capitalize transition-colors ${
                    pressure === p ? 'bg-brand-500 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Result */}
          <div className="bg-gray-800/60 rounded-xl p-5 text-center">
            <p className="text-xs text-gray-500 mb-1">Expected goals (xG)</p>
            <p className={`text-5xl font-bold mb-1 ${xgColor}`}>{xg}</p>
            <p className={`text-sm font-medium ${xgColor}`}>{xgLabel}</p>
            <p className="text-xs text-gray-600 mt-2">
              Scores on target roughly {Math.round(xg * 100)}% of the time
            </p>
          </div>
        </div>

        {/* Reference table */}
        <div className="card p-5">
          <h2 className="text-base font-semibold text-white mb-4">xG by distance (central angle)</h2>
          <div className="space-y-2 mb-6">
            {DISTANCE_DATA.map(d => (
              <div key={d.dist} className="flex items-center gap-3">
                <span className="text-xs text-gray-400 w-20 shrink-0">{d.dist}</span>
                <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-500 rounded-full transition-all"
                    style={{ width: `${d.xg * 150}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-white w-8 text-right">{d.xg}</span>
              </div>
            ))}
          </div>

          <h3 className="text-sm font-semibold text-white mb-3">Key xG benchmarks</h3>
          <div className="space-y-1.5 text-xs text-gray-400">
            {[
              { label: 'Penalty', val: '0.79' },
              { label: 'One-on-one', val: '0.60' },
              { label: 'Six-yard box header', val: '0.25' },
              { label: 'Cutback, inside box', val: '0.21' },
              { label: 'Outside box shot', val: '0.03' },
            ].map(b => (
              <div key={b.label} className="flex justify-between border-b border-gray-800 pb-1.5">
                <span>{b.label}</span>
                <span className="text-white font-medium">{b.val} xG</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Explainer */}
      <div className="card p-6 mb-6">
        <h2 className="text-lg font-bold text-white mb-3">What is xG and how is it calculated?</h2>
        <div className="space-y-3 text-sm text-gray-400 leading-relaxed">
          <p>Expected goals (xG) assigns each shot a probability score between 0 and 1 — representing the likelihood of that shot becoming a goal, based on historical data from thousands of similar chances.</p>
          <p>The main factors that influence xG are: <strong className="text-white">distance from goal</strong> (closer = higher xG), <strong className="text-white">shot angle</strong> (central = higher xG), <strong className="text-white">body part used</strong> (foot vs header), <strong className="text-white">type of assist</strong> (through ball vs cross), and <strong className="text-white">defensive pressure</strong>.</p>
          <p>A single match's xG tells you which team created better chances. Over a full season, teams that consistently have high xG for and low xG against are genuinely strong sides — not lucky ones. <Link href="/news/what-is-xg-in-football" className="text-brand-400 hover:underline">Read our full xG guide →</Link></p>
        </div>
      </div>

      {/* Related tools */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Link href="/tools/calculators/pass-accuracy-calculator" className="card p-4 hover:border-gray-700 transition-colors group">
          <p className="text-xs text-brand-400 mb-1">🎯 Next tool</p>
          <p className="text-sm font-medium text-white group-hover:text-brand-400 transition-colors">Pass Accuracy Calculator →</p>
        </Link>
        <Link href="/tools/formations" className="card p-4 hover:border-gray-700 transition-colors group">
          <p className="text-xs text-brand-400 mb-1">🗺️ Also popular</p>
          <p className="text-sm font-medium text-white group-hover:text-brand-400 transition-colors">Formation Builder →</p>
        </Link>
      </div>
    </div>
  )
}
