import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user?.email) {
            return NextResponse.json(
                { error: "Unauthorized: You must be logged in to update a job." },
                { status: 401 }
            );
        }
        const { id } = await params;
        const body = await request.json();

        const user = await prisma.recruiterProfile.findFirst({
            where: { email: session.user.email },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found." }, { status: 404 });
        }

        const updatedJob = await prisma.recruiterHiring.update({
            where: { id: BigInt(id) },
            data: {
                company_name: body.company_name,
                job_title: body.job_title,
                work_experience_min: BigInt(body.work_experience_min || 0),
                work_experience_max: BigInt(body.work_experience_max || 0),
                salary_per_month_from: BigInt(body.salary_per_month_from || 0),
                salary_per_month_to: BigInt(body.salary_per_month_to || 0),
                additional_benefits: body.additional_benefits,
                primary_skills: body.primary_skills,
                employment_type: body.employment_type,
                location: body.location,
                job_description: body.job_description,
                application_deadline: body.application_deadline,
                number_of_applications: BigInt(body.number_of_applications || 0),
                educational_requirements: body.educational_requirements,
                communication_preferences: body.communication_preferences,
                key_responsibilities: body.key_responsibilities,
                good_to_have: body.good_to_have,
                what_we_offer: body.what_we_offer,
                company_description: body.company_description,
                website_link: body.website_link,
                why_join: body.why_join,
                required_qualifications: body.required_qualifications,
                preferred_qualifications: body.preferred_qualifications,
                skill_description: body.skill_description,
                role: body.role,
                selection_process: body.selection_process,
            },
        });

        console.log(
            "Job post updated successfully with ID:",
            updatedJob.id.toString()
        );

        return NextResponse.json({
            success: true,
            id: updatedJob.id.toString(),
        });
    } catch (error) {
        console.error("Error updating job:", error);
        return NextResponse.json(
            { error: "Failed to update job post" },
            { status: 500 }
        );
    }
}