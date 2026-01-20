-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "college" TEXT,
    "course" TEXT,
    "address" TEXT,
    "dob" TEXT,
    "gender" TEXT,
    "preferred_job_type" TEXT,
    "availability" TEXT,
    "preferred_location" TEXT,
    "degree" TEXT,
    "college_edu" TEXT,
    "education_duration_start" TEXT,
    "education_duration_end" TEXT,
    "class_xii" TEXT,
    "class_xii_board" TEXT,
    "class_xii_details_start" TEXT,
    "class_xii_details_end" TEXT,
    "class_x" TEXT,
    "class_x_board" TEXT,
    "class_x_details_start" TEXT,
    "class_x_details_end" TEXT,
    "skills" TEXT,
    "language_1_name" TEXT,
    "language_1_proficiency" TEXT,
    "language_2_name" TEXT,
    "language_2_proficiency" TEXT,
    "internship_company" TEXT,
    "internship_duration_start" TEXT,
    "internship_duration_end" TEXT,
    "projects" TEXT,
    "profile_summary" TEXT,
    "certifications" TEXT,
    "awards" TEXT,
    "clubs" TEXT,
    "exam_name" TEXT,
    "exam_rank" TEXT,
    "resume_path" TEXT,
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recruiterhiring" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "company_name" TEXT NOT NULL,
    "job_title" TEXT NOT NULL,
    "work_experience_min" BIGINT NOT NULL,
    "work_experience_max" BIGINT NOT NULL,
    "salary_per_month_from" BIGINT NOT NULL,
    "salary_per_month_to" BIGINT NOT NULL,
    "additional_benefits" TEXT NOT NULL,
    "primary_skills" TEXT NOT NULL,
    "employment_type" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "job_description" TEXT NOT NULL,
    "application_deadline" TEXT NOT NULL,
    "number_of_applications" BIGINT NOT NULL,
    "educational_requirements" TEXT NOT NULL,
    "communication_preferences" TEXT NOT NULL,
    "user_id_recruiter" BIGINT NOT NULL,
    "good_to_have" TEXT,
    "key_responsibilities" TEXT,
    "what_we_offer" TEXT,
    "company_description" TEXT,
    "website_link" TEXT,
    "company_logo" TEXT,
    "preferred_qualifications" TEXT,
    "required_qualifications" TEXT,
    "why_join" TEXT,
    "skill_description" TEXT,
    "selection_process" TEXT,
    "draft" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "recruiterhiring_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "screening_questions" (
    "id" BIGSERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "recruiter_id" BIGINT NOT NULL,

    CONSTRAINT "screening_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_user" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "auth_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "auth_session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "idToken" TEXT,

    CONSTRAINT "auth_account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "auth_verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "naukri_jobs" (
    "id" BIGSERIAL NOT NULL,
    "data_job_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "rating" TEXT,
    "rating_href" TEXT,
    "rating_source_details" TEXT,
    "rating_source_no_reviews" TEXT,
    "experience" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "job_description" TEXT,
    "tags" TEXT,
    "job_post_day" TEXT,
    "logo_url" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "salary" TEXT,
    "posted_at" TIMESTAMPTZ(6),

    CONSTRAINT "naukri_jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "applied" (
    "id" BIGSERIAL NOT NULL,
    "job_id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "applied_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "viewed" BOOLEAN NOT NULL,

    CONSTRAINT "applied_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "auth_user_email_key" ON "auth_user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "auth_session_token_key" ON "auth_session"("token");

-- CreateIndex
CREATE UNIQUE INDEX "naukri_jobs_data_job_id_key" ON "naukri_jobs"("data_job_id");

-- CreateIndex
CREATE INDEX "naukri_jobs_created_at_idx" ON "naukri_jobs"("created_at");

-- CreateIndex
CREATE INDEX "naukri_jobs_data_job_id_idx" ON "naukri_jobs"("data_job_id");

-- AddForeignKey
ALTER TABLE "recruiterhiring" ADD CONSTRAINT "recruiterhiring_user_id_recruiter_fkey" FOREIGN KEY ("user_id_recruiter") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "screening_questions" ADD CONSTRAINT "screening_questions_recruiter_id_fkey" FOREIGN KEY ("recruiter_id") REFERENCES "recruiterhiring"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth_session" ADD CONSTRAINT "auth_session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth_account" ADD CONSTRAINT "auth_account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

