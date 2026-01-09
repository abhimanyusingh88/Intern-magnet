import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const JOBS_PER_PAGE = 10;

export async function GET(req: Request) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);

        // Pagination params
        const cursor = searchParams.get("cursor");
        const limit = Number(searchParams.get("limit")) || JOBS_PER_PAGE;

        // Filter params
        const minSalary = searchParams.get("minSalary");
        const maxSalary = searchParams.get("maxSalary");
        const jobAge = searchParams.get("jobAge"); // in days
        const skills = searchParams.get("skills"); // comma-separated
        const title = searchParams.get("title");
        const location = searchParams.get("location");
        const minExperience = searchParams.get("minExperience");
        const maxExperience = searchParams.get("maxExperience");
        const source = searchParams.get("source"); // 'naukri' or 'internal'


        const where: any = {};

        // Filter by source
        if (source) {
            where.source = source;
        }

        // Filter by title (case-insensitive search)
        if (title) {
            where.title = {
                contains: title,
                mode: 'insensitive'
            };
        }

        // Filter by location (case-insensitive search)
        if (location) {
            where.location = {
                contains: location,
                mode: 'insensitive'
            };
        }

        // Filter by job age (posted_at)
        if (jobAge) {
            const daysAgo = new Date();
            daysAgo.setDate(daysAgo.getDate() - parseInt(jobAge));
            where.posted_at = {
                gte: daysAgo
            };
        }

        console.log(`Fetching jobs with filters:`, { cursor, limit, where });

        const sortBy = searchParams.get("sortBy") || "recent";
        const sortOrder = sortBy === "oldest" ? "asc" : "desc";

        const jobs = await prisma.unified_jobs.findMany({
            where,
            take: limit + 1, // Fetch one extra to determine if there's a next page
            cursor: cursor ? { id: cursor } : undefined,
            orderBy: [
                { posted_at: sortOrder },
                { id: sortOrder },
            ],
        });

        let nextCursor: string | undefined = undefined;
        if (jobs.length > limit) {
            const nextItem = jobs.pop();
            nextCursor = nextItem?.id || undefined;
        }

        // Post-process filtering for salary, experience, and skills
        let filteredJobs = jobs.filter((job: any) => {
            // Filter by skills (check if job_description contains skills)
            if (skills) {
                const skillList = skills.toLowerCase().split(',').map(s => s.trim());
                const jobDesc = (job.job_description || '').toLowerCase();
                const hasSkill = skillList.some(skill => jobDesc.includes(skill));
                if (!hasSkill) return false;
            }

            // Filter by experience (parse the experience string)
            if (minExperience || maxExperience) {
                const expMatch = job.experience?.match(/(\d+)/);
                if (expMatch) {
                    const jobExp = parseInt(expMatch[1]);
                    if (minExperience && jobExp < parseInt(minExperience)) return false;
                    if (maxExperience && jobExp > parseInt(maxExperience)) return false;
                } else if (minExperience || maxExperience) {
                    // If we can't parse experience and filters are set, exclude the job
                    return false;
                }
            }

            // Filter by salary (parse salary ranges)
            if (minSalary || maxSalary) {
                const salaryMatch = job.salary?.match(/(\d+)/);
                if (salaryMatch) {
                    const jobSalary = parseInt(salaryMatch[1]);
                    if (minSalary && jobSalary < parseInt(minSalary)) return false;
                    if (maxSalary && jobSalary > parseInt(maxSalary)) return false;
                } else if (minSalary || maxSalary) {
                    // If we can't parse salary and filters are set, exclude the job
                    return false;
                }
            }

            return true;
        });

        // agar bigint hai usko pehle resolve karta hun bhot tang karta hai
        const serializedJobs = filteredJobs.map((job: any) => ({
            ...job,
            original_id: job.original_id?.toString(),
            experience: job.experience || "Not specified",
            salary: job.salary || "Not disclosed",
        }));

        return NextResponse.json({
            data: serializedJobs,
            nextCursor,
            count: serializedJobs.length,
        });

    } catch (error) {
        console.error("Error fetching unified jobs:", error);
        return NextResponse.json({
            message: "Failed to fetch jobs",
            error: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}
