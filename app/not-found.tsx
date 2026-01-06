import Link from "next/link"
import { ArrowLeft, Home, TriangleAlert } from "lucide-react"

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-zinc-100">

      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/3 h-64 w-64 rounded-full bg-pink-500/20 blur-3xl" />
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900/60 p-8 text-center backdrop-blur-md">

        <p className="mb-2 text-sm uppercase tracking-widest text-zinc-400">
          <TriangleAlert className="text-amber-600" />

        </p>

        <h1 className="mb-3 p-2 bg-linear-to-r from-indigo-400 to-pink-400 bg-clip-text text-4xl font-bold text-transparent">
          Page not found
        </h1>

        <p className="mb-8 text-sm text-zinc-400">
          The page you’re looking for doesn’t exist or may have been moved.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-300 px-4 py-2.5 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200 active:scale-95"
          >
            <Home size={16} />
            Go home
          </Link>

          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/10 active:scale-95"
          >
            <ArrowLeft size={16} />
            Back to login
          </Link>

        </div>
      </div>
    </div>
  )
}
