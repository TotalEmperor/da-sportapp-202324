import {Area, AreaChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import React from "react";

export default function StackedAreaGraph(data:any){

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

    const areaElements = Object.keys(colors).map((type) => (
        <Area type={"monotone"} key={type} dataKey={type} stackId="1" fill={colors[type]} stroke={colors[type]} unit={"kcal"} />
    ));

    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart
                width={500}
                height={400}
                data={data["data"]}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                {areaElements}
            </AreaChart>
        </ResponsiveContainer>
    );
}