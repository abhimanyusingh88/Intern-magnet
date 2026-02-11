import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const sessionExist = request.headers.get("cookie");
        if (!sessionExist || sessionExist.length === 0) {
            return NextResponse.json({
                message: "Login to view the content"
            },
                { status: 401 })
        }
        const session = await auth.api.getSession({
            headers: await headers()
        });
        if (!session) {
            return NextResponse.json({
                message: "Login to view the content"
            },
                { status: 401 })
        }

        const appliedJobsData = await prisma.applied.findMany({
            where: {
                user_id: session?.user?.email
            },
            include: {
                job: true
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