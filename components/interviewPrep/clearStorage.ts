"use client";
import { useEffect, useRef } from "react";

export function useClearStorageGuard() {
    const guardedRef = useRef(false);

    useEffect(() => {
        const MSG =
            "Your interview session will be reset. Are you sure you want to quit?";

        const clear = async () => {

            await fetch("/api/countinterview", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            localStorage.removeItem("Responses");
            localStorage.removeItem("summary");
            localStorage.removeItem("interviewJobContext");
        };

        const beforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = "";
        };

        const handlePopState = () => {
            const leave = confirm(MSG);

            if (leave) {
                clear();
                window.removeEventListener("popstate", handlePopState);
                history.back(); // untouched
            } else {
                history.pushState(null, "", location.href);
            }
        };

        const handleClick = (e: MouseEvent) => {
            const anchor = (e.target as HTMLElement).closest("a");

            if (!anchor) return;
            if (anchor.target === "_blank") return;
            if (anchor.href === location.href) return;

            const leave = confirm(MSG);

            if (!leave) {
                e.preventDefault();
            } else {
                clear();
            }
        };

        if (!guardedRef.current) {
            history.pushState(null, "", location.href);
            guardedRef.current = true;
        }

        window.addEventListener("beforeunload", beforeUnload);
        window.addEventListener("popstate", handlePopState);
        document.addEventListener("click", handleClick, true);

        return () => {
            window.removeEventListener("beforeunload", beforeUnload);
            window.removeEventListener("popstate", handlePopState);
            document.removeEventListener("click", handleClick, true);
        };
    }, []);
}