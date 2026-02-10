import Link from "next/link";

export default function LinkButtons({ children, link, title }: { children: any, link: string, title: string }) {
    return <Link className="bg-linear-to-r hover:from-indigo-800 md:text-sm text-[14px] whitespace-nowrap  hover:via-purple-800 flex items-center  hover:to-indigo-700 from-indigo-700 gap-2 via-purple-700 to-indigo-600 rounded-lg p-2" href={link}><span>{children}</span>{title}</Link>
}