"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function updateProfile(formData: FormData): Promise<void> {
    const session = await auth();

    if (!session?.user?.email) {
        throw new Error("Unauthorized");
    }

    if (!formData) {
        throw new Error("Missing form data");
    }

    try {
        // 1. Fetch current user data to compare against
        const currentUser = await prisma.users.findFirst({
            where: { email: session.user.email },
        });

        if (!currentUser) {
            return;
        }

        const data = Object.fromEntries(formData.entries());

        // Remove 'email' from the potential update payload
        const { email: _email, ...formFields } = data;

        const updatePayload: Record<string, any> = {};
        let hasChanges = false;

        // 2. Compare incoming form data with current DB data
        // We only add fields to updatePayload if they match a key in the form AND are different
        for (const [key, value] of Object.entries(formFields)) {
            // Skip if the key doesn't exist on the user object (safety check, though schema usually matches)
            if (!(key in currentUser)) continue;

            const currentValue = (currentUser as any)[key];
            const newValue = value as string;

            // Simple string comparison. 
            // Treat null/undefined in DB as empty string for comparison if form sends empty string
            const dbValStr = currentValue === null || currentValue === undefined ? "" : String(currentValue);
            const formValStr = String(newValue);

            if (dbValStr !== formValStr) {
                updatePayload[key] = newValue;
                hasChanges = true;
            }
        }

        console.log(`[Profile Update] User: ${session.user.email}`);
        if (hasChanges) {
            console.log("-> Updating fields:", Object.keys(updatePayload));

            // Always update 'updated_at' if we are making changes
            updatePayload.updated_at = new Date();

            await prisma.users.update({
                where: { id: currentUser.id },
                data: updatePayload,
            });

            revalidatePath("/profile");
        } else {
            console.log("-> No changes detected. Skipping DB update.");
        }

    } catch (error) {
        console.error("Error updating profile:", error);
        throw new Error("Data validation failed")
    }
}
