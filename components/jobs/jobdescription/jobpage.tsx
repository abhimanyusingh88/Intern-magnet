
"use client"
import { PerJobData } from "@/lib/data/perJobdata"
import { JobDetail } from "@/lib/types/types";

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
    return <div className="flex flex-col sm:flex-row gap-2 md:gap-4 ">
        {/* yha pura company ka data  */}
        <section className="w-full sm:w-2/3  rounded-xl ">
            {isError && <p className="text-xl text-red-600">{error?.message}</p>}
            {/* main card waala div */}
            <div className="w-full rounded-xl bg-zinc-700 opacity-45">
                {/* first row isme company logo,job title */}
                <div></div>
                {/* second row isme company ka naam and exp and salary */}
                <div></div>
                {/* company location */}
                <div></div>
            </div>
            {/* pura description waala div */}
            <div></div>
            {/* about company waala div */}
            <div></div>
        </section>

        {/* yha bas ratings, reviews , additional benfits */}
        <section className="w-full sm:w-1/3 h-[600px] rounded-xl bg-zinc-700 opacity-40"></section>
    </div>
}