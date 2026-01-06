"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function SessionStorageCleaner() {
    const pathname = usePathname();

    useEffect(() => {
        // We only care if we are NOT on the internship addition page
        if (pathname !== "/add/internship") {
            const keysToRemove = ["recruiterFormData", "recruiterFormCount"];

            let hasKeys = false;
            for (const key of keysToRemove) {
                if (sessionStorage.getItem(key) !== null) {
                    hasKeys = true;
                    break;
                }
            }

            if (hasKeys) {
                // console.log("Cleaning recruiter session storage...");
                keysToRemove.forEach(key => sessionStorage.removeItem(key));
            }
        }
    }, [pathname]);

    return null;
}
