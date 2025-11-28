"use client"

import { useState, useEffect } from 'react'
import DataTable from '@/components/DataTable'
import UpgradePrompt from '@/components/UpgradePrompt'
import UsageTracker from '@/components/UsageTracker'
import LoadingSpinner from '@/components/LoadingSpinner'
import ContactDetailModal from '@/components/ContactDetailModal'

const columns = [
  { key: 'firstName', label: 'First Name', sortable: true },
  { key: 'lastName', label: 'Last Name', sortable: true },
  { key: 'position', label: 'Position' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
]

export default function ContactsPage() {
  const [contacts, setContacts] = useState<any[] | null>(null)
  const [usage, setUsage] = useState({ viewed: 0, limit: 50, viewedContactIds: [] })
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [showUpgrade, setShowUpgrade] = useState(false)
  const [selectedContact, setSelectedContact] = useState<Record<string, string> | null>(null)

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
      if (json.usage) {
        setUsage(json.usage)
        try {
          window.dispatchEvent(new CustomEvent('usage:update', { detail: json.usage }))
        } catch (e) {
          // ignore environments without window
        }
      }
      if (json.total) setTotal(json.total)
      setShowUpgrade(json.usage?.viewed >= json.usage?.limit)
      setLoading(false)
    }

    loadContacts()
  }, [])

  const trackContactView = async (contact: any) => {
    // Show the detail modal
    setSelectedContact(contact)
    
    // Track the view
    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          contactId: contact.id,
          firstName: contact.firstName,
          lastName: contact.lastName,
          email: contact.email
        })
      })
      if (res.ok) {
        const data = await res.json()
          setUsage(data.usage)
          try {
            window.dispatchEvent(new CustomEvent('usage:update', { detail: data.usage }))
          } catch (e) {
            // ignore
          }
        if (data.limitReached) {
          setShowUpgrade(true)
        }
      }
    } catch (e) {
      // silently ignore tracking errors
    }
  }

  const handleCloseModal = () => {
    setSelectedContact(null)
    // Dispatch update event when modal closes so tracker updates
    try {
      window.dispatchEvent(new CustomEvent('usage:update', { detail: usage }))
    } catch (e) {
      // ignore
    }
  }

  return (
    <div className="space-y-6 bg-white dark:bg-primary-900 rounded-xl p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contacts</h2>
        <UsageTracker userId={''} />
      </div>

      {loading && <LoadingSpinner />}

      {!loading && showUpgrade && <UpgradePrompt />}

      {!loading && !showUpgrade && contacts && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              You can view <strong>{usage.limit - usage.viewed} unique contacts</strong> remaining today. 
              You can view the same contact multiple times (changes daily).
            </p>
            {total > 50 && (
              <button 
                onClick={() => setShowUpgrade(true)}
                className="btn-primary text-sm"
              >
                Upgrade to see more
              </button>
            )}
          </div>
          <DataTable 
            data={contacts} 
            columns={columns}
            onRowClick={trackContactView}
          />
        </div>
      )}

      <ContactDetailModal 
        contact={selectedContact}
        onClose={handleCloseModal}
      />
    </div>
  )
}
