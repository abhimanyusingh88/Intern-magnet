"use server"

import { auth } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function companyLogo(formData: FormData) {
    const session = await auth();
    if (!session?.user?.email) throw new Error("Unauthorized");

    const file = formData.get("company_logo") as File || null;
    if (file && file.size > 0) {
        const fileName = file.name && file.name !== "undefined" ? file.name : "logo.png";
        console.log("-> Attempting to upload logo:", fileName, "Size:", file.size);
        const newPath = `company_logo_path-${Date.now()}-${fileName}`;

        // Convert File to Buffer to avoid corruption in Server Actions
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
            .from("company-logo")
            .upload(newPath, buffer, {
                contentType: file.type || 'image/png',
                upsert: true,
            });

        if (uploadError) {
            console.error("-> Supabase upload error:", uploadError);
            throw new Error("Failed to upload info to storage");
        }

        const { data: { publicUrl } } = supabaseAdmin.storage
            .from("company-logo")
            .getPublicUrl(newPath);

        console.log("-> Upload successful, public URL:", publicUrl);
        return { success: true, url: publicUrl };
    }
    return { success: false, error: "No file provided" };
}