"use client"
import { Expand, Minimize } from "lucide-react";
import { useState } from "react";
import AiLayout from "./AiLayout";
import ChatLayout from "./chatLayout";

export default function Interview() {

    const [expand, setExpand] = useState<boolean>(false);
    return (
        <div
            className={
                expand
                    ? "fixed top-0 left-0 w-screen min-h-screen z-50 bg-zinc-950"
                    : "relative w-full"
            }
        >

            <div className="text-zinc-200  cursor-pointer relative  ">
                <div onClick={() => setExpand(true)} className={!expand ? "group absolute top-[-10px] right-0 block  " : "hidden"}>
                    <span className="group-hover:text-zinc-100 bg-zinc-800 px-2 py-1 rounded-lg text-sm translate-y-[-5px] absolute translate-x-[-25px] top-[-28px]  group-hover:block hidden">Expand</span>

                    <Expand className="h-4 w-4" />
                </div>
                <div
                    onClick={() => setExpand(false)}
                    className={
                        expand
                            ? "group absolute top-18 right-2 sm:right-4 z-50 cursor-pointer"
                            : "hidden"
                    }
                >


                    <Minimize className="h-5 w-5 text-zinc-400 hover:text-zinc-100" />
                    <span className="group-hover:text-zinc-100 bg-zinc-800 px-2 py-1 rounded-lg text-sm absolute top-6 right-0 hidden group-hover:block">
                        Minimize
                    </span>
                </div>

            </div>
            <div className={`w-full h-full p-4 flex items-stretch  ${expand ? "mt-20 md:mt-20 md:px-10 lg:px-20" : ""}`}>
                <AiLayout expand={expand} />
                <ChatLayout />
            </div>
        </div>
    );
}