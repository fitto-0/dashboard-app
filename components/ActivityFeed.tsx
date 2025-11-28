'use client'

import { useState, useEffect } from 'react'
import { Eye, Clock } from 'lucide-react'

interface ViewedContact {
  id: string
  name: string
  email: string
  viewedAt: string
}

interface ActivityFeedProps {
  userId: string
}

export default function ActivityFeed({ userId }: ActivityFeedProps) {
  const [viewedContacts, setViewedContacts] = useState<ViewedContact[]>([])

  useEffect(() => {
    async function fetchUsage() {
      try {
        const res = await fetch('/api/usage')
        if (res.ok) {
          const json = await res.json()
          setViewedContacts(json.viewedContacts || [])
        }
      } catch (e) {
        // ignore
      }
    }

    fetchUsage()
  }, [userId])

  // Listen for usage updates to refresh the activity feed
  useEffect(() => {
    function handleUsageUpdate(e: Event) {
      const ev = e as CustomEvent
      if (ev && ev.detail && ev.detail.viewedContacts) {
        // Reverse order to show most recent first
        setViewedContacts([...ev.detail.viewedContacts].reverse())
      }
    }

    window.addEventListener('usage:update', handleUsageUpdate as EventListener)
    return () => {
      window.removeEventListener('usage:update', handleUsageUpdate as EventListener)
    }
  }, [])

  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString)
      const now = new Date()
      const diffMs = now.getTime() - date.getTime()
      const diffMins = Math.floor(diffMs / 60000)

      if (diffMins < 1) return 'Just now'
      if (diffMins < 60) return `${diffMins}m ago`
      const diffHours = Math.floor(diffMins / 60)
      if (diffHours < 24) return `${diffHours}h ago`
      return date.toLocaleDateString()
    } catch {
      return 'Recently'
    }
  }

  if (viewedContacts.length === 0) {
    return (
      <div className="card p-6 bg-white dark:bg-primary-900 border border-gray-200 dark:border-primary-800">
        <div className="flex items-center gap-3 mb-4">
          <Eye className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Activity Feed</h3>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">No contacts viewed yet today</p>
      </div>
    )
  }

  return (
    <div className="card p-6 bg-white dark:bg-primary-900 border border-gray-200 dark:border-primary-800">
      <div className="flex items-center gap-3 mb-4">
        <Eye className="w-5 h-5 text-primary-600 dark:text-primary-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Activity Feed</h3>
      </div>

      <div className="space-y-3">
        {viewedContacts.map((contact, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-primary-800 border border-gray-200 dark:border-primary-700 hover:bg-gray-100 dark:hover:bg-primary-750 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-700 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-semibold text-primary-700 dark:text-primary-200">
                {contact.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {contact.name}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                {contact.email}
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
              <Clock className="w-3 h-3" />
              <span>{formatTime(contact.viewedAt)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
