"use client"

import Link from "next/link"
import { useEffect } from "react"
import {
  Briefcase,
  Calendar,
  LayoutDashboard,
  PlusCircle,
  Sparkles,
} from "lucide-react"
import ProfileDropdown from "./Profile-elements/profileDropdown"

export default function MobileMenu({
  open,
  setOpen,
  session,
}: {
  open: boolean
  setOpen: (open: boolean) => void
  session: any
}) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <div
      className={`md:hidden border-t bg-zinc-900/80 backdrop-blur-xl overflow-y-auto scrollbar-hide transition-all duration-300 ease-in-out ${open ? "max-h-[calc(100vh-56px)] opacity-100 border-white/10" : "max-h-0 opacity-0 border-transparent"
        }`}
    >
      <div className="flex flex-col gap-2 px-4 py-4 text-sm text-zinc-300">
        <Link
          href="/dashboard"
          onClick={() => setOpen(false)}
          className="flex items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-white/5 hover:text-white active:scale-[0.98]"
        >
          <LayoutDashboard size={16} />
          <span>Dashboard</span>
        </Link>

        <Link
          href="/applications"
          onClick={() => setOpen(false)}
          className="flex items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-white/5 hover:text-white active:scale-[0.98]"
        >
          <Briefcase size={16} />
          <span>Applications</span>
        </Link>

        <Link
          href="/add"
          onClick={() => setOpen(false)}
          className="flex items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-white/5 hover:text-white active:scale-[0.98]"
        >
          <PlusCircle size={16} />
          <span>Recruiter Panel</span>
        </Link>

        <Link
          href="/calendar"
          onClick={() => setOpen(false)}
          className="flex items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-white/5 hover:text-white active:scale-[0.98]"
        >
          <Calendar size={16} />
          <span>Calendar</span>
        </Link>
        <Link
          href="/aiadvice"
          onClick={() => setOpen(false)}
          className="flex items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-white/5 hover:text-white active:scale-[0.98]"
        >
          <Sparkles size={16} />
          <span>AI Advice</span>
        </Link>

        <div className="mt-3 border-t border-white/10 pt-3">
          <ProfileDropdown mobile session={session} setOpen={setOpen} />
        </div>
      </div>
    </div>
  )
}
