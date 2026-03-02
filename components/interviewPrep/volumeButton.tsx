import { Volume2, VolumeX } from "lucide-react";

export default function VolumeButton({ loud, setLoud, isTyping }: { loud: boolean, setLoud: any, isTyping: boolean }) {

    return <div className="w-full bg-zinc-800/30 flex justify-between items-center p-2 px-4 border-b border-white/5 shrink-0">
        <p className="text-sm flex gap-2 items-center text-center lg:text-base font-semibold text-zinc-400">
            Welcome to <span className="text-indigo-500 font-bold">Magnet-Prep</span>
        </p>
        <button
            onClick={() => {
                setLoud(!loud);
                if (loud) window.speechSynthesis.cancel();
            }}
            className="p-1.5 hover:bg-zinc-700/50 rounded-md transition-colors text-zinc-400 hover:text-indigo-400"
            title={loud ? "Mute" : "Unmute"}
        >
            {loud ? <Volume2 className={`w-4  h-4 ${isTyping ? "text-red-500 animate-pulse" : "text-zinc-400"} md:w-5 md:h-5`} /> : <VolumeX className="w-4 h-4 md:w-5 md:h-5" />}
        </button>
    </div>
}