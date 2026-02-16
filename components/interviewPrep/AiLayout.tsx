import { Mic } from "lucide-react";
import Image from "next/image";

export default function AiLayout({ expand }: { expand: any }) {
    return <div className="w-full flex flex-col gap-8 items-center md:w-2/3 rounded-lg sm:rounded-r-none overflow-hidden border-zinc-500/20 border-[0.7px] md:border-r-0 md:border-l-[0.7px] md:border-t-[0.7px] md:border-b-[0.7px]">
        <div className={`w-full relative ${expand ? "h-[450px] sm:h-[500px]" : "h-[300px] md:h-[350px]"}`}>
            <Image src="/aiicon.png" alt="ai-icon" fill className="object-cover" />
        </div>
        <div className="w-9/10 flex mb-4 gap-4 items-center">
            <input type="text" placeholder="Reply..." className="rounded-3xl w-full border-[0.7px] outline-none border-zinc-500/70 focus-within:border-zinc-400/70 bg-zinc-900 transition-colors duration-200 px-4 py-2 md:py-3" />
            <Mic className="h-6 w-6 text-zinc-400 hover:text-zinc-100" />
        </div>
    </div>
}