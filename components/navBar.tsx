import Link from "next/link"
import { auth } from "@/lib/auth"

import ProfileDropdown from "./profileDropdown"
import NotificationBell from "./NotificationBell"
import GoogleSignInBtn from "./SignInButton"
import NavLinks from "./NavLinks"
import MobileNavigation from "./MobileNavigation"

export default async function NavBar() {
  const session = await auth()
  const isLoggedIn = !!session?.user
  // In a server component, we don't have a loading state for the session check itself 
  // (the component suspends or awaits). So we pass false.
  const isLoading = false

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

          {/* Desktop Links - Extracted to Client Component */}
          <NavLinks />
        </div>

        {/* RIGHT (Desktop) */}
        <div className="flex items-center gap-6 cursor-pointer text-zinc-300">
          <NotificationBell />
          <GoogleSignInBtn isLoggedIn={isLoggedIn} isLoading={isLoading} />

          <div className="hidden md:block">
            <ProfileDropdown session={session} className="will-change-transform transform-gpu text-zinc-400 hover:text-zinc-100 hover:scale-105 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]" />
          </div>
        </div>

        {/* Mobile Navigation (Button + Menu) - Extracted to Client Component */}
        <MobileNavigation session={session} />
      </div>
    </nav>
  )
}