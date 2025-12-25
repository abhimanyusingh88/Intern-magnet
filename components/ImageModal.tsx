"use client"

import Image from "next/image"
import { X, Download } from "lucide-react"
import { createPortal } from "react-dom"
import { useEffect, useState } from "react"

interface ImageModalProps {
    open: boolean
    setOpen: (open: boolean) => void
    sessionImage?: string | null
}

export default function ImageModal({
    open,
    setOpen,
    sessionImage,
}: ImageModalProps) {
    const [isDownloading, setIsDownloading] = useState(false)

    useEffect(() => {
        if (!open) return
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [open])

    if (!open) return null

    const imageSrc = (() => {
        if (!sessionImage) return "/avatar-placeholder.png"

        if (sessionImage.includes("googleusercontent.com")) {
            return sessionImage.replace(/=s\d+(-c)?$/, "=s1000")
        }

        if (sessionImage.includes("githubusercontent.com")) {
            const sep = sessionImage.includes("?") ? "&" : "?"
            return `${sessionImage}${sep}s=1000`
        }

        return sessionImage
    })()

    const handleDownload = async () => {
        if (imageSrc === "/avatar-placeholder.png") return

        try {
            setIsDownloading(true)
            const res = await fetch(imageSrc)
            const blob = await res.blob()
            const url = URL.createObjectURL(blob)

            const a = document.createElement("a")
            a.href = url
            a.download = `profile-image-${Date.now()}.jpg`
            document.body.appendChild(a)
            a.click()
            a.remove()
            URL.revokeObjectURL(url)
        } catch {
            window.open(imageSrc, "_blank")
        } finally {
            setIsDownloading(false)
        }
    }

    return createPortal(
        <div
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 backdrop-blur-2xl animate-in fade-in duration-500"
            onClick={() => setOpen(false)}
        >
            <div
                className="relative flex flex-col items-center justify-center p-4 w-full h-full"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Actions */}
                <div className="absolute top-6 right-6 flex items-center gap-3">
                    <button
                        onClick={handleDownload}
                        disabled={isDownloading}
                        className="p-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:scale-110 active:scale-95 transition-all duration-200 backdrop-blur-md flex items-center justify-center group"
                    >
                        {isDownloading ? (
                            <div className="h-7 w-7 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <Download
                                size={28}
                                className="group-hover:translate-y-0.5 transition-transform"
                            />
                        )}
                    </button>

                    <button
                        onClick={() => setOpen(false)}
                        className="p-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:scale-110 active:scale-95 transition-all duration-200 backdrop-blur-md"
                    >
                        <X size={28} />
                    </button>
                </div>

                {/* Image */}
                <div className="relative overflow-hidden rounded-4xl border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)] bg-zinc-950 animate-in zoom-in-95 duration-500 max-w-[90vw] max-h-[80vh] aspect-square w-full sm:w-[500px] md:w-[700px] lg:w-[800px]">
                    <Image
                        src={imageSrc}
                        fill
                        alt="Profile Full View"
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 800px, 1000px"
                        quality={100}
                        priority
                    />
                </div>
            </div>
        </div>,
        document.body
    )
}
