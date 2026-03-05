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