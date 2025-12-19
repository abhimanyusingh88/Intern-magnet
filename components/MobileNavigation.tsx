"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import MobileMenu from "./mobileMenu"

export default function MobileNavigation({ session }: { session: any }) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <button
                onClick={() => setOpen(!open)}
                className="md:hidden rounded-lg border border-white/10 p-2 text-zinc-200"
            >
                {open ? <X className="cursor-pointer" size={18} /> : <Menu className="cursor-pointer" size={18} />}
            </button>

            {/* 
         Positioning the menu absolutely so it sits below the navbar 
         regardless of where this component is placed in the flex container.
         The parent <nav> is fixed, so this absolute is relative to it (or the viewport if nav wasn't positioned, but nav is fixed).
         The top should be h-14 (56px).
      */}
            <div className="absolute top-14 left-0 w-full z-40">
                <MobileMenu open={open} setOpen={setOpen} session={session} />
            </div>
        </>
    )
}
