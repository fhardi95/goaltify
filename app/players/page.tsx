import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { WORLD_PLAYERS } from '@/lib/players'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Top 20 Best Football Players in the World 2026',
  description: 'The top 20 best football players in the world right now. Stats, profiles and career highlights for Haaland, Mbappé, Vinícius Jr., Bellingham and more on Goaltify.',
  canonical: 'https://www.goaltify.com/players',
  keywords: ['best football players in the world', 'top 20 footballers 2026', 'best players 2025/26', 'world football rankings'],
})

const POSITIONS = ['All', 'Striker', 'Forward', 'Left Winger', 'Right Winger', 'Midfielder', 'Attacking Midfielder', 'Central Midfielder', 'Defensive Midfielder']

export default function PlayersPage() {
  return (
    <div className="container-site py-8">
      {/* SEO-optimised header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-medium text-brand-400 bg-brand-500/10 border border-brand-500/20 px-2.5 py-1 rounded-full">
            ⭐ World Rankings · Updated 2026
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Top 20 Best Football Players in the World
        </h1>
        <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
          The definitive ranking of the world's best footballers in 2026. From Erling Haaland's relentless goalscoring to Vinícius Jr.'s electrifying dribbling — full profiles, career stats and what makes each player special.
        </p>
      </div>

      {/* Player grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-10">
        {WORLD_PLAYERS.map((player, idx) => (
          <Link
            key={player.id}
            href={`/players/${player.slug}-${player.id}`}
            className="card p-4 hover:border-gray-600 transition-all group hover:scale-[1.02] hover:shadow-lg hover:shadow-brand-500/10"
          >
            {/* Rank badge */}
            <div className="relative mb-3">
              <div className="w-full aspect-square rounded-xl overflow-hidden bg-gray-800">
                <Image
                  src={player.photo}
                  alt={`${player.name} — ${player.position}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                />
              </div>
              <div className={`absolute top-2 left-2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${
                idx === 0 ? 'bg-yellow-500' : idx === 1 ? 'bg-gray-400' : idx === 2 ? 'bg-amber-600' : 'bg-gray-700'
              }`}>
                {idx + 1}
              </div>
              <div className="absolute top-2 right-2 text-lg">{player.nationalityFlag}</div>
            </div>

            {/* Info */}
            <h2 className="text-sm font-bold text-white group-hover:text-brand-400 transition-colors leading-tight mb-1">
              {player.name}
            </h2>
            <p className="text-xs text-gray-500 mb-1">{player.position}</p>
            <p className="text-xs text-gray-600">{player.club}</p>

            {/* Key stat */}
            {player.stats.goals && (
              <div className="mt-2 pt-2 border-t border-gray-800 flex justify-between">
                <span className="text-[10px] text-gray-600">Goals</span>
                <span className="text-[10px] font-bold text-brand-400">{player.stats.goals}</span>
              </div>
            )}
          </Link>
        ))}
      </div>

      {/* SEO content block */}
      <div className="card p-6 mb-8">
        <h2 className="text-lg font-bold text-white mb-3">The best footballers in the world right now</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400 leading-relaxed">
          <p>
            Erling Haaland leads the conversation with his historic Premier League performances. The Norwegian striker broke records that stood for decades and shows no sign of slowing down in 2025/26.
          </p>
          <p>
            Kylian Mbappé's move to Real Madrid was the transfer story of 2024, while Jude Bellingham has cemented himself as Europe's most complete midfielder before his 22nd birthday.
          </p>
          <p>
            Vinícius Jr.'s Ballon d'Or win in 2024 confirmed what football fans had seen for three seasons — the Brazilian winger is the most electrifying player on the planet when at his best.
          </p>
          <p>
            Rodri's influence on Manchester City and the Spanish national team is unrivalled in defensive midfield. His ability to control tempo and still contribute goals makes him uniquely valuable.
          </p>
        </div>
      </div>

      {/* Related links */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 PL Top Scorers', href: '/competitions/premier-league/top-players' },
          { label: '🇪🇸 La Liga Top Scorers', href: '/competitions/la-liga/top-players' },
          { label: '🇩🇪 Bundesliga Top Scorers', href: '/competitions/bundesliga/top-players' },
          { label: '🇮🇹 Serie A Top Scorers', href: '/competitions/serie-a/top-players' },
        ].map(l => (
          <Link key={l.href} href={l.href} className="card p-3 hover:border-gray-700 text-center group transition-colors">
            <p className="text-xs font-medium text-gray-300 group-hover:text-brand-400 transition-colors">{l.label}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
