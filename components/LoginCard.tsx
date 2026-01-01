"use client"

import { signInAction } from "@/lib/actions"
import BackGroundGlow from "./BackGroundGlow"
import Image from "next/image"

export default function LoginCard({
    callbackUrl,
}: {
    callbackUrl: string
}) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
            <div className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/60 backdrop-blur-xl">

                {/* glow */}
                <BackGroundGlow />

                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr]">

                    {/* LEFT — Branding with Background Image */}
                    <div className="hidden md:flex relative flex-col justify-between p-12 overflow-hidden">
                        {/* Background Image */}
                        <Image
                            src="/login.png"
                            alt="background branding"
                            fill
                            priority
                            className="object-cover opacity-90 saturate-150 brightness-110"
                        />
                        {/* Gradient Overlay for better text readability - slightly lighter at top to show colors */}
                        <div className="absolute inset-0 bg-linear-to-b from-zinc-950/40 via-transparent to-zinc-950/90" />

                        {/* Top Content */}
                        <div className="relative z-10">
                            <h2 className="text-4xl font-semibold text-white leading-tight">
                                Build your
                                <br />
                                <span className="bg-linear-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
                                    professional identity
                                </span>
                            </h2>
                        </div>

                        {/* Bottom Content */}
                        <div className="relative z-10">
                            {/* <p className="text-sm text-zinc-200 max-w-sm font-medium drop-shadow-md">
                                Create, manage, and showcase your profile in one
                                place. Simple, fast, and beautifully designed.
                            </p> */}

                            <div className="mt-10 flex items-center gap-3 text-xs text-zinc-300 font-medium">
                                <span className="h-1.5 w-1.5 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(244,114,182,0.8)]" />
                                Create & manage
                                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)]" />
                                Trusted by developers
                                <span className="h-1.5 w-1.5 rounded-full bg-pink-400 shadow-[0_0_8px_rgba(244,114,182,0.8)]" />
                                Secure & private
                            </div>
                        </div>
                    </div>

                    {/* VERTICAL DIVIDER */}
                    <div className="hidden md:block w-px bg-white/10" />

                    {/* RIGHT — Login + Info */}
                    <div className="flex items-center justify-center p-8 md:p-12">
                        <div className="w-full max-w-sm">

                            <h1 className="text-2xl font-semibold text-white">
                                Welcome to Magnet
                            </h1>
                            <p className="mt-2 text-sm text-zinc-400">
                                Begin your journey to building your professional identity
                            </p>

                            <div className="mt-6 h-px w-full bg-white/10" />

                            <p className="mt-4 text-xs text-zinc-500 leading-relaxed">
                                Sign in to access your profile, saved progress,
                                and personalized experience.
                            </p>

                            <ul className="mt-4 space-y-2 text-xs text-zinc-400">
                                <li className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                                    Secure Google authentication
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-pink-400" />
                                    No passwords to remember
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                    Takes less than 10 seconds
                                </li>
                            </ul>

                            <form
                                action={() => signInAction(callbackUrl)}
                                className="mt-6"
                            >
                                <button
                                    type="submit"
                                    className="group cursor-pointer relative flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm font-medium text-zinc-100 transition
                                    hover:border-white/40 hover:scale-[1.05] hover:bg-zinc-900/80
                                    active:scale-[0.97]"
                                >
                                    <span className="absolute inset-0 rounded-xl bg-linear-to-r from-indigo-500/20 to-pink-500/20 opacity-0 blur-md transition" />

                                    <svg
                                        className="relative h-4 w-4"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>

                                    <span className="relative text-shadow-blue-100 font-sans">
                                        Continue with Google
                                    </span>
                                </button>
                            </form>

                            <p className="mt-6 text-center text-xs text-zinc-500">
                                By continuing, you agree to our{" "}
                                <a
                                    href="/terms"
                                    className="text-zinc-300 underline-offset-4 transition hover:text-white hover:underline"
                                >
                                    Terms & Privacy Policy
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
