import BackGroundGlow from "@/components/BackGroundGlow";
import DraftJobs from "@/components/DraftJobs/DraftJobs";
import BackButton from "@/components/utils/BackButton";
import LoginRequiredPage from "@/components/utils/LoginReminderPage";
import { auth } from "@/lib/auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "My Drafts | Intern-Magnet",
    description: "Review and complete your saved internship listing drafts.",
};

export default async function RecruiterDrafts() {
    const session = await auth();
    if (!session) return <LoginRequiredPage />


    return <main className="relative min-h-screen flex flex-col overflow-hidden
    px-6 pt-24 pb-12
    sm:px-10 sm:pt-28
    md:px-20 md:pt-20
    lg:px-36
    flex-wrap gap-4">
        <BackGroundGlow />

        <BackButton />


        <DraftJobs />
    </main>
}