import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import timeFormatter from "@/components/TimeFormatter";

export default function LineGraph({
    data = [],
    lineKey = 'sum'
}: {
    data: any;
    lineKey: string;
}) {

    const error = console.error;
    console.error = (...args: any) => {
        if (/defaultProps/.test(args[0])) return;
        error(...args);
    };

    const unitSelector = {
        time: "sec.",
        sum: "kcal",
        average: "kcal"
    }

    const CustomYAxisTick = (props) => {
        const { x, y, payload } = props;
        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} dy={16} textAnchor="end" className={'dark:fill-white'} transform="rotate(-45)">
                    {unitSelector[lineKey]=="sec."?
                        timeFormatter(payload.value)
                        :
                        `${payload.value} cal`
                    }
                </text>
            </g>
        );
    };

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 30,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="date" stroke={"white"}/>
                <YAxis stroke={"white"} tick={<CustomYAxisTick />}/>
                <Tooltip wrapperClassName={"dark:text-black"}/>
                <Legend/>
                <Line type="monotone" dataKey={lineKey} name={lineKey} unit={unitSelector[lineKey]} stroke="#8884d8"
                      activeDot={{r: 8}}/>
            </LineChart>
        </ResponsiveContainer>
    );
}