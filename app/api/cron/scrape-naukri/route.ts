import { NextRequest, NextResponse } from 'next/server';
import { scrapeNaukriJobs } from '@/lib/scrapeNaukriJobs';
import { insertNaukriJobs } from '@/lib/insertNaukriJobs';
import { cleanupOldJobs } from '@/lib/cleanupOldJobs';

export async function GET(request: NextRequest) {
    const startTime = Date.now();

    try {
        const authHeader = request.headers.get('authorization');
        const cronSecret = process.env.CRON_SECRET;

        if (process.env.NODE_ENV === 'production' && cronSecret) {
            if (authHeader !== `Bearer ${cronSecret}`) {
                console.error('Unauthorized cron job attempt');
                return NextResponse.json(
                    { error: 'Unauthorized' },
                    { status: 401 }
                );
            }
        }

        console.log('\n🚀 Starting Naukri job scraping cron job...');
        console.log(`Timestamp: ${new Date().toISOString()}`);

        console.log('\n📅 Step 1: Cleaning up old jobs...');
        const deletedCount = await cleanupOldJobs();

        console.log('\n🔍 Step 2: Scraping Naukri.com...');
        const scrapedJobs = await scrapeNaukriJobs(600);

        console.log('\n💾 Step 3: Inserting jobs into database...');
        const insertedCount = await insertNaukriJobs(scrapedJobs);

        const duration = ((Date.now() - startTime) / 1000).toFixed(2);

        const result = {
            success: true,
            timestamp: new Date().toISOString(),
            duration: `${duration}s`,
            stats: {
                scrapedJobs: scrapedJobs.length,
                insertedJobs: insertedCount,
                duplicatesSkipped: scrapedJobs.length - insertedCount,
                oldJobsDeleted: deletedCount,
            },
        };

        console.log('\n✅ Cron job completed successfully!');
        console.log('Stats:', result.stats);

        return NextResponse.json(result);

    } catch (error) {
        const duration = ((Date.now() - startTime) / 1000).toFixed(2);

        console.error('\n❌ Cron job failed:', error);

        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
                timestamp: new Date().toISOString(),
                duration: `${duration}s`,
            },
            { status: 500 }
        );
    }
}
