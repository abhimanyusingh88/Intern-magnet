"use client"

export default function HexagonBackground() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="hex-grid" />
    </div>
  )
}
