export default function NoMansLand({ setFilters }: { setFilters: any }) {
    return <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-16 text-center shadow-sm">
        <div className="w-20 h-20 bg-gray-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-gray-300 dark:text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-zinc-100 mb-2">Search No Man&apos;s Land</h3>
        <p className="text-gray-600 dark:text-zinc-400 mb-8 max-w-sm mx-auto">
            We couldn&apos;t find any jobs matching your current filters. Try broadening your criteria or search terms.
        </p>
        <button
            onClick={() => setFilters({})}
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-bold transition-colors underline underline-offset-4"
        >
            Clear all filters and start over
        </button>
    </div>
}