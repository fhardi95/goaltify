import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    hasKey: !!process.env.FOOTBALL_API_KEY,
    keyLength: process.env.FOOTBALL_API_KEY?.length ?? 0,
    first4: process.env.FOOTBALL_API_KEY?.slice(0, 4) ?? 'none',
  })
}
