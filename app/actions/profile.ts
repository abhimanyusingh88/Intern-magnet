"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function updateProfile(formData: FormData): Promise<string | undefined> {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    if (!session?.user?.email) throw new Error("Unauthorized");
    if (!formData) throw new Error("Missing form data");

    try {
        const user = await prisma.legacyUser.findFirst({
            where: { email: session.user.email },
        });

        if (!user) return;
        const resumeFile = formData.get("resume_file") as File || null;

        const entries = Object.fromEntries(formData.entries());
        const { email: _ignored, resume_path, resume_file, ...formFields } = entries;

        const updateData: Record<string, any> = {};

        for (const key in formFields) {
            if (!(key in user)) continue;

            const dbValue = (user as any)[key];
            const formValue = String(formFields[key]);

            const dbString =
                dbValue === null || dbValue === undefined ? "" : String(dbValue);

            if (dbString !== formValue) {
                updateData[key] = formValue;
            }
        }

        const hasTextChanges = Object.keys(updateData).length > 0;
        const hasResume = !!resumeFile;

        if (!hasTextChanges && !hasResume) {
            console.log("-> No changes detected. Skipping DB update.");
            return;
        }

        updateData.updated_at = new Date();

        if (resumeFile) {
            console.log("-> Attempting to upload resume:", resumeFile.name, "Size:", resumeFile.size);
            const newPath = `${user.id}/resume_path-${Date.now()}-${resumeFile.name}`;

            const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
                .from("resumes")
                .upload(newPath, resumeFile, {
                    contentType: resumeFile.type,
                    upsert: true,
                });

            if (uploadError) {
                console.error("-> Supabase upload error:", uploadError);
                throw new Error("Failed to upload info to storage");
            }

            console.log("-> Upload successful, data:", uploadData);
            updateData.resume_path = newPath;
        }

        await prisma.legacyUser.update({
            where: { id: user.id },
            data: updateData,
        });

        console.log("-> Updating fields:", Object.keys(updateData));
        revalidatePath("/profile");

        return updateData.resume_path;

    } catch (err: any) {
        console.error("Error updating profile:", err);
        throw new Error(err.message || "Data validation failed");
    }
}
