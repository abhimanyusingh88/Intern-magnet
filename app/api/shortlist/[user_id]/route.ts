import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { headers } from "next/headers"
import { NextResponse } from "next/server"

export async function PATCH(req: Request, { params }: any) {

    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })
        if (!session) {
            return NextResponse.json({ message: "Unauthorized user acess denied" },
                { status: 400 }
            )
        }
        const { job_id } = params


        const res = await prisma.applied.updateMany({
            where: {
                job_id: BigInt(job_id),
                user_id: session?.user?.email
            },
            data: {
                status: "shortlisted"
            }
        })
        if (res.count === 0) {
            return NextResponse.json({ message: "Failed to update status!" }, {
                status: 400
            })
        }

        return NextResponse.json({ message: "Status updated successfully" }, { status: 201 })
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Something went wrong while updating the status" }, {
            status: 400
        });
    }
}