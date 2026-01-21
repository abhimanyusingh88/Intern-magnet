import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });
        if (!session?.user) {
            return NextResponse.json(
                { message: "Unauthorized user access" },
                { status: 401 }
            )
        }

        const data = await request.json();
        console.log("Screening Question Data:", data);

        return NextResponse.json({ success: true, data });
    }
    catch (error) {
        console.error("Error in screeningquestion route:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}