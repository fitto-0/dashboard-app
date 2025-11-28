import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { getUsage } from '@/lib/usage'

export async function GET(request: Request) {
  const { userId } = auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const usage = getUsage(userId)
  return NextResponse.json(usage)
}
