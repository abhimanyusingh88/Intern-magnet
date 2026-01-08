import { prisma } from "@/lib/prisma";
import { GetUser } from "@/lib/service";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = await GetUser(session.user.email);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const { id } = await params;
        const job = await prisma.recruiterHiring.findFirst({
            where: {
                id: BigInt(id),
                user_id_recruiter: user.id
            },
            include: {
                screening_questions: true
            },
            orderBy: {
                created_at: "asc",
            },
        });

        if (!job) {
            return NextResponse.json({ error: "Job not found" }, { status: 404 });
        }

        // Convert BigInt to string and handle serialization
        return NextResponse.json(JSON.parse(
            JSON.stringify(job, (key, value) =>
                typeof value === 'bigint' ? value.toString() : value
            )
        ));
    } catch (err) {
        console.error("Error fetching job details:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
