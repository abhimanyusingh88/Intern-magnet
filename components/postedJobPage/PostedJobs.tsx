"use client"

import PostedJobsData from "@/lib/data/postedJobsData"
import PostedJobsCard from "./postedJobsCard";
import { SpinnerBig } from "../utils/SpinnerBig";
import NormalButton from "../utils/normalButton";
import { Suspense, useOptimistic } from "react";
import PostJobIndicator from "../utils/postJobIndicator";
import { SpinnerMini } from "../utils/SpinnerMini";

export default function PostedJobs() {
    const { data, isLoading, isError, error } = PostedJobsData();
    const [optimisticJobs, deleteJob] = useOptimistic(data,
        (state, id: number) =>
            state.filter((j: any) => j.id !== id)

    )

    if (optimisticJobs?.length === 0) {
        return <div>
            <PostJobIndicator />
            <div className="w-full flex justify-center p-4">
                <NormalButton
                    title="Post New Job"
                    type="button"
                    front={true}
                    link="/add/internship"
                />
            </div>
        </div >
    }

    if (isLoading) return <SpinnerBig />

    return (
        <div className="p-4">

            {isError && <p className="text-red-500">Error: {error?.message}</p>}
            <div className="space-y-4">

                {optimisticJobs && Array.isArray(optimisticJobs) && optimisticJobs.map((job: any) => (
                    <Suspense fallback={<SpinnerMini />}>
                        <PostedJobsCard deleteJob={deleteJob} key={job.id} job={job} />
                    </Suspense>
                ))}
                <div className="w-full flex justify-center sm:justify-end">
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