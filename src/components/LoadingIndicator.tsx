'use client'

interface LoadingIndicatorProps {
  label?: string
  className?: string
}

export default function LoadingIndicator({ label = 'Loading...', className = '' }: LoadingIndicatorProps) {
  return (
    <div className={`inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-gray-300 ${className}`}>
      <span className="h-4 w-4 animate-spin rounded-full border border-white/10 border-t-white" />
      <span>{label}</span>
    </div>
  )
}
