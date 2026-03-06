export default function NetBg() {
    return (
        <div
            aria-hidden
            className="
        pointer-events-none
        fixed inset-0
        z-0
        overflow-hidden
      "
        >
            <div
                className="
        absolute inset-x-0 h-full
        bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)]
        [background-size:32px_32px]
        mask-image:linear-gradient(to_bottom,black,transparent)
    "
            />
        </div>
    )
}
