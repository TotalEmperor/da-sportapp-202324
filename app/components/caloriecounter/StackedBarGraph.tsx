import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export default function StackedBarGraph(data: any)  {
    console.log("EWFUAWBDFHNUAWBFO: ")
    console.log(data["data"])
    const colors = {
        Abs: 'red',
        Forearms: 'blue',
        Back: 'green',
        Biceps: 'purple',
        Chest: 'pink',
        Legs: '#82ca9d',
        Shoulders: 'orange',
        Traps: 'brown',
        Triceps: 'cyan',
        others: 'gray',
    };

    const barElements = Object.keys(colors).map((type) => (
        <Bar key={type} dataKey={type} stackId="a" fill={colors[type]} unit={"kcal"} />
    ));

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
                    <Tooltip/>
                    <Legend/>
                    {barElements}
                </BarChart>
            </ResponsiveContainer>
        );
}
