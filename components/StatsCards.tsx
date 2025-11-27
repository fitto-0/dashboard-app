import { Building2, Users, Eye, Zap } from 'lucide-react'

interface StatsCardsProps {
  stats: {
    totalAgencies: number
    totalContacts: number
    availableViews: number
    usagePercentage: number
  }
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: 'Total Agencies',
      value: stats.totalAgencies,
      icon: Building2,
      color: 'blue',
      description: 'Active agencies'
    },
    {
      title: 'Available Contacts',
      value: stats.totalContacts,
      icon: Users,
      color: 'green',
      description: 'In database'
    },
    {
      title: 'Daily Views Left',
      value: stats.availableViews,
      icon: Eye,
      color: 'purple',
      description: 'Of 50 daily limit'
    },
    {
      title: 'Usage Rate',
      value: `${stats.usagePercentage}%`,
      icon: Zap,
      color: 'orange',
      description: 'Today\'s usage'
    }
  ]

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600'
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <div
            key={card.title}
            className="card p-6 group hover:scale-105 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${colorClasses[card.color as keyof typeof colorClasses]}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
            
            <div>
              <p className="text-2xl font-bold text-gray-900 mb-1">
                {card.value}
              </p>
              <p className="text-sm font-medium text-gray-900 mb-1">
                {card.title}
              </p>
              <p className="text-xs text-gray-500">
                {card.description}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
