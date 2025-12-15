"use client"

import Link from "next/link"
import {
  Briefcase,
  Calendar,
  LayoutDashboard,
  PlusCircle,
} from "lucide-react"
import ProfileDropdown from "./profileDropdown"

export default function MobileMenu({
  setOpen,
}: {
  setOpen: (open: boolean) => void
}) {
  return (
    <div className="md:hidden border-t border-white/10 bg-zinc-900/80 backdrop-blur-xl">
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
          <span>Post Internship</span>
        </Link>

        <Link
          href="/calendar"
          onClick={() => setOpen(false)}
          className="flex items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-white/5 hover:text-white active:scale-[0.98]"
        >
          <Calendar size={16} />
          <span>Calendar</span>
        </Link>

        <div className="mt-3 border-t border-white/10 pt-3">
          <ProfileDropdown mobile />
        </div>
      </div>
    </div>
  )
}
