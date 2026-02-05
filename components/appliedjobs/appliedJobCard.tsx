export default function AppliedJobCard({ appliedJobs }: { appliedJobs: any }) {
    console.log(appliedJobs);
    return (
        <div className="flex flex-col gap-6 w-full">

            <div className="w-full flex flex-col items-center gap-2">

                <h1 className="text-lg sm:text-xl md:text-xl font-semibold uppercase text-zinc-400 tracking-wide">
                    Applied Jobs
                </h1>

                <div className="h-[0.5px] w-50 rounded-2xl bg-gray-300" />

            </div>
            {Array.isArray(appliedJobs) && appliedJobs.length > 0 ? (
                appliedJobs.map((job: any) => (
                    <div
                        key={job.id}
                        className="mb-2  bg-zinc-700/40   min-h-[100px] rounded-lg p-0 sm:p-2 md:p-4"
                    >

                        {/* job data */}
                    </div>
                ))
            ) : (
                <div className="text-sm text-gray-500">No applied jobs found.</div>
            )}


        </div>
    )
}
