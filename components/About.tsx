"use client"

import BackGroundGlow from "./BackGroundGlow"
import { motion } from "framer-motion"
import { aboutdata } from "./aboutData"

import { Variants } from "framer-motion"

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
}

const item: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 18
    }
  }
}

export default function About() {
  return (
    <main className="relative overflow-hidden ">
      <BackGroundGlow />

      <div className="relative mx-auto max-w-6xl px-5 py-16 sm:py-20">

        {/* Hero */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={item}
          className="mb-15 text-center"
        >
          <h1 className="bg-linear-to-r p-2 from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-4xl font-semibold text-transparent sm:text-5xl">
            About InternMagnet
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            InternMagnet is a modern internship and career platform built to
            bridge the gap between students and real-world opportunities.
          </p>
        </motion.section>


        {/* Mission & Vision */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={container}
          className="mb-10 grid gap-8 md:grid-cols-2"
        >
          <motion.div variants={item} className="card flex items-center justify-center md:justify-start flex-col">
            <h2 className="text-xl font-semibold text-zinc-100">Our Mission</h2>
            <p className="mt-4 text-sm text-zinc-400">
              Our mission is to empower students with early career opportunities.
            </p>
          </motion.div>

          <motion.div variants={item} className="card flex items-center justify-center md:justify-start flex-col">
            <h2 className="text-xl font-semibold text-zinc-100">Our Vision</h2>
            <p className="mt-4 text-sm text-zinc-400">
              We envision a future where every student has equal access to career opportunities.
            </p>
          </motion.div>
        </motion.section>


        {/* What We Offer */}
        <section className="mb-20">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={item}
            className="mb-10 text-center text-2xl font-semibold text-zinc-100"
          >
            What We Offer
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={container}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {aboutdata.map((itemData, i) => (
              <motion.div
                key={i}
                variants={item}
                className="group rounded-2xl border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:scale-[1.02]"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-r from-indigo-500/20 to-pink-500/20 text-indigo-300">
                  {itemData.icon}
                </div>

                <h3 className="text-base font-semibold text-zinc-100">
                  {itemData.title}
                </h3>

                <p className="mt-2 text-sm text-zinc-400">
                  {itemData.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

      </div>
    </main>
  )
}