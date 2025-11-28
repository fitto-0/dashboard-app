'use client'

import { X } from 'lucide-react'

interface ContactDetailModalProps {
  contact: Record<string, string> | null
  onClose: () => void
}

export default function ContactDetailModal({ contact, onClose }: ContactDetailModalProps) {
  if (!contact) return null

  const fields = Object.entries(contact)
    .filter(([, value]) => value) // Only show non-empty fields
    .map(([key, value]) => ({
      label: key
        .replace(/_/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
      value
    }))

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-primary-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-primary-800">
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-gray-200 dark:border-primary-800 bg-white dark:bg-primary-900">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {contact.first_name && contact.last_name 
              ? `${contact.first_name} ${contact.last_name}`
              : contact.firstName && contact.lastName
              ? `${contact.firstName} ${contact.lastName}`
              : 'Contact Details'}
          </h2>
          <button
            onClick={onClose}
            title="Close modal"
            className="p-2 hover:bg-gray-100 dark:hover:bg-primary-800 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {fields.map(({ label, value }) => (
            <div key={label} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 md:col-span-1">
                {label}
              </label>
              <div className="md:col-span-2 text-gray-900 dark:text-white break-words">
                {value.includes('@') ? (
                  <a
                    href={`mailto:${value}`}
                    className="text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    {value}
                  </a>
                ) : value.match(/^[\d\-\+\(\)\s]+$/) ? (
                  <a
                    href={`tel:${value}`}
                    className="text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    {value}
                  </a>
                ) : (
                  value
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="sticky bottom-0 p-6 border-t border-gray-200 dark:border-primary-800 bg-white dark:bg-primary-900">
          <button
            onClick={onClose}
            className="w-full btn-secondary"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
