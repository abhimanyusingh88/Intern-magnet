export const BulletList = ({ text, color }: { text?: string, color: string }) => {
    if (!text) return null;
    const points = text.split('.').map(p => p.trim()).filter(p => p.length > 0);
    return (
        <ul className="space-y-3">
            {points.map((point, index) => (
                <li key={index} className="flex items-center gap-2 text-zinc-300 leading-relaxed">
                    <span className={` w-[4px] h-[0.75px]   ${color} shrink-0`} />
                    <span className="text-justify">{point}</span>
                </li>
            ))}
        </ul>
    );
};