"use client"
import { useEffect, useRef, useState } from "react";
import AiLayout from "./AiLayout";
import ChatLayout from "./chatLayout";
import ExpandMinimize from "./expandminimize";

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
    // const [aiResponse,set]

    useEffect(() => {
        const saved = localStorage.getItem("Responses");
        if (saved) {
            try {
                setResponse(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to load Responses", e);
            }
        }
    }, []);

    useEffect(() => {
        const func = async () => {
            if (Response.length > 0) {
                localStorage.setItem("Responses", JSON.stringify(Response));

                // Only call AI if the last message is from user (not AI)
                const lastMessage = Response[Response.length - 1];

                if (lastMessage.type !== "user") {
                    return; // Don't call AI if last message is already from AI
                }

                setLoading(true);
                setSpeaking(true);


                const lastTenMessages = Response.slice(-20);
                const summary = localStorage.getItem("summary") || "";

                try {
                    const AIresponse = await fetch("/api/aiinterview", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            messageData: lastTenMessages,
                            summary: summary,
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
            // Accumulate all final results from the beginning
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
                    ? "fixed top-0 left-0 w-screen min-h-screen z-50 bg-zinc-950"
                    : "relative w-full"
            }
        >

            <ExpandMinimize expand={expand} setExpand={setExpand} />
            <div className={`w-full h-full p-4 flex items-stretch  ${expand ? "mt-20 md:mt-15 md:px-10 lg:px-20" : ""}`}>
                <AiLayout setListen={setListen} speaking={speaking} startListen={audioToText} interimText={interimText} setResponse={setResponse} listen={listen} stopListen={stop} expand={expand} setInterimText={setInterimText} />
                <ChatLayout setSpeaking={setSpeaking} Response={Response} expand={expand} loading={loading} />
            </div>
        </div>
    );
}