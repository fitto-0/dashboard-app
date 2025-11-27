import fs from 'fs'
import path from 'path'

function parseCSV(csv: string) {
  const rows: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < csv.length; i++) {
    const ch = csv[i]
    const next = csv[i + 1]

    if (ch === '"') {
      inQuotes = !inQuotes
      current += ch
      continue
    }

    if (ch === '\n' && !inQuotes) {
      rows.push(current)
      current = ''
      continue
    }

    current += ch
  }
  if (current) rows.push(current)

  return rows.map((r) => {
    // simple split on commas that respects quoted fields
    const values: string[] = []
    let val = ''
    let quoted = false
    for (let i = 0; i < r.length; i++) {
      const ch = r[i]
      if (ch === '"') {
        quoted = !quoted
        continue
      }
      if (ch === ',' && !quoted) {
        values.push(val)
        val = ''
        continue
      }
      val += ch
    }
    values.push(val)
    return values
  })
}

function rowsToObjects(rows: string[][]) {
  if (rows.length === 0) return []
  const header = rows[0].map((h) => h.trim())
  const out = []
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i]
    if (row.length === 1 && row[0].trim() === '') continue
    const obj: Record<string, string> = {}
    for (let j = 0; j < header.length; j++) {
      obj[header[j]] = (row[j] ?? '').trim()
    }
    out.push(obj)
  }
  return out
}

const dataDir = path.join(process.cwd(), 'data')

function loadCSVFile(filename: string) {
  const p = path.join(dataDir, filename)
  if (!fs.existsSync(p)) return []
  const raw = fs.readFileSync(p, 'utf8')
  const parsed = parseCSV(raw)
  return rowsToObjects(parsed)
}

const agenciesRaw = loadCSVFile('agencies_agency_rows.csv')
const contactsRaw = loadCSVFile('contacts_contact_rows.csv')

export const sampleAgencies = agenciesRaw.map((r, idx) => {
  return {
    id: r.id || `agency-${idx}`,
    name: r.name || r['domain_name'] || '',
    city: r.state || r.state_code || '',
    country: r.country || 'USA',
    phone: r.phone || '',
    email: r.domain_name ? `info@${r.domain_name}` : '',
    employees: r.total_students || '',
    established: r.created_at || '',
  }
})

export const sampleContacts = contactsRaw.map((r) => ({
  id: r.id || '',
  agencyId: r.agency_id || r.firm_id || '',
  firstName: r.first_name || r.firstName || '',
  lastName: r.last_name || r.lastName || '',
  position: r.title || r.position || '',
  email: r.email || '',
  phone: r.phone || '',
  department: r.department || '',
}))

