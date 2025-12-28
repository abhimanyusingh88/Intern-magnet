"use client"

import { ChevronDown, CreditCard, Settings, ShieldQuestion, User, TriangleAlert } from "lucide-react";
import Link from "next/link";
import LogOutButton from "./LogOutButton";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useProfile } from "./ProfileContext";

type DesktopDropdownProps = { classApply: string; className?: string, session?: any }

export default function DesktopDropdown({ classApply, className = "", session }: DesktopDropdownProps) {
  const { data: Usersession } = useSession()
  const { completionPercentage } = useProfile()
  const pathname = usePathname()
  const isProfilePage = pathname === "/profile"

  const isLoggedIn = !!Usersession?.user
  const img = session?.user?.image

  return (
    <div className="relative group">
      <Link href="/profile" className={`flex items-center gap-2 ${className}`}>
        Profile
        {isLoggedIn && !isProfilePage && completionPercentage < 100 && (
          <TriangleAlert className="h-6 w-6 text-orange-500" />
        )}
        <ChevronDown className="h-4 w-4 text-zinc-400 transition-transform group-hover:rotate-180" />
      </Link>

      <div className="absolute right-0 top-full pt-2 w-80 origin-top-right transition-all duration-200 opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto">
        <div className="rounded-xl border border-white/10 bg-zinc-900/70 backdrop-blur-xl shadow-xl overflow-hidden">
          <div className="flex flex-col p-1 text-sm text-zinc-300">
            <Link className="p-4" href="/profile">
              {img &&
                <div className="flex items-center gap-4">
                  <Image className="rounded-full h-12 w-12 ml-2" src={img || "/avatar-placeholder.png"} alt="profile" width={40} height={40} /> <span className="hover:text-white p-2 hover:rounded-lg hover:bg-white/5">{session?.user?.name}</span>
                </div>
              }
            </Link>
            <Link href="/profile" className="flex items-center gap-6 rounded-lg px-3 py-2 hover:bg-white/10"><User size={16} className="shrink-0" /><span>Account Details</span></Link>
            <Link href="/settings" className="flex items-center gap-6 rounded-lg px-3 py-2 hover:bg-white/10"><Settings size={16} className="shrink-0" /><span>Settings</span></Link>
            <Link href="/career" className="flex items-center gap-6 rounded-lg px-3 py-2 hover:bg-white/10"><CreditCard size={16} className="shrink-0" /><span>Career guidence</span></Link>
            <Link href="/faqs" className="flex items-center gap-6 rounded-lg px-3 py-2 hover:bg-white/10"><ShieldQuestion size={16} className="shrink-0" /><span>User FAQs</span></Link>

            <div className="my-1 h-px bg-white/10" />

            <LogOutButton classApply={classApply} isLoggedIn={isLoggedIn} />
          </div>
        </div>
      </div>
    </div>
  )
}