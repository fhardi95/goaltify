import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { WORLD_PLAYERS, getPlayerStats } from '@/lib/players'
import { buildMetadata, buildArticleSchema } from '@/lib/seo'
import { FAQSection } from '@/components/blog/FAQSection'

interface Props {
  params: Promise<{ slug: string }>
}

function findPlayer(slug: string) {
  return WORLD_PLAYERS.find(p => `${p.slug}-${p.id}` === slug || p.slug === slug)
}

export async function generateStaticParams() {
  return WORLD_PLAYERS.map(p => ({ slug: `${p.slug}-${p.id}` }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const player = findPlayer(slug)
  if (!player) return {}

  return buildMetadata({
    title: `${player.name} — Profile, Stats & Career | Goaltify`,
    description: `${player.name} full profile: career stats, club history, trophies, market value and everything you need to know about the ${player.nationality} ${player.position}.`,
    canonical: `https://www.goaltify.com/players/${player.slug}-${player.id}`,
    keywords: [player.name, `${player.name} stats`, `${player.name} career`, `${player.name} goals`, `${player.nationality} footballer`],
  })
}

export default async function PlayerPage({ params }: Props) {
  const { slug } = await params
  const player = findPlayer(slug)
  if (!player) notFound()

  // Try to get live stats from API (graceful fallback if no key)
  const liveData = await getPlayerStats(player.id)
  const liveStats = liveData?.statistics?.[0]

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: player.fullName,
    jobTitle: player.position,
    nationality: player.nationality,
    image: player.photo,
    url: `https://www.goaltify.com/players/${player.slug}-${player.id}`,
    memberOf: { '@type': 'SportsTeam', name: player.club },
    description: player.bio,
  }

  const faqs = [
    {
      question: `What position does ${player.name} play?`,
      answer: `${player.name} plays as a ${player.position} for ${player.club} and the ${player.nationality} national team.`,
    },
    {
      question: `How old is ${player.name}?`,
      answer: `${player.name} is ${player.age} years old. Born in ${new Date().getFullYear() - player.age}.`,
    },
    {
      question: `What trophies has ${player.name} won?`,
      answer: `${player.name} has won: ${player.trophies.join(', ')}.`,
    },
    {
      question: `What is ${player.name}'s market value?`,
      answer: `${player.name}'s estimated market value is ${player.marketValue} as of 2026.`,
    },
  ]

  const statItems = [
    { label: 'Season goals', value: liveStats?.goals?.total ?? player.stats.goals ?? '–', highlight: true },
    { label: 'Assists', value: liveStats?.goals?.assists ?? player.stats.assists ?? '–', highlight: false },
    { label: 'Appearances', value: liveStats?.games?.appearences ?? player.stats.appearances ?? '–', highlight: false },
    { label: 'Market value', value: player.marketValue, highlight: false },
    { label: 'Position', value: player.position, highlight: false },
    { label: 'Nationality', value: `${player.nationalityFlag} ${player.nationality}`, highlight: false },
  ]

  return (
    <div className="container-site py-8 max-w-4xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-5">
        <Link href="/" className="hover:text-gray-300">Home</Link><span>/</span>
        <Link href="/players" className="hover:text-gray-300">Players</Link><span>/</span>
        <span className="text-gray-400">{player.name}</span>
      </nav>

      {/* Hero */}
      <div className="card overflow-hidden mb-6">
        <div className="flex flex-col sm:flex-row gap-0">

          {/* Photo */}
          <div className="relative w-full sm:w-48 h-56 sm:h-auto shrink-0 bg-gradient-to-b from-gray-800 to-gray-900">
            <Image
              src={player.photo}
              alt={`${player.name} profile photo`}
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 100vw, 192px"
              priority
            />
          </div>

          {/* Info */}
          <div className="p-5 flex-1">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{player.nationalityFlag}</span>
                  <span className="text-xs text-gray-500">{player.nationality} · {player.position}</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">{player.name}</h1>
                <p className="text-sm text-gray-400 mt-0.5">{player.fullName}</p>
              </div>
              <div className="text-right shrink-0">
                <div className="flex items-center gap-2 justify-end mb-1">
                  {player.clubLogo && (
                    <Image src={player.clubLogo} alt={player.club} width={24} height={24} className="object-contain" />
                  )}
                </div>
                <p className="text-xs font-medium text-white">{player.club}</p>
                <p className="text-xs text-gray-500">Age {player.age}</p>
              </div>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed mb-4">{player.bio}</p>

            {/* Trophies */}
            <div className="flex flex-wrap gap-1.5">
              {player.trophies.map(t => (
                <span key={t} className="text-xs bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-2 py-0.5 rounded-full">
                  🏆 {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

        {/* Stats */}
        <div className="lg:col-span-2">
          <h2 className="text-base font-bold text-white mb-3">Career stats</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {statItems.map(s => (
              <div key={s.label} className="card p-4 text-center">
                <p className={`text-2xl font-bold mb-1 ${s.highlight ? 'text-brand-400' : 'text-white'}`}>{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Key facts */}
          <div className="card p-5 mt-4">
            <h2 className="text-sm font-bold text-white mb-3">Key facts</h2>
            <ul className="space-y-2">
              {player.keyFacts.map((fact, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-300">
                  <span className="text-brand-400 shrink-0 mt-0.5">→</span>
                  {fact}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          <div className="card p-4">
            <h3 className="text-sm font-semibold text-white mb-3">More top players</h3>
            <div className="space-y-2">
              {WORLD_PLAYERS.filter(p => p.id !== player.id).slice(0, 6).map(p => (
                <Link key={p.id} href={`/players/${p.slug}-${p.id}`} className="flex items-center gap-2 group py-1 border-b border-gray-800 last:border-0">
                  <Image src={p.photo} alt={p.name} width={28} height={28} className="rounded-full object-cover shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-white group-hover:text-brand-400 transition-colors">{p.name}</p>
                    <p className="text-[10px] text-gray-600">{p.club}</p>
                  </div>
                </Link>
              ))}
            </div>
            <Link href="/players" className="block text-center text-xs text-brand-400 hover:text-brand-300 mt-3">All top 20 players →</Link>
          </div>

          <div className="card p-4">
            <h3 className="text-sm font-semibold text-white mb-2">📊 Tools</h3>
            <div className="space-y-1.5">
              <Link href="/tools/calculators/xg-calculator" className="block text-xs text-gray-400 hover:text-brand-400 py-1 border-b border-gray-800">xG Calculator →</Link>
              <Link href="/tools/formations" className="block text-xs text-gray-400 hover:text-brand-400 py-1">Formation builder →</Link>
            </div>
          </div>
        </aside>
      </div>

      <FAQSection faqs={faqs} />
    </div>
  )
}
