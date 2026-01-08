import BackGroundGlow from "@/components/BackGroundGlow";
import PostedJobs from "@/components/postedJobPage/PostedJobs";
import BackButton from "@/components/utils/BackButton";
import LoginRequiredPage from "@/components/login/LoginReminderPage";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Posted Jobs | Intern-Magnet",
  description: "Manage your active job listings and track internship applications.",
};

export default async function PostedJobsPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  if (!session) {
    return <LoginRequiredPage />
  }
  return <main className="
        relative min-h-screen flex flex-col overflow-hidden
        px-6 pt-24 pb-12
        sm:px-10 sm:pt-28
        md:px-20 md:pt-20
        lg:px-36
        flex-wrap gap-4
      ">
    <BackGroundGlow />
    <BackButton />
    <PostedJobs />
  </main>
}