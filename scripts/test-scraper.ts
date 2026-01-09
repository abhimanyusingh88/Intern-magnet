import { scrapeNaukriJobs } from '../lib/scrapeNaukriJobs';
import { insertNaukriJobs } from '../lib/insertNaukriJobs';
import { cleanupOldJobs } from '../lib/cleanupOldJobs';

async function runTest() {
    console.log('🚀 Starting test run of Naukri Job Scraper...');
    const startTime = Date.now();

    try {

        console.log('\n📅 Step 1: Testing cleanup...');
        const deletedCount = await cleanupOldJobs();


        console.log('\n🔍 Step 2: Testing scraper (limit: 300 jobs for test)...');
        const scrapedJobs = await scrapeNaukriJobs(300);


        console.log('\n💾 Step 3: Testing database insertion...');
        const insertedCount = await insertNaukriJobs(scrapedJobs);

        const duration = ((Date.now() - startTime) / 1000).toFixed(2);

        console.log('\n✅ Test run completed successfully!');
        console.log(`⏱️ Duration: ${duration}s`);
        console.log('📊 Stats:', {
            scraped: scrapedJobs.length,
            inserted: insertedCount,
            deletedOld: deletedCount
        });

    } catch (error) {
        console.error('\n❌ Test run failed:', error);
        process.exit(1);
    }
}

runTest();
