import puppeteer from 'puppeteer';

export interface NaukriJobData {
    dataJobId: string;
    title: string;
    link: string;
    companyName: string;
    rating?: string | null;
    ratingHref?: string | null;
    ratingSourceDetails?: string | null;
    ratingSourceNoReviews?: string | null;
    experience: string;
    location: string;
    jobDescription?: string | null;
    tags?: string[] | null;
    jobPostDay?: string | null;
    logoUrl?: string | null;
    salary?: string | null;
}

const REQUIRED_FIELDS = ['dataJobId', 'title', 'link', 'companyName', 'location', 'experience'] as const;

/**
 * Validates that a job has all required fields
 */
function isValidJob(job: any): job is NaukriJobData {
    if (!job || typeof job !== 'object') return false;

    return REQUIRED_FIELDS.every(field => {
        const value = job[field];
        return value !== null && value !== undefined && value !== '';
    });
}

export async function scrapeNaukriJobs(targetJobs: number = 600): Promise<NaukriJobData[]> {
    const baseUrl = 'https://www.naukri.com/software-developer-jobs';
    const jobAgeParam = '3'; // Only jobs posted in last 3 days

    console.log(`Starting Naukri scraper - Target: ${targetJobs} jobs`);

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();
        await page.setUserAgent(
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36"
        );

        let allJobs: NaukriJobData[] = [];
        let pageNum = 1;
        let consecutiveEmptyPages = 0;
        const MAX_EMPTY_PAGES = 3;

        while (allJobs.length < targetJobs && consecutiveEmptyPages < MAX_EMPTY_PAGES) {
            const url = `${baseUrl}-${pageNum}?jobAge=${jobAgeParam}`;
            console.log(`Scraping page ${pageNum}... (Current total: ${allJobs.length})`);

            try {
                await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
                await page.waitForSelector(".srp-jobtuple-wrapper", { timeout: 10000 });

                const jobs = await page.$$eval(".srp-jobtuple-wrapper", (elements) => {
                    return elements.map((job) => {
                        // Extract data-job-id from the wrapper element
                        const dataJobId = job.getAttribute('data-job-id');

                        const companySelector = job.querySelector(".comp-name");
                        const rating = job.querySelector(".rating");
                        const titleSelector = job.querySelector(".title");
                        const ratingSource = job.querySelector(".review");
                        const experience = job.querySelector(".expwdth");
                        const location = job.querySelector(".locWdth");
                        const jobDescription = job.querySelector(".job-desc");
                        const tags = job.querySelectorAll("li");
                        const jobPostDay = job.querySelector(".job-post-day");
                        const logoUrl = job.querySelector(".logoImage");
                        const salaryElement = job.querySelector(".sal-wrap");

                        return {
                            dataJobId: dataJobId || null,
                            title: titleSelector ? (titleSelector as HTMLAnchorElement).innerText : null,
                            link: titleSelector ? (titleSelector as HTMLAnchorElement).href : null,
                            companyName: companySelector ? companySelector.textContent?.trim() : null,
                            ratingHref: rating ? (rating as HTMLAnchorElement).href : null,
                            rating: rating ? rating.textContent?.trim() : null,
                            ratingSourceDetails: ratingSource ? ratingSource.getAttribute('title') : null,
                            ratingSourceNoReviews: ratingSource ? ratingSource.textContent?.trim() : null,
                            experience: experience ? experience.getAttribute('title') : null,
                            location: location ? location.getAttribute('title') : null,
                            jobDescription: jobDescription ? jobDescription.textContent?.trim() : null,
                            tags: tags ? Array.from(tags).map(tag => tag.textContent?.trim() || '') : null,
                            jobPostDay: jobPostDay ? jobPostDay.textContent?.trim() : null,
                            logoUrl: logoUrl ? (logoUrl as HTMLImageElement).src : null,
                            salary: salaryElement ? (salaryElement.querySelector('[title]')?.getAttribute('title') || salaryElement.textContent?.trim() || null) : null
                        };
                    });
                });

                // Filter out jobs with missing required fields
                const validJobs = jobs.filter(isValidJob);
                const discardedCount = jobs.length - validJobs.length;

                if (discardedCount > 0) {
                    console.log(`  ⚠️  Discarded ${discardedCount} jobs with missing required fields`);
                }

                if (validJobs.length === 0) {
                    consecutiveEmptyPages++;
                    console.log(`  ⚠️  No valid jobs found on page ${pageNum} (${consecutiveEmptyPages}/${MAX_EMPTY_PAGES})`);
                } else {
                    consecutiveEmptyPages = 0;
                    allJobs = allJobs.concat(validJobs as NaukriJobData[]);
                    console.log(`  ✓ Page ${pageNum}: Found ${validJobs.length} valid jobs. Total: ${allJobs.length}`);
                }

                // Stop if we've reached target
                if (allJobs.length >= targetJobs) {
                    allJobs = allJobs.slice(0, targetJobs);
                    break;
                }

                pageNum++;

                // Add delay between pages to avoid rate limiting
                await new Promise(resolve => setTimeout(resolve, 2000));

            } catch (error) {
                console.error(`Error scraping page ${pageNum}:`, error);
                consecutiveEmptyPages++;
            }
        }

        console.log(`\n✅ Scraping complete! Total valid jobs: ${allJobs.length}`);
        return allJobs;

    } catch (error) {
        console.error('Fatal error during scraping:', error);
        throw error;
    } finally {
        await browser.close();
    }
}
