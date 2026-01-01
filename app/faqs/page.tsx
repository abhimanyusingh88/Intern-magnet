"use client"

import { useState } from "react"
import BackGroundGlow from "@/components/BackGroundGlow"
import FaqForm from "@/components/FaqForm"
import FaqAccordion from "@/components/FaqAccordion"
import FaqPage from "@/components/FaqPage"


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
      <FaqPage open={open} setOpen={setOpen} faqs={faqs} />
    </main>
  )
}
