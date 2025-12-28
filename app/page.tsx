import BackGroundGlow from "@/components/BackGroundGlow"
import NormalButton from "@/components/normalButton";
import { Rocket } from "lucide-react";
import Image from "next/image";

export default function HomePage() {
  return (
    <main
      className="
        relative min-h-screen flex flex-col overflow-hidden
        px-6 pt-24 pb-12
        sm:px-10 sm:pt-28
        md:px-20 md:pt-20
        lg:px-36
      "
    >
      <BackGroundGlow />

      {/* Top content */}
      <section className="flex justify-center">
        <div className="flex items-center gap-2 sm:gap-3">
          <p
            className="
              bg-linear-to-r from-indigo-500 to-pink-500
              bg-clip-text text-transparent font-semibold
              text-xl sm:text-2xl md:text-3xl lg:text-4xl
            "
          >
            Skyrocket your career with us
          </p>
          <Rocket className="h-6 w-6 sm:h-7 sm:w-7 md:h-9 md:w-9 lg:h-10 lg:w-10 text-indigo-500" />
        </div>
      </section>

      {/* CTA buttons */}
      <div
        className="
          mt-10 flex flex-col items-center gap-4
          sm:flex-row sm:justify-center
        "
      >
        <NormalButton
          link="/internships"
          title="Get started"
          variant="solid"
        />

        <NormalButton
          link="/internships"
          title="Browse internships"
          variant="outline"
        />
      </div>

      {/* Remaining height */}
      <section
        className="
    flex-1 w-full mt-10 relative rounded-xl overflow-hidden
    transform-gpu
    transition-transform duration-300 ease-out
    hover:scale-[1.05]
    active:scale-[0.97]
  "
      >
        <Image
          src="/Resume.png"
          alt="Resume"
          fill
          className="object-cover"
          priority
        />

        {/* Dark gradient overlay */}
        <div
          className="
      absolute inset-0
      bg-linear-to-t
      from-black/80
      via-black/60
      to-black/40
    "
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6">

          <h2
            className="
        text-center font-semibold text-white
        text-3xl
        sm:text-4xl
        md:text-5xl
        lg:text-6xl
        font-sans
      "
          >
            Tired of internship hunts?
          </h2>

          <p
            className="
        mt-6 text-center text-zinc-100
        max-w-xl
        sm:max-w-2xl
        text-lg
        sm:text-base
        md:text-xl
        leading-relaxed
        font-sans
      "
          >
            We've got you covered! Stop searching. Start your career.
          </p>

        </div>
      </section>

    </main>
  );
}
