"use client"

import PostedJobsData from "@/lib/data/postedJobsData"
import PostedJobsCard from "./postedJobsCard";
import { SpinnerBig } from "../SpinnerBig";
import BackGroundGlow from "../BackGroundGlow";
import NormalButton from "../normalButton";

export default function PostedJobs() {
    const { data, isLoading, isError, error } = PostedJobsData();

    if (isLoading) return <SpinnerBig />

    return (
        <div className="p-4">

            {isError && <p className="text-red-500">Error: {error?.message}</p>}
            <div className="space-y-4">

                {data && Array.isArray(data) && data.map((job: any) => (
                    <PostedJobsCard key={job.id} job={job} />
                ))}
                <div className="w-full flex justify-end">
                    <NormalButton
                        title="Post New Job"
                        type="button"
                        front={true}
                        link="/add/internship"
                    />
                </div>
            </div>
        </div>
    );
}