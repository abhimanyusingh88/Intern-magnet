export function parseSalaryToLakhs(salaryStr: string | null, source?: string): number | null {
    if (!salaryStr) return null;

    // Internal platform jobs are always in absolute rupee format (e.g., 1000000)
    // We convert them directly to Lakhs.
    const cleanStr = salaryStr.replace(/,/g, '').toLowerCase();
    const match = cleanStr.match(/(\d+(?:\.\d+)?)/);
    if (!match) return null;

    let val = parseFloat(match[1]);

    if (source === 'internal' || source === 'platform') {
        // Internal is "always in 100000 like this form".
        return val >= 1000 ? val / 100000 : val;
    }

    // External jobs (Naukri, etc.) can be variable
    if (cleanStr.includes('lakh') || cleanStr.includes('lpa')) {
        return val;
    }

    if (val >= 20000) {
        return val / 100000;
    }

    return val;
}