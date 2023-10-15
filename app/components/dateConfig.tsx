"use client"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import React, {useEffect, useState} from "react";
import {getAuth} from "firebase/auth";
import getFirestoreDocument from "@/firebase/firestore/getData";
import {router} from "next/client";
import {useRouter} from "next/navigation";

export let week:string;
export let day:string;

export default function DateConfig() {

    const days = ["MO", "TH", "WE", "TU", "FR", "SA", "SU"]
    const [checked, setChecked] = useState<number | null>(null);
    const user = getAuth().currentUser.uid;
    const router = useRouter();

// keeps `userdata` up to date
    useEffect(() => {

        if (!user || !week) {
            day="";
            week="";
            setChecked(null);
            return;
        }

        try{
            console.log()
            setChecked(days.indexOf(day));
        }catch (e){
            console.log(e)
        }

        getFirestoreDocument("exercises", user).then((res: any) => {
            if (res.result) {
                const dates = sortDates(Object.keys(res.result.exercises)).then((date)=>{
                    week = date[0];
                    router.refresh()
                })
            }
        });
    }, [user]); // <-- rerun when user changes

    const handleClick = (i: number) => {
        if (checked === i) {
            day = days[i].toUpperCase()
            setChecked(null);
        } else {
            day = days[i].toUpperCase()
            setChecked(i);
        }
        router.refresh()
    };

    useEffect(() => {

    }, [week]);

    return (
        <>
            <div className="rounded-xl border-2 border-[#9a9d93] w-[40rem] min-w-fit">
                <div className="w-fit justify-center flex-col mx-auto flex mb-3 px-4 pt-8 py-4">
                    <div className="flex w-fit mb-[1rem]">
                        <span className="font-bold text-3xl">{week}</span>
                    </div>
                    <div className="flex flex-row">
                        {days.map((day, index) => (
                            <div key={index} className="flex flex-col pe-3">
                                <div
                                    className="cursor-pointer hover:text-blue-700 flex justify-center"
                                >
                                    {checked === index ? (
                                        <CheckCircleIcon onClick={() => handleClick(index)} sx={{ fontSize: '3rem', color: "limegreen" }} />
                                    ) : (
                                        <RadioButtonUncheckedIcon onClick={() => handleClick(index)} sx={{ fontSize: '3rem' }} />
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


const sortDates = async (dates:any)=>{
    dates.sort((a, b) => {
        // Split the string and take the first part as the starting date of the week
        const date1 = new Date(convertDateFormat(a.split('-')[0]));
        const date2 = new Date(convertDateFormat(b.split('-')[0]));
        return date1.getTime() - date2.getTime();
    });
    return dates;
}

function convertDateFormat(date: string): string {
    const [day, month, year] = date.split('.');
    return `${month}/${day}/${year}`;
}
