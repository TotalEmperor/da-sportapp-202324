import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

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

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="date" stroke={"white"}/>
                <YAxis stroke={"white"} unit={unitSelector[lineKey]}/>
                <Tooltip wrapperClassName={"dark:text-black"}/>
                <Legend/>
                <Line type="monotone" dataKey={lineKey} name={lineKey} unit={unitSelector[lineKey]} stroke="#8884d8"
                      activeDot={{r: 8}}/>
            </LineChart>
        </ResponsiveContainer>
    );
}