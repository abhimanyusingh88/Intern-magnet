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
        const { email: _ignored, resume_path, resume_file, json_command, ...formFields } = entries;

        const updateData: Record<string, any> = {};

        // Helper to check if an item is functionally empty
        const isItemEmpty = (item: any) => {
            if (!item || typeof item !== 'object') return true;
            return Object.values(item).every(val => {
                if (val === null || val === undefined) return true;
                if (typeof val === 'string') return val.trim() === "";
                if (Array.isArray(val)) return val.length === 0;
                return false;
            });
        };

        // 1. Handle Atomic Array Updates (Differential Updates)
        if (json_command && typeof json_command === 'string') {
            try {
                const cmd = JSON.parse(json_command);
                const { field, action, item, index } = cmd as { field: string, action: 'add' | 'edit' | 'delete', item?: any, index?: number };

                if (field && (user as any)[field] !== undefined) {
                    const currentArray = Array.isArray((user as any)[field]) ? [...((user as any)[field] as any[])] : [];

                    if (action === 'add' && item) {
                        if (!isItemEmpty(item)) {
                            currentArray.push(item);
                        } else {
                            console.log(`-> Skipping add: Item for ${field} is empty.`);
                            return; // Don't proceed if trying to add an empty item
                        }
                    } else if (action === 'edit' && index !== undefined && item) {
                        if (!isItemEmpty(item)) {
                            currentArray[index] = item;
                        } else {
                            // If user cleared everything in an edit, maybe they meant to delete? 
                            // For now, let's just skip the update to avoid ghost data.
                            console.log(`-> Skipping edit: Item for ${field} at index ${index} is empty.`);
                            return;
                        }
                    } else if (action === 'delete' && index !== undefined) {
                        currentArray.splice(index, 1);
                    }

                    updateData[field] = currentArray;
                }
            } catch (err) {
                console.error("Failed to process json_command:", err);
            }
        }

        // 2. Handle standard field updates
        for (const key in formFields) {
            if (!(key in user)) continue;

            const dbValue = (user as any)[key];
            const formValueRaw = formFields[key];

            if (key === "skills") {
                // skills is expected to be an array of strings
                // if it comes from formData.entries() it might be a JSON string
                let parsedFormValue: string[] = [];
                try {
                    parsedFormValue = typeof formValueRaw === 'string' ? JSON.parse(formValueRaw) : formValueRaw;
                } catch {
                    parsedFormValue = String(formValueRaw).split(',').map(s => s.trim()).filter(Boolean);
                }

                if (JSON.stringify(dbValue) !== JSON.stringify(parsedFormValue)) {
                    updateData[key] = parsedFormValue;
                }
                continue;
            }

            if (["internships", "projects", "certifications", "exams"].includes(key)) {
                let parsedFormValue: any[] = [];
                try {
                    const raw = typeof formValueRaw === 'string' ? JSON.parse(formValueRaw) : formValueRaw;
                    parsedFormValue = Array.isArray(raw) ? raw.filter(item => !isItemEmpty(item)) : [];
                } catch {
                    parsedFormValue = [];
                }

                if (JSON.stringify(dbValue) !== JSON.stringify(parsedFormValue)) {
                    updateData[key] = parsedFormValue;
                }
                continue;
            }

            const formValue = String(formValueRaw);
            const dbString = dbValue === null || dbValue === undefined ? "" : String(dbValue);

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

        return updateData.resume_path || user.resume_path || undefined;

    } catch (err: any) {
        console.error("Error updating profile:", err);
        throw new Error(err.message || "Data validation failed");
    }
}
