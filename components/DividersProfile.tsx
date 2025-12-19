export function TwoCol({ children }: { children: React.ReactNode }) {
    return <div className="grid grid-cols-1 gap-6 md:grid-cols-2">{children}</div>
}





export function Divider() {
    return <div className="h-px bg-white/5" />
}
// export default { Divider, TwoCol }