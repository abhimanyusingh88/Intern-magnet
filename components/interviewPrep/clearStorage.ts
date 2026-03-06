"use client";
import { useEffect, useRef } from "react";

export function useClearStorageGuard() {
    const guardedRef = useRef(false);

    useEffect(() => {
        const MSG =
            "Your interview session will be reset. Are you sure you want to quit?";

        const clear = async () => {


            sessionStorage.removeItem("Responses");
            sessionStorage.removeItem("summary");
            sessionStorage.removeItem("interviewJobContext");
        };

        const isGuarded = () => {
            const isStarted = sessionStorage.getItem("start") === "start";
            const isFinished = sessionStorage.getItem("totalInterview") === "finish";
            return isStarted && !isFinished;
        };

        const beforeUnload = (e: BeforeUnloadEvent) => {
            if (!isGuarded()) return;
            e.preventDefault();
            e.returnValue = "";
        };

        const handlePopState = () => {
            if (!isGuarded()) {
                window.removeEventListener("popstate", handlePopState);
                history.back();
                return;
            }

            const leave = confirm(MSG);

            if (leave) {
                clear();
                window.removeEventListener("popstate", handlePopState);
                history.back();
            } else {
                history.pushState(null, "", location.href);
            }
        };

        const handleClick = (e: MouseEvent) => {
            const anchor = (e.target as HTMLElement).closest("a");

            if (!anchor) return;
            if (anchor.target === "_blank") return;
            if (anchor.href === location.href) return;

            if (!isGuarded()) return;

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