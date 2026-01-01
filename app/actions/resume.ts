"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { supabaseAdmin } from "@/lib/supabase/admin";
// import { supabase } from "@/lib/supabase/supabase";

export async function getResumeDownloadUrl() {
    const session = await auth();
    if (!session?.user?.email) throw new Error("Unauthorized");

    const user = await prisma.user.findFirst({
        where: { email: session.user.email },
        select: { resume_path: true },
    });

    if (!user?.resume_path) return null;
    const { data, error } = await supabaseAdmin.storage
        .from("resumes")
        .createSignedUrl(user.resume_path, 60); // 1 min

    if (error) throw error;

    return data.signedUrl;
}
