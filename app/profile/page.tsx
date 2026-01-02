import BackGroundGlow from "@/components/BackGroundGlow";
import DownProfileComponent from "@/components/DownProfileComponent";
import ProfileMain from "@/components/Profile-elements/ProfileMain";
import { SpinnerBig } from "@/components/utils/SpinnerBig";
import { auth } from "@/lib/auth";
import { Suspense } from "react";

export default async function ProfilePage() {
    const session = await auth();


    // If user doesn't exist in DB for some reason (shouldn't happen if auth worked), 
    // we might want to handle it, but for now we pass what we have or null.
    // Ideally auth provider ensures user exists or we create on login.

    return (
        <div className="relative w-full">
            <BackGroundGlow />

            <div className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="space-y-8">
                    <div>
                        <Suspense fallback={<SpinnerBig />}>
                            {/* Add profile content here */}
                            <ProfileMain session={session} />
                        </Suspense>
                    </div>

                    <div>
                        <Suspense fallback={<SpinnerBig />}>
                            <DownProfileComponent />
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
}