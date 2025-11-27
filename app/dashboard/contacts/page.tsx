"use client"

import { useState, useEffect } from 'react'
import DataTable from '@/components/DataTable'
import UpgradePrompt from '@/components/UpgradePrompt'
import UsageTracker from '@/components/UsageTracker'
import LoadingSpinner from '@/components/LoadingSpinner'

const columns = [
  { key: 'firstName', label: 'First Name', sortable: true },
  { key: 'lastName', label: 'Last Name', sortable: true },
  { key: 'position', label: 'Position' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
]

export default function ContactsPage() {
  const [contacts, setContacts] = useState<any[] | null>(null)
  const [usage, setUsage] = useState({ viewed: 0, limit: 50 })
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [showUpgrade, setShowUpgrade] = useState(false)

  useEffect(() => {
    async function loadContacts() {
      setLoading(true)
      const res = await fetch('/api/contacts')
      if (res.status === 401) {
        setLoading(false)
        return
      }
      const json = await res.json()
      setContacts(json.contacts || [])
      if (json.usage) setUsage(json.usage)
      if (json.total) setTotal(json.total)
      setLoading(false)
    }

    loadContacts()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Contacts</h2>
        <UsageTracker userId={''} />
      </div>

      {loading && <LoadingSpinner />}

      {!loading && showUpgrade && <UpgradePrompt />}

      {!loading && !showUpgrade && contacts && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-600">Showing 50 of {total} available contacts (changes daily)</p>
            {total > 50 && (
              <button 
                onClick={() => setShowUpgrade(true)}
                className="btn-primary text-sm"
              >
                Upgrade to see more
              </button>
            )}
          </div>
          <DataTable data={contacts} columns={columns} />
        </div>
      )}
    </div>
  )
}
