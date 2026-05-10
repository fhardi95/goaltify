import type { Metadata } from 'next'
import { LiveScoresFeed } from '@/components/scores/LiveScoresFeed'

export const metadata: Metadata = {
  title: 'Live Football Scores Today — World Cup, Premier League, Euros',
  description:
    'Live football scores updated every 60 seconds. Follow the World Cup, Euro Championship, Premier League, Champions League and more on Goaltify.',
  keywords: ['live football scores', 'live scores today', 'World Cup live', 'Premier League scores'],
}

export default function LiveScoresPage() {
  return (
    <div className="container-site py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">Live football scores</h1>
        <p className="text-gray-400 text-sm">
          All today's matches updated every 60 seconds · times shown in UK time
        </p>
      </div>
      <LiveScoresFeed />
    </div>
  )
}
