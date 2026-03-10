import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {

    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })
        if (!session) {
            return NextResponse.json({ message: "Unauthorized user access denied!" }, { status: 401 })
        }

        const recruiter = await prisma.recruiterProfile.findUnique({
            where: {
                email: session.user.email
            }
        })
        if (!recruiter) {
            return NextResponse.json({ message: "Please create a recruiter account first!" }, { status: 404 })
        }
        const user_id = recruiter?.id;
        const { id } = await params;
        await prisma.recruiterHiring.delete({
            where: {
                id: BigInt(id),
                recruiter_profile_id: user_id
            }
        })
        return NextResponse.json({ message: "Job deleted successfully" }, { status: 200 })
    }
    catch (err) {
        console.error("Delete error:", err);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }

}