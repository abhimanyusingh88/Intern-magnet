import HomePage from "@/components/dashboard/homepage";
import { headers } from "next/headers";
// import { headers } from "next/headers";
// import { headers } from "next/headers";



export default async function Dashboard() {
    let error = "";
    const baseUrl = process.env.BASE_URL || "http//:localhost:3000"

    const applied = await fetch(`${baseUrl}/api/appliedjobs`, {
        headers: {
            cookie: ((await headers()).get("cookie") || "")
        }
    }

    );
    if (!applied.ok) {
        error = "Something went wrong";
        console.log(applied.statusText);
    }
    const AppliedRes = await applied.json();

    // console.log(AppliedRes);


    return <div className="text-zinc-200 w-full px-5 py-4">
        <HomePage AppliedJobs={AppliedRes} />
    </div>
}