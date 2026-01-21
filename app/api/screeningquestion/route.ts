import { Slugify } from "@/components/jobs/slugify";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
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
        // console.log("Screening Question Data:", data);
        const { job_id, user_id, companyName, jobTitle, ...answers } = data;
        const applied = await prisma.applied.create({
            data: {
                job_id: BigInt(job_id),
                user_id: user_id,
                status: 'pending',
                viewed: false
            }

        })
        const updates = Object.entries(answers).map(([id, value]) => {
            return prisma.screeningQuestion.update({
                where: {
                    id: BigInt(id),
                },
                data: {
                    ans: value,
                },
            });
        });
        const answersOfQuestions = await prisma.$transaction(updates);
        const final = { ...applied, ...answersOfQuestions }
        console.log("final data:", final);
        revalidatePath(`/jobspage/${Slugify(companyName)}/${Slugify(jobTitle)}-${job_id}`)


        return NextResponse.json({
            success: true,
            data: JSON.parse(
                JSON.stringify(final, (_, v) =>
                    typeof v === "bigint" ? v.toString() : v
                )
            ),
        });

    }
    catch (error) {
        console.error("Error in screeningquestion route:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}