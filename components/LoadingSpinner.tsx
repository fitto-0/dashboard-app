'use client'

export default function LoadingSpinner(){
  return (
    <div className="flex items-center justify-center p-6">
      <div className="w-8 h-8 border-2 border-gray-200 border-t-primary-600 rounded-full animate-spin" />
    </div>
  )
}
