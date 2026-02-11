
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function GET(req: Request) {
    try {
        const sessionCookie = req.headers.get("cookie");
        if (!sessionCookie) {
            return NextResponse.json({ error: "Unauthorized user access" }, { status: 401 });
        }
        const session = await auth.api.getSession({
            headers: await headers()
        });
        if (!session) {
            return NextResponse.json({ error: "Unauthorized user access" }, { status: 401 });
        }

        const user = await prisma.legacyUser.findFirst({
            where: {
                email: session?.user?.email,
            },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

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