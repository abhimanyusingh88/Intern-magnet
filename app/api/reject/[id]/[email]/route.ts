import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { headers } from "next/headers"
import { NextResponse } from "next/server"

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string, email: string }> }) {

    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })
        if (!session) {
            return NextResponse.json({ message: "Unauthorized user acess denied" },
                { status: 400 }
            )
        }
        const { id, email } = await params;
        // console.log(id);
        const applied = await prisma.applied.findFirst({
            where: {
                job_id: BigInt(id),
                user_id: email,
            }
        });
        if (applied?.status === "shortlisted" || applied?.status === "rejected") {
            return NextResponse.json({ message: `Cannot change the status as the user is already ${applied?.status}!!` },
                { status: 400 }
            )
        }


        const res = await prisma.applied.updateMany({
            where: {
                job_id: BigInt(id),
                user_id: email,
                status: "pending"
            },
            data: {
                status: "rejected"
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