"use client"

export function SpinnerMini() {
  return (
    <div className="relative h-4 w-4">
      <div className="absolute inset-0 rounded-full border-2 border-white/20" />
      <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-indigo-400" />
    </div>
  )
}
