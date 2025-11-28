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
      
      // Load usage from localStorage (works on Vercel)
      const today = new Date().toISOString().slice(0, 10)
      const storageKey = `contacts_viewed_${today}`
      const viewedContactIds = JSON.parse(localStorage.getItem(storageKey) || '[]')
      
      const usage = {
        viewed: viewedContactIds.length,
        limit: 50,
        viewedContactIds,
        viewedContacts: []
      }
      
      setUsage(usage)
      try {
        window.dispatchEvent(new CustomEvent('usage:update', { detail: usage }))
      } catch (e) {
        // ignore
      }
      
      if (json.total) setTotal(json.total)
      setShowUpgrade(viewedContactIds.length >= 50)
      setLoading(false)
    }

    loadContacts()
  }, [])

  const trackContactView = async (contact: any) => {
    // Show the detail modal
    setSelectedContact(contact)
    
    // Track the view using localStorage (works on Vercel)
    try {
      const today = new Date().toISOString().slice(0, 10)
      const storageKey = `contacts_viewed_${today}`
      const existing = JSON.parse(localStorage.getItem(storageKey) || '[]')
      
      if (!existing.includes(contact.id)) {
        existing.push(contact.id)
        localStorage.setItem(storageKey, JSON.stringify(existing))
      }
      
      const newUsage = {
        viewed: existing.length,
        limit: 50,
        viewedContactIds: existing,
        viewedContacts: []
      }
      
      setUsage(newUsage)
      try {
        window.dispatchEvent(new CustomEvent('usage:update', { detail: newUsage }))
      } catch (e) {
        // ignore
      }
      
      if (newUsage.viewed >= 50) {
        setShowUpgrade(true)
      }
    } catch (e) {
      console.error('Tracking error:', e)
    }
  }

  const handleCloseModal = () => {
    setSelectedContact(null)
    // Refresh from localStorage
    const today = new Date().toISOString().slice(0, 10)
    const storageKey = `contacts_viewed_${today}`
    const viewedContactIds = JSON.parse(localStorage.getItem(storageKey) || '[]')
    
    const updatedUsage = {
      viewed: viewedContactIds.length,
      limit: 50,
      viewedContactIds,
      viewedContacts: []
    }
    
    try {
      window.dispatchEvent(new CustomEvent('usage:update', { detail: updatedUsage }))
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
