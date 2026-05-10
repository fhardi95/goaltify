import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSection } from '@/components/blog/FAQSection'
import { buildMetadata, buildArticleSchema } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'The Perfect Pre-Match Warm-Up Routine for Footballers',
  description: 'A science-backed 20-minute pre-match warm-up routine for footballers. Reduce injury risk and perform at your best from the first whistle.',
  canonical: 'https://goaltify.com/academy/training/pre-match-warm-up-routine',
  keywords: ['football pre-match warm up', 'football warm up routine', 'how to warm up for football', 'football warm up drills'],
})

const FAQS = [
  { question: 'How long should a football warm-up be?', answer: 'A proper football warm-up should be 15–20 minutes. This gives enough time to raise body temperature, mobilise joints, activate key muscle groups, and mentally prepare. Less than 10 minutes is insufficient for match intensity.' },
  { question: 'Should you stretch before football?', answer: 'Yes, but only dynamic stretching before a match — not static stretching. Dynamic stretches (leg swings, hip circles, high knees) increase blood flow and flexibility. Static stretching (holding a stretch) before exercise can temporarily reduce muscle power and should be saved for post-match cool-downs.' },
  { question: 'What should I eat before a football warm-up?', answer: 'Eat a carbohydrate-rich meal 2–3 hours before kick-off (pasta, rice, or bread). Avoid heavy meals within 90 minutes of the warm-up as they can cause discomfort. A small snack like a banana 30–45 minutes before is fine.' },
  { question: 'Can I warm up alone before a team match?', answer: 'Yes. If your team warm-up is short, arrive 10 minutes early and do your own dynamic stretching and light jog beforehand. Elite players often have personal pre-match routines that complement the team warm-up.' },
  { question: 'What is the FIFA 11+ warm-up?', answer: 'FIFA 11+ is a structured injury prevention warm-up developed by FIFA medical researchers. It takes 20 minutes and has been shown to reduce football injuries by up to 50% in amateur players. It covers running, strength, balance, and agility — we\'ve based our routine on its principles.' },
]

const PHASES = [
  {
    phase: 'Phase 1',
    label: 'General warm-up',
    duration: '5 minutes',
    color: 'border-blue-500/40',
    badge: 'bg-blue-500/20 text-blue-400',
    drills: [
      { name: 'Jog across the pitch', sets: '2 lengths', tip: 'Keep it easy — this just raises your heart rate.' },
      { name: 'Side shuffle', sets: '2 lengths each way', tip: 'Stay low, feet shoulder-width apart.' },
      { name: 'Backwards jog', sets: '2 lengths', tip: 'Look over your shoulder — practises spatial awareness.' },
    ],
  },
  {
    phase: 'Phase 2',
    label: 'Dynamic stretching',
    duration: '6 minutes',
    color: 'border-yellow-500/40',
    badge: 'bg-yellow-500/20 text-yellow-400',
    drills: [
      { name: 'High knees', sets: '2 × 20m', tip: 'Drive your arms. This activates hip flexors and calves.' },
      { name: 'Heel flicks', sets: '2 × 20m', tip: 'Kick your heels to your glutes. Warms up hamstrings.' },
      { name: 'Leg swings (front/back)', sets: '10 each leg', tip: 'Hold a post for balance. Swing through full range.' },
      { name: 'Hip circles', sets: '10 each direction', tip: 'Slow and controlled. Key for groin and hip mobility.' },
      { name: 'Arm circles', sets: '10 each direction', tip: 'Shoulder warm-up — essential for goalkeepers.' },
    ],
  },
  {
    phase: 'Phase 3',
    label: 'Muscle activation',
    duration: '5 minutes',
    color: 'border-orange-500/40',
    badge: 'bg-orange-500/20 text-orange-400',
    drills: [
      { name: 'Glute bridges', sets: '2 × 10 reps', tip: 'Slow and squeeze at the top. Activates glutes and reduces hamstring injury risk.' },
      { name: 'Single-leg balance', sets: '30 sec each leg', tip: 'Close your eyes to make it harder. Activates stabilisers.' },
      { name: 'Lateral lunges', sets: '2 × 8 each side', tip: 'Keep your chest up. Targets groin and inner thigh.' },
    ],
  },
  {
    phase: 'Phase 4',
    label: 'Football-specific',
    duration: '4 minutes',
    color: 'border-brand-500/40',
    badge: 'bg-brand-500/20 text-brand-400',
    drills: [
      { name: 'Short passing pairs (10m)', sets: '2 minutes', tip: 'First touch and pass. Gets your technical feel sharp.' },
      { name: '3 × sprint accelerations (50%→75%→90%)', sets: '3 reps', tip: 'Build up gradually — never sprint flat out cold.' },
      { name: 'Jump and header', sets: '5 reps', tip: 'Simulates aerial duels. Gets your neck muscles ready.' },
    ],
  },
]

export default function PreMatchWarmUpPage() {
  const schema = buildArticleSchema({
    title: 'The Perfect Pre-Match Warm-Up Routine for Footballers',
    description: 'A science-backed 20-minute pre-match warm-up routine for footballers.',
    canonical: 'https://goaltify.com/academy/training/pre-match-warm-up-routine',
    publishedAt: '2026-05-10',
  })

  return (
    <div className="container-site py-8 max-w-4xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-5">
        <Link href="/" className="hover:text-gray-300">Home</Link>
        <span>/</span>
        <Link href="/academy" className="hover:text-gray-300">Academy</Link>
        <span>/</span>
        <Link href="/academy/training" className="hover:text-gray-300">Training</Link>
        <span>/</span>
        <span className="text-gray-400">Pre-match warm-up</span>
      </nav>

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-medium text-brand-400 bg-brand-500/10 border border-brand-500/20 px-2.5 py-1 rounded-full">Training</span>
          <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">All levels · 6 min read</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-3">
          The Perfect Pre-Match Warm-Up Routine for Footballers
        </h1>
        <p className="text-gray-400 leading-relaxed">
          A proper warm-up reduces injury risk by up to 50% and measurably improves your first-half performance. Most amateur players do far too little — a light jog and a few toe touches won't cut it. Here's the exact 20-minute routine we recommend at Goaltify, based on FIFA 11+ research.
        </p>
        <p className="text-xs text-gray-500 mt-3">By Goaltify Academy · Updated 10 May 2026</p>
      </div>

      {/* Quick answer */}
      <div className="card border-l-2 border-l-brand-500 p-5 mb-8">
        <p className="text-sm font-semibold text-white mb-1">⚡ The 20-minute structure</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {['5 min — General warm-up', '6 min — Dynamic stretching', '5 min — Muscle activation', '4 min — Football-specific'].map(s => (
            <span key={s} className="text-xs bg-gray-800 text-gray-300 px-3 py-1 rounded-full">{s}</span>
          ))}
        </div>
      </div>

      {/* Phases */}
      <div className="space-y-5 mb-10">
        {PHASES.map((p, i) => (
          <div key={i} className={`card border-l-2 ${p.color} p-5`}>
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${p.badge}`}>{p.phase}</span>
              <h2 className="text-base font-bold text-white">{p.label}</h2>
              <span className="ml-auto text-xs text-gray-500">{p.duration}</span>
            </div>
            <div className="space-y-3">
              {p.drills.map((d, j) => (
                <div key={j} className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 border-b border-gray-800 pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <span className="w-5 h-5 rounded-full bg-gray-800 flex items-center justify-center text-xs text-gray-400 shrink-0">{j + 1}</span>
                    <div>
                      <p className="text-sm font-medium text-white">{d.name}</p>
                      <p className="text-xs text-gray-500">{d.sets}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 sm:max-w-[240px] leading-relaxed pl-7 sm:pl-0">{d.tip}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Key principles */}
      <div className="card p-6 mb-8">
        <h2 className="text-lg font-bold text-white mb-4">3 rules that make warm-ups actually work</h2>
        <div className="space-y-4">
          {[
            { rule: 'Never static stretch before a match', detail: 'Holding stretches for 30+ seconds temporarily reduces muscle power. Save it for post-match. Before kick-off, everything should be dynamic and movement-based.' },
            { rule: 'Build intensity gradually', detail: 'Your sprint accelerations at the end should reach 90% — not 100%. Going flat out cold is when hamstrings get pulled. The warm-up\'s job is to prepare you for that 100% moment in the match.' },
            { rule: 'Make it consistent', detail: 'Elite players follow the same warm-up every match. This creates a mental trigger — by the time you\'ve finished, your brain is in match mode automatically.' },
          ].map((r, i) => (
            <div key={i} className="flex gap-3">
              <span className="text-brand-400 font-bold text-sm shrink-0">{i + 1}.</span>
              <div>
                <p className="text-sm font-semibold text-white mb-1">{r.rule}</p>
                <p className="text-xs text-gray-400 leading-relaxed">{r.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Internal links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        <Link href="/academy/training/speed-training-drills" className="card p-4 hover:border-gray-700 transition-colors group">
          <p className="text-xs text-brand-400 mb-1">⚡ Next guide</p>
          <p className="text-sm font-medium text-white group-hover:text-brand-400">Speed training drills →</p>
        </Link>
        <Link href="/academy/training/injury-prevention-for-footballers" className="card p-4 hover:border-gray-700 transition-colors group">
          <p className="text-xs text-brand-400 mb-1">🩺 Related</p>
          <p className="text-sm font-medium text-white group-hover:text-brand-400">Injury prevention guide →</p>
        </Link>
      </div>

      <FAQSection faqs={FAQS} />
    </div>
  )
}
