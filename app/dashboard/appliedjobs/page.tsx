import { headers } from "next/headers";
import AppliedJobCard from "@/components/appliedjobs/appliedJobCard";

export default async function AppliedJobsPage() {
    const baseUrl = process.env.BASE_URL || "http://localhost:3000";

    const h = await headers(); // current request headers

    const appliedData = await fetch(`${baseUrl}/api/appliedjobs`, {
        headers: {
            cookie: h.get("cookie") || "",   // 🔥 session cookie forward
        },
    });

    const appliedJobs = await appliedData.json();

    return (
        <div className="w-full p-1 sm:p-2 md:p-4">
            <AppliedJobCard appliedJobs={appliedJobs} />
        </div>
    );
}
