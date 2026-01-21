// import { PrismaClient } from '@prisma/client';

import { prisma } from "./prisma";



/**
 * Deletes Naukri jobs older than 7 days
 * @returns Count of deleted jobs
 */
export async function cleanupOldJobs(): Promise<number> {
    console.log('Cleaning up jobs older than 7 days...');

    try {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const result = await prisma.naukriJob.deleteMany({
            where: {
                created_at: {
                    lt: sevenDaysAgo,
                },
            },
        });

        console.log(`✅ Deleted ${result.count} old jobs`);
        return result.count;

    } catch (error) {
        console.error('Error cleaning up old jobs:', error);
        throw error;
    } finally {

    }
}
