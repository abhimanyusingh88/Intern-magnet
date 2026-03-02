"use client"
import { useEffect, useRef, useState } from "react";
import AiLayout from "./AiLayout";
import ChatLayout from "./chatLayout";
import ExpandMinimize from "./expandminimize";
import { useClearStorageGuard } from "./clearStorage";

declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}
export default function Interview() {
    const silenceTimer = useRef<any>(null);
    const recognitionRef = useRef<any>(null);
    const finalTextRef = useRef<string>("");
    const [expand, setExpand] = useState<boolean>(false);
    const [listen, setListen] = useState<boolean>(false);
    const [interimText, setInterimText] = useState<string>("");
    const [finalText, setFinalText] = useState<string>("");
    const [Response, setResponse] = useState<{ type: string, text: string }[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [speaking, setSpeaking] = useState<boolean>(false);
    const [jobData, setJobData] = useState<any>(null);

    useEffect(() => {
        const saved = localStorage.getItem("Responses");
        if (saved) {
            try {
                setResponse(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to load Responses", e);
            }
        }

        const jobContext = localStorage.getItem("interviewJobContext");
        if (jobContext) {
            setJobData(JSON.parse(jobContext));
        }
    }, []);

    useClearStorageGuard();

    useEffect(() => {
        const func = async () => {
            if (Response.length > 0) {
                localStorage.setItem("Responses", JSON.stringify(Response));

                const lastMessage = Response[Response.length - 1];

                if (lastMessage.type !== "user") {
                    return; // ai ko call nii karenge agar last message hi ai se hai
                }

                setLoading(true);
                setSpeaking(true);


                const lastTenMessages = Response.slice(-20);
                const summary = localStorage.getItem("summary") || "";
                const jobContext = localStorage.getItem("interviewJobContext");
                const jobDataForApi = jobContext ? JSON.parse(jobContext) : null;

                try {
                    const AIresponse = await fetch("/api/aiinterview", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            messageData: lastTenMessages,
                            summary: summary,
                            jobData: jobDataForApi,
                        }),
                    });
                    const result = await AIresponse.json();
                    const finalAns = JSON.parse(result);
                    console.log(finalAns.final_answer);

                    // Only add AI response if we got a valid result
                    if (finalAns.final_answer !== "" || finalAns.final_answer !== undefined || finalAns.final_answer !== null) {
                        setResponse((prev) => [...prev, { type: "ai", text: finalAns.final_answer }]);
                        localStorage.setItem("summary", finalAns.summary_analysis);
                    }
                    setLoading(false);
                } catch (error) {
                    setLoading(false);
                    console.error("AI response error:", error);
                }
            }
        }
        func();
    }, [Response]);


    function audioToText() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Speech Recognition not supported, please use Chrome for best experience")
            return;
        }
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.lang = "en-US";
        recognition.interimResults = true;

        recognition.onresult = (event: any) => {

            let interim = "";
            let final = "";

            for (let i = 0; i < event.results.length; i++) {
                const trans = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    final += trans + " ";
                }
                else {
                    interim += trans;
                }


            }
            const cleanFinal = final.trim();
            setFinalText(cleanFinal);
            finalTextRef.current = cleanFinal;
            setInterimText(interim);
            clearTimeout(silenceTimer.current);
            silenceTimer.current = setTimeout(() => {
                recognition.stop();
                setListen(false);
                setInterimText("");
            }, 2000);


        }

        recognition.onerror = (event: any) => {

            setListen(false);
            stop();
            if (event.error !== "no-speech") {
                throw new Error(event.error);
            }
        }
        recognition.onend = () => {
            setListen(false);
            const textToSave = finalTextRef.current.trim();
            // console.log("Recognition ended. Text to save:", textToSave);
            if (textToSave) {
                setResponse((prev) => {
                    const updated = [...prev, { type: "user", text: textToSave }];
                    // console.log("Updated Response array:", updated);
                    return updated;
                });
            }
            setFinalText("");
            finalTextRef.current = "";
        }
        recognition.start();
        setListen(true);
        recognitionRef.current = recognition;



    }
    const stop = () => {
        recognitionRef.current.stop();
        // setListen(false);
        setInterimText("");
    }

    // console.log(interimText);
    // console.log(finalText);
    return (
        <div
            className={
                expand
                    ? "fixed inset-0 w-full min-h-screen z-50 bg-zinc-950 overflow-y-auto"
                    : "relative w-full"
            }
        >

            <ExpandMinimize expand={expand} setExpand={setExpand} />
            <div className={`w-full flex flex-col items-center justify-center pt-4 ${expand ? "mt-20" : ""}`}>
                {jobData && (
                    <div className="flex flex-col items-center gap-1 mb-2">
                        <h2 className="text-zinc-400 font-semibold text-xs sm:text-base tracking-wide flex items-center gap-2">
                            <span className="whitespace-nowrap"> PREPARING FOR: <span className="text-indigo-400 font-bold uppercase">{jobData.job_title}</span></span>
                        </h2>
                        <p className="text-zinc-500 text-xs font-semibold tracking-tighter uppercase">at {jobData.company_name}</p>
                    </div>
                )}
            </div>

            <div className={`w-full h-full p-4 flex items-stretch  ${expand ? "md:mt-4 md:px-10 lg:px-20" : ""}`}>
                <AiLayout setListen={setListen} speaking={speaking} startListen={audioToText} interimText={interimText} setResponse={setResponse} listen={listen} stopListen={stop} expand={expand} setInterimText={setInterimText} />
                <ChatLayout setSpeaking={setSpeaking} Response={Response} expand={expand} loading={loading} />
            </div>
        </div>
    );
}