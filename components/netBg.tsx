export default function NetBg() {
    return (
        <div
            aria-hidden
            className="
        pointer-events-none
        absolute inset-0
        -top-16 h-48
        overflow-hidden
      "
        >
            <div
                className="
          absolute inset-x-0 h-full
          bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)]
          [background-size:32px_32px]
          mask-image:linear-gradient(to_bottom,black,transparent)
        "
            />
        </div>
    )
}
