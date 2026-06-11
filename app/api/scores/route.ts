import { NextResponse } from 'next/server'
import { getTodayMatches, getLiveMatches } from '@/lib/api-football'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type') ?? 'today'

  if (!process.env.FOOTBALL_DATA_API_KEY) {
    return NextResponse.json(
      { matches: [], error: 'FOOTBALL_DATA_API_KEY not set' },
      { status: 500 }
    )
  }

  try {
    const matches = type === 'live'
      ? await getLiveMatches()
      : await getTodayMatches()

    return NextResponse.json(
      {
        matches,
        updatedAt: new Date().toISOString(),
        total: matches.length,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      }
    )
  } catch (err) {
    console.error('[scores] fetch error:', err)
    return NextResponse.json(
      { matches: [], error: 'Failed to fetch scores' },
      { status: 500 }
    )
  }
}
