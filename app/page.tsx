import BackGroundGlow from "@/components/BackGroundGlow";
import HeroSlider from "@/components/HomeImageSlider";
import NormalButton from "@/components/utils/normalButton";
import PlatformInfoCard from "@/components/utils/DashBoardInfo";
// import HeroSlider from "@/components/HeroSlider";
import { Rocket } from "lucide-react";

export default function HomePage() {
  return (
    <main
      className="
        relative min-h-screen flex flex-col
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
          <h1
            className="
              bg-linear-to-r from-indigo-500 to-pink-500
              bg-clip-text text-transparent font-semibold
              text-[16px] sm:text-2xl md:text-3xl lg:text-4xl
            "
          >
            Skyrocket your career with us
          </h1>
          {/* <p className="text-zinc-300 text-xs sm:text-xl">Post and hunt at same place</p> */}
          <Rocket className="h-6 w-6 sm:h-7 animate-float sm:w-7 md:h-9 md:w-9 lg:h-10 lg:w-10 text-indigo-500" />

        </div>

      </section>
      <div className="w-full flex justify-center">
        <h2 className="text-zinc-300 text-xs font-thin sm:text-lg font-sans">Post and hunt at same place</h2>
      </div>

      {/* CTA */}
      <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <NormalButton link="/internships" title="Get started" variant="solid" />
        <NormalButton link="/internships" title="Browse internships" variant="outline" />
      </div>

      {/* SLIDER */}

      <HeroSlider />
      <PlatformInfoCard />
    </main>
  );
}
