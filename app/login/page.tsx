"use client";

import { signInAction } from "@/lib/actions";
import { useSearchParams } from "next/navigation";
// import { signInAction } from "@/app/_lib/auth-actions";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/account";

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900/70 p-8 backdrop-blur-xl">
        {/* glow */}
        <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-indigo-500/20 to-pink-500/20 blur-2xl" />

        {/* heading */}
        <h1 className="text-2xl font-semibold text-white">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          Sign in to continue to your account
        </p>

        {/* button */}
        <form
          action={() => signInAction(callbackUrl)}
          className="mt-6"
        >
          <button
            type="submit"
            className="group cursor-pointer relative flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm font-medium text-zinc-100 transition
                       hover:border-white/20 hover:bg-zinc-900/80
                       active:scale-[0.97]"
          >
            {/* glow */}
            <span className="absolute inset-0 rounded-xl bg-linear-to-r from-indigo-500/20 to-pink-500/20 opacity-0 blur-md transition group-hover:opacity-100" />

            {/* Google icon */}
            <svg className="relative h-4 w-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>

            <span className="relative">
              Continue with Google
            </span>
          </button>
        </form>

        {/* footer */}
        <p className="mt-6 text-center text-xs text-zinc-500">
          By continuing, you agree to our{" "}
          <a
            href="/terms"
            className="relative text-zinc-300 underline-offset-4 transition
               hover:text-white hover:underline"
          >
            Terms & Privacy Policy
          </a>
        </p>

      </div>
    </div>
  );
}
