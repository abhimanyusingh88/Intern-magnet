"use client"

import { useState } from "react"
import BackGroundGlow from "@/components/BackGroundGlow"
import FaqForm from "@/components/FaqForm"
import FaqAccordion from "@/components/FaqAccordion"


const faqs = [
  {
    q: "What is InternMagnet?",
    a: "InternMagnet is a modern internship and career platform that helps students discover internships, receive career guidance, and stay updated with real-world job market trends."
  },
  {
    q: "Who can use InternMagnet?",
    a: "Any student, fresher, or early-career professional looking for internships, career guidance, or job-related resources can use InternMagnet."
  },
  {
    q: "Is InternMagnet free to use?",
    a: "Yes, creating an account and browsing internships is completely free for students. Some premium features may be introduced in the future."
  },
  {
    q: "How do I apply for internships?",
    a: "Once logged in, you can browse internships, view details, and apply directly through the platform using your profile and resume."
  },
  {
    q: "Can companies post internships?",
    a: "Yes. Employers and recruiters can post internship opportunities and manage applications through their dashboard."
  },
  {
    q: "How is my data protected?",
    a: "We follow strict security practices and never sell your data. All personal information is handled according to our Privacy Policy."
  },
  {
    q: "Do you provide career guidance?",
    a: "Yes. InternMagnet offers curated career guidance, insights, and resources to help you make informed career decisions."
  }
]

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <main className="relative overflow-hidden bg-zinc-950">
      {/* background glow */}
      <BackGroundGlow/>

      <div className="relative mx-auto max-w-5xl px-5 py-16 sm:py-20">
        {/* Header */}
        <div className="mb-14 text-center">
          <h1 className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-3xl font-semibold text-transparent sm:text-4xl">
            Frequently Asked Questions of users
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-zinc-400">
            Find answers to common questions about InternMagnet, internships,
            applications, and career guidance.
          </p>
        </div>

        {/* FAQ Accordions */}
       <FaqAccordion faqs={faqs} setOpen={setOpen} open={open}/>

        {/* Ask a Question */}
        <div className="mt-16 rounded-2xl border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-xl sm:p-10">
          <h2 className="text-xl font-semibold text-zinc-100">
            Still have a question?
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Didn’t find what you were looking for? Send us your question and our
            team will get back to you.
          </p>

          {/* Form (server-action ready) */}
          <FaqForm/>
        </div>
      </div>
    </main>
  )
}
