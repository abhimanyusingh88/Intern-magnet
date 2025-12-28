
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";




export async function GET() {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = await prisma.users.findFirst({
            where: {
                email: session.user.email,
            },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
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