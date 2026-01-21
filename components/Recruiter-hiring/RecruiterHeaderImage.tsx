"use client"
import Image from "next/image";
import NormalButton from "../utils/normalButton";
import { motion } from "framer-motion";

export default function RecruiterHeaderImage() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="
              relative w-full h-[50vh] min-h-[350px] sm:h-[60vh]
              rounded-2xl overflow-hidden
              transform-gpu
              transition-transform duration-300 ease-out
              hover:scale-[1.01]
            "
    >
      <Image
        src="/Recruiter.png"
        alt="Recruiter hiring talent"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Dark gradient overlay */}
      <div
        className="
                absolute inset-0
                bg-linear-to-tr
                from-black/90
                via-black/50
                to-transparent
              "
      />

      {/* Side glow (outside feel) */}
      <div
        className="
                sm:pointer-events-none
                sm:absolute sm:-left-32 sm:top-1/2 sm:-translate-y-1/2
                sm:h-[120%] sm:w-64
                sm:bg-[radial-gradient(60%_50%_at_50%_50%,rgba(99,102,241,0.45),transparent_70%)]
              "
      />
      <div
        className="
                sm:pointer-events-none
                sm:absolute sm:-right-32 sm:top-1/2 sm:-translate-y-1/2
                h-[120%] w-64
                sm:bg-[radial-gradient(60%_50%_at_50%_50%,rgba(99,102,241,0.45),transparent_70%)]
              "
      />

      {/* Overlay content */}
      <div
        className="
                absolute inset-0
                flex flex-col items-center justify-center
                px-6 text-center
              "
      >
        <h1
          className="
                  text-white font-sans font-semibold
                  text-2xl
                  xs:text-3xl
                  sm:text-4xl
                  md:text-5xl
                  lg:text-6xl
                "
        >
          Hire the best talent
        </h1>

        <p
          className="
                  mt-4 sm:mt-6 text-zinc-100
                  max-w-xl sm:max-w-2xl
                  text-sm sm:text-base md:text-lg lg:text-xl
                  leading-relaxed
                  font-sans
                "
        >
          Post internships, discover skilled candidates, and build your team
          faster with a recruiter-first hiring experience.
        </p>



      </div>
    </motion.section>
  )
}