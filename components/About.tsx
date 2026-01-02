"use client"
import BackGroundGlow from "./BackGroundGlow"
import { motion, Variants } from "framer-motion"
import { useState, useEffect } from "react"
import { aboutdata } from "./aboutData"

export default function About() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);


  // Container variant for staggering children
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  // Improved spring-based variants
  const itemVariants: Variants = {
    hidden: (direction: string) => ({
      opacity: 0,
      x: isMobile ? 0 : direction === "left" ? -40 : direction === "right" ? 40 : 0,
      y: isMobile ? 40 : direction === "bottom" ? 40 : 0,
      scale: 0.96,
    }),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 18,
        mass: 1
      }
    }
  };

  return (
    <main className="relative overflow-hidden bg-zinc-950">
      {/* background glow */}
      <BackGroundGlow />

      <div className="relative mx-auto max-w-6xl px-5 py-16 sm:py-20">

        {/* Hero */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
          custom="bottom"
          className="mb-20 text-center">
          <h1 className="bg-linear-to-r p-2 from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-4xl font-semibold text-transparent sm:text-5xl">
            About InternMagnet
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            InternMagnet is a modern internship and career platform built to
            bridge the gap between students and real-world opportunities.
            We help students discover internships, get career guidance,
            and stay updated with the evolving job market — all in one place.
          </p>
        </motion.section>

        {/* Mission & Vision */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mb-20 grid gap-8 md:grid-cols-2">
          <motion.div
            variants={itemVariants}
            custom="left"
            className="rounded-2xl border hover:scale-[1.02] transition-all duration-500 border-white/10 bg-zinc-900/60 p-6 backdrop-blur-xl sm:p-8">
            <h2 className="text-xl font-semibold text-zinc-100">Our Mission</h2>
            <p className="mt-4 text-sm text-zinc-400">
              Our mission is to empower students with early career opportunities
              by making internships accessible, transparent, and relevant.
              We aim to remove confusion, reduce skill gaps, and help students
              make informed career decisions.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            custom="right"
            className="rounded-2xl border hover:scale-[1.02] transition-all duration-500 border-white/10 bg-zinc-900/60 p-6 backdrop-blur-xl sm:p-8">
            <h2 className="text-xl font-semibold text-zinc-100">Our Vision</h2>
            <p className="mt-4 text-sm text-zinc-400">
              We envision a future where every student has equal access to
              meaningful internships, clear career guidance, and real-time
              insights into the job market — regardless of background.
            </p>
          </motion.div>
        </motion.section>

        {/* What We Offer */}
        <section className="mb-20">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={itemVariants}
            custom="bottom"
            className="mb-10 text-center text-2xl font-semibold text-zinc-100">
            What We Offer
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {aboutdata.map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                custom={i % 2 === 0 ? "left" : "right"}
                className="group rounded-2xl border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:scale-[1.02] hover:bg-zinc-800/40"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-r from-indigo-500/20 to-pink-500/20 text-indigo-300">
                  {item.icon}
                </div>
                <h3 className="text-base font-semibold text-zinc-100">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-400">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Why InternMagnet */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
          custom="bottom"
          className="mb-20 rounded-2xl border border-white/10 bg-zinc-900/60 p-8 backdrop-blur-xl">
          <h2 className="text-center text-2xl font-semibold text-zinc-100">
            Why InternMagnet?
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-center text-sm text-zinc-400">
            We focus on clarity, accessibility, and growth. InternMagnet is
            designed to eliminate noise and provide students with practical,
            actionable opportunities — not just listings.
          </p>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
          custom="bottom"
          className="text-center">
          <h2 className="text-2xl font-semibold text-zinc-100">
            Building Careers, One Opportunity at a Time
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-zinc-400">
            Whether you’re a student exploring your future or a company looking
            for fresh talent, InternMagnet is built for you.
          </p>
        </motion.section>

      </div>
    </main>
  )
}
