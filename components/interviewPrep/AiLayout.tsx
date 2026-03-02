"use client"
import { ArrowUp, Mic, X } from "lucide-react";
import { useState } from "react";
import StartConfirmation from "./startConfirmation";

type listener = {
    expand: any, startListen: () => void, stopListen: any, interimText: string, listen: any, setInterimText: any, setResponse: any, setListen: any, speaking: boolean
}


export default function AiLayout({ expand, startListen, stopListen, interimText, listen, setInterimText, setResponse, setListen, speaking }: listener) {



    const [start, setStart] = useState<boolean>(false);
    const [submit, setSubmit] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    async function submitCount() {
        try {
            setLoading(true);
            await fetch("/api/countinterview", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            setOpen(false);
            setStart(true);
            setLoading(false);
        }
        catch (err: any) {
            setOpen(false);
            setLoading(false);
            throw new Error(err.message);
        }
    }
    async function submitReport() {
        try {
            setLoading(true);
            const summary = sessionStorage.getItem("summary");
            if (!summary) {
                setOpen(false);
                setLoading(false);
                return;
            }
            // await fetch("/api/submitreport", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     body: JSON.stringify({
            //         summary: summary
            //     })
            // })
            setOpen(false);
            setStart(false);
            setSubmit(false);
            setLoading(false);
        }
        catch (err: any) {
            setOpen(false);
            setLoading(false);
            throw new Error(err.message);
        }
    }


    return <div className={`w-full flex flex-col items-center md:w-2/3 rounded-lg sm:rounded-r-none overflow-hidden border-zinc-500/20 border-[0.7px] md:border-r-0 md:border-l-[0.7px] md:border-t-[0.7px] md:border-b-[0.7px] ${expand ? "h-[450px] sm:h-[600px]" : "h-[300px] md:h-[450px]"}`}>
        <div className={`w-full bg-orange-900/25 flex justify-center items-center flex-1`}>
            <div className={`w-[60px] text-xl h-[60px] flex items-center justify-center rounded-full text-zinc-400 font-bold bg-orange-950/90 ${speaking ? "ai-speaking" : ""}`}>
                AI
            </div>


        </div>





        <form className="w-9/10 flex mt-6 mb-4 gap-2 md:gap-2 items-center">
            {
                start === true && <input onChange={(e) => {
                    setInterimText(e.target.value);
                }} type="text" value={interimText} placeholder="Reply..." className="rounded-3xl w-full border-[0.7px] outline-none border-zinc-500/50 focus-within:border-zinc-500/80 bg-zinc-900 transition-colors duration-200 px-4 py-2 md:py-3" />
            }

            {
                start === true && <button onClick={(e) => {
                    e.preventDefault();
                    window.speechSynthesis.cancel();
                    if (interimText.trim() !== "") {
                        setResponse((prev: any) => [...prev, {
                            type: "user",
                            text: interimText
                        }])
                    }
                    setInterimText("");
                }} type="submit" > <ArrowUp className="h-7 w-7 bg-zinc-700/50  rounded-sm text-zinc-200 cursor-pointer hover:bg-zinc-300/30 p-1  transition-all duration-75" /></button>
            }
            {
                start === true ? <button type="button" onClick={() => {
                    setOpen(f => !f);
                    setSubmit(true);
                }} className="w-[70px] sm:w-[80px]">
                    <p className="text-zinc-50 text-[11px] sm:text-sm cursor-pointer hover:bg-red-600/70 bg-red-500/50 px-2 py-1 rounded-md">Submit</p>
                </button> : <button type="button" onClick={() => setOpen(f => !f)} className="w-[70px] sm:w-[80px]">
                    <p className="text-zinc-50 text-base uppercase cursor-pointer hover:bg-zinc-600/70 bg-zinc-700/50 px-2 py-1 rounded-md">Start</p>

                </button>
            }
            {
                start === true && <button
                    onClick={() => {
                        window.speechSynthesis.cancel();
                        setListen((prev: any) => !prev);
                        if (!listen) {
                            startListen();
                        } else {
                            stopListen();
                        }
                    }}
                    type="button" className="flex items-center gap-2" ><Mic className={`h-7 w-7 cursor-pointer ${listen ? "text-red-500 animate-pulse duration-300" : "text-zinc-500/70 hover:text-zinc-300"}`} />{listen && <span className="text-zinc-400/75 text-xs">Listening...</span>}</button>
            }



        </form>
        {
            open === true && submit === true && start === true && <StartConfirmation loading={loading} onConfirm={() => {
                submitReport()
            }} header="Are you sure to submit the interview and generate a report?" btName="Submit" open={open} setOpen={setOpen} />
        }
        {
            open === true && start === false && submit === false && <StartConfirmation loading={loading} onConfirm={() => {
                submitCount();
            }} header="Are you ready to start the interview? you have to spend 1 token" btName="Start" open={open} setOpen={setOpen} />
        }
    </div>
}