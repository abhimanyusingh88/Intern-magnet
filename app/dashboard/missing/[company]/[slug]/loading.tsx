export default function Loading() {
    return (
        <div className="w-full h-full min-h-[400px] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">

                <div className="relative">
                    <div className="w-14 h-14 rounded-full border-4 border-zinc-800"></div>
                    <div className="absolute inset-0 w-14 h-14 rounded-full border-4 border-transparent border-t-indigo-500 border-r-purple-500 animate-spin"></div>
                </div>

                <p className="text-zinc-400 text-sm tracking-wide">
                    Wait while AI is fetching...
                </p>

            </div>
        </div>
    )
}
