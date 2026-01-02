import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await prisma.recruiterHiring.delete({
            where: {
                id: BigInt(id)
            }
        })
        return NextResponse.json({ message: "Job deleted successfully" }, { status: 200 })
    }
    catch (err) {
        console.error("Delete error:", err);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }

}