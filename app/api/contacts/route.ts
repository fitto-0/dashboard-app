import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { sampleContacts, contactsRawData } from '@/data/sample'
import { getUsage, addViewedContact } from '@/lib/usage'

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

  // Also include the full raw data for each contact
  const contactsWithFullData = contactsToReturn.map(contact => {
    const fullData = contactsRawData.find(raw => raw.id === contact.id) || {}
    return {
      ...contact,
      ...fullData
    }
  })

  const usage = getUsage(userId)
  const canViewMore = usage.viewed < usage.limit
  
  return NextResponse.json({ 
    contacts: contactsWithFullData, 
    usage, 
    total: sampleContacts.length,
    canViewMore
  })
}

export async function POST(request: Request) {
  const { userId } = auth()

  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await request.json()
    const { contactId, firstName, lastName, email } = body

    if (!contactId) {
      return NextResponse.json({ error: 'contactId required' }, { status: 400 })
    }

    const usage = addViewedContact(userId, contactId, { firstName, lastName, email })
    
    return NextResponse.json({ 
      success: true, 
      usage,
      limitReached: usage.viewed >= usage.limit
    })
  } catch (e) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
