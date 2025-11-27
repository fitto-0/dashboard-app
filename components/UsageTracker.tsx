'use client'

import { useState, useEffect } from 'react'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

interface UsageTrackerProps {
  userId: string
}

export default function UsageTracker({ userId }: UsageTrackerProps) {
  const [usage, setUsage] = useState({ viewed: 0, limit: 50 })

  useEffect(() => {
    async function fetchUsage() {
      try {
        const res = await fetch('/api/usage')
        if (res.ok) {
          const json = await res.json()
          setUsage(json)
        }
      } catch (e) {
        // ignore
      }
    }

    fetchUsage()
  }, [userId])

  const percentage = (usage.viewed / usage.limit) * 100
  const isNearLimit = percentage >= 80
  const isOverLimit = usage.viewed >= usage.limit

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Daily Usage Tracker
        </h3>
        {isOverLimit ? (
          <AlertCircle className="w-5 h-5 text-red-500" />
        ) : (
          <CheckCircle2 className="w-5 h-5 text-green-500" />
        )}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">
            Contact views today
          </span>
          <span className={`text-sm font-semibold ${
            isOverLimit ? 'text-red-600' : 
            isNearLimit ? 'text-warning-600' : 'text-green-600'
          }`}>
            {usage.viewed} / {usage.limit}
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className={`h-3 rounded-full transition-all duration-500 ${
              isOverLimit ? 'bg-red-500' : 
              isNearLimit ? 'bg-warning-500' : 'bg-green-500'
            }`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>

        <p className="text-sm text-gray-600">
          {isOverLimit ? (
            <span className="text-red-600 font-medium">
              Daily limit reached. Upgrade for unlimited access.
            </span>
          ) : isNearLimit ? (
            <span className="text-warning-600 font-medium">
              Approaching daily limit. {usage.limit - usage.viewed} views remaining.
            </span>
          ) : (
            <span className="text-green-600 font-medium">
              {usage.limit - usage.viewed} contact views remaining today.
            </span>
          )}
        </p>
      </div>
    </div>
  )
}
