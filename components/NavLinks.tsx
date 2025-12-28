"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function NavLinks() {
    const pathname = usePathname()

    const linkClass = (path: string) =>
        `will-change-transform transform-gpu ${pathname === path
            ? "text-zinc-100 scale-110"
            : "text-zinc-400 hover:text-zinc-100 hover:scale-105"
        } transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]`

    return (
        <div className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/dashboard" className={linkClass("/dashboard")}>Dashboard</Link>
            <Link href="/applications" className={linkClass("/applications")}>Applications</Link>
            <div className="relative group inline-block">
                <Link
                    href="/add"
                    className={linkClass("/add")}
                >
                    Recruiter Pannel
                </Link>

                {/* Hover dropdown */}
                <div
                    className="
      pointer-events-none
      absolute left-1/2 top-full mt-4
      -translate-x-1/2
      w-72
      rounded-xl
      border border-white/10
      bg-zinc-950
      backdrop-blur-xl
      px-5 py-4
      text-sm text-zinc-200
      shadow-2xl

      opacity-0
      translate-y-2
      scale-95
      transition-all duration-300 ease-out

      group-hover:opacity-100
      group-hover:translate-y-0
      group-hover:scale-100
    "
                >
                    <p className="font-medium text-white">
                        Become a recruiter 🚀
                    </p>

                    <p className="mt-2 text-zinc-400 leading-relaxed">
                        Hire the best talent from across the country and build your dream team
                        faster with curated internship applicants.
                    </p>

                    {/* glow */}
                    <div className="absolute inset-0 -z-10 rounded-xl bg-indigo-500/10 blur-xl" />
                </div>
            </div>

            <Link href="/calendar" className={linkClass("/calendar")}>Calendar</Link>
            <Link href="/aiadvice" className={linkClass("/aiadvice")}>AI Advice</Link>
        </div>
    )
}
