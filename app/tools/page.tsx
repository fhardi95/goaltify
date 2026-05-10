import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Football Tools & Calculators — xG, Pass Accuracy, Sprint Speed',
  description: 'Free interactive football tools: xG calculator, pass accuracy calculator, sprint speed converter, formation builder and more on Goaltify.',
  keywords: ['football calculator', 'xG calculator', 'pass accuracy calculator', 'football metric tools'],
}

const TOOLS = [
  {
    title: 'xG Calculator & Explainer',
    desc: 'Understand expected goals — calculate xG for different shot situations and see why it matters.',
    href: '/tools/calculators/xg-calculator',
    icon: '📊',
    badge: 'Popular',
    badgeColor: 'bg-brand-500/20 text-brand-400 border-brand-500/30',
  },
  {
    title: 'Pass Accuracy Calculator',
    desc: 'Enter passes attempted and completed to get pass accuracy %, plus how it compares to elite players.',
    href: '/tools/calculators/pass-accuracy-calculator',
    icon: '🎯',
    badge: null,
    badgeColor: '',
  },
  {
    title: 'Sprint Speed Converter',
    desc: 'Convert between km/h, mph and m/s. See how your sprint speed compares to Premier League players.',
    href: '/tools/calculators/sprint-speed-converter',
    icon: '⚡',
    badge: null,
    badgeColor: '',
  },
  {
    title: 'Formation Builder',
    desc: 'Build and visualise any football formation. Drag players into position and share your lineup.',
    href: '/tools/formations',
    icon: '🗺️',
    badge: 'Interactive',
    badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  },
  {
    title: 'Football Metric Glossary',
    desc: 'xG, PPDA, xA, progressive passes — every modern football stat explained simply.',
    href: '/tools/calculators/football-metric-glossary',
    icon: '📖',
    badge: null,
    badgeColor: '',
  },
]

export default function ToolsPage() {
  return (
    <div className="container-site py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Football tools & calculators</h1>
        <p className="text-gray-400 max-w-xl text-sm">
          Free interactive tools to understand the numbers behind football — from xG to sprint speed. No account needed.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TOOLS.map(tool => (
          <Link key={tool.href} href={tool.href} className="card p-5 hover:border-gray-700 transition-colors group">
            <div className="flex items-start justify-between mb-3">
              <span className="text-3xl">{tool.icon}</span>
              {tool.badge && (
                <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${tool.badgeColor}`}>
                  {tool.badge}
                </span>
              )}
            </div>
            <h2 className="text-sm font-semibold text-white group-hover:text-brand-400 transition-colors mb-2">{tool.title}</h2>
            <p className="text-xs text-gray-500 leading-relaxed">{tool.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
