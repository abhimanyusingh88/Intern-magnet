import RecruiterCard from "@/components/Recruiter-hiring/recruiterCard";
import RecruiterHeaderImage from "@/components/Recruiter-hiring/RecruiterHeaderImage";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AddPage() {
    const session = await auth();
    const sessionName = session?.user?.name;

    // Fetch user profile data from database
    let userName = session?.user?.name || "Guest";

    if (session?.user?.email) {
        try {
            const user = await prisma.user.findFirst({
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
            <div className="w-full flex justify-center mb-4">
                <p className=" text-[18px] sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">Hello {userName || sessionName}, Welcome to our hiring platform</p>
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
                <RecruiterCard title="Create Internship Listings" description="Publish roles with detailed requirements and reach thousands of students instantly." />

                {/* Card 2 */}
                <RecruiterCard title="Manage Applicants" description="Review applications, shortlist candidates, and track hiring progress." />

                {/* Card 3 */}
                <RecruiterCard title="Build Your Employer Brand" description="Showcase your company and attract motivated, high-quality talent." />
            </section>
        </main>
    );
}
