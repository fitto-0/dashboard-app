'use client'

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { ArrowRight, Shield, Users, BarChart3 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">AgencyPro</span>
            </div>
            
            <SignedIn>
              <div className="flex items-center space-x-4">
                <UserButton />
                <a 
                  href="/dashboard"
                  className="btn-primary text-sm px-4 py-2"
                >
                  Go to Dashboard
                </a>
              </div>
            </SignedIn>
            
            <SignedOut>
              <SignInButton mode="modal">
                <button className="btn-primary text-sm px-4 py-2">
                  Get Started
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="text-gradient">Professional</span>
              <br />
              <span className="text-gray-900">Agency Dashboard</span>
            </h1>
            
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Streamline your agency management with our modern, secure dashboard. 
              Access comprehensive contact information, analytics, and tools designed for professionals.
            </p>

            <SignedOut>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <SignInButton mode="modal">
                  <button className="btn-primary group">
                    <span>Start Free Trial</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </SignInButton>
                
              </div>
            </SignedOut>

            <SignedIn>
              <div className="mt-10">
                <a 
                  href="/dashboard"
                  className="btn-primary inline-flex items-center group"
                >
                  <span>Access Dashboard</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </SignedIn>
          </motion.div>

          {/* Features Grid */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Secure Authentication',
                description: 'Enterprise-grade security with Clerk authentication'
              },
              {
                icon: Users,
                title: 'Contact Management',
                description: 'Organize and access agency contacts efficiently'
              },
              {
                icon: BarChart3,
                title: 'Usage Analytics',
                description: 'Track your daily usage and optimize your workflow'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-6 text-center group hover:border-primary-200"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
