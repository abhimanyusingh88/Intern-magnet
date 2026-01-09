export default function ErrorComponent({ error }: { error: any }) {
    return <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-2xl p-8 text-center shadow-sm">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </div>
        <h3 className="text-xl font-bold text-red-900 dark:text-red-400 mb-2">Oops! Something went wrong</h3>
        <p className="text-red-700 dark:text-red-300/70 mb-6 max-w-md mx-auto">
            {error?.message || 'We encountered an error while fetching the job listings. Please check your connection and try again.'}
        </p>
        <button
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-8 py-3 rounded-xl hover:bg-red-700 transition-all font-semibold shadow-lg shadow-red-600/20"
        >
            Retry Now
        </button>
    </div>
}