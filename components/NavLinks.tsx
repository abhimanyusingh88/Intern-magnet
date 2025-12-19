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
            <Link href="/add" className={linkClass("/add")}>Post Internship</Link>
            <Link href="/calendar" className={linkClass("/calendar")}>Calendar</Link>
            <Link href="/aiadvice" className={linkClass("/aiadvice")}>AI Advice</Link>
        </div>
    )
}
