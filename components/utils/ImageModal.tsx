"use client"

import Image from "next/image"
import { X, Download } from "lucide-react"
import { createPortal } from "react-dom"
import { useEffect, useMemo, useState } from "react"

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

    const imageSrc = useMemo(() => {
        if (!sessionImage) return "/avatar-placeholder.png"

        if (sessionImage.includes("googleusercontent.com")) {
            return sessionImage.replace(/=s\d+(-c)?$/, "=s600")
        }

        if (sessionImage.includes("githubusercontent.com")) {
            const sep = sessionImage.includes("?") ? "&" : "?"
            return `${sessionImage}${sep}s=600`
        }

        return sessionImage
    }, [sessionImage])

    const handleDownload = async () => {
        if (!sessionImage) return

        try {
            setIsDownloading(true)
            const res = await fetch(imageSrc)
            const blob = await res.blob()
            const url = URL.createObjectURL(blob)

            const a = document.createElement("a")
            a.href = url
            a.download = `profile-image.jpg`
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

    if (!open) return null

    return createPortal(
        <div
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-xl animate-in fade-in duration-300"
            onClick={() => setOpen(false)}
        >
            <div
                className="relative flex items-center justify-center w-full h-full"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Actions */}
                <div className="absolute top-6 right-6 flex gap-3">
                    <button
                        onClick={handleDownload}
                        disabled={isDownloading}
                        className="p-3 rounded-full cursor-pointer bg-white/10 border border-white/20 text-white hover:bg-white/20 transition"
                    >
                        {isDownloading ? (
                            <div className="h-6 w-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <Download size={24} />
                        )}
                    </button>

                    <button
                        onClick={() => setOpen(false)}
                        className="p-3 rounded-full cursor-pointer bg-white/10 border border-white/20 text-white hover:bg-white/20 transition"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Circular Image */}
                <div className="relative w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] md:w-[320px] md:h-[320px] rounded-full overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.8)] bg-zinc-950 animate-in zoom-in-95 duration-300">
                    <Image
                        src={imageSrc}
                        fill
                        alt="Profile Full View"
                        className="object-cover"
                        sizes="320px"
                        quality={100}
                        priority
                    />
                </div>
            </div>
        </div>,
        document.body
    )
}
