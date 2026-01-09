import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Testing UnifiedJob view query...');

    try {
        const jobs = await prisma.unifiedJob.findMany({
            take: 5,
            orderBy: {
                created_at: 'desc'
            }
        });

        console.log(`Found ${jobs.length} jobs in unified view.`);
        if (jobs.length > 0) {
            console.log('Sample job:', JSON.stringify(jobs[0], (key, value) => {
                return typeof value === 'bigint' ? value.toString() : value;
            }, 2));
        } else {
            console.log("No jobs found. Make sure NaukriJob or RecruiterHiring tables have data.");
        }

    } catch (error) {
        console.error('Error querying unified job view:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
