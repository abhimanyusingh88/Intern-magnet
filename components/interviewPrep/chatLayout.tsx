"use client"

import { useEffect, useRef, useState } from "react"
import ChatLayoutSection from "./chatlayoutSection";

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
                        if (['.', '?'].includes(char)) {
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


    return <ChatLayoutSection expand={expand} Response={Response} loading={loading} displayText={displayText} isTyping={isTyping} loud={loud} setLoud={setLoud} containerRef={containerRef} />
}