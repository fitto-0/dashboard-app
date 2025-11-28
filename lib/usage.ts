import fs from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')
const USAGE_FILE = path.join(DATA_DIR, 'usage.json')
const DAILY_LIMIT = 50

function ensureFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
  if (!fs.existsSync(USAGE_FILE)) fs.writeFileSync(USAGE_FILE, JSON.stringify({}), 'utf8')
}

function readAll() {
  ensureFile()
  try {
    const raw = fs.readFileSync(USAGE_FILE, 'utf8')
    return JSON.parse(raw || '{}')
  } catch (e) {
    return {}
  }
}

function writeAll(data: Record<string, Record<string, number>>) {
  ensureFile()
  fs.writeFileSync(USAGE_FILE, JSON.stringify(data, null, 2), 'utf8')
}

function todayKey() {
  const d = new Date()
  return d.toISOString().slice(0, 10)
}

export function getUsage(userId: string | null) {
  if (!userId) return { viewed: 0, limit: DAILY_LIMIT, viewedContactIds: [], viewedContacts: [] }
  const all = readAll()
  const user = all[userId] || {}
  const key = todayKey()
  const userData = user[key] || {}
  
  return { 
    viewed: userData.count || 0, 
    limit: DAILY_LIMIT,
    viewedContactIds: userData.contactIds || [],
    viewedContacts: userData.viewedContacts || []
  }
}

export function addViewedContact(userId: string, contactId: string, contactData?: { firstName?: string; lastName?: string; email?: string }) {
  const all = readAll()
  if (!all[userId]) all[userId] = {}
  const key = todayKey()
  
  if (!all[userId][key]) {
    all[userId][key] = { count: 0, contactIds: [], viewedContacts: [] }
  }
  
  const userData = all[userId][key]
  
  // Only increment if this is a new contact
  if (!userData.contactIds.includes(contactId)) {
    userData.contactIds.push(contactId)
    userData.count = userData.contactIds.length
    
    // Store contact metadata for activity feed
    if (contactData) {
      const name = `${contactData.firstName || ''} ${contactData.lastName || ''}`.trim()
      userData.viewedContacts.push({
        id: contactId,
        name,
        email: contactData.email || '',
        viewedAt: new Date().toISOString()
      })
    }
  }
  
  writeAll(all)
  return { viewed: userData.count, limit: DAILY_LIMIT, viewedContactIds: userData.contactIds, viewedContacts: userData.viewedContacts }
}

export function resetUsageForUser(userId: string) {
  const all = readAll()
  if (all[userId]) delete all[userId]
  writeAll(all)
}
