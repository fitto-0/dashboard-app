import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { sampleContacts } from '@/data/sample'
import { getUsage } from '@/lib/usage'

function todayKey() {
  const d = new Date()
  return d.toISOString().slice(0, 10)
}

function seededShuffle(array: any[], seed: string) {
  const arr = [...array]
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i)
    hash |= 0
  }
  let rng = Math.abs(hash) % 1000000

  for (let i = arr.length - 1; i > 0; i--) {
    rng = (rng * 9301 + 49297) % 233280
    const j = (rng / 233280) * (i + 1) >> 0
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export async function GET(request: Request) {
  const { userId } = auth()

  // If no user, return 401
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Return exactly 50 contacts per user per day, deterministically randomized
  const seed = `${userId}-${todayKey()}`
  const shuffled = seededShuffle(sampleContacts, seed)
  const contactsToReturn = shuffled.slice(0, 50)

  const usage = getUsage(userId)
  return NextResponse.json({ contacts: contactsToReturn, usage, total: sampleContacts.length })
}
