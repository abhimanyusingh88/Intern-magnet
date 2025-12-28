"use client"
// import { signInWithGoogle } from "@/app/auth/actions"
// import { use } from "react"

import { useSearchParams } from "next/navigation";
import { signInAction } from "@/lib/actions";

export default function SignInButton({ isLoggedIn, isLoading }: { isLoggedIn: boolean; isLoading: boolean }) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  if (isLoggedIn || isLoading) return null;

  // If callbackUrl exists (user tried to access protected page), use it
  // Otherwise use "/" (user clicked sign in button directly)
  const redirectUrl = callbackUrl || "/";

  return (

    <form action={() => signInAction(redirectUrl)} >

      <button
        type="submit"
        className="group hover:scale-115  relative flex items-center justify-center gap-2
                   rounded-lg border border-white/10
                   bg-zinc-900/70
                   px-3 py-2
                   text-xs font-medium cursor-pointer text-zinc-100
                   backdrop-blur-md transition
                   hover:bg-zinc-900 hover:border-white/20
                   active:scale-[0.96]
                   sm:gap-3 sm:rounded-xl sm:px-5 sm:py-2.5 sm:mr-0.5 sm:text-sm"
      >
        {/* gradient hover glow */}
        <span className="pointer-events-none absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-indigo-500/20 to-pink-500/20 opacity-0 blur-md transition group-hover:opacity-100" />

        {/* Google Icon */}
        <svg
          className="relative h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0"
          viewBox="0 0 24 24"
        >
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>

        {/* Text */}
        <span className="relative whitespace-nowrap">

          <span className="hidden sm:inline">Sign in with Google</span>
        </span>
      </button>

    </form>
  )
}
