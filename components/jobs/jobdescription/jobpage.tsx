
"use client"
import { PerJobData } from "@/lib/data/perJobdata"
import { JobDetail } from "@/lib/types/types";
import { Briefcase, Clock4, ComputerIcon, IndianRupee, MapPin, TicketsPlane, Users } from "lucide-react";
import Image from "next/image";
import MainHeaderJob from "./mainHeaderJob";
import JobDescription from "./jobDescription";
import ErrorComponent from "../errorComponent";

export default function JobPage({ companyname, slug }: { companyname: string, slug: string }) {

    const arr: string[] = slug.split("-");
    const id: string = (arr[arr.length - 1]);

    const { data, error, isLoading, isError } = PerJobData({ id, companyname, slug });
    const jobData: JobDetail = {
        id: data?.id,
        job_title: data?.job_title,
        company_name: data?.company_name,
        location: data?.location,
        employment_type: data?.employment_type,
        job_description: data?.job_description,
        educational_requirements: data?.educational_requirements,
        primary_skills: data?.primary_skills,
        work_experience_min: data?.work_experience_min,
        work_experience_max: data?.work_experience_max,
        salary_per_month_from: data?.salary_per_month_from,
        salary_per_month_to: data?.salary_per_month_to,
        application_deadline: data?.application_deadline,
        created_at: data?.created_at,
        number_of_applications: data?.number_of_applications,
        additional_benefits: data?.additional_benefits,
        key_responsibilities: data?.key_responsibilities,
        good_to_have: data?.good_to_have,
        what_we_offer: data?.what_we_offer,
        screening_questions: data?.screening_questions,
        company_description: data?.company_description,
        website_link: data?.website_link,
        communication_preferences: data?.communication_preferences,
        company_logo: data?.company_logo,
        why_join: data?.why_join,
        required_qualifications: data?.required_qualifications,
        preferred_qualifications: data?.preferred_qualifications,
    }

    return <div className="flex flex-col sm:flex-row gap-2 md:gap-4 sm:items-start">
        {/*/////////// yha pura company ka data  */}
        <section className="w-full sm:w-2/3 rounded-xl sm:min-h-[1000px]">
            {isError && <ErrorComponent error={error} />}
            {/* main card waala div */}
            <MainHeaderJob jobData={jobData} />
            {/* pura description waala div */}
            <JobDescription jobData={jobData} />
            {/* about company waala div */}
            <div></div>
        </section>


        {/*//////////// yha bas ratings, reviews , additional benfits */}
        <section className="w-full sticky sm:top-0  lg:top-24 self-start sm:w-1/3 h-[600px] rounded-xl bg-zinc-800 opacity-40"></section>
    </div>
}