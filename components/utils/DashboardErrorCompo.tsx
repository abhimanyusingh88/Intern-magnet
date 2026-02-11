import { AlertCircle } from "lucide-react";

export default function DashboardErrorCompo({ error }: { error: string }) {
    return <div className="w-full flex items-center justify-center py-20 px-4">
        <div className="max-w-xl w-full bg-zinc-800/30 backdrop-blur-xl border border-white/10 rounded-3xl p-4 shadow-2xl text-center space-y-6">

            <div className="flex justify-center">
                <div className="p-5 rounded-full bg-red-500/10 border border-red-500/20">
                    <AlertCircle className="w-10 h-10 text-red-500" />
                </div>
            </div>

            <h2 className="text-xl md:text-2xl font-semibold bg-linear-to-r from-indigo-600 via-purple-500 to-pink-600 bg-clip-text text-transparent">
                {error}
            </h2>

            <p className="text-zinc-400 text-sm leading-relaxed">
                We couldn’t load the data right now. Please try again later.
            </p>

        </div>
    </div>
}