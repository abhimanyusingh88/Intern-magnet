"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { RecruiterProfileSchema } from "@/lib/validationschema/zodvalidate";

export async function updateRecruiterProfile(formData: FormData) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user?.id) {
        return {
            success: false,
            message: "please login to update profile"
        }
    }

    const userId = session.user.id;
    const name = formData.get("recruiter_name") as string;
    const email = formData.get("email") as string;
    const contact = formData.get("contact_number") as string;
    const address = formData.get("address") as string;
    const designation = formData.get("designation") as string;
    const organisation = formData.get("organisation_name") as string;
    const website = formData.get("website") as string;
    const domain = formData.get("company_domain") as string;
    const hiringFor = formData.get("hiring_for") as string;

    try {
        const updateData = {
            recruiter_name: name || "",
            email: email || session.user.email || "",
            contact_number: contact,
            address: address,
            designation: designation,
            organisation_name: organisation,
            website: website,
            company_domain: domain,
            hiring_for: hiringFor,
        };

        const validation = RecruiterProfileSchema.partial().safeParse(updateData);

        if (!validation.success) {
            return {
                success: false,
                message: validation.error.issues.map((issue) => ({
                    path: issue.path,
                    message: issue.message
                }))
            }
        }

        const profile = await prisma.recruiterProfile.upsert({
            where: { userId },
            update: validation.data,
            create: {
                userId,
                recruiter_name: validation.data.recruiter_name || (session.user as any).name || "Anonymous Recruiter",
                ...validation.data,
            } as any,
        });

        revalidatePath("/profile");

        return {
            success: true,
            message: "Profile updated successfully",
            id: profile.id.toString()
        };
    } catch (err: any) {
        console.error("Error updating recruiter profile:", err);
        return {
            success: false,
            message: err instanceof Error ? err.message : "Failed to update recruiter profile"
        };
    }
}
