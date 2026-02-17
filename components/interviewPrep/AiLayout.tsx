"use client"
import { ArrowUp, Mic, X } from "lucide-react";
import Image from "next/image";
type listener = {
    expand: any, startListen: () => void, stopListen: any, interimText: string, finalText: string, listen: any, setInterimText: any
}


export default function AiLayout({ expand, startListen, stopListen, interimText, finalText, listen, setInterimText }: listener) {
    return <div className="w-full flex flex-col gap-8 items-center md:w-2/3 rounded-lg sm:rounded-r-none overflow-hidden border-zinc-500/20 border-[0.7px] md:border-r-0 md:border-l-[0.7px] md:border-t-[0.7px] md:border-b-[0.7px]">
        <div className={`w-full bg-orange-900/25 flex justify-center items-center ${expand ? "h-[450px] sm:h-[500px]" : "h-[300px] md:h-[350px]"}`}>
            {/* <Image src="/aiinterviewer.png" alt="ai-icon" fill className="object-cover" /> */}
            <div className={`w-[50px] text-lg h-[50px] flex items-center justify-center rounded-full text-zinc-500 font-bold bg-orange-950/90 ${listen ? "ai-speaking" : ""}`}>
                AI
            </div>

        </div>
        <form className="w-9/10 flex mb-4 gap-2 md:gap-3 items-center">
            <input onChange={(e) => setInterimText(e.target.value)} type="text" value={interimText} placeholder="Reply..." className="rounded-3xl w-full border-[0.7px] outline-none border-zinc-500/70 focus-within:border-zinc-400/70 bg-zinc-900 transition-colors duration-200 px-4 py-2 md:py-3" />

            <button type="submit" > <ArrowUp className="h-7 w-7 bg-purple-600/90  rounded-sm text-white cursor-pointer hover:bg-purple-500/90 p-1  transition-all duration-75" /></button>
            <button
                onClick={startListen}
                type="button" ><Mic className="h-7 w-7 cursor-pointer text-zinc-400 hover:text-zinc-100" /></button>
            {
                listen && <button
                    onClick={stopListen}
                    type="button" ><X className="h-6 w-6 text-zinc-400 hover:text-red-500 cursor-pointer" /></button>
            }
        </form>
    </div>
}