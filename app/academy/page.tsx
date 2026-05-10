import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Football Academy — Training Guides, Skills & Tactics',
  description:
    'Learn how to dribble, improve your passing, understand tactics, and get fit for football. Step-by-step guides for players of all levels on Goaltify Academy.',
  keywords: ['football training guides', 'how to dribble', 'football tactics', 'improve at football'],
}

const CATEGORIES = [
  {
    title: 'Skills & dribbling',
    desc: 'Beat defenders, improve your touch, and master the ball.',
    href: '/academy/dribbling',
    icon: '⚽',
    count: 12,
    guides: ['How to dribble past a defender', 'Stepover tutorial', 'How to nutmeg', 'First touch drills'],
  },
  {
    title: 'Training & fitness',
    desc: 'Build strength, speed, and stamina for 90 minutes.',
    href: '/academy/training',
    icon: '🏃',
    count: 9,
    guides: ['Pre-match warm-up routine', 'Speed training drills', 'Injury prevention', 'Football diet plan'],
  },
  {
    title: 'Tactics & formations',
    desc: 'Understand the game at a deeper level.',
    href: '/academy/tactics',
    icon: '🗺️',
    count: 15,
    guides: ['4-3-3 formation guide', 'High press explained', 'How to defend set pieces', 'Pressing triggers'],
  },
  {
    title: 'Football analytics',
    desc: 'The numbers behind the beautiful game.',
    href: '/tools/calculators',
    icon: '📊',
    count: 7,
    guides: ['What is xG?', 'How to calculate pass accuracy', 'PPDA explained', 'Using StatsBomb data'],
  },
]

export default function AcademyPage() {
  return (
    <div className="container-site py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Goaltify Academy</h1>
        <p className="text-gray-400 max-w-xl">
          Step-by-step guides written by football coaches and analysts. Whether you play Sunday league
          or just want to understand the game better — you're in the right place.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {CATEGORIES.map(cat => (
          <div key={cat.href} className="card p-5 hover:border-gray-700 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{cat.icon}</span>
                <div>
                  <h2 className="text-base font-semibold text-white">{cat.title}</h2>
                  <p className="text-xs text-gray-500">{cat.count} guides</p>
                </div>
              </div>
              <Link
                href={cat.href}
                className="text-xs text-brand-400 hover:text-brand-300 font-medium"
              >
                View all →
              </Link>
            </div>
            <p className="text-sm text-gray-400 mb-4">{cat.desc}</p>
            <ul className="space-y-1.5">
              {cat.guides.map(g => (
                <li key={g}>
                  <Link
                    href={`${cat.href}/${g.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
                    className="text-sm text-gray-300 hover:text-brand-400 flex items-center gap-2 transition-colors"
                  >
                    <span className="text-gray-600">→</span>
                    {g}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
