"use client"

export function SpinnerBig() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950">
      <div className="relative h-24 w-24">
        <div className="absolute inset-0 rounded-full border-4 border-white/10" />
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-indigo-400 border-r-pink-400" />
      </div>
    </div>
  )
}
