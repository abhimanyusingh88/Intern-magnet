import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Creating unified_jobs view...');

    try {
        await prisma.$executeRawUnsafe(`DROP VIEW IF EXISTS "unified_jobs";`);

        await prisma.$executeRawUnsafe(`
      CREATE VIEW "unified_jobs" AS
      SELECT
          'naukri_' || id::text AS id,
          id AS original_id,
          'naukri' AS source,
          title,
          company_name,
          location,
          experience,
          salary,
          job_description,
          job_post_day AS posted_ago,
          logo_url,
          link AS apply_link,
          created_at,
          posted_at
      FROM "naukri_jobs"

      UNION ALL

      SELECT
          'internal_' || id::text AS id,
          id AS original_id,
          'internal' AS source,
          job_title AS title,
          company_name,
          location,
          work_experience_min::text || '-' || work_experience_max::text || ' years' AS experience,
          salary_per_month_from::text || '-' || salary_per_month_to::text AS salary,
          job_description,
          NULL AS posted_ago,
          company_logo AS logo_url,
          '/jobs/' || id::text AS apply_link,
          created_at,
          created_at AS posted_at
      FROM "recruiterhiring"
      WHERE draft = false;
    `);

        console.log('✅ Successfully created "unified_jobs" view.');

    } catch (error) {
        console.error('❌ Error creating view:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
