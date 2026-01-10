import { SpinnerMini } from "../utils/SpinnerMini";

export default function LoadMoreSection({ ref, isFetchingNextPage, fetchNextPage }: { ref?: any, isFetchingNextPage: boolean, fetchNextPage: () => void }) {
    return <div ref={ref} className="py-12 text-center min-h-[160px] flex items-center justify-center transition-all duration-300">
        {isFetchingNextPage ? (
            <div className="flex flex-col items-center justify-center gap-6 animate-in fade-in zoom-in duration-500">
                <div className="relative">
                    <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full animate-pulse" />
                    <SpinnerMini />
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-zinc-400 animate-pulse tracking-wide">
                    Curating more opportunities...
                </span>
            </div>
        ) : (
            <button
                onClick={() => fetchNextPage()}
                className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-10 py-4 rounded-xl hover:bg-black dark:hover:bg-zinc-200 transition-all hover:shadow-2xl active:scale-95 font-bold text-sm tracking-wide shadow-lg shadow-black/5 dark:shadow-white/5"
            >
                Load More Opportunities
            </button>
        )}
    </div>
}