export default function Loading() {
    return (
        <div className="flex flex-col gap-6 w-full animate-pulse">
            <div className="flex flex-col items-center gap-2">
                <div className="h-5 w-40 bg-zinc-700 rounded" />
                <div className="h-[1px] w-32 bg-zinc-700 rounded" />
            </div>

            {[1, 2, 3].map(i => (
                <div key={i} className="bg-zinc-800/50 min-h-[100px] rounded-lg p-4 space-y-3">
                    <div className="h-4 w-1/3 bg-zinc-700 rounded" />
                    <div className="h-3 w-2/3 bg-zinc-700 rounded" />
                    <div className="h-3 w-1/2 bg-zinc-700 rounded" />
                </div>
            ))}
        </div>
    );
}
