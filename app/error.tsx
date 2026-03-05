"use client";

export default function Error({ reset }: { reset?: () => void }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950">
            <div className="text-center space-y-4 p-10 rounded-2xl border border-white/10 bg-zinc-900/60 backdrop-blur-xl max-w-md w-full mx-4">
                <div className="text-5xl">⚠️</div>
                <h1 className="text-xl font-semibold text-white">Something went wrong</h1>
                <p className="text-zinc-400 text-sm">We couldn't load the page. Please try again.</p>
                {reset && (
                    <button
                        onClick={reset}
                        className="mt-2 px-5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm transition-all border border-white/10 cursor-pointer"
                    >
                        Try again
                    </button>
                )}
            </div>
        </div>
    );
}