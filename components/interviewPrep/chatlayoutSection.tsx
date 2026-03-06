import VolumeButton from "./volumeButton";

type chatLayoutProps = {
    expand: boolean,
    Response: any,
    loading: boolean,
    displayText: string,
    isTyping: boolean,
    loud: boolean,
    setLoud: any,
    containerRef: any,
    voiceOn: boolean
}
export default function ChatLayoutSection({ expand, Response, voiceOn, loading, displayText, isTyping, loud, setLoud, containerRef }: chatLayoutProps) {
    return <div className={`bg-zinc-800/40 border-zinc-500/20 border-r-[0.7px] border-t-[0.7px] border-b-[0.7px] hidden md:flex md:w-1/3 min-w-[250px] rounded-r-lg sm:rounded-l-none flex-col ${expand ? "h-[450px] sm:h-[600px]" : "h-[300px] md:h-[450px]"}`}>
        <VolumeButton voiceOn={voiceOn} loud={loud} setLoud={setLoud} isTyping={isTyping} />
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