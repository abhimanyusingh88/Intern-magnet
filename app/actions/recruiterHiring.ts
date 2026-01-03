"use server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { FormData } from "@/lib/types/types"

export async function recruiterHiring(formData: FormData) {
    const session = await auth();

    if (!session?.user?.email) {
        throw new Error("Unauthorized: You must be logged in to post a job.");
    }

    try {
        // Find the user ID from the email
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });
        if (!user) {
            throw new Error("User not found.");
        }

        // Create the recruiter hiring record and its screening questions in a transaction
        const result = await prisma.$transaction(async (tx) => {
            const hiringRecord = await tx.recruiterHiring.create({
                data: {
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
                    user_id_recruiter: user.id,
                },
            });

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

        console.log("Job post created successfully with ID:", result.id.toString());
        return { success: true, id: result.id.toString() };
    } catch (error) {
        console.error("Error in recruiterHiring action:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to submit job post: ${error.message}`);
        }
        throw new Error("Failed to submit job post due to an unknown error.");
    }
}
