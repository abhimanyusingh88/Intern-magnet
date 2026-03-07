"use client"

import { useState } from "react"
import { Mail, MapPin, Phone, ChevronDown } from "lucide-react"
import BackGroundGlow from "../BackGroundGlow"
import ContactForm from "./ContactForm"
import { faqs } from "../utils/constants"
import { AnimatePresence, motion } from "framer-motion"


export default function Contact() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <main className="relative overflow-hidden bg-zinc-950">
      <BackGroundGlow />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:py-20">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="bg-linear-to-r from-indigo-600 via-purple-400 to-pink-400 bg-clip-text text-4xl font-semibold text-transparent sm:text-5xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-zinc-400">
            Have questions, feedback, or partnership ideas?
            We’d love to hear from you.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Left Info */}
          <div className="space-y-8">
            <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-xl">
              <h2 className="text-lg font-semibold text-zinc-100">
                Get in touch
              </h2>
              <p className="mt-2 text-sm text-zinc-400">
                Reach out to us anytime. Our team is always ready to help students and recruiters.
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-3 text-zinc-400">
                  <Mail size={18} />
                  <span className="text-sm">support@internmagnet.com</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-400">
                  <Phone size={18} />
                  <span className="text-sm">+91 8840853798</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-400">
                  <MapPin size={18} />
                  <span className="text-sm">India</span>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-xl">
              <h2 className="text-lg font-semibold text-zinc-100">
                FAQs
              </h2>

              <div className="mt-4 divide-y divide-white/10">
                {faqs.map((f, i) => (
                  <button
                    key={i}
                    onClick={() => setOpen(open === i ? null : i)}
                    className="w-full py-4 text-left"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-zinc-200">
                        {f.q}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`text-zinc-400 transition ${open === i ? "rotate-180" : ""
                          }`}
                      />
                    </div>
                    {open === i && (
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={f.a}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.2 }}
                          className="mt-2 text-sm text-zinc-400"
                        >
                          {f.a}
                        </motion.p>
                      </AnimatePresence>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-xl sm:p-8">
            <h2 className="text-lg font-semibold text-zinc-100">
              Send us a message
            </h2>

            {/* Ready for Server Actions */}
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  )
}
