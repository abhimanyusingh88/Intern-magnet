import { headers } from "next/headers";
import Image from "next/image";
import { formatDate } from "../utils/dateFormatter";
import { AlertCircle, Banknote, Brain, Currency, DollarSign, ExternalLink, IndianRupee, Lightbulb, MapPin } from "lucide-react";
import Link from "next/link";

export default async function AppliedJobCard() {

    const baseUrl = process.env.BASE_URL || "http://localhost:3000";



    const h = await headers(); // current request headers

    const appliedData = await fetch(`${baseUrl}/api/appliedjobs`, {
        headers: {
            cookie: h.get("cookie") || "",   // 🔥 session cookie forward
        },
    });

    const appliedJobs = await appliedData.json();
    if (!appliedData.ok) {
        throw new Error(appliedData.statusText);
    }



    // console.log(appliedJobs);
    return (
        <div className="flex flex-col gap-6 w-full">

            <div className="w-full flex flex-col items-center gap-2">

                <div className="w-full flex justify-start">
                    <h1 className="text-lg sm:text-xl  md:text-xl font-semibold uppercase text-zinc-400 tracking-wide">
                        Applied Jobs
                    </h1>
                </div>

                {/* <div className="h-[0.5px] w-50 rounded-2xl bg-gray-300" /> */}

            </div>
            {Array.isArray(appliedJobs) && appliedJobs.length > 0 ? (
                appliedJobs.map((job: any) => (
                    <div key={job.id} className="w-full flex gap-4 md:flex-row flex-col">
                        <div

                            className="mb-2 flex-3  bg-zinc-700/40 w-full  md:w-2/3  rounded-lg p-0 sm:p-2 md:p-4"
                        >
                            <div className="flex flex-col gap-3 p-4 md:p-2 text-zinc-300">

                                {/* Top Row */}
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">

                                    {/* Company */}
                                    <div className="flex gap-2 items-center">
                                        <Image
                                            src={job.job.company_logo}
                                            alt="company logo"
                                            width={40}
                                            height={40}
                                            className="rounded-md h-8 w-8 object-cover"
                                        />
                                        <p className="text-sm sm:text-[15px] font-medium">
                                            {job.job.company_name}
                                        </p>
                                    </div>

                                    {/* Applied + Status */}
                                    <div className="flex flex-row flex-wrap sm:flex-col gap-2 ">
                                        <p className="flex text-[10px] sm:text-xs bg-zinc-700/40 border-zinc-500/40 px-2 py-1 border rounded-md items-center whitespace-nowrap">
                                            Applied: {formatDate(job.applied_at)}
                                        </p>

                                        <p
                                            className={`flex sm:text-xs px-2 text-[10px] py-1 rounded-md items-center border whitespace-nowrap
                                        ${job.status === "pending"
                                                    ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/40"
                                                    : job.status === "shortlisted"
                                                        ? "bg-green-500/10 text-green-500 border-green-500/40"
                                                        : "bg-zinc-700/40 text-zinc-400 border-zinc-500/40"
                                                }`}
                                        >
                                            Status: {job.status}
                                        </p>

                                    </div>

                                </div>

                                {/* Job Title */}
                                <p className="text-sm sm:text-[15px] font-medium leading-snug">
                                    {job.job.job_title}
                                </p>

                                {/* Location */}
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-wrap gap-2 items-center">
                                        <p className="text-sm sm:text-[15px] flex gap-1 items-center font-medium text-zinc-400">
                                            <MapPin className="w-4 h-4 text-red-600" />
                                            {job.job.location}
                                        </p>
                                        <p className="flex gap-1  text-[10px] sm:text-xs bg-zinc-700/40 border-zinc-500/40 px-2 py-1 border rounded-md items-center whitespace-nowrap"><IndianRupee className=" h-3 w-3 translate-y-[-1.1px] sm:w-4 sm:h-4 text-green-600" />{job.job.salary_per_month_from} - {job.job.salary_per_month_to}</p>
                                    </div>
                                    <Link
                                        href={`/jobspage/${job.job.company_name}/${job.job.job_title}-${job.job.id}`}
                                        className="relative overflow-hidden text-xs sm:text-base whitespace-nowrap p-2 bg-indigo-700 hover:bg-indigo-800 transition-all duration-200 ease-in-out rounded-lg text-zinc-100 font-medium group"
                                    >

                                        <span className="relative flex gap-1 items-center z-10">View Job<span><ExternalLink className="sm:w-5 sm:h-5 h-4 w-4" /></span></span>
                                    </Link>

                                </div>

                            </div>


                        </div>
                        <div className="bg-zinc-800/40 flex flex-col justify-between w-full flex-3 p-4 min-h-[150px] rounded-lg md:p-8 md:flex-1">
                            <Link className="bg-linear-to-r hover:from-indigo-800 md:text-sm text-[14px] whitespace-nowrap  hover:via-purple-800 flex items-center  hover:to-indigo-700 from-indigo-700 gap-2 via-purple-700 to-indigo-600 rounded-lg p-2" href={`/missingskills/${job.job.company_name}/${job.job.job_title}-${job.job.id}`}><span><AlertCircle className="w-3 h-3 sm:h-4 sm:w-4" /></span>Missing Skills</Link>
                            <Link className="bg-linear-to-r hover:from-indigo-800 md:text-sm text-[14px] whitespace-nowrap  hover:via-purple-800 flex items-center  hover:to-indigo-700 from-indigo-700 gap-2 via-purple-700 to-indigo-600 rounded-lg p-2" href={`/recommendations/${job.job.company_name}/${job.job.job_title}-${job.job.id}`}><span><Lightbulb className="w-3 h-3 sm:h-4 sm:w-4" /></span>Recommendations</Link>
                            <Link className="bg-linear-to-r hover:from-indigo-800 md:text-sm text-[14px] whitespace-nowrap  hover:via-purple-800 flex items-center  hover:to-indigo-700 from-indigo-700 gap-2 via-purple-700 to-indigo-600 rounded-lg p-2" href={`/preparation/${job.job.company_name}/${job.job.job_title}-${job.job.id}`}><span><Brain className="w-3 h-3 sm:w-4 sm:h-4" /></span>Preparation Strategy</Link>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-sm text-gray-500">No applied jobs found.</div>
            )}


        </div>
    )
}
