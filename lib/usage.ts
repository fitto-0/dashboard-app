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
  if (!userId) return { viewed: 0, limit: DAILY_LIMIT }
  const all = readAll()
  const user = all[userId] || {}
  const viewed = user[todayKey()] || 0
  return { viewed, limit: DAILY_LIMIT }
}

export function incrementUsage(userId: string, delta = 1) {
  const all = readAll()
  if (!all[userId]) all[userId] = {}
  const key = todayKey()
  all[userId][key] = (all[userId][key] || 0) + delta
  writeAll(all)
  return { viewed: all[userId][key], limit: DAILY_LIMIT }
}

export function resetUsageForUser(userId: string) {
  const all = readAll()
  if (all[userId]) delete all[userId]
  writeAll(all)
}
