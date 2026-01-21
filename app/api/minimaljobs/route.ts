import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getTimeAgo } from "@/lib/dateCount";

export async function GET() {
    try {
        // yha auth ka koi kaam nii because thode sabko jobs dikhana hai
        const [internalJobs, naukriJobs] = await Promise.all([
            prisma.unified_jobs.findMany({
                where: { source: 'internal' },
                orderBy: { created_at: 'desc' },
                take: 2,
            }),
            prisma.unified_jobs.findMany({
                where: { source: 'naukri' },
                orderBy: { created_at: 'desc' },
                take: 2,
            }),
        ]);

        const miniJobs = [...internalJobs, ...naukriJobs].map(job => ({
            ...job,
            posted_ago: job.source === 'internal' && job.created_at ? getTimeAgo(job.created_at) : job.posted_ago
        }));

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