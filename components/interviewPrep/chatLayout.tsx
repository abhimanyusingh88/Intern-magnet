"use client"

import { useEffect, useRef, useState } from "react"
import ChatLayoutSection from "./chatlayoutSection"
import { speak } from "./textToAudio"

export default function ChatLayout({
    Response,
    expand,
    loading,
    setSpeaking,
    setVoiceOn,
    voiceOn
}: {
    Response: any
    expand: boolean
    loading: boolean
    setSpeaking: any
    setVoiceOn: any
    voiceOn: any
}) {

    const [displayText, setDisplayText] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const [loud, setLoud] = useState(true)

    const typingRef = useRef<NodeJS.Timeout | null>(null)
    const firstRender = useRef(true)
    const lastTyped = useRef<string | null>(null)
    const spokenIndex = useRef(0)

    const containerRef = useRef<HTMLDivElement>(null)


    useEffect(() => {
        if (!Response?.length) return

        const m = Response[Response.length - 1]

        if (firstRender.current) {
            if (m.type === "ai") lastTyped.current = m.text
            firstRender.current = false
            return
        }

        if (m.type !== "ai") { setIsTyping(false); return }

        if (lastTyped.current === m.text) return
        lastTyped.current = m.text

        let i = 0
        spokenIndex.current = 0
        setDisplayText("")
        setIsTyping(true)

        if (typingRef.current) clearTimeout(typingRef.current)

        const type = () => {
            if (i < m.text.length) {

                const t = m.text.slice(0, i + 1)
                setDisplayText(t)

                if (loud) {
                    const c = m.text[i]
                    if (c === "." || c === "?") {
                        const chunk = m.text.slice(spokenIndex.current, i + 1)
                        if (chunk.trim().length > 2) {
                            speak(chunk, setVoiceOn);
                            spokenIndex.current = i + 1
                        }
                    }
                }

                i++
                typingRef.current = setTimeout(type, 20)

            } else {

                if (loud && spokenIndex.current < m.text.length) {
                    speak(m.text.slice(spokenIndex.current), setVoiceOn)
                }

                setIsTyping(false)
                setSpeaking(false)
            }
        }

        type()

        return () => {
            if (typingRef.current) clearTimeout(typingRef.current)
        }

    }, [Response])

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight
        }
    }, [Response, displayText, loading])

    useEffect(() => {
        if (loud && displayText && !window.speechSynthesis.speaking) {
            if (spokenIndex.current < displayText.length) {
                const t = displayText.slice(spokenIndex.current)
                if (t.trim()) {
                    speak(t, setVoiceOn)
                    spokenIndex.current = displayText.length
                }
            }
        }
    }, [loud])

    useEffect(() => {

        return () => window.speechSynthesis.cancel()
    }, [])

    return (
        <ChatLayoutSection
            voiceOn={voiceOn}
            expand={expand}
            Response={Response}
            loading={loading}
            displayText={displayText}
            isTyping={isTyping}
            loud={loud}
            setLoud={setLoud}
            containerRef={containerRef}
        />
    )
}