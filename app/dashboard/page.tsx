import BackGroundGlow from "@/components/BackGroundGlow";
import NetBg from "@/components/utils/netBg";
import DashboardPage from "@/components/dashboard/dashboardPage";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

export default async function Dashboard() {
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

    return <main className=" relative min-h-screen flex flex-col 
        px-6 pt-16 pb-12
        sm:px-10 
        md:px-20 
        lg:px-36
        flex-wrap gap-4
      ">
        <div className="sticky top-20">
            <NetBg />
        </div>
        <BackGroundGlow />
        <div className="relative z-10 w-full">
            <DashboardPage userName={userName} />
        </div>


    </main>
}