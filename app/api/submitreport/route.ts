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
        const requirement = `You have taken a professional interview and now you must have to generate a honest report about the interview of the candidate

        You will be provided with two inputs: (1) an ongoing_conversation_summary, which is a compressed professional summary of the past conversation and serves as historical context; and (2) recent conversation data, containing at most the 20 latest exchanges. 
        
        You must treat the ongoing_conversation_summary as authoritative context and use both it, the recent conversation data, and the specific job details provided above to guide your behavior and responses. 
        
        Maintain a strictly professional, calm, and respectful tone at all times. Behave adaptively:
        Generate a fomal report with honesty, give detailed feedback from the summary and past conversation context provided, focus on skills and answers of candidate. Lastly appreciate the candidate and wish him for future.
        the report must be of format Json respone of structure with a interview score and a detailed feedback report of atmost 1000 words, not more than that, if less it's okay.
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