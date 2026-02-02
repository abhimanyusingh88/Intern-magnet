export function formatName(n: string) {
    return n
        .toLowerCase()
        .split(" ")
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
}
export function formattedDate() {
    const d = new Date();
    const day = d.toLocaleDateString("en-US", { weekday: "long" });
    const month = d.toLocaleDateString("en-US", { month: "long" });
    const date = d.getDate();
    const s = date % 10 === 1 && date !== 11 ? "st" :
        date % 10 === 2 && date !== 12 ? "nd" :
            date % 10 === 3 && date !== 13 ? "rd" : "th";
    return `${day}, ${month} ${date}${s}`;
}