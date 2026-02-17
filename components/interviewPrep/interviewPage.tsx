"use client"
import { useRef, useState } from "react";
import AiLayout from "./AiLayout";
import ChatLayout from "./chatLayout";
import ExpandMinimize from "./expandminimize";

declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}
export default function Interview() {
    const silenceTimer = useRef<any>(null);
    const recognitionRef = useRef<any>(null);
    const [expand, setExpand] = useState<boolean>(false);
    const [listen, setListen] = useState<boolean>(false);
    const [interimText, setInterimText] = useState<string>("");
    const [finalText, setFinalText] = useState<string>("");


    function audioToText() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Speech Recognition not supported, please use Chrome for best experience")
            return;
        }
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.lang = "en-US";
        recognition.interimResults = true;

        recognition.onresult = (event: any) => {

            let interim = "";
            let final = "";
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const trans = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    final += trans + "";
                }
                else {
                    interim += trans;
                }


            }
            setFinalText(final);
            setInterimText(interim);
            clearTimeout(silenceTimer.current);
            silenceTimer.current = setTimeout(() => {
                recognition.stop();
                setListen(false);
                setInterimText("");
            }, 4000);


        }

        recognition.onerror = (event: any) => {

            setListen(false);
            stop();
            if (event.error !== "no-speech") {
                throw new Error(event.error);
            }
        }
        recognition.onend = () => {
            setListen(false);
            sessionStorage.setItem("userResponse", finalText);
        }
        recognition.start();
        setListen(true);
        recognitionRef.current = recognition;



    }
    const stop = () => {
        recognitionRef.current.stop();
        // setListen(false);
        setInterimText("");
    }

    // console.log(interimText);
    // console.log(finalText);
    return (
        <div
            className={
                expand
                    ? "fixed top-0 left-0 w-screen min-h-screen z-50 bg-zinc-950"
                    : "relative w-full"
            }
        >

            <ExpandMinimize expand={expand} setExpand={setExpand} />
            <div className={`w-full h-full p-4 flex items-stretch  ${expand ? "mt-20 md:mt-15 md:px-10 lg:px-20" : ""}`}>
                <AiLayout startListen={audioToText} interimText={interimText} finalText={finalText} listen={listen} stopListen={stop} expand={expand} setInterimText={setInterimText} />
                <ChatLayout />
            </div>
        </div>
    );
}