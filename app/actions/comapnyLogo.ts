"use server"

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import cloudinary from "@/lib/cloudinary";

export async function companyLogo(formData: FormData) {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    if (!session?.user?.email) throw new Error("Unauthorized");

    const file = formData.get("company_logo") as File || null;
    if (file && file.size > 0) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload to Cloudinary using a Promise wrapper
        const uploadResponse = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    folder: "company-logos",
                    resource_type: "image",
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            ).end(buffer);
        }) as any;

        console.log("-> Upload successful, public URL:", uploadResponse.secure_url);
        return { success: true, url: uploadResponse.secure_url };
    }
    return { success: false, error: "No file provided" };
}