import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Football Dribbling Skills & Techniques — Complete Guide',
  description: 'Master football dribbling with step-by-step guides. Learn the stepover, nutmeg, first touch drills, free kicks and more from Goaltify Academy.',
  canonical: 'https://goaltify.com/academy/dribbling',
  keywords: ['football dribbling skills', 'dribbling techniques', 'how to dribble in football', 'football skills tutorial'],
})

const GUIDES = [
  { slug: 'how-to-dribble-past-a-defender', title: 'How to Dribble Past a Defender', desc: '7 elite techniques including the body feint, stepover, La Croqueta and Cruyff turn.', level: 'All levels', icon: '⚽', readTime: 8 },
  { slug: 'stepover-tutorial', title: 'Stepover Tutorial — Master the Classic Move', desc: 'Break down the stepover into simple steps. Single, double, and reverse stepover drills.', level: 'Beginner', icon: '🔄', readTime: 5 },
  { slug: 'how-to-nutmeg', title: 'How to Nutmeg: The Art of the Panna', desc: 'When to nutmeg, how to set it up, and the exact technique to thread it between a defender\'s legs.', level: 'Intermediate', icon: '🕳️', readTime: 5 },
  { slug: 'first-touch-drills', title: 'First Touch Drills to Improve Ball Control', desc: '8 progressive drills that will transform your first touch under pressure in 4 weeks.', level: 'All levels', icon: '🎯', readTime: 7 },
  { slug: 'how-to-shoot-with-power', title: 'How to Shoot with Power and Accuracy', desc: 'The correct technique for shooting, where most players go wrong, and how to practice properly.', level: 'All levels', icon: '💥', readTime: 6 },
  { slug: 'how-to-take-a-free-kick', title: 'How to Take a Free Kick Like a Pro', desc: 'Placement, power, dipping technique and set-piece strategies used at professional level.', level: 'Intermediate', icon: '🏹', readTime: 7 },
]

export default function DribblingPage() {
  return (
    <div className="container-site py-8">
      <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-5">
        <Link href="/" className="hover:text-gray-300">Home</Link>
        <span>/</span>
        <Link href="/academy" className="hover:text-gray-300">Academy</Link>
        <span>/</span>
        <span className="text-gray-400">Dribbling</span>
      </nav>
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-3xl">⚽</span>
          <span className="text-xs font-medium text-brand-400 bg-brand-500/10 border border-brand-500/20 px-2.5 py-1 rounded-full">Academy · Skills</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Football Dribbling Skills & Techniques</h1>
        <p className="text-gray-400 max-w-xl text-sm leading-relaxed">
          From basic ball control to elite 1v1 moves — step-by-step skill guides that will make you harder to defend. Every technique broken down with drills you can practise alone or with a partner.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {GUIDES.map(guide => (
          <Link key={guide.slug} href={`/academy/dribbling/${guide.slug}`} className="card p-5 hover:border-gray-700 transition-colors group">
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
