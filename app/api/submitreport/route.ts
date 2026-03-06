import { auth } from "@/lib/auth";
import { askAI } from "@/lib/groqAI";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })
        if (!session) {
            return NextResponse.json(
                { message: "please login to continue" },
                { status: 400 }
            )
        }

        const { message, summary } = await req.json();
        const unifiedMessage: any[] = [];

        const requirement = `You have conducted a professional interview and must generate an honest evaluation report for the candidate.

Inputs:
1. ongoing_conversation_summary: A compressed professional summary of the past conversation that serves as historical context.
2. recent_conversation: The latest exchanges (maximum 20 messages).

Instructions:
- Treat ongoing_conversation_summary as authoritative context.
- Use both the summary and recent conversation to evaluate the candidate.
- Maintain a strictly professional, calm, and respectful tone.
- Generate a formal report directed to the candidate using the word "Your".
- Provide honest and constructive feedback based on the candidate’s skills, communication, and answers.
- Focus on technical depth, clarity, communication, and confidence.
- Appreciate the candidate and wish them well for the future.

IMPORTANT:
Return ONLY valid JSON. Do NOT include markdown, explanations, or code blocks.

JSON structure:
{
  "interview_score": number, 
  "feedback_report": "string (maximum 1000 words)",
  "improvements": ["word1","word2","word3",...],
  "strengths": ["word1","word2","word3",...]
}
        `

        // if (jobData) {
        //     unifiedMessage.push({ role: "system", content: `Job Context: ${JSON.stringify(jobData)}` });
        // }
        unifiedMessage.push(message);
        unifiedMessage.push(summary);
        unifiedMessage.push(requirement);
        const finalMessage = JSON.stringify(unifiedMessage);
        const aiResponse = await askAI(finalMessage);
        return NextResponse.json(aiResponse, { status: 200 });

    }
    catch (err: any) {
        console.log(err.message);
        throw new Error(err);
    }
}