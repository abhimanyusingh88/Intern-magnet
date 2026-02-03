"use client"
import { useEffect, useState } from "react";
import CompleteProfile from "./completeYourProfile";

export default function TimerReminder() {
    const [show, setShow] = useState<boolean>(false);
    useEffect(function () {
        setTimeout(function () {
            setShow(true);
        }, 3000);
        return function () {
            setShow(false);
        }

    }, [])
    if (!show) return null;
    return <CompleteProfile />
}