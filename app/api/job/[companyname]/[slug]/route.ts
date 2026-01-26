import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: Promise<{ companyname: string, slug: string }> }) {
    try {
        // const session = await auth.api.getSession({
        //     headers: await headers()
        // })
        // if (!session?.user) {
        //     return NextResponse.json(
        //         { message: "Unauthorized user access" },
        //         { status: 401 }
        //     )
        // }

        const { companyname, slug } = await params;
        const arr: string[] = slug.split("-");
        const id: bigint = BigInt(arr[arr.length - 1]);
        const jobdata = await prisma.recruiterHiring.findFirst(
            {
                where: {
                    id: id
                },
                include: {
                    screening_questions: true
                }
            }
        )
        if (!jobdata) {
            return NextResponse.json(
                { message: "failed to fetch the job data" },
                { status: 404 }
            )
        }
        const serializedJobs = JSON.parse(
            JSON.stringify(jobdata, (key, value) =>
                typeof value === 'bigint' ? value.toString() : value
            )
        );
        return NextResponse.json(serializedJobs, { status: 200 });
    }
    catch (err) {
        console.log(err);
        return NextResponse.json(
            { message: "something went wrong while fetching the data" },
            { status: 500 }
        )
    }
}