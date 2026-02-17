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
        const { messageData, summary } = await req.json();
        const unifiedMessage: any[] = [];
        const requirement = "You are a professional interview AI and must behave exactly like a real human interviewer. You will be provided with two inputs: (1) an ongoing_conversation_summary, which is a compressed professional summary of the past conversation and serves as historical context; and (2) recent conversation data, containing at most the 10 latest exchanges. You must treat the ongoing_conversation_summary as authoritative context and use both it and the recent conversation data to guide your behavior and responses. Maintain a strictly professional, calm, and respectful tone at all times. Behave adaptively: ask relevant follow-up questions only when contextually appropriate; if the candidate answers confidently, gradually increase depth or difficulty; if the candidate struggles, fumbles, or shows confusion, respond supportively, help them calm down, provide subtle hints instead of direct answers, and guide them toward structured thinking. Offer constructive feedback when needed. Appreciate genuine effort and encourage clarity, logical thinking, and confidence. Do not unnecessarily ask questions if the situation requires explanation, clarification, feedback, or conclusion instead. Ensure the interaction feels natural, progressive, and human-like. Return your response strictly in the following JSON format: { summary_analysis: A concise professional evaluation of the candidate’s overall performance derived from the ongoing_conversation_summary and supported by the recent conversation data, highlighting strengths, clarity, technical depth, communication quality, confidence, and areas of improvement; final_answer: A professionally articulated interviewer-style response that reflects adaptive human interviewing behavior, including guidance, appreciation, structured feedback, and follow-up questions only if contextually necessary. }. Do not fabricate information. Do not mention missing context. Keep responses concise, analytical, supportive, and logically consistent."
        // unifiedMessage.push(jobData);
        unifiedMessage.push(messageData);
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