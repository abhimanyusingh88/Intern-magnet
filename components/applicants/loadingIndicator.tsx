export default function CardIndicator() {
    return (
        <div className="rounded-2xl mt-5 border border-white/10 bg-zinc-900/60 backdrop-blur-xl p-4  w-full sm:w-fit animate-pulse">

            <div className="h-6 w-40 bg-zinc-700/60 rounded-md"></div>

            <div className="h-4 w-28 bg-zinc-700/50 rounded-md mt-2"></div>

            <div className="flex items-center gap-4 ">
                <div className="h-3 w-24 bg-zinc-700/50 rounded-md"></div>

                <span className="h-1 w-1 rounded-full bg-zinc-600"></span>

                <div className="h-5 w-16 bg-zinc-700/50 rounded-md"></div>
            </div>

        </div>
    );
}


export function JobListIndicator() {
    return (
        <div className="grid w-full gap-4 mt-4">
            {[1, 2, 3].map((i) => (
                <div
                    key={i}
                    className="rounded-xl border border-white/10 bg-zinc-900/60 backdrop-blur-xl p-4"
                >
                    <div className="flex items-start justify-between">


                        <div className="flex items-start gap-4">


                            <div className="h-8 w-8 rounded-full bg-zinc-800 animate-pulse"></div>

                            <div className="space-y-2 flex-1">
                                <div className="h-4 w-3/4 max-w-[160px] bg-zinc-800 rounded animate-pulse"></div>
                                <div className="h-3 w-full max-w-[224px] bg-zinc-800 rounded animate-pulse"></div>
                                <div className="h-3 w-1/2 max-w-[128px] bg-zinc-800 rounded animate-pulse"></div>
                            </div>

                        </div>


                        <div className="h-8 w-24 bg-zinc-800 rounded-lg animate-pulse"></div>
                    </div>


                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">

                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="h-8 bg-zinc-800 rounded-lg animate-pulse"
                            />
                        ))}

                    </div>

                </div>
            ))}
        </div>
    )
}