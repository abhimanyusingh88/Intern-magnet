import { Pie, PieChart, Sector, Cell, PieSectorDataItem, Tooltip, TooltipIndex, ResponsiveContainer } from 'recharts';


const COLORS = [
    '#00C49F',
    '#FFBB28',
    '#FF4D4F',
];


const renderActiveShape = ({
    cx, cy, midAngle, innerRadius, outerRadius,
    startAngle, endAngle, fill, payload, percent, value,
}: PieSectorDataItem) => {
    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-RADIAN * (midAngle ?? 1));
    const cos = Math.cos(-RADIAN * (midAngle ?? 1));
    const sx = (cx ?? 0) + ((outerRadius ?? 0) + 5) * cos;
    const sy = (cy ?? 0) + ((outerRadius ?? 0) + 5) * sin;
    const mx = (cx ?? 0) + ((outerRadius ?? 0) + 15) * cos;
    const my = (cy ?? 0) + ((outerRadius ?? 0) + 15) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 15;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {`( ${payload.name} )`}
            </text>


            <Sector {...{ cx, cy, innerRadius, outerRadius, startAngle, endAngle }} fill={fill} />
            <Sector {...{ cx, cy, startAngle, endAngle }} innerRadius={(outerRadius ?? 0) + 6} outerRadius={(outerRadius ?? 0) + 10} fill={fill} />

            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />


            <text x={ex + (cos >= 0 ? 1 : -1) * 8} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {` ${((percent ?? 1) * 100).toFixed(0)}%`}
            </text>
        </g>
    );
};

export default function CustomActiveShapePieChart({
    isAnimationActive = true,
    defaultIndex = undefined,
    data
}: {
    isAnimationActive?: boolean;
    defaultIndex?: TooltipIndex;
    data: { name: string, value: number }[]
}) {
    return (
        <div style={{ width: '100%', maxWidth: '300px', maxHeight: '80vh', aspectRatio: 1 }}>
            <style
                dangerouslySetInnerHTML={{
                    __html: `
      .recharts-text {
        font-size: 12px;
      }

      .recharts-wrapper,
      .recharts-surface,
      .recharts-sector,
      .recharts-layer,
      .recharts-wrapper *,
      path,
      svg:focus {
        outline: none !important;
        border: none !important;
        box-shadow: none !important;
      }
    `,
                }}
            />
            <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                    <Pie
                        activeShape={renderActiveShape}
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius="40%"
                        outerRadius="60%"
                        dataKey="value"
                        isAnimationActive={isAnimationActive}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>

                    <Tooltip content={() => null} defaultIndex={defaultIndex} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
