import { JobApplyEmail } from "@/app/emailTempalates/emailTempalateApply";
import { Slugify } from "@/components/jobs/slugify";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Resend } from "resend"
type SubmitData = {
    job_id: string;
    user_id: string;
    companyName: string;
    jobTitle: string;
} & Record<string, string>;

const resend = new Resend(process.env.RESEND_API_KEY);


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

        const data: SubmitData = await request.json();
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
        revalidatePath(`/jobspage/${Slugify(companyName)}/${Slugify(jobTitle)}-${job_id}`);

        //resend se mail bhejna hai, baad me domain milne pe domain se bhejunga

        const { data: mailData, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: ["singabhimanyu9794@gmail.com"],
            subject: 'Hello world',
            react: JobApplyEmail({ companyName, jobTitle })
        });
        if (error) {
            return NextResponse.json(
                { error },
                { status: 500 }
            );
        }



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