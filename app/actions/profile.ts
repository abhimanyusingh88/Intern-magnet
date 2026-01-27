"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { SeekerProfileSchema } from "@/lib/validationschema/zodvalidate";

export async function updateProfile(formData: FormData): Promise<string | undefined> {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.email) throw new Error("Unauthorized");
    if (!formData) throw new Error("Missing form data");

    try {
        let user = await prisma.legacyUser.findFirst({
            where: { email: session.user.email },
        });

        if (!user) {
            user = await prisma.legacyUser.create({
                data: {
                    email: session.user.email,
                    name: session.user.name || "",
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            });
            console.log(`[Profile] Created new legacy user for ${session.user.email}`);
        }

        const u: any = user;
        const resumeFile = formData.get("resume_file") as File | null;
        const entries = Object.fromEntries(formData.entries());
        const updateData: Record<string, any> = {};

        const isItemEmpty = (item: any) => {
            if (item == null) return true;
            if (typeof item === "string") return item.trim() === "";
            if (typeof item !== "object") return false;
            return Object.values(item).every(val =>
                val == null ||
                (typeof val === "string" && val.trim() === "") ||
                (Array.isArray(val) && val.length === 0)
            );
        };

        /* -------------------- ARRAY ATOMIC COMMAND -------------------- */
        const jsonCommand = entries.json_command;
        if (jsonCommand && typeof jsonCommand === "string") {
            try {
                const { field, action, item, index } = JSON.parse(jsonCommand);
                const allowed = ["internships", "projects", "certifications", "exams", "skills"];

                if (allowed.includes(field) && u[field] !== undefined) {
                    const arr = Array.isArray(u[field]) ? [...u[field]] : [];

                    if (action === "add" && item && !isItemEmpty(item)) arr.push(item);
                    if (action === "edit" && index !== undefined && item && !isItemEmpty(item)) arr[index] = item;
                    if (action === "delete" && index !== undefined) arr.splice(index, 1);

                    updateData[field] = arr;
                }
            } catch (err) {
                console.error("json_command error:", err);
            }
        }

        /* -------------------- SIMPLE TEXT FIELDS -------------------- */
        const textFields = [
            "name", "phone", "college", "course", "dob", "gender", "address",
            "preferred_job_type", "availability", "preferred_location",
            "degree", "college_edu", "college_grade", "education_duration_start", "education_duration_end",
            "class_xii", "class_xii_board", "class_xii_grade", "class_xii_details_start", "class_xii_details_end",
            "class_x", "class_x_board", "class_x_grade", "class_x_details_start", "class_x_details_end",
            "language_1_name", "language_1_proficiency", "language_2_name", "language_2_proficiency",
            "profile_summary", "awards", "clubs"
        ];

        for (const key of textFields) {
            const formVal = formData.get(key);
            if (formVal == null) continue;

            const dbVal = u[key] ?? "";
            if (String(dbVal) !== String(formVal)) {
                updateData[key] = String(formVal);
            }
        }

        /* -------------------- FULL ARRAY REPLACEMENTS -------------------- */
        const complexFields = ["skills", "internships", "projects", "certifications", "exams"];

        for (const key of complexFields) {
            const raw = formData.get(key);
            if (raw == null) continue;

            let parsed: any[] = [];
            try {
                const v = typeof raw === "string" ? JSON.parse(raw) : raw;
                parsed = Array.isArray(v) ? v.filter(i => !isItemEmpty(i)) : [];
            } catch {
                if (key === "skills") {
                    parsed = String(raw).split(",").map(s => s.trim()).filter(Boolean);
                }
            }

            if (JSON.stringify(u[key]) !== JSON.stringify(parsed)) {
                updateData[key] = parsed;
            }
        }

        const hasTextChanges = Object.keys(updateData).length > 0;
        const hasResume = !!resumeFile;
        if (!hasTextChanges && !hasResume) return;

        // --- Server-Side Validation using Zod ---
        const validatedUpdateData = SeekerProfileSchema.partial().parse(updateData);

        validatedUpdateData.updated_at = new Date();

        /* -------------------- RESUME UPLOAD -------------------- */
        if (resumeFile) {
            const path = `${user.id}/resume_path-${Date.now()}-${resumeFile.name}`;

            const { error } = await supabaseAdmin.storage
                .from("resumes")
                .upload(path, resumeFile, {
                    contentType: resumeFile.type,
                    upsert: true,
                });

            if (error) throw new Error("Failed to upload info to storage");

            updateData.resume_path = path;
            validatedUpdateData.resume_path = path;
        }

        await prisma.legacyUser.update({
            where: { id: user.id },
            data: validatedUpdateData as any,
        });

        revalidatePath("/profile");
        return validatedUpdateData.resume_path || user.resume_path || undefined;

    } catch (err: any) {
        console.error("Error updating profile:", err);
        throw new Error(err.message || "Data validation failed");
    }
}
