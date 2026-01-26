import BackGroundGlow from "@/components/BackGroundGlow";
import ProfileMain from "@/components/Profile-elements/ProfileMain";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "My Profile | Intern-Magnet",
    description: "View and manage your professional profile, resume, and internship applications.",
};

export default async function ProfilePage() {
    const session = await auth.api.getSession({
        headers: await headers()
    });


    // If user doesn't exist in DB for some reason (shouldn't happen if auth worked), 
    // we might want to handle it, but for now we pass what we have or null.
    // Ideally auth provider ensures user exists or we create on login.

    return (
        <div className="relative w-full">
            <BackGroundGlow />

            <div className="pt-24 pb-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="space-y-4">
                    <ProfileMain session={session} />
                </div>
            </div>
        </div>
    );
}