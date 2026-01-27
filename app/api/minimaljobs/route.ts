import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getTimeAgo } from "@/lib/dateCount";

export async function GET() {
    try {
        const [internalJobs, naukriJobs] = await Promise.all([
            prisma.unified_jobs.findMany({
                where: { source: 'internal' },
                orderBy: { created_at: 'desc' },
                take: 4,
            }),
            prisma.unified_jobs.findMany({
                where: { source: 'naukri' },
                orderBy: { created_at: 'desc' },
                take: 4,
            }),
        ]);

        const miniJobs = [...internalJobs, ...naukriJobs].map(job => ({
            ...job,
            posted_ago: job.source === 'internal' && job.created_at ? getTimeAgo(job.created_at) : job.posted_ago
        }));

        const serializedJobs = JSON.parse(
            JSON.stringify(miniJobs, (key, value) =>
                typeof value === 'bigint' ? value.toString() : value
            )
        );

        return NextResponse.json(serializedJobs, { status: 200 });
    }
    catch (err) {
        return NextResponse.json({ message: "failed to get any job" }, { status: 500 });
    }
}