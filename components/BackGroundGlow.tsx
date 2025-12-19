export default function BackGroundGlow() {
  return <div className="pointer-events-none fixed inset-0 z-0">
    <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-linear-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-3xl" />
  </div>
}