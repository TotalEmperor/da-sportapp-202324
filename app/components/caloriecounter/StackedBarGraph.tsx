import React, { PureComponent } from 'react';
import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LabelList
} from 'recharts';


export default function StackedBarGraph(data: any, barKey:string)  {
    console.log("EWFUAWBDFHNUAWBFO: ")
    console.log(data["data"])

        return (
            <ResponsiveContainer width={"100%"} height={"100%"}>
                <BarChart
                    barSize={30}
                    width={0}
                    height={0}
                    data={data["data"]}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" stroke={"white"} />
                    <YAxis stroke={"white"} unit={"kcal"} />
                    <Tooltip wrapperClassName={"dark:text-black"}/>
                    <Legend/>
                    <Bar dataKey={"time"} stackId="a" fill={"blue"}  unit={"kcal"}/>
                </BarChart>
            </ResponsiveContainer>
        );
}
