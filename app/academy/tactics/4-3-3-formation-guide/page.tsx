import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSection } from '@/components/blog/FAQSection'
import { buildMetadata, buildArticleSchema } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: '4-3-3 Formation: Complete Guide — Roles, Strengths & How to Beat It',
  description: 'The definitive 4-3-3 formation guide. Player roles, attacking shape, pressing triggers, best managers who use it, and how to counter it.',
  canonical: 'https://goaltify.com/academy/tactics/4-3-3-formation-guide',
  keywords: ['4-3-3 formation', '4-3-3 tactics', 'how to play 4-3-3', '4-3-3 strengths weaknesses', '4-3-3 football guide'],
})

const FAQS = [
  { question: 'What is the 4-3-3 formation in football?', answer: 'The 4-3-3 uses four defenders, three central midfielders, and three forwards (a striker flanked by two wingers). It is the most popular formation in modern top-level football, used by Barcelona, Manchester City, Liverpool and many others.' },
  { question: 'What are the strengths of the 4-3-3?', answer: 'The 4-3-3 creates natural width through wingers, overloads midfield with three players, and supports high pressing with compact lines. Full-backs can push forward to create extra attacking options in wide areas.' },
  { question: 'What are the weaknesses of the 4-3-3?', answer: 'The biggest weakness is vulnerability to counter-attacks when wingers are high. It also demands elite stamina from midfielders and can be exposed behind advanced full-backs if the press is beaten with one quick pass.' },
  { question: 'Which managers use the 4-3-3?', answer: 'Pep Guardiola at Manchester City, Jürgen Klopp at Liverpool, Carlo Ancelotti at Real Madrid and Xavi at Barcelona are all known 4-3-3 coaches. Spain and the Netherlands also use it at international level.' },
  { question: 'How do you beat the 4-3-3?', answer: 'Play through the lines quickly before the press engages, exploit the space behind advanced full-backs with pace, use a 4-2-3-1 to outnumber their DM centrally, and pin their centre-backs deep with a physical striker.' },
]

const ROLES = [
  { pos: 'GK', title: 'Goalkeeper', desc: 'Must be comfortable with the ball at feet — acts as an 11th player in build-up, receiving passes under pressure and distributing quickly to bypass the opponent\'s press.', icon: '🧤' },
  { pos: 'RB / LB', title: 'Full-backs', desc: 'The engines of modern 4-3-3 play. Push high and wide when attacking, overlapping wingers to create 2v1s. Demand elite stamina — they cover the most ground of any outfield position.', icon: '🏃' },
  { pos: 'CB × 2', title: 'Centre-backs', desc: 'With full-backs advanced, CBs must be comfortable in 1v1s and have pace to cover behind. They also initiate build-up by playing short to the midfielder who drops to receive.', icon: '🛡️' },
  { pos: 'DM', title: 'Holding midfielder', desc: 'The spine of the system. Sits deepest, shields the back four, recycles possession and covers the space left by advancing full-backs. Think Busquets, Fabinho, Rodri. Without a top-class DM, the 4-3-3 struggles badly.', icon: '⚙️' },
  { pos: 'CM × 2', title: 'Box-to-box midfielders', desc: 'Cover enormous ground in both directions — arriving into the box to score, pressing high to win the ball back. Require high stamina and two-way quality. Think Henderson, Milner, or Gündogan.', icon: '🔄' },
  { pos: 'LW / RW', title: 'Wingers', desc: 'Often inverted — left-footed on the right, right-footed on the left — cutting inside to shoot or play through balls. Can also be traditional wide forwards who hug the touchline and cross. The system works with either type.', icon: '⚡' },
  { pos: 'ST', title: 'Centre-forward', desc: 'Can be a pure goalscorer (Haaland) or a pressing forward who drops deep to link play (Firmino). The striker choice fundamentally changes how the whole team plays — both styles are valid within the 4-3-3.', icon: '🎯' },
]

