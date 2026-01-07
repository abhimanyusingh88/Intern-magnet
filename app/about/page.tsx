

import About from "@/components/About"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Intern-Magnet",
  description: "Learn more about Intern-Magnet, our mission, and how we help students and companies connect.",
};




export default function AboutPage() {
  return (
    <About />
  )
}
