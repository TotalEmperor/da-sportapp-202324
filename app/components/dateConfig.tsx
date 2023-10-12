"use client"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import React, {useEffect, useState} from "react";
import {week} from "@/components/Exercises/SetComponentCollection";

export default function DateConfig() {

    const days = ["Mo", "Th", "We", "Tu", "Fr", "Sa", "Su"]
    const [checked, setChecked] = useState<number | null>(null);
    const [currentWeek, setCurrentWeek]=useState(String);

    useEffect(() => {
        setCurrentWeek(week)
    }, [week]);

    const handleClick = (i: number) => {
        if (checked === i) {
            setChecked(null);
        } else {
            setChecked(i);
        }
    };

    return (
        <>
            <div className="rounded-xl border-2 border-[#9a9d93] w-[70%] min-w-fit">
                <div className="w-fit justify-center flex-col mx-auto flex mb-3 px-4 pt-8 py-4">
                    <div className="flex w-fit ">
                        <span className="font-bold text-3xl">{week}</span>
                    </div>
                    <div className="flex flex-row">
                        {days.map((day, index) => (
                            <div key={index} className="flex flex-col pe-3">
                                <div
                                    onClick={() => handleClick(index)}
                                    className="cursor-pointer hover:text-blue-700 flex justify-center"
                                >
                                    {checked === index ? (
                                        <CheckCircleIcon sx={{ fontSize: '3rem', color: checked ? 'blue' : 'inherit' }} />
                                    ) : (
                                        <RadioButtonUncheckedIcon sx={{ fontSize: '3rem' }} />
                                    )}
                                </div>
                                    <h2 key={index} className="flex justify-center">{day}</h2>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="p-2"></div>

        </>
    )
}