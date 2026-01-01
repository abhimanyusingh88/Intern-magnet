"use client"
import { useState, useEffect } from "react"
import AllRecruitersForm from "./AllRecruitersForm"
import ProgressLine from "./progressLine"

export default function RecruiterForms() {
    const [count, setCount] = useState<number>(-1)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        const savedCount = sessionStorage.getItem("recruiterFormCount")
        if (savedCount !== null) {
            setCount(parseInt(savedCount, 10))
        }
        setIsLoaded(true)
    }, [])

    useEffect(() => {
        if (isLoaded) {
            sessionStorage.setItem("recruiterFormCount", count.toString())
        }
    }, [count, isLoaded])

    if (!isLoaded) return null // Prevent flash of initial state

    return (
        <div
            className="
                flex flex-col
                sm:flex-row
                items-center sm:items-start
                gap-8
                lg:gap-20
                w-full
            "
        >
            {/* Progress line — shifted right on big screens */}
            <div className="lg:ml-20 shrink-0">
                <ProgressLine count={count} />
            </div>

            {/* Form — centered */}
            <div className="flex-1 w-full flex justify-center">
                <AllRecruitersForm count={count} setCount={setCount} />
            </div>
        </div>
    )
}
