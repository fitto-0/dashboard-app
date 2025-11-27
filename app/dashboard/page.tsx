import { auth } from '@clerk/nextjs'
import { Building2, Users, Eye, TrendingUp, ArrowRight } from 'lucide-react'
import StatsCards from '@/components/StatsCards'

import UsageTracker from '@/components/UsageTracker'
import { sampleAgencies, sampleContacts } from '@/data/sample'
import { getUsage } from '@/lib/usage'

export default async function DashboardPage() {
  const { userId } = auth()

  // compute stats from CSV-backed data
  const totalAgencies = Array.isArray(sampleAgencies) ? sampleAgencies.length : 0
  const totalContacts = Array.isArray(sampleContacts) ? sampleContacts.length : 0

  const usage = getUsage(userId ?? null)
  const availableViews = Math.max(0, usage.limit - usage.viewed)
  const usagePercentage = Math.round((usage.viewed / Math.max(1, usage.limit)) * 100)

  const stats = {
    totalAgencies,
    totalContacts,
    availableViews,
    usagePercentage,
  }

  const recentActivity = [
    { action: 'Viewed contacts', agency: 'Recent searches', time: 'Just now' },
  ]

  return (
    <div className="space-y-8 animate-fade-in bg-white dark:bg-primary-900 rounded-xl p-6 border border-gray-200 dark:border-primary-800 min-h-screen">
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 max-w-2xl">Overview of agencies, contacts and daily usage.</p>
        </div>

        <div className="w-full md:w-auto">
          <UsageTracker userId={userId ?? ''} />
        </div>
      </header>

      <StatsCards stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <section className="card p-6 bg-white dark:bg-primary-900 border border-gray-200 dark:border-primary-800">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Activity Feed</h2>
              <TrendingUp className="w-5 h-5 text-gray-400 dark:text-gray-500" />
            </div>

            <div className="space-y-3">
              {recentActivity.map((a, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-primary-800 hover:bg-gray-100 dark:hover:bg-primary-700 transition-colors">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-700 rounded-md flex items-center justify-center">
                    <Eye className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{a.action}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{a.agency} • {a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="card p-6 bg-white dark:bg-primary-900 border border-gray-200 dark:border-primary-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Quick Actions</h3>
          <div className="flex flex-col gap-3">
            <a href="/dashboard/agencies" className="btn-primary inline-flex items-center justify-center">Browse Agencies</a>
            <a href="/dashboard/contacts" className="btn-secondary inline-flex items-center justify-center">View Contacts</a>
          </div>
        </aside>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6 bg-white dark:bg-primary-900 border border-gray-200 dark:border-primary-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Agencies</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Total agencies in the database.</p>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">{totalAgencies}</div>
        </div>

        <div className="card p-6 bg-white dark:bg-primary-900 border border-gray-200 dark:border-primary-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Contacts</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Total contacts available.</p>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">{totalContacts}</div>
        </div>
      </div>
    </div>
  )
}
        