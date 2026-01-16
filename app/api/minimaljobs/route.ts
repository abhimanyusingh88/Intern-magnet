import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // const session = await auth.api.getSession({
        //     headers: await headers()
        // })
        // if (!session?.user) {
        //     return NextResponse.json(
        //         { message: "unauthorized user access" },
        //         { status: 401 }
        //     )
        // }
        const miniJobs = await prisma.unified_jobs.findMany(

            {
                take: 4,
            }

        )
        if (!miniJobs) return NextResponse.json(
            { message: "something went wrong, try again!" },
            { status: 401 }
        )
        const serializedJobs = JSON.parse(
            JSON.stringify(miniJobs, (key, value) =>
                typeof value === 'bigint' ? value.toString() : value
            )
        );

        return NextResponse.json(serializedJobs, { status: 200 });
    }
    catch (err) {
        return NextResponse.json(
            {
                message: "failed to get any job"
            },
            { status: 401 }
        )
    }
}