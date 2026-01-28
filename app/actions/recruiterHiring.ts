"use server"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { prisma } from "@/lib/prisma"
import { JobPostingSchema } from "@/lib/validationschema/zodvalidate"
import { FormData } from "@/lib/types/types"

export async function recruiterHiring(formData: FormData) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user?.email) {
        throw new Error("Unauthorized: You must be logged in to post a job.");
    }
    try {
        // Find the recruiter profile associated with this user
        const recruiterProfile = await prisma.recruiterProfile.findUnique({
            where: { userId: session.user.id },
        });

        if (!recruiterProfile) {
            throw new Error("Recruiter profile not found. Please create a recruiter profile first.");
        }

        // Create or update the recruiter hiring record and its screening questions in a transaction
        const result = await prisma.$transaction(async (tx) => {
            let hiringRecord;
            const commonData = {
                company_name: formData.company_name,
                job_title: formData.job_title,
                work_experience_min: BigInt(formData.work_experience_min || 0),
                work_experience_max: BigInt(formData.work_experience_max || 0),
                salary_per_month_from: BigInt(formData.salary_per_month_from || 0),
                salary_per_month_to: BigInt(formData.salary_per_month_to || 0),
                additional_benefits: formData.additional_benefits,
                primary_skills: formData.primary_skills,
                employment_type: formData.employment_type,
                location: formData.location,
                job_description: formData.job_description,
                application_deadline: formData.application_deadline,
                number_of_applications: BigInt(formData.number_of_applications || 0),
                educational_requirements: formData.educational_requirements,
                communication_preferences: formData.communication_preferences,
                key_responsibilities: formData.key_responsibilities,
                good_to_have: formData.good_to_have,
                what_we_offer: formData.what_we_offer,
                company_description: formData.company_description,
                website_link: formData.website_link,
                company_logo: formData.company_logo,
                why_join: formData.why_join,
                required_qualifications: formData.required_qualifications,
                preferred_qualifications: formData.preferred_qualifications,
                recruiter_profile_id: recruiterProfile.id,
                draft: formData.draft ?? false,
                created_at: formData.created_at,
                job_form_link: formData.job_form_link,
            };

            const validatedCommonData = JobPostingSchema.partial().parse(commonData);

            // Check if we should update an existing record
            let shouldUpdate = false;
            if (formData.id && formData.id.trim() !== "") {
                try {
                    const idBigInt = BigInt(formData.id);
                    // Verify the record exists AND belongs to this recruiter
                    const existing = await tx.recruiterHiring.findFirst({
                        where: {
                            id: idBigInt,
                            recruiter_profile_id: recruiterProfile.id
                        }
                    });
                    if (existing) {
                        shouldUpdate = true;
                    }
                } catch (e) {
                    throw new Error("Not able to perform this action currently");
                }
            }

            if (shouldUpdate && formData.id) {
                const existingdata = await tx.recruiterHiring.findFirst({
                    where: {
                        id: BigInt(formData.id),
                        recruiter_profile_id: recruiterProfile.id
                    }
                })
                const updatedData = {
                    ...commonData
                };

                if (existingdata?.draft && !formData.draft) {
                    updatedData.created_at = new Date().toISOString();
                }
                // Update existing record
                hiringRecord = await tx.recruiterHiring.update({
                    where: { id: BigInt(formData.id) },
                    data: validatedCommonData as any,
                });

                // Clear existing screening questions
                await tx.screeningQuestion.deleteMany({
                    where: { recruiter_id: hiringRecord.id },
                });
            } else {
                // Create new record
                hiringRecord = await tx.recruiterHiring.create({
                    data: validatedCommonData as any,
                });
            }

            // Create screening questions if they exist
            if (formData.screening_questions && formData.screening_questions.length > 0) {
                const validQuestions = formData.screening_questions
                    .filter(sq => sq.question.trim() !== "")
                    .map((sq) => ({
                        question: sq.question,
                        type: sq.type,
                        recruiter_id: hiringRecord.id,
                    }));

                if (validQuestions.length > 0) {
                    await tx.screeningQuestion.createMany({
                        data: validQuestions,
                    });
                }
            }

            return hiringRecord;
        });

        console.log(`Job post ${formData.id ? 'updated' : 'created'} successfully with ID:`, result.id.toString());
        return { success: true, id: result.id.toString() };
    } catch (error) {
        console.error("Error in recruiterHiring action:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to submit job post: ${error.message}`);
        }
        throw new Error("Failed to submit job post due to an unknown error.");
    }
}
