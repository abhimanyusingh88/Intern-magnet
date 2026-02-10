import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
// related info denge
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { user_id, job_id, missing_skills, improvement_plan } = body;

        const userJobReq = await prisma.userJobRequirements.create({
            data: {
                user_id,
                job_id: BigInt(job_id),
                missing_skills: typeof missing_skills === 'string' ? missing_skills : JSON.stringify(missing_skills),
                improvement_plan,
            },
        });

        return NextResponse.json({
            userJobReq: {
                ...userJobReq,
                id: userJobReq.id.toString(),
                job_id: userJobReq.job_id.toString()
            }
        });
    } catch (err: any) {
        console.error("API POST Error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}


export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");
    const job_id = searchParams.get("job_id");

    if (!user_id || !job_id) {
        return NextResponse.json({ error: "Missing query parameters" }, { status: 400 });
    }

    try {
        const userJobReq = await prisma.userJobRequirements.findFirst({
            where: {
                user_id,
                job_id: BigInt(job_id),
            },
        });

        return NextResponse.json({
            userJobReq: userJobReq ? {
                ...userJobReq,
                id: userJobReq.id.toString(),
                job_id: userJobReq.job_id.toString()
            } : null
        });
    } catch (err: any) {
        console.error("API GET Error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}