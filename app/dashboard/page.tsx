import HomePage from "@/components/dashboard/homepage";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";



export default async function Dashboard() {

    const session = await auth.api.getSession({
        headers: await headers()
    })





    let error = "";
    const baseUrl = process.env.BASE_URL || "http//:localhost:3000"

    const userInterviewCount = await prisma.legacyUser.findUnique({
        where: {
            email: session?.user?.email
        },
        select: {
            interview_count: true
        }
    })

    const applied = await fetch(`${baseUrl}/api/appliedjobs`, {
        headers: {
            cookie: ((await headers()).get("cookie") || "")
        }
    }

    );
    if (!applied.ok) {
        error = "Something went wrong";
        console.log(applied.statusText);
    }
    const AppliedRes = await applied.json();



    return <div className="text-zinc-200 w-full px-1 sm:px-3 md:px-5 py-4">
        <HomePage AppliedJobs={AppliedRes} interviewCount={Number(userInterviewCount?.interview_count ?? 0)} />
    </div>
}