import { NextResponse } from 'next/server'

const BASE = 'https://v3.football.api-sports.io'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type') ?? 'today'

  const apiKey = process.env.FOOTBALL_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      { matches: [], error: 'FOOTBALL_API_KEY not set' },
      { status: 500 }
    )
  }

  const headers = {
    'x-apisports-key': apiKey,
  }

  try {
    let url: string
    if (type === 'live') {
      url = `${BASE}/fixtures?live=all`
    } else {
      const today = new Date().toISOString().split('T')[0]
      url = `${BASE}/fixtures?date=${today}`
    }

    const res = await fetch(url, { headers, cache: 'no-store' })

    if (!res.ok) {
      return NextResponse.json(
        { matches: [], error: `API returned ${res.status}` },
        { status: 500 }
      )
    }

    const data = await res.json()

    if (data.errors && Object.keys(data.errors).length > 0) {
      return NextResponse.json(
        { matches: [], error: data.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        matches: data.response ?? [],
        updatedAt: new Date().toISOString(),
        total: data.results ?? 0,
        remaining: res.headers.get('x-ratelimit-requests-remaining'),
        quota: res.headers.get('x-ratelimit-requests-limit'),
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      }
    )
  } catch (err) {
    return NextResponse.json(
      { matches: [], error: 'Failed to fetch scores' },
      { status: 500 }
    )
  }
}
