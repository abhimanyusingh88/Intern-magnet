export default function LegendItem({ color, label, value }: { color: string, label: string, value: number }) {
    return <div className="flex gap-4 text-zinc-300 font-medium text-[14px] sm:text-[15px] md:text-[16px] items-center"> <div className={`w-[20px] h-[20px]  ${color}`} /> <p>{label}: {value}</p></div>
}