export default function FormationGuidePage() {
  const schema = buildArticleSchema({
    title: '4-3-3 Formation: Complete Guide',
    description: 'The definitive 4-3-3 formation guide. Player roles, strengths, weaknesses and how to counter it.',
    canonical: 'https://goaltify.com/academy/tactics/4-3-3-formation-guide',
    publishedAt: '2026-05-10',
  })

  return (
    <div className="container-site py-8 max-w-4xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-5">
        <Link href="/" className="hover:text-gray-300">Home</Link><span>/</span>
        <Link href="/academy" className="hover:text-gray-300">Academy</Link><span>/</span>
        <Link href="/academy/tactics" className="hover:text-gray-300">Tactics</Link><span>/</span>
        <span className="text-gray-400">4-3-3 guide</span>
      </nav>

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-medium text-brand-400 bg-brand-500/10 border border-brand-500/20 px-2.5 py-1 rounded-full">Tactics</span>
          <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">All levels · 9 min read</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-3">
          4-3-3 Formation: Complete Guide — Roles, Strengths & How to Beat It
        </h1>
        <p className="text-gray-400 leading-relaxed">
          The 4-3-3 is the most influential formation in modern football. Barcelona built a dynasty with it. Klopp's Liverpool terrorised Europe with it. Guardiola's City perfected it. Here is everything you need to understand how it works, why it dominates, and how to play against it.
        </p>
        <p className="text-xs text-gray-500 mt-3">By Goaltify Academy · Updated 10 May 2026</p>
      </div>

      <div className="card border-l-2 border-l-brand-500 p-5 mb-8">
        <p className="text-sm font-semibold text-white mb-2">⚡ The 4-3-3 in one sentence</p>
        <p className="text-sm text-gray-300 leading-relaxed">Four defenders, three midfielders, three forwards — designed for width, high pressing, and dominating possession through compact midfield triangles that outnumber opponents in central areas.</p>
      </div>

      <h2 className="text-xl font-bold text-white mb-4">Player roles in the 4-3-3</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
        {ROLES.map(r => (
          <div key={r.pos} className="card p-4 flex gap-3">
            <span className="text-2xl">{r.icon}</span>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded">{r.pos}</span>
                <span className="text-sm font-semibold text-white">{r.title}</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">{r.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <div className="card p-5">
          <h2 className="text-base font-bold text-white mb-3 flex items-center gap-2"><span className="text-green-400">✓</span> Strengths</h2>
          <ul className="space-y-2">
            {['Natural width from wingers stretches defences', 'Midfield triangle overloads opponents centrally', 'High press is structurally built-in to the shape', 'Full-back overlaps create width and 2v1s', 'Flexible — effective with and without the ball'].map(s => (
              <li key={s} className="flex gap-2 text-xs text-gray-300"><span className="text-green-400 shrink-0">+</span>{s}</li>
            ))}
          </ul>
        </div>
        <div className="card p-5">
          <h2 className="text-base font-bold text-white mb-3 flex items-center gap-2"><span className="text-red-400">✗</span> Weaknesses</h2>
          <ul className="space-y-2">
            {['Exposed to counters when wingers are advanced', 'Demands enormous stamina from all three midfielders', 'Space behind attacking full-backs is exploitable', 'Requires an elite DM — without one it breaks down', 'Can be bypassed with quick vertical combinations'].map(w => (
              <li key={w} className="flex gap-2 text-xs text-gray-300"><span className="text-red-400 shrink-0">−</span>{w}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card p-6 mb-8">
        <h2 className="text-lg font-bold text-white mb-4">How to beat the 4-3-3</h2>
        <div className="space-y-4">
          {[
            { method: 'Play through the lines quickly', detail: 'The press relies on a compact attacking shape. A midfielder who receives, turns and plays forward before the press engages will find space behind their midfield line regularly.' },
            { method: 'Target the space behind the full-backs', detail: 'When both full-backs push high, a direct ball in behind for a pacey forward creates a 1v1 with a retreating defender. Most 4-3-3 teams concede goals this way.' },
            { method: 'Overload their DM with a 4-2-3-1', detail: 'Two midfielders pressing one DM creates an immediate numerical advantage. The DM cannot cover both, creating space for the number 10 to receive between the lines and face goal.' },
            { method: 'Pin their centre-backs with a physical striker', detail: 'A centre-forward who stays on the shoulder of the last defender forces the CBs to track deep, reducing their ability to step into midfield and compress the press from below.' },
          ].map((c, i) => (
            <div key={i} className="flex gap-3 border-b border-gray-800 pb-4 last:border-0 last:pb-0">
              <span className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
              <div>
                <p className="text-sm font-semibold text-white mb-1">{c.method}</p>
                <p className="text-xs text-gray-400 leading-relaxed">{c.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        <Link href="/tools/formations" className="card p-4 hover:border-gray-700 transition-colors group">
          <p className="text-xs text-brand-400 mb-1">🗺️ Visualise it</p>
          <p className="text-sm font-medium text-white group-hover:text-brand-400">Formation builder →</p>
        </Link>
        <Link href="/academy/tactics/high-press-explained" className="card p-4 hover:border-gray-700 transition-colors group">
          <p className="text-xs text-brand-400 mb-1">⚡ Read next</p>
          <p className="text-sm font-medium text-white group-hover:text-brand-400">High press explained →</p>
        </Link>
      </div>

      <FAQSection faqs={FAQS} />
    </div>
  )
}
