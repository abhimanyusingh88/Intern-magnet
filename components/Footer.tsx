"use client"

import Link from "next/link"
import { Github, Linkedin, Twitter, Mail, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-zinc-950 isolation isolate">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6">
        {/* mobile: 2-col dense | desktop: 4-col same as before */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8 md:grid-cols-4 md:gap-14">

          {/* Brand (full width on mobile) */}
          <div className="space-y-5 text-center sm:col-span-2 md:col-span-1 md:text-left">
            <div className="inline-block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-2xl font-semibold text-transparent">
              InternMagnet
            </div>
            <p className="mx-auto max-w-sm text-sm leading-relaxed text-zinc-400 md:mx-0">
              Helping students discover internships, careers, and real opportunities — faster.
            </p>
          </div>

          {/* Company */}
          <div className="rounded-xl border border-white/10 bg-zinc-900/40 p-5 backdrop-blur-md md:border-0 md:bg-transparent md:p-0">
            <h4 className="mb-4 text-center text-sm font-semibold text-zinc-200 md:text-left">
              Company
            </h4>
            <div className="space-y-3 text-center md:text-left">
              <Link href="/about" className="block text-sm text-zinc-400 hover:text-white">About</Link>
              <Link href="/contact" className="block text-sm text-zinc-400 hover:text-white">Contact</Link>
              <Link href="/careers" className="block text-sm text-zinc-400 hover:text-white">Careers</Link>
            </div>
          </div>

          {/* Support */}
          <div className="rounded-xl border border-white/10 bg-zinc-900/40 p-5 backdrop-blur-md md:border-0 md:bg-transparent md:p-0">
            <h4 className="mb-4 text-center text-sm font-semibold text-zinc-200 md:text-left">
              Support
            </h4>
            <div className="space-y-3 text-center md:text-left">
              <Link href="/help" className="block text-sm text-zinc-400 hover:text-white">Help Center</Link>
              <Link href="/terms" className="block text-sm text-zinc-400 hover:text-white">Terms & Conditions</Link>
              <Link href="/privacy" className="block text-sm text-zinc-400 hover:text-white">Privacy Policy</Link>
            </div>
          </div>

          {/* Connect (full width on mobile) */}
          <div className="rounded-xl border border-white/10 bg-zinc-900/40 p-5 backdrop-blur-md sm:col-span-2 md:col-span-1 md:border-0 md:bg-transparent md:p-0">
            <h4 className="mb-4 text-center text-sm font-semibold text-zinc-200 md:text-left">
              Connect
            </h4>

            <div className="mb-4 flex items-center justify-center gap-2 text-zinc-400 md:justify-start">
              <MapPin size={16} />
              <span className="text-sm">India</span>
            </div>

            <div className="flex justify-center gap-4 md:justify-start">
              {[Github, Linkedin, Twitter, Mail].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="group relative rounded-full p-2.5 transition hover:bg-white/5"
                >
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/30 to-pink-500/30 opacity-0 blur-md transition group-hover:opacity-100" />
                  <Icon size={20} className="relative text-zinc-400 transition group-hover:text-white group-hover:scale-110" />
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center gap-3 border-t border-white/10 pt-6 text-center text-xs text-zinc-500 sm:flex-row sm:justify-between sm:text-sm">
          <span>© {new Date().getFullYear()} InternMagnet. All rights reserved.</span>
          <span className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
            Built for students, by students
          </span>
        </div>
      </div>
    </footer>
  )
}
