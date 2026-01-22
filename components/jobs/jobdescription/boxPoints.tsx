export default function BoxPoints({ data, label }: { data: any, label: string }) {
    if (!data || data.length === 0) {
        return <p className="text-zinc-500 italic text-xs sm:text-sm md:text-[14px]">Not specified</p>
    }
    return <>
        <h1 className="text-zinc-300 text-sm   sm:text-lg md:text-xl font-semibold">{label}</h1>
        <div className="flex flex-wrap gap-2 text-zinc-300 font-light text-xs md:text-sm">
            {data
                ?.split(",")
                .map((sk: any, i: any) => (

                    <span
                        key={i}
                        className="px-3 flex flex-wrap py-2 rounded-2xl bg-zinc-900 border border-zinc-800 
                           text-amber-500 text-xs font-medium leading-none "
                    >
                        {sk.trim()}
                    </span>
                ))}
        </div>
    </>
}