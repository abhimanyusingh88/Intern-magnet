export function getTimeAgo(date: string | Date): string {
    const now = new Date();
    const past = new Date(date);

    // Check if date is valid
    if (isNaN(past.getTime())) return '';

    const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    if (seconds < 60) return 'just now';

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;

    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;

    const months = Math.floor(days / 30);
    if (months < 12) return `${months}mo ago`;

    const years = Math.floor(months / 12);
    return `${years}y ago`;
}

export function getNormalizedPostDate(createdAt: string | Date, postedAgo?: string | null): Date {
    const scrapeDate = new Date(createdAt);
    if (!postedAgo) return scrapeDate;

    const lower = postedAgo.toLowerCase();

    let daysToAdd = 0;

    if (lower.includes('just now') || lower.includes('few hours') || lower.includes('today')) {
        daysToAdd = 0;
    } else if (lower.includes('yesterday')) {
        daysToAdd = 1;
    } else {
        const match = lower.match(/(\d+)/);
        if (match) {
            daysToAdd = parseInt(match[1], 10);
        }
    }

    // If it's something like "30+ days ago", we use 30
    const normalizedDate = new Date(scrapeDate.getTime() - (daysToAdd * 24 * 60 * 60 * 1000));
    return normalizedDate;
}
