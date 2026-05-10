import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSection } from '@/components/blog/FAQSection'
import { buildMetadata, buildArticleSchema } from '@/lib/seo'

const SLUG = 'how-to-dribble-past-a-defender'
const CANONICAL = `https://goaltify.com/academy/dribbling/${SLUG}`

export const metadata: Metadata = buildMetadata({
  title: 'How to Dribble Past a Defender: 7 Techniques Used by Elite Players',
  description: 'Learn how to dribble past a defender using 7 proven techniques from elite football. Step-by-step breakdowns of the stepover, body feint, La Croqueta and more.',
  canonical: CANONICAL,
  keywords: ['how to dribble past a defender', 'dribbling techniques football', 'football skills', 'how to beat a defender'],
})

const FAQS = [
  { question: 'What is the most effective dribbling technique for beginners?', answer: 'The body feint is the best starting point for beginners. It requires no special footwork — just a convincing shift of your body weight in one direction before driving past the defender the other way. Master this before moving to more complex moves.' },
  { question: 'How do I know when to dribble vs pass?', answer: 'Dribble when you have space in front of you, when a 1v1 opportunity is clear, or when you\'re in wide areas with a defender isolated. Pass when you\'re under pressure, in your own half, or when a teammate is in a better position. Decision-making matters more than technique.' },
  { question: 'How long does it take to learn to dribble well?', answer: 'Most players see noticeable improvement within 4–6 weeks of consistent daily practice (15–20 minutes). The body feint and directional change can be usable within 2 weeks. Advanced moves like the Elastico take months to deploy reliably in a match.' },
  { question: 'What body part should I look at when dribbling?', answer: 'Look at the defender\'s hips, not their feet or the ball. Hips are harder to fake — they indicate where the defender\'s weight is committed. Once their hips shift, that\'s your trigger to go the other direction.' },
  { question: 'Is dribbling more about speed or skill?', answer: 'Skill over speed at lower levels, but at elite level you need both. Many world-class dribblers like Mané relied more on low centre of gravity and unpredictability than raw pace. A perfectly-timed body feint at walking pace can beat a fast defender every time.' },
]

const TECHNIQUES = [
  { num: 1, name: 'The body feint', difficulty: 'Beginner', icon: '🟢', desc: 'Drop your shoulder and shift your body weight convincingly in one direction, then explode past the defender on the other side. No complex footwork — just committed body language and a sudden change of direction.', tip: 'The key is commitment. A half-hearted shoulder drop fools nobody. Go fully in one direction.' },
  { num: 2, name: 'The stepover', difficulty: 'Beginner', icon: '🟢', desc: 'Circle your foot around the ball without touching it, mimicking a pass or shot. The defender reacts to your foot movement — you then push the ball in the opposite direction with your other foot.', tip: 'Speed matters. A slow stepover is readable. The faster and more convincing, the better.' },
  { num: 3, name: 'The directional change (cut)', difficulty: 'Beginner', icon: '🟢', desc: 'Push the ball diagonally forward to invite the defender to commit, then cut sharply inside or outside using the inside or outside of your foot. Simple, effective, used constantly at elite level.', tip: 'Let the defender get close before cutting. Too early and they recover easily.' },
  { num: 4, name: 'La Croqueta', difficulty: 'Intermediate', icon: '🟡', desc: 'Transfer the ball from one foot to the other in a smooth, horizontal movement — pulling it away just as the defender lunges. Made famous by Iniesta and Gavi. Works best in tight spaces.', tip: 'Keep the ball close to your feet. This move fails if the ball is more than 30cm away.' },
  { num: 5, name: 'The Cruyff turn', difficulty: 'Intermediate', icon: '🟡', desc: 'Shape as if to pass or shoot, then drag the ball back behind your standing leg with the inside of your foot and turn 180 degrees. Creates space when you\'re backed into a corner.', tip: 'The fake must be convincing. If the defender doesn\'t bite, the turn is too slow to work.' },
  { num: 6, name: 'The double stepover', difficulty: 'Advanced', icon: '🔴', desc: 'Two consecutive stepovers in opposite directions before pushing the ball past. Disorientates defenders by doubling the false information. Requires fast feet and good close control.', tip: 'Don\'t slow down between stepovers. The momentum of both movements creates the confusion.' },
  { num: 7, name: 'The speed burst (fake slow, go fast)', difficulty: 'Beginner', icon: '🟢', desc: 'Slow your pace deliberately to make the defender relax their defensive stance, then explosively accelerate past them. The most underrated dribbling technique at all levels — because it requires no footwork.', tip: 'This works because defenders sync to your pace. Break that sync with a sudden burst.' },
]

