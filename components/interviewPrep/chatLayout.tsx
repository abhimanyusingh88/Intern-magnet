import { Bot } from "lucide-react";

export default function ChatLayout() {
    return <div className="bg-zinc-800/40 overflow-y-scroll border-zinc-500/20 border-r-[0.7px] border-t-[0.7px] border-b-[0.7px] hidden md:block w-1/3 rounded-r-lg sm:rounded-l-none overflow-hidden">
        <div className="w-full bg-zinc-700/20 flex justify-center p-2">
            <p className="text-base flex gap-2 items-center text-center lg:text-lg font-semibold bg-linear-to-r from-indigo-600 to-pink-500  bg-clip-text text-transparent">
                Welcome to Magnet-Prep <span className="text-indigo-500"><Bot className="w-6 h-6" /></span>
            </p>
        </div>

    </div>
}