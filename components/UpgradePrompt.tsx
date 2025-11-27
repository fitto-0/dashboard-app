import { Crown, Zap, Shield, Infinity } from 'lucide-react'

export default function UpgradePrompt() {
  const features = [
    { icon: Infinity, text: 'Unlimited daily contact views' },
    { icon: Zap, text: 'Priority access to new features' },
    { icon: Shield, text: 'Advanced security features' },
    { icon: Crown, text: 'Premium support' },
  ]

  return (
    <div className="card p-8 text-center max-w-2xl mx-auto bg-white dark:bg-primary-900 border border-gray-200 dark:border-primary-800">
      <div className="w-16 h-16 bg-gradient-to-r from-warning-500 to-warning-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <Crown className="w-8 h-8 text-white" />
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
        Upgrade Your Plan
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
        You've reached your daily limit of 50 contact views. Upgrade to
        <span className="font-semibold text-warning-600 dark:text-warning-400"> AgencyPro Premium </span>
        for unlimited access and premium features.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-primary-800 rounded-lg">
              <Icon className="w-5 h-5 text-warning-600 dark:text-warning-400 flex-shrink-0" />
              <span className="text-sm text-gray-700 dark:text-gray-300">{feature.text}</span>
            </div>
          )
        })}
      </div>

      <div className="space-y-4">
        <button className="w-full bg-gradient-to-r from-warning-500 to-warning-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-warning-600 hover:to-warning-700 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl">
          Upgrade to Premium - $29/month
        </button>
        
        <button className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-primary-800 transition-colors">
          Continue with Free Plan
        </button>
      </div>

      <p className="mt-4 text-xs text-gray-500 dark:text-gray-500">
        No credit card required for 14-day trial
      </p>
    </div>
  )
}
