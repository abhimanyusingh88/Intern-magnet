
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function GET() {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = await prisma.legacyUser.findFirst({
            where: {
                email: session.user.email,
            },
        });

        if (!user) {
            // Return null for new users (not an error - they just need onboarding)
            return NextResponse.json(null);
        }

        // Convert BigInt to string for JSON serialization
        const serializedUser = {
            ...user,
            id: user.id.toString(),
        };

        return NextResponse.json(serializedUser);
    }
    catch (err) {
        console.error("Profile API Error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}