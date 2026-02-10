import "dotenv/config";
import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function askAI(message: any) {
    const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            { role: "user", content: message }
        ],
    });

    const reply = completion.choices[0]?.message?.content;
    // console.log(reply);
    return reply;
}

