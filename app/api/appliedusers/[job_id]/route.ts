import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const PAGE_SIZE = 10;

export async function GET(
    req: Request,
    { params }: { params: Promise<{ job_id: string }> }
) {
    try {

        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session) {
            return NextResponse.json(
                { message: "Unauthorized user access denied" },
                { status: 401 }
            );
        }

        const { job_id } = await params;

        const { searchParams } = new URL(req.url);
        const cursor = searchParams.get("cursor");
        const status = searchParams.get("status");

        const appliedUsers = await prisma.applied.findMany({
            where: {
                job_id: BigInt(job_id),
                ...(status && { status })
            },

            take: PAGE_SIZE + 1,

            ...(cursor && {
                cursor: { id: BigInt(cursor) },
                skip: 1
            }),

            orderBy: [
                { applied_at: "desc" },
                { id: "desc" }
            ],

            include: {
                userId: true
            }
        });

        let nextCursor: bigint | null = null;

        if (appliedUsers.length > PAGE_SIZE) {
            const nextItem = appliedUsers.pop();
            nextCursor = nextItem!.id;
        }

        const serializedData = JSON.parse(
            JSON.stringify(
                { appliedUsers, nextCursor },
                (key, value) =>
                    typeof value === "bigint" ? value.toString() : value
            )
        );

        return NextResponse.json(
            {
                message: "Applied users data fetched successfully",
                ...serializedData
            },
            { status: 200 }
        );

    } catch (err) {
        console.log(err);

        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}