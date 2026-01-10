"use client"

import { useQuery } from "@tanstack/react-query"
interface Props {
    id: string,
    companyname: string,
    slug: string
}

export function PerJobData({ id, companyname, slug }: Props) {
    const { data, error, isLoading, isError } = useQuery({
        queryKey: ["perjobdata", id],
        queryFn: async () => {
            const jobdata = await fetch(`/api/job/${companyname}/${slug}`);
            const res = jobdata.json();
            return res;
        }
    })
    return { data, error, isLoading, isError }
}