export default function DribblingGuidePage() {
  const schema = buildArticleSchema({
    title: 'How to Dribble Past a Defender: 7 Techniques Used by Elite Players',
    description: 'Learn how to dribble past a defender using 7 proven techniques from elite football.',
    canonical: CANONICAL,
    publishedAt: '2026-05-10',
  })

  return (
    <div className="container-site py-8 max-w-4xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-5">
        <Link href="/" className="hover:text-gray-300">Home</Link>
        <span>/</span>
        <Link href="/academy" className="hover:text-gray-300">Academy</Link>
        <span>/</span>
        <span className="text-gray-400">Dribbling</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-medium text-brand-400 bg-brand-500/10 border border-brand-500/20 px-2.5 py-1 rounded-full">Skills</span>
          <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">Beginner → Advanced</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-3">
          How to Dribble Past a Defender: 7 Techniques Used by Elite Players
        </h1>
        <p className="text-gray-400 text-base leading-relaxed">
          The quickest way to beat a defender is to shift their body weight in the wrong direction. Every technique on this list does exactly that — through footwork, body language, or pace change. Master one, and defenders will respect you. Master three, and you become unpredictable.
        </p>
        <div className="flex items-center gap-3 text-xs text-gray-500 mt-4 pt-4 border-t border-gray-800">
          <span>By Goaltify Academy</span>
          <span>·</span>
          <span>8 min read</span>
          <span>·</span>
          <span>Updated 10 May 2026</span>
        </div>
      </div>

      {/* Quick answer box — front-loaded for AI citation */}
      <div className="card border-l-2 border-l-brand-500 p-5 mb-8">
        <p className="text-sm font-semibold text-white mb-1">⚡ The quick answer</p>
        <p className="text-sm text-gray-300 leading-relaxed">
          To dribble past a defender, shift their body weight with a convincing fake (body feint, stepover, or pace change), then explosively go the other direction before they recover. The body feint is the most reliable technique at any level. Look at the defender's hips — when they shift, that's your go signal.
        </p>
      </div>

      {/* Technique cards */}
      <h2 className="text-xl font-bold text-white mb-4">The 7 techniques</h2>
      <div className="space-y-4 mb-10">
        {TECHNIQUES.map(t => (
          <div key={t.num} className="card p-5">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-sm font-bold text-white shrink-0">{t.num}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base font-semibold text-white">{t.name}</h3>
                  <span className="text-xs text-gray-500">{t.icon} {t.difficulty}</span>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed mb-3">{t.desc}</p>
                <div className="flex items-start gap-2 bg-gray-800/50 rounded-lg p-3">
                  <span className="text-brand-400 text-xs font-semibold shrink-0 mt-0.5">PRO TIP</span>
                  <p className="text-xs text-gray-300 leading-relaxed">{t.tip}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Training drill */}
      <div className="card p-6 mb-8">
        <h2 className="text-lg font-bold text-white mb-3">🏃 15-minute daily practice drill</h2>
        <div className="space-y-3">
          {[
            { time: '0–5 min', label: 'Slow technique work', desc: 'Pick one move. Repeat at half speed focusing on form — no pressure.' },
            { time: '5–10 min', label: 'Speed reps', desc: 'Same move at full speed, both feet. 20 reps each side.' },
            { time: '10–15 min', label: 'Decision practice', desc: 'Use a cone as a "defender." Approach at match pace, decide left or right at the last second.' },
          ].map(d => (
            <div key={d.time} className="flex gap-3">
              <span className="text-xs font-medium text-brand-400 bg-brand-500/10 px-2 py-1 rounded shrink-0 h-fit">{d.time}</span>
              <div>
                <p className="text-sm font-medium text-white">{d.label}</p>
                <p className="text-xs text-gray-400">{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Internal links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        <Link href="/academy/training/pre-match-warm-up-routine" className="card p-4 hover:border-gray-700 transition-colors group">
          <p className="text-xs text-brand-400 mb-1">Training</p>
          <p className="text-sm font-medium text-white group-hover:text-brand-400 transition-colors">Pre-match warm-up routine →</p>
        </Link>
        <Link href="/academy/tactics/4-3-3-formation-guide" className="card p-4 hover:border-gray-700 transition-colors group">
          <p className="text-xs text-brand-400 mb-1">Tactics</p>
          <p className="text-sm font-medium text-white group-hover:text-brand-400 transition-colors">4-3-3 formation guide →</p>
        </Link>
      </div>

      <FAQSection faqs={FAQS} />
    </div>
  )
}
