import { NextResponse } from 'next/server'
import { getLiveMatches, getTodayMatches } from '@/lib/api-football'

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type') ?? 'today'

  try {
    const matches = type === 'live'
      ? await getLiveMatches()
      : await getTodayMatches()

    return NextResponse.json(
      { matches, updatedAt: new Date().toISOString() },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      }
    )
  } catch {
    return NextResponse.json({ matches: [], error: 'Failed to fetch scores' }, { status: 500 })
  }
}
