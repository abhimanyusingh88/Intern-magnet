"use client"

import { useEffect, useRef, useState } from "react"

export default function ChatLayout({ Response, expand, loading, setSpeaking }: { Response: any, expand: boolean, loading: boolean, setSpeaking: any }) {
    const [displayText, setDisplayText] = useState<string>("");
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const lastTypedRef = useRef<string | null>(null);
    const isFirstRender = useRef<boolean>(true);

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
            setDisplayText("");
            setIsTyping(true);

            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }

            const type = () => {
                if (i < lastMessage.text.length) {
                    setDisplayText(lastMessage.text.substring(0, i + 1));
                    i++;
                    typingTimeoutRef.current = setTimeout(type, 20);
                } else {
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

    return <div className={`bg-zinc-800/40 border-zinc-500/20 border-r-[0.7px] border-t-[0.7px] border-b-[0.7px] hidden md:flex md:w-1/3 min-w-[250px] rounded-r-lg sm:rounded-l-none flex-col ${expand ? "h-[450px] sm:h-[600px]" : "h-[300px] md:h-[450px]"}`}>
        <div className="w-full bg-zinc-800/30 flex justify-center p-2 border-b border-white/5 shrink-0">
            <p className="text-base flex gap-2 items-center text-center lg:text-lg font-semibold text-zinc-400">
                Welcome to <span className="text-indigo-400">Magnet-Prep</span>
            </p>
        </div>
        <div ref={containerRef} className="w-full flex flex-col gap-4 p-4 overflow-y-auto no-scrollbar flex-1">
            {Response?.length > 0 ? (
                <>
                    {Response.map((msg: any, index: any) => {
                        const isLast = index === Response.length - 1;
                        const isAi = msg.type === "ai";

                        return (
                            <div key={index} className={`flex w-full ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                                <div className={`max-w-[75%] px-3 py-2 rounded-lg text-sm ${msg.type === "user"
                                    ? "bg-zinc-950/50 text-zinc-200 "
                                    : "bg-zinc-950/50 text-zinc-200 "
                                    }`}>
                                    <p>
                                        {isAi && isLast && isTyping ? displayText : msg.text}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                    {loading && (
                        <div className="flex w-full justify-start">
                            <div className="max-w-[75%] px-3 py-2 rounded-lg text-sm bg-zinc-950/50 text-zinc-200">
                                <p className="animate-pulse text-zinc-400 text-sm font-semibold">Thinking...</p>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <>
                    {loading ? (
                        <div className="flex w-full justify-start">
                            <div className="max-w-[70%] px-3 py-2 rounded-lg text-sm bg-zinc-950/50 text-zinc-200">
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