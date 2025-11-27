import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { getUsage, incrementUsage } from '@/lib/usage'

export async function GET(request: Request) {
  const { userId } = auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const usage = getUsage(userId)
  return NextResponse.json(usage)
}

export async function POST(request: Request) {
  const { userId } = auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await request.json().catch(() => ({}))
  const delta = typeof body.increment === 'number' ? body.increment : 1
  const updated = incrementUsage(userId, delta)
  return NextResponse.json(updated)
}
