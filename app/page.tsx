import BackGroundGlow from "@/components/BackGroundGlow";
import PlatformInfoCard from "@/components/homepage/HomepageInfo";

import { Rocket } from "lucide-react";
import HeroSlider from "@/components/homepage/HomeImageSlider";
import TrustSection from "@/components/homepage/TrustSection";
import NetBg from "@/components/utils/netBg";
import HowItWorks from "@/components/homepage/howitworks";

import { Suspense } from "react";
import { MinimalView, MinimalViewLoading } from "@/components/homepage/minimalview";

async function MinimalJobsFetcher() {
  let serializedJobs = [];
  try {
    const apiUrl = `${process.env.NEXTAUTH_URL}/api/minimaljobs`;
    const res = await fetch(apiUrl, {
      next: {
        revalidate: 300
      },
    });


    if (res.ok) {
      serializedJobs = await res.json();
    } else {
      const text = await res.text();
    }
  } catch (error) {
    console.error("Fetcher: Failed to fetch jobs:", error);
  }

  return <MinimalView initialJobs={serializedJobs} />;
}

export default function HomePage() {
  return (
    <main
      className="
        relative min-h-screen flex flex-col
        px-4 pt-20 pb-12
        sm:px-10 sm:pt-28
        md:px-20 md:pt-20
        lg:px-36
      "
    >
      <div className=" sticky top-20">
        <NetBg />
      </div>
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
          <Rocket className="h-6 w-6 sm:h-7 animate-float sm:w-7 md:h-9 md:w-9 lg:h-10 lg:w-10 text-indigo-500" />
        </div>
      </section>
      <div className="w-full flex justify-center">
        <h2 className="text-zinc-300 text-xs font-thin sm:text-lg font-sans">One stop destination for both recruiters and job seekers</h2>
      </div>

      <HeroSlider />
      <PlatformInfoCard />

      <Suspense fallback={<MinimalViewLoading />}>
        <MinimalJobsFetcher />
      </Suspense>

      <TrustSection />
      <HowItWorks />
    </main>
  );
}
