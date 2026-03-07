import { toast } from "sonner"

interface submitReport {
    setLoading: any
    setStart: any
    setSubmit: any
    setResponse: any
    setOpen: any
    setReport: any
    setOpenReport: any
}
export async function submitReport({ setLoading, setStart, setSubmit, setResponse, setOpen, setReport, setOpenReport }: submitReport) {
    try {
        setLoading(true);
        const summary = sessionStorage.getItem("summary");
        const Response = sessionStorage.getItem("Responses");
        const lastTwentyRes = Response?.slice(-20);
        if (!summary || !Response) {
            setOpen("close");
            setStart("stop");
            setSubmit("nosubmit");
            sessionStorage.removeItem("totalInterview");
            sessionStorage.setItem("open", "close");
            sessionStorage.setItem("start", "stop");
            sessionStorage.setItem("submit", "nosubmit");
            sessionStorage.removeItem("summary");
            sessionStorage.removeItem("Responses");
            setResponse([]);
            setLoading(false);
            return;
        }
        const AIResponse = await fetch("/api/submitreport", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                summary: summary,

                message: lastTwentyRes
            })
        })
        let finalRes = await AIResponse.json();
        console.log("Raw AI Response:", finalRes);

        // Handle stringified JSON from AI
        if (typeof finalRes === "string") {
            try {
                const cleanJson = finalRes.replace(/```json\n?|\n?```/g, "").trim();
                finalRes = JSON.parse(cleanJson);
            } catch (e) {
                console.error("Failed to parse AI response as JSON:", e);
                toast.error("Failed to get report data");
                setLoading(false);
                return;
            }
        }

        if (finalRes && typeof finalRes === "object" && "interview_score" in finalRes) {
            setReport(finalRes);
            setOpenReport(true);
        } else {
            console.error("AI response format invalid:", finalRes);
            toast.error("Something went wrong!");
        }

        setOpen("close");
        setStart("stop");
        setSubmit("nosubmit");
        sessionStorage.setItem("totalInterview", "finish");
        sessionStorage.setItem("open", "close");
        sessionStorage.setItem("start", "stop");
        sessionStorage.setItem("submit", "nosubmit");
        sessionStorage.removeItem("summary");
        sessionStorage.removeItem("Responses");
        setResponse([]);

        setLoading(false);
    }
    catch (err: any) {
        setOpen("close");
        sessionStorage.setItem("open", "close");
        setLoading(false);
        toast.error("Internal server error")
        throw new Error(err.message);
    }
}