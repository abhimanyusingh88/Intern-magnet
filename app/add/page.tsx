import BackGroundGlow from "@/components/BackGroundGlow";
import RecruiterCard from "@/components/Recruiter-hiring/recruiterCard";
import RecruiterHeaderImage from "@/components/Recruiter-hiring/RecruiterHeaderImage";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { Building, Crown, Rocket, Users } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Recruiter Panel | Intern-Magnet",
    description: "Post internship listings, manage applicants, and build your employer brand.",
};

export default async function AddPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    const sessionName = session?.user?.name;

    // Fetch user profile data from database
    let userName = session?.user?.name || "Guest";

    if (session?.user?.email) {
        try {
            const user = await prisma.legacyUser.findFirst({
                where: {
                    email: session.user.email,
                },
                select: {
                    name: true,
                },
            });
            if (user?.name) {
                userName = user.name;
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    }

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
            <div className="w-full flex flex-col gap-2 items-center justify-center mb-4">
                <div className="flex justify-center gap-2">
                    <p className=" text-[18px] sm:text-3xl font-bold bg-linear-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">Hello {userName || sessionName}, Welcome to our hiring platform</p>
                    <Rocket className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-500 animate-float" />
                </div>
                <p className="text-xs sm:text-[14px] font-thin text-zinc-300">Make your hiring process easy and smooth</p>
            </div>
            {/* HERO / BANNER */}
            <RecruiterHeaderImage />

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
            </section>
        </main>
    );
}
