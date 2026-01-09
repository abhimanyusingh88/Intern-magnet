import { PrismaClient } from '@prisma/client';
import { NaukriJobData } from './scrapeNaukriJobs';

const prisma = new PrismaClient();

/**
 * Inserts Naukri jobs into the database
 * @param jobs - Array of job data to insert
 * @returns Count of successfully inserted jobs
 */
export async function insertNaukriJobs(jobs: NaukriJobData[]): Promise<number> {
    if (jobs.length === 0) {
        console.log('No jobs to insert');
        return 0;
    }

    console.log(`Inserting ${jobs.length} jobs into database...`);

    try {
        // Transform jobs to match database schema
        const jobsToInsert = jobs.map(job => ({
            data_job_id: job.dataJobId,
            title: job.title,
            link: job.link,
            company_name: job.companyName,
            rating: job.rating || null,
            rating_href: job.ratingHref || null,
            rating_source_details: job.ratingSourceDetails || null,
            rating_source_no_reviews: job.ratingSourceNoReviews || null,
            experience: job.experience,
            location: job.location,
            job_description: job.jobDescription || null,
            tags: job.tags ? JSON.stringify(job.tags) : null,
            job_post_day: job.jobPostDay || null,
            logo_url: job.logoUrl || null,
            salary: job.salary || null,
        }));

        // Use createMany with skipDuplicates to handle duplicates gracefully
        const result = await prisma.naukriJob.createMany({
            data: jobsToInsert,
            skipDuplicates: true, // Skip jobs with duplicate data_job_id
        });

        console.log(`✅ Successfully inserted ${result.count} new jobs`);

        if (result.count < jobs.length) {
            console.log(`ℹ️  Skipped ${jobs.length - result.count} duplicate jobs`);
        }

        return result.count;

    } catch (error) {
        console.error('Error inserting jobs:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}
