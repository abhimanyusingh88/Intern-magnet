SELECT
  ('naukri_' :: text || (naukri_jobs.id) :: text) AS id,
  naukri_jobs.id AS original_id,
  'naukri' :: text AS source,
  naukri_jobs.title,
  naukri_jobs.company_name,
  naukri_jobs.location,
  naukri_jobs.experience,
  naukri_jobs.salary,
  naukri_jobs.job_description,
  naukri_jobs.job_post_day AS posted_ago,
  naukri_jobs.logo_url,
  naukri_jobs.link AS apply_link,
  naukri_jobs.created_at,
  naukri_jobs.posted_at
FROM
  naukri_jobs
UNION
ALL
SELECT
  ('internal_' :: text || (recruiterhiring.id) :: text) AS id,
  recruiterhiring.id AS original_id,
  'internal' :: text AS source,
  recruiterhiring.job_title AS title,
  recruiterhiring.company_name,
  recruiterhiring.location,
  (
    (
      (
        (recruiterhiring.work_experience_min) :: text || '-' :: text
      ) || (recruiterhiring.work_experience_max) :: text
    ) || ' years' :: text
  ) AS experience,
  (
    (
      (recruiterhiring.salary_per_month_from) :: text || '-' :: text
    ) || (recruiterhiring.salary_per_month_to) :: text
  ) AS salary,
  recruiterhiring.job_description,
  NULL :: text AS posted_ago,
  recruiterhiring.company_logo AS logo_url,
  ('/jobs/' :: text || (recruiterhiring.id) :: text) AS apply_link,
  recruiterhiring.created_at,
  recruiterhiring.created_at AS posted_at
FROM
  recruiterhiring
WHERE
  (recruiterhiring.draft = false);