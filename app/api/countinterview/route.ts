import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })

        if (!session) {
            return NextResponse.json({
                message: "Unauthorized access denied"
            },
                {
                    status: 401
                })
        }
        const existingCount = await prisma.legacyUser.findUnique({
            where: {
                email: session?.user?.email
            },
            select: {
                interview_count: true
            }
        })
        const count = (existingCount?.interview_count ?? 0) + 1;

        const updatedUser = await prisma.legacyUser.update({
            where: {
                email: session?.user?.email
            },
            data: {
                interview_count: Number(count)
            }
        })

        return NextResponse.json({
            message: "Interview count updated successfully",
            count: count
        }, {
            status: 200
        })



    }
    catch (err: any) {
        console.log(err.message);
        throw new Error(err.message);
    }
}