"use client"

import { useEffect, useRef, useState } from "react"
import VolumeButton from "./volumeButton";

export default function ChatLayout({ Response, expand, loading, setSpeaking }: { Response: any, expand: boolean, loading: boolean, setSpeaking: any }) {
    const [displayText, setDisplayText] = useState<string>("");
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const lastTypedRef = useRef<string | null>(null);
    const isFirstRender = useRef<boolean>(true);
    const [loud, setLoud] = useState<boolean>(true);
    const lastSpokenIndexRef = useRef<number>(0);

    const speak = (text: string) => {
        if (!text.trim()) return;
        const synth = window.speechSynthesis;
        const voices = synth.getVoices();
        const utterance = new SpeechSynthesisUtterance(text);

        const femaleVoice =
            voices.find(v => v.name.toLowerCase().includes("female")) ||
            voices.find(v => v.name.includes("Zira")) ||
            voices.find(v => v.name.includes("Samantha")) ||
            voices.find(v => v.name.includes("Google UK English Female")) ||
            voices.find(v => v.lang === "en-US") ||
            voices[0];

        if (femaleVoice) utterance.voice = femaleVoice;
        utterance.rate = 0.95;
        utterance.pitch = 1;
        synth.speak(utterance);
    };

    useEffect(() => {
        if (!Response || Response.length === 0) return;

        const lastMessage = Response[Response.length - 1];

        // On initial load (from localStorage/history), skip the typing animation
        if (isFirstRender.current) {
            if (lastMessage.type === "ai") {
                lastTypedRef.current = lastMessage.text;
            }
            isFirstRender.current = false;
            return;
        }

        if (lastMessage.type === "ai") {
            if (lastTypedRef.current === lastMessage.text) {
                return;
            }
            lastTypedRef.current = lastMessage.text;
            let i = 0;
            lastSpokenIndexRef.current = 0;
            setDisplayText("");
            setIsTyping(true);

            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }

            const type = () => {
                if (i < lastMessage.text.length) {
                    const currentText = lastMessage.text.substring(0, i + 1);
                    setDisplayText(currentText);

                    // Incremental speech logic: speak when we hit a sentence boundary or newline
                    if (loud) {
                        const char = lastMessage.text[i];
                        if (['.', '?', '!', '\n'].includes(char)) {
                            const chunk = lastMessage.text.substring(lastSpokenIndexRef.current, i + 1);
                            if (chunk.trim().length > 2) {
                                speak(chunk);
                                lastSpokenIndexRef.current = i + 1;
                            }
                        }
                    }

                    i++;
                    typingTimeoutRef.current = setTimeout(type, 20);
                } else {
                    // Speak any remaining text
                    if (loud && lastSpokenIndexRef.current < lastMessage.text.length) {
                        const remaining = lastMessage.text.substring(lastSpokenIndexRef.current);
                        speak(remaining);
                    }
                    setIsTyping(false);
                    setSpeaking(false);
                }
            };

            type();
        } else {
            setIsTyping(false);
        }

        return () => {
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
        };
    }, [Response]);


    const containerRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [Response, displayText, loading]);


    // Initial or unmuting speech
    useEffect(() => {
        if (loud && displayText && !window.speechSynthesis.speaking) {
            // Only speak if we haven't already finished speaking this entire text
            if (lastSpokenIndexRef.current < displayText.length) {
                const textToSpeak = displayText.substring(lastSpokenIndexRef.current);
                if (textToSpeak.trim().length > 0) {
                    speak(textToSpeak);
                    lastSpokenIndexRef.current = displayText.length;
                }
            }
        }
    }, [loud]);

    // Cleanup speech on unmount
    useEffect(() => {
        return () => {
            window.speechSynthesis.cancel();
        };
    }, []);


    return <div className={`bg-zinc-800/40 border-zinc-500/20 border-r-[0.7px] border-t-[0.7px] border-b-[0.7px] hidden md:flex md:w-1/3 min-w-[250px] rounded-r-lg sm:rounded-l-none flex-col ${expand ? "h-[450px] sm:h-[600px]" : "h-[300px] md:h-[450px]"}`}>
        <VolumeButton loud={loud} setLoud={setLoud} />
        <div ref={containerRef} className="w-full flex flex-col gap-4 p-4 overflow-y-auto no-scrollbar flex-1">
            {Response?.length > 0 ? (
                <>
                    {Response.map((msg: any, index: any) => {
                        const isLast = index === Response.length - 1;
                        const isAi = msg.type === "ai";

                        return (
                            <div key={index} className={`flex w-full ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                                <div className={`max-w-[75%] min-w-[40%] px-3 py-2 rounded-lg text-sm ${msg.type === "user"
                                    ? "bg-zinc-950/50 text-zinc-200 "
                                    : "bg-zinc-950/50 text-zinc-200 "
                                    }`}>
                                    <div>
                                        {
                                            msg.type === "ai" && <h1 className="text-indigo-500 font-semibold tracking-wide text-[10px]">MAGNET</h1>
                                        }
                                        <p>
                                            {isAi && isLast && isTyping ? displayText : msg.text}
                                        </p>
                                        <div className="w-full flex mt-1  justify-end">
                                            <p className="text-[10px] text-zinc-400">{new Date().toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                hour12: true
                                            })}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    {loading && (
                        <div className="flex w-full justify-start">
                            <div className="max-w-[75%] min-w-[40%] px-3 py-2 rounded-lg text-sm bg-zinc-950/50 text-zinc-200">
                                <p className="animate-pulse text-zinc-400 text-sm font-semibold">Thinking...</p>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <>
                    {loading ? (
                        <div className="flex w-full justify-start">
                            <div className="max-w-[70%] min-w-[40%] px-3 py-2 rounded-lg text-sm bg-zinc-950/50 text-zinc-200">
                                <p className="animate-pulse text-zinc-400 text-sm font-semibold">Thinking...</p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-zinc-500 text-sm text-center mt-2">Start speaking to see your conversation here...</p>
                    )}
                </>
            )}
        </div>
    </div>
}