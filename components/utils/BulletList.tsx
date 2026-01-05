export const BulletList = ({ text }: { text: string }) => {
    if (!text) return null;
    const points = text.split('.').map(p => p.trim()).filter(p => p.length > 0);
    return (
        <ul className="space-y-3">
            {points.map((point, index) => (
                <li key={index} className="flex items-start gap-3 text-zinc-300 leading-relaxed">
                    <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                    <span>{point}</span>
                </li>
            ))}
        </ul>
    );
};