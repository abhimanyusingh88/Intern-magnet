export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
    const sizeClasses = {
        sm: 'h-4 w-4 border-2',
        md: 'h-8 w-8 border-3',
        lg: 'h-12 w-12 border-4'
    };

    return (
        <div className={`${sizeClasses[size]} border-blue-600 dark:border-blue-500 border-t-transparent rounded-full animate-spin`} />
    );
}

export function JobCardSkeleton() {
    return (
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-4 sm:p-5 animate-pulse">
            <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-gray-200 dark:bg-zinc-800 shrink-0" />
                <div className="flex-1 space-y-2 sm:space-y-3 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        <div className="h-4 sm:h-5 bg-gray-200 dark:bg-zinc-800 rounded w-3/4" />
                        <div className="h-3 sm:h-4 bg-gray-200 dark:bg-zinc-800 rounded w-16 invisible sm:visible" />
                    </div>
                    <div className="h-3 sm:h-4 bg-gray-200 dark:bg-zinc-800 rounded w-1/2" />
                    <div className="flex gap-3 sm:gap-4">
                        <div className="h-2 sm:h-3 bg-gray-200 dark:bg-zinc-800 rounded w-16" />
                        <div className="h-2 sm:h-3 bg-gray-200 dark:bg-zinc-800 rounded w-16" />
                        <div className="h-2 sm:h-3 bg-gray-200 dark:bg-zinc-800 rounded w-16" />
                    </div>
                    <div className="h-2 sm:h-3 bg-gray-200 dark:bg-zinc-800 rounded w-full" />
                    <div className="h-8 sm:h-10 bg-gray-200 dark:bg-zinc-800 rounded w-28 sm:w-32" />
                </div>
            </div>
        </div>
    );
}
