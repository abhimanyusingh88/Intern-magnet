import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
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

        // Extract jobId from URL search params (GET requests should not have bodies)
        const { searchParams } = new URL(request.url);
        const jobId = searchParams.get('jobId');

        if (!jobId) {
            return NextResponse.json(
                { message: "Job ID is required" },
                { status: 400 }
            )
        }

        const applied = await prisma.applied.findMany({
            where: {
                user_id: session.user.email, // user_id stores email as string
                job_id: BigInt(jobId)
            }
        })

        // Convert BigInts to strings for JSON serialization
        const serializedData = JSON.parse(JSON.stringify(applied, (key, value) =>
            typeof value === 'bigint'
                ? value.toString()
                : value // return everything else unchanged
        ));

        return NextResponse.json({
            success: true,
            hasApplied: applied.length > 0,
            data: serializedData
        })
    }
    catch (err) {
        console.error("Error checking application status:", err);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        )
    }
}