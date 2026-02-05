import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });
        if (!session?.user) {
            return NextResponse.json({
                message: "Unauthorized user access"
            },
                { status: 401 })
        }
        const appliedJobsData = await prisma.applied.findMany({
            where: {
                user_id: session.user.email
            }
        })
        const safeData = JSON.parse(
            JSON.stringify(appliedJobsData, (_, v) =>
                typeof v === "bigint" ? v.toString() : v
            )
        );

        return NextResponse.json(safeData, { status: 200 });


    }
    catch (err: any) {
        return NextResponse.json(
            { message: err.message },
            { status: 500 }
        )

    }
}