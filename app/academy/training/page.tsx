import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Football Training Guides — Drills, Warm-Ups & Routines',
  description: 'Step-by-step football training guides for all levels. Pre-match warm-ups, speed drills, strength training, injury prevention and weekly training plans on Goaltify Academy.',
  canonical: 'https://goaltify.com/academy/training',
  keywords: ['football training guides', 'football drills', 'pre-match warm up', 'football fitness training', 'how to train for football'],
})

const GUIDES = [
  {
    slug: 'pre-match-warm-up-routine',
    title: 'The Perfect Pre-Match Warm-Up Routine',
    desc: 'A science-backed 20-minute warm-up that prepares your body and mind for 90 minutes of football.',
    readTime: 6,
    level: 'All levels',
    icon: '🏃',
  },
  {
    slug: 'speed-training-drills',
    title: 'Speed Training Drills for Footballers',
    desc: 'Targeted drills to improve your acceleration, top speed and agility on the pitch.',
    readTime: 7,
    level: 'Intermediate',
    icon: '⚡',
  },
  {
    slug: 'injury-prevention-for-footballers',
    title: 'Injury Prevention: Keep Yourself on the Pitch',
    desc: 'The most common football injuries and the exact exercises that prevent them.',
    readTime: 8,
    level: 'All levels',
    icon: '🩺',
  },
  {
    slug: 'football-diet-plan',
    title: 'Football Diet Plan: What to Eat and When',
    desc: 'Pre-match meals, post-match recovery nutrition, and what elite players actually eat.',
    readTime: 7,
    level: 'All levels',
    icon: '🥗',
  },
  {
    slug: 'strength-training-for-footballers',
    title: 'Strength Training for Footballers',
    desc: 'Build functional strength that translates directly to power, shielding and aerial ability.',
    readTime: 9,
    level: 'Intermediate',
    icon: '💪',
  },
  {
    slug: 'weekly-football-training-plan',
    title: '7-Day Football Training Plan',
    desc: 'A complete weekly schedule balancing technical work, fitness and rest for amateur players.',
    readTime: 8,
    level: 'All levels',
    icon: '📅',
  },
]

export default function TrainingPage() {
  return (
    <div className="container-site py-8">
      <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-5">
        <Link href="/" className="hover:text-gray-300">Home</Link>
        <span>/</span>
        <Link href="/academy" className="hover:text-gray-300">Academy</Link>
        <span>/</span>
        <span className="text-gray-400">Training</span>
      </nav>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-3xl">🏃</span>
          <span className="text-xs font-medium text-brand-400 bg-brand-500/10 border border-brand-500/20 px-2.5 py-1 rounded-full">Academy · Training</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Football Training Guides</h1>
        <p className="text-gray-400 max-w-xl text-sm leading-relaxed">
          Science-backed training guides written for amateur and semi-pro footballers. From your pre-match warm-up to your weekly schedule — everything you need to play better and stay injury-free.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {GUIDES.map(guide => (
          <Link
            key={guide.slug}
            href={`/academy/training/${guide.slug}`}
            className="card p-5 hover:border-gray-700 transition-colors group"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-3xl">{guide.icon}</span>
              <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">{guide.level}</span>
            </div>
            <h2 className="text-sm font-semibold text-white group-hover:text-brand-400 transition-colors mb-2 leading-snug">
              {guide.title}
            </h2>
            <p className="text-xs text-gray-500 leading-relaxed mb-3">{guide.desc}</p>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <span>{guide.readTime} min read</span>
              <span>·</span>
              <span className="text-brand-400 group-hover:text-brand-300">Read guide →</span>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div className="card p-5 mt-8 flex flex-col sm:flex-row items-center gap-4">
        <div>
          <p className="text-sm font-semibold text-white mb-1">📬 Weekly training tips</p>
          <p className="text-xs text-gray-400">Get a new drill or training tip every Sunday in your inbox.</p>
        </div>
        <Link href="/newsletter" className="shrink-0 px-5 py-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium rounded-lg transition-colors">
          Subscribe free →
        </Link>
      </div>
    </div>
  )
}
