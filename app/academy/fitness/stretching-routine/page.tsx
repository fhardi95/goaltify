import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSection } from '@/components/blog/FAQSection'
import { buildMetadata, buildArticleSchema } from '@/lib/seo'

const CANONICAL = 'https://goaltify.com/academy/fitness/stretching-routine'

export const metadata: Metadata = buildMetadata({
  title: 'Post-Match Stretching Routine for Footballers',
  description: 'A 10-minute cool-down stretching routine to reduce soreness, speed up recovery and protect your muscles after a match.',
  canonical: CANONICAL,
})

export default function Page() {
  const schema = buildArticleSchema({ title: 'Post-Match Stretching Routine for Footballers', description: 'A 10-minute cool-down stretching routine to reduce soreness, speed up recovery and protect your muscles after a match.', canonical: CANONICAL, publishedAt: '2026-05-10' })
  return (
    <div className="container-site py-8 max-w-4xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-5">
        <Link href="/" className="hover:text-gray-300">Home</Link><span>/</span>
        <Link href="/academy" className="hover:text-gray-300">Academy</Link><span>/</span>
        <Link href="/academy/fitness" className="hover:text-gray-300">Fitness</Link><span>/</span>
        <span className="text-gray-400">Post-Match Stretching Routine for Footballers</span>
      </nav>
      <div className="mb-6">
        <span className="text-xs font-medium text-brand-400 bg-brand-500/10 border border-brand-500/20 px-2.5 py-1 rounded-full">Fitness</span>
        <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight mt-3 mb-3">Post-Match Stretching Routine for Footballers</h1>
        <p className="text-gray-400 leading-relaxed">A 10-minute cool-down stretching routine to reduce soreness, speed up recovery and protect your muscles after a match.</p>
        <p className="text-xs text-gray-500 mt-3">By Goaltify Academy · Updated 10 May 2026</p>
      </div>
      <div className="card border-l-2 border-l-brand-500 p-5 mb-8">
        <p className="text-sm font-semibold text-white mb-2">⚡ Full guide publishing soon</p>
        <p className="text-sm text-gray-400 leading-relaxed mb-4">Our Academy team is writing the complete version of this guide. It will include step-by-step breakdowns, drills, video references and FAQ schema. Subscribe to be notified when it goes live.</p>
        <Link href="/newsletter" className="inline-block text-xs px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-medium transition-colors">Notify me →</Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        <Link href="/academy/fitness" className="card p-4 hover:border-gray-700 transition-colors group">
          <p className="text-xs text-brand-400 mb-1">← Back to Fitness</p>
          <p className="text-sm font-medium text-white group-hover:text-brand-400">All Fitness guides</p>
        </Link>
        <Link href="/academy" className="card p-4 hover:border-gray-700 transition-colors group">
          <p className="text-xs text-brand-400 mb-1">🎓 Explore more</p>
          <p className="text-sm font-medium text-white group-hover:text-brand-400">All Academy sections</p>
        </Link>
      </div>
    </div>
  )
}
