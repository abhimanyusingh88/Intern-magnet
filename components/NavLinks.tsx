"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import RecruiterPannerNavDropdown from "./Recruiter-hiring/RecruiterPannerNavDropdown"

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
                    Recruiter Panel
                    <span
                        className="absolute -top-3 -right-5 bg-amber-500 px-0.5 py-0.5 text-zinc-900 text-[11px]  font-bold  rounded-full z-20 transform"
                    >
                        Free
                    </span>
                </Link>

                {/* Hover dropdown */}
                <RecruiterPannerNavDropdown />
            </div>

            <Link href="/calendar" className={linkClass("/calendar")}>Calendar</Link>
            <Link href="/aiadvice" className={linkClass("/aiadvice")}>AI Advice</Link>
        </div>
    )
}
