import ApplicantList from "./ApplicantList";
import JobCard from "./JobCard";

export default function JobApplicants({ id, email }: { id: string, email: any }) {

    return <div className="w-full flex flex-col  gap-6">

        <div className="flex gap-4 flex-col md:flex-row items-start justify-between">

            <div>
                <h1 className="text-xl text-center sm:text-start text-zinc-200 sm:text-2xl md:text-3xl font-semibold tracking-wide">
                    APPLICANTS{" "}
                    <span className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                        MANAGEMENT
                    </span>{" "}
                    PAGE
                </h1>

                <p className="text-zinc-400 text-xs sm:text-sm mt-2 text-center sm:text-left max-w-md">
                    Review, manage, and track candidates who applied for this position.
                </p>
            </div>

            {
                <JobCard id={id} />
            }


        </div>
        <div className="w-full flex items-center flex-col">
            <ApplicantList id={id} />
        </div>
    </div>
}