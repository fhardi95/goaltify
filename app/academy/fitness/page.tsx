import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Football Fitness & Nutrition Guides',
  description: 'Get fitter for football. Cardio plans, stretching routines, mental fitness tips, post-match recovery and fitness tests — all from Goaltify Academy.',
  canonical: 'https://goaltify.com/academy/fitness',
  keywords: ['football fitness', 'football nutrition', 'get fit for football', 'football endurance training', 'football fitness test'],
})

const GUIDES = [
  { slug: 'football-fitness-test', title: 'Football Fitness Test: How Fit Are You?', desc: 'Test your VO2 max, sprint speed, agility and endurance with these 4 simple self-tests.', level: 'All levels', icon: '📊', readTime: 6 },
  { slug: 'cardio-for-footballers', title: 'Cardio Training for Footballers', desc: 'Why steady-state jogging isn\'t enough — interval training that mirrors match demands.', level: 'All levels', icon: '🏃', readTime: 7 },
  { slug: 'stretching-routine', title: 'Post-Match Stretching Routine', desc: 'A 10-minute cool-down routine to speed up recovery and reduce soreness after a match.', level: 'All levels', icon: '🧘', readTime: 5 },
  { slug: 'mental-fitness-football', title: 'Mental Fitness for Footballers', desc: 'Concentration, confidence and handling pressure — the mental side of football explained.', level: 'All levels', icon: '🧠', readTime: 7 },
  { slug: 'recovery-after-a-match', title: 'How to Recover Properly After a Match', desc: 'What to eat, when to rest, and the recovery techniques used by professional players.', level: 'All levels', icon: '💤', readTime: 6 },
]

export default function FitnessPage() {
  return (
    <div className="container-site py-8">
      <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-5">
        <Link href="/" className="hover:text-gray-300">Home</Link>
        <span>/</span>
        <Link href="/academy" className="hover:text-gray-300">Academy</Link>
        <span>/</span>
        <span className="text-gray-400">Fitness & Nutrition</span>
      </nav>
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-3xl">💪</span>
          <span className="text-xs font-medium text-brand-400 bg-brand-500/10 border border-brand-500/20 px-2.5 py-1 rounded-full">Academy · Fitness</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Football Fitness & Nutrition</h1>
        <p className="text-gray-400 max-w-xl text-sm leading-relaxed">
          Get fit enough to dominate for 90 minutes. Cardio training, recovery routines, mental preparation and nutrition guides designed specifically for footballers at all levels.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {GUIDES.map(guide => (
          <Link key={guide.slug} href={`/academy/fitness/${guide.slug}`} className="card p-5 hover:border-gray-700 transition-colors group">
            <div className="flex items-start justify-between mb-3">
              <span className="text-3xl">{guide.icon}</span>
              <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">{guide.level}</span>
            </div>
            <h2 className="text-sm font-semibold text-white group-hover:text-brand-400 transition-colors mb-2 leading-snug">{guide.title}</h2>
            <p className="text-xs text-gray-500 leading-relaxed mb-3">{guide.desc}</p>
            <span className="text-xs text-brand-400 group-hover:text-brand-300">{guide.readTime} min read →</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
