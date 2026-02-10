"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import RecruiterPannerNavDropdown from "../Recruiter-hiring/RecruiterPannerNavDropdown"

export default function NavLinks() {
    const pathname = usePathname()

    const linkClass = (path: string) =>
        `
relative
after:absolute after:left-0 after:-bottom-1
after:h-[3px] after:w-full after:bg-amber-100
after:origin-left after:scale-x-0
after:transition-transform after:duration-500
// yha se scale karega 
after:ease-[cubic-bezier(0.16,1,0.3,1)]
hover:after:scale-x-100
duration-300
will-change-transform transform-gpu
${pathname === path
            ? "text-amber-50 scale-110 after:scale-x-100"
            : "text-zinc-400 hover:text-zinc-100 hover:scale-105"
        }
`

    return (
        <div className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/dashboard" className={linkClass("/dashboard")}>Dashboard</Link>
            <Link href="/applications" className={linkClass("/applications")}>Applications</Link>
            <div className="relative group inline-block">
                <Link
                    href="/add"
                    className={linkClass("/add")}
                >
                    Recruiter Panel
                    {pathname !== "/add" &&
                        <span
                            className="absolute -top-3 -right-5 bg-amber-500 px-0.5 py-0.5 text-zinc-900 text-[11px]  font-bold  rounded-full z-20 transform"
                        >
                            Free
                        </span>
                    }
                </Link>

                {/* Hover dropdown */}
                <RecruiterPannerNavDropdown />
            </div>

            <Link href="/calendar" className={linkClass("/calendar")}>Calendar</Link>

        </div>
    )
}
