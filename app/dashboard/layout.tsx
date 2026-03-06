import BackGroundGlow from "@/components/BackGroundGlow";
import DashboardPage from "@/components/dashboard/dashboardPage";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import Landing from "@/components/dashboard/loginIndicator";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    let userName = "";

    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (session?.user?.email) {
        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email
            },
            select: {
                name: true
            }
        });

        userName = user?.name || "";
    }

    return (
        <main className="relative min-h-screen flex flex-col 
            px-4 pt-16 pb-12
            sm:px-10 
            md:px-10 
            lg:px-30
        ">

            <BackGroundGlow />
            <div className="relative z-10 w-full">
                {
                    session ? <DashboardPage userName={userName}>
                        {children}
                    </DashboardPage> :

                        <Landing />
                }
            </div>
        </main>
    );
}