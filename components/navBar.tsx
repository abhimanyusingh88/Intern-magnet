"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import ProfileDropdown from "./profileDropdown"

import MobileMenu from "./mobileMenu"
import { Bell, Menu, X } from "lucide-react"
import NotificationBell from "./NotificationBell"


export default function NavBar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const linkClass = (path: string) =>
    `will-change-transform transform-gpu ${
      pathname === path
        ? "text-zinc-100 scale-110"
        : "text-zinc-400 hover:text-zinc-100 hover:scale-105"
    } transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]`

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-zinc-900/40 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:px-6">

        {/* LEFT */}
        <div className="flex items-center gap-6">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2 select-none">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 text-xs font-bold text-zinc-900 shadow-md">
              im
            </div>
            <span className="text-[15px] font-semibold tracking-tight">
              <span className="text-zinc-200">intern</span>
              <span className="bg-gradient-to-r from-indigo-400 to-cyan-300 bg-clip-text text-transparent">
                -Magnet
              </span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/dashboard" className={linkClass("/dashboard")}>Dashboard</Link>
            <Link href="/applications" className={linkClass("/applications")}>Applications</Link>
            <Link href="/add" className={linkClass("/add")}>Post Internship</Link>
            <Link href="/calendar" className={linkClass("/calendar")}>Calendar</Link>
          </div>
        </div>

        {/* RIGHT (Desktop) */}
        <div className="flex items-center gap-13 cursor-pointer text-zinc-300">
         <NotificationBell />

  <div className="hidden md:block">
    <ProfileDropdown className={linkClass("/profile")} />
  </div>
</div>
        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden rounded-lg border border-white/10 p-2 text-zinc-200"
        >
          {open ? <X className="cursor-pointer" size={18} /> : <Menu className="cursor-pointer" size={18} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
   <MobileMenu setOpen={setOpen} />
      )}
    </nav>
  )
}
