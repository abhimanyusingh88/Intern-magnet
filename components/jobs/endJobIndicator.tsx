export default function EndJobIndicator() {
    return <div className="py-12 text-center">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-100 dark:bg-zinc-800/50 rounded-full text-gray-500 dark:text-zinc-400 border border-gray-200 dark:border-zinc-700/50">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium">You&apos;ve seen it all! Stay tuned for new postings.</span>
        </div>
    </div>
}
