import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { GetRecruiter } from "@/lib/service";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const user = await GetRecruiter(session.user.email);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const recruiterJobs = await prisma.recruiterHiring.findMany({
            where: {
                recruiter_profile_id: user.id,
                draft: false
            },
            include: {
                screening_questions: true
            }
        });

        // Convert BigInt to string for JSON serialization
        const serializedJobs = JSON.parse(
            JSON.stringify(recruiterJobs, (key, value) =>
                typeof value === 'bigint' ? value.toString() : value
            )
        );
        // console.log(serializedJobs);

        return NextResponse.json(serializedJobs);
    }
    catch (err) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}