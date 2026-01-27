import BackGroundGlow from "@/components/BackGroundGlow";
import RecruiterCard from "@/components/Recruiter-hiring/recruiterCard";
import RecruiterHeaderImage from "@/components/Recruiter-hiring/RecruiterHeaderImage";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { Briefcase, Building, Crown, Filter, MessageCircle, Rocket, Users } from "lucide-react";
import type { Metadata } from "next";
import { addPageMenu } from "@/components/Recruiter-hiring/constants";
import SideArrowMenu from "@/components/Recruiter-hiring/sliderOption";

export const metadata: Metadata = {
    title: "Recruiter Panel | Intern-Magnet",
    description: "Post internship listings, manage applicants, and build your employer brand.",
};

export default async function AddPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    });


    // Fetch user profile data from database


    return (
        <main
            className="
        relative min-h-screen flex flex-col overflow-hidden
        px-6 pt-20 pb-12
        sm:px-10 sm:pt-20
        md:px-20 md:pt-20
        
        lg:px-36
      "
        >
            <BackGroundGlow />
            <div className="w-full flex flex-col gap-2 items-center justify-center mb-4">
                <div className="flex justify-center gap-2">
                    <p className=" text-[18px] text-center sm:text-xl md:text-2xl lg:text-3xl font-bold bg-linear-to-r from-indigo-600 to-pink-500 bg-clip-text  text-transparent">Hello, Welcome to our hiring platform</p>
                    <Rocket className="w-10 h-10 sm:w-11 sm:h-11 text-indigo-500 animate-float" />
                </div>
                <p className="text-xs sm:text-[15px] font-thin text-zinc-300">Make your hiring process easy and smooth</p>
            </div>
            {/* HERO / BANNER */}
            <RecruiterHeaderImage />
            <SideArrowMenu menuItems={addPageMenu} />

            {/* PLACEHOLDER FOR FUTURE COMPONENTS */}
            <section
                className="
          mt-16 grid gap-6
          sm:grid-cols-2
          lg:grid-cols-3
        "
            >


                {/* Card 1 */}
                <RecruiterCard title="Create Internship Listings" icon={<Users className="w-5  h-5 inline text-indigo-500 sm:h-6 sm:w-6" />} description="Publish roles with detailed requirements and reach thousands of students instantly." />

                {/* Card 2 */}
                <RecruiterCard title="Manage Applicants" icon={<Crown className="w-5 text-yellow-400 inline  h-5 sm:h-6 sm:w-6" />} description="Review applications, shortlist candidates, and track hiring progress." />

                {/* Card 3 */}
                <RecruiterCard title="Build Your Employer Brand" icon={<Building className="w-5 text-fuchsia-600 inline h-5 sm:h-6 sm:w-6" />} description="Showcase your company and attract motivated, high-quality talent." />
                <RecruiterCard title="Hire The Best Talent" icon={<Briefcase className="w-5 text-amber-400 inline h-5 sm:h-6 sm:w-6" />} description="Hire the best people for your organization's growth" />
                <RecruiterCard
                    title="Smart Screening Tools"
                    icon={<Filter className="w-5 text-emerald-500 inline h-5 sm:h-6 sm:w-6" />}
                    description="Automatically filter candidates using skills, experience, and custom questions to save time."
                />

                <RecruiterCard
                    title="Seamless Communication"
                    icon={<MessageCircle className="w-5 text-sky-500 inline h-5 sm:h-6 sm:w-6" />}
                    description="Connect with applicants instantly through in-app messaging and timely notifications."
                />

            </section>
        </main>
    );
}
