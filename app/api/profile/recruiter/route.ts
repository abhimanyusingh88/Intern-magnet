
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const profile = await prisma.recruiterProfile.findUnique({
            where: {
                userId: session.user.id,
            },
        });

        if (!profile) {
            return NextResponse.json(null); // Return null if profile doesn't exist yet
        }

        // Convert BigInt to string for JSON serialization
        const serializedProfile = {
            ...profile,
            id: profile.id.toString(),
        };

        return NextResponse.json(serializedProfile);
    }
    catch (err) {
        console.error("Recruiter Profile API Error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
