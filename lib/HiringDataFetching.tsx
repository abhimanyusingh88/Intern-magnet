export async function HiringDataFetching() {
    const res = await fetch("/api/recruiterhiring");
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();

}