import { parseSalaryToLakhs } from "@/components/utils/salaryPraser";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const JOBS_PER_PAGE = 10;


export async function GET(req: Request) {
    try {


        const { searchParams } = new URL(req.url);

        // Pagination params
        const cursor = searchParams.get("cursor");
        const limit = Number(searchParams.get("limit")) || JOBS_PER_PAGE;

        // Filter params
        const minSalaryParam = searchParams.get("minSalary");
        const maxSalaryParam = searchParams.get("maxSalary");
        const minSalary = minSalaryParam !== null ? parseInt(minSalaryParam) : null;
        const maxSalary = maxSalaryParam !== null ? parseInt(maxSalaryParam) : null;
        const jobAge = searchParams.get("jobAge"); // in days
        const skills = searchParams.get("skills"); // comma-separated
        const title = searchParams.get("title");
        const location = searchParams.get("location");
        const minExperienceParam = searchParams.get("minExperience");
        const maxExperienceParam = searchParams.get("maxExperience");
        const minExperience = minExperienceParam !== null ? parseInt(minExperienceParam) : null;
        const maxExperience = maxExperienceParam !== null ? parseInt(maxExperienceParam) : null;
        const source = searchParams.get("source"); // 'naukri' or 'internal'


        const where: any = {};

        if (title) {
            where.title = {
                contains: title,
                mode: 'insensitive'
            };
        }

        if (location) {
            where.location = {
                contains: location,
                mode: 'insensitive'
            };
        }

        if (source) {
            where.source = source;
        }

        if (jobAge) {
            const date = new Date();
            date.setDate(date.getDate() - parseInt(jobAge));
            where.posted_at = {
                gte: date
            };
        }

        if (skills) {
            const skillList = skills.toLowerCase().split(',').map(s => s.trim());
            where.OR = skillList.map(skill => ({
                job_description: {
                    contains: skill,
                    mode: 'insensitive'
                }
            }));
        }

        console.log(`Fetching jobs with filters:`, { cursor, limit, where });

        const sortBy = searchParams.get("sortBy") || "recent";
        const sortOrder = sortBy === "oldest" ? "asc" : "desc";

        let allFilteredJobs: any[] = [];
        let currentCursor = cursor;
        let finalNextCursor: string | undefined = undefined;
        let attempts = 0;
        const MAX_ATTEMPTS = 10; // Look through more batches to fill the limit

        while (allFilteredJobs.length < limit && attempts < MAX_ATTEMPTS) {
            attempts++;
            const jobs = await prisma.unified_jobs.findMany({
                where,
                take: limit + 1,
                cursor: currentCursor ? { id: currentCursor } : undefined,
                orderBy: [
                    { posted_at: sortOrder },
                    { id: sortOrder },
                ],
            });

            if (jobs.length === 0) break;

            let nextBatchCursor: string | undefined = undefined;
            let currentBatch = [...jobs];

            if (jobs.length > limit) {
                const nextItem = currentBatch.pop();
                nextBatchCursor = nextItem?.id || undefined;
            }

            // Post-process filtering for salary and experience
            let filteredBatch = currentBatch.filter((job: any) => {
                // Filter by experience range
                if (minExperience !== null || maxExperience !== null) {
                    const expMatches = job.experience?.match(/\d+/g);
                    if (expMatches) {
                        const jobMinExp = parseInt(expMatches[0]);
                        const jobMaxExp = expMatches.length > 1 ? parseInt(expMatches[1]) : jobMinExp;

                        // Specific check: job must fit within the user's requested range
                        if (minExperience !== null && jobMaxExp < minExperience) return false;
                        if (maxExperience !== null && jobMaxExp > maxExperience) return false;
                    } else {
                        // If experience is not parseable but filter is applied, exclude it
                        return false;
                    }
                }

                // Filter by salary (normalized to Lakhs)
                if (minSalary !== null || maxSalary !== null) {
                    const jobSalaryInLakhs = parseSalaryToLakhs(job.salary, job.source);
                    if (jobSalaryInLakhs !== null) {
                        if (minSalary !== null && jobSalaryInLakhs < minSalary) return false;
                        if (maxSalary !== null && jobSalaryInLakhs > maxSalary) return false;
                    } else {
                        // If filter is applied but salary is missing/unparseable, exclude it
                        return false;
                    }
                }

                return true;
            });

            allFilteredJobs = [...allFilteredJobs, ...filteredBatch];
            currentCursor = nextBatchCursor || null;
            finalNextCursor = nextBatchCursor;

            // If we didn't find any in this batch and there's no more, stop
            if (!nextBatchCursor) break;
            // If we found enough, stop
            if (allFilteredJobs.length >= limit) {
                allFilteredJobs = allFilteredJobs.slice(0, limit);
                break;
            }
        }

        // agar bigint hai usko pehle resolve karta hun bhot tang karta hai
        const serializedJobs = allFilteredJobs.map((job: any) => ({
            ...job,
            original_id: job.original_id?.toString(),
            experience: job.experience || "Not specified",
            salary: job.salary || "Not disclosed",
        }));

        return NextResponse.json({
            data: serializedJobs,
            nextCursor: (finalNextCursor as string | null) || null,
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
