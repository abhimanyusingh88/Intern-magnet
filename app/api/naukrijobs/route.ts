import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

import { headers } from "next/headers";

export async function GET() {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });
        if (!session?.user) {
            return NextResponse.json(
                { message: "Unauthorized user access" },
                { status: 401 }
            )
        }
        const naukriJobs = await prisma.naukriJob.findMany();

        // Convert BigInt id to string for JSON serialization
        const serializedJobs = naukriJobs.map((job: any) => ({
            ...job,
            id: job.id.toString()
        }));




        console.log(serializedJobs);
        return NextResponse.json({ data: serializedJobs }, { status: 200 });
    }
    catch (err) {
        console.error("API Error:", err);
        return NextResponse.json({
            message: "failed to get any data",
            error: err instanceof Error ? err.message : String(err)
        }, { status: 500 });
    }
}