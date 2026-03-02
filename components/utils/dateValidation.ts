export const validateAndFormatDate = (v: string, previousValue?: string): string | null => {
    if (!/^[0-9/]*$/.test(v)) return null;

    if (v.includes("//")) return null;

    const lastChar = v[v.length - 1];
    const prevValue = previousValue || "";

    let potentialValue = v;

    if (potentialValue.length > prevValue.length) {
        if ((potentialValue.length === 2 || potentialValue.length === 5) && lastChar !== "/") {
            potentialValue += "/";
        }
    }

    // max length
    if (potentialValue.length > 10) return null;

    const parts = potentialValue.split("/");
    const [d, m, y] = parts;

    // Day check
    if (d) {
        if (d.length > 2) return null;
        if (d.length === 2 && (+d < 1 || +d > 31)) return null;
    }

    // Month check
    if (m) {
        if (m.length > 2) return null;
        if (m.length === 2 && (+m < 1 || +m > 12)) return null;
    }

    // Year check
    if (y) {
        if (y.length > 4) return null;
    }

    if (potentialValue.length === 10) {
        const day = parseInt(d, 10);
        const month = parseInt(m, 10);
        const year = parseInt(y, 10);
        const date = new Date(year, month - 1, day);

        if (
            date.getFullYear() !== year ||
            date.getMonth() !== month - 1 ||
            date.getDate() !== day
        ) {
            return null;
        }
    }

    return potentialValue;
};
