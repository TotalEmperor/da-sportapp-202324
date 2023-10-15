"use client"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import React, {useEffect, useState} from "react";
import {getAuth} from "firebase/auth";
import getFirestoreDocument from "@/firebase/firestore/getData";
import {router} from "next/client";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {useRouter} from "next/navigation";

export let week:string;
export let day:string;

export default function DateConfig() {

    const days = ["MO", "TH", "WE", "TU", "FR", "SA", "SU"]
    const [checked, setChecked] = useState<number | null>(null);
    const [currentWeek, setCurrentWeek] = useState(String);

    const user = getAuth().currentUser.uid;
    const router = useRouter();

// keeps `userdata` up to date
    useEffect(() => {

        if (!user) {
            day=null;
            week=null;
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
                sortDates(Object.keys(res.result.exercises)).then((date:[string])=>{
                    week = date[0];
                    setCurrentWeek(reformatDate(date[0]))
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
                    <div className="flex w-full mb-[1rem] font-bold text-3xl flex-row">
                            <span className="w-full flex items-center">
                                {currentWeek}
                            </span>
                            <span className="flex">
                                <button className="rounded-full hover:bg-gray-200">
                                    <ArrowBackIcon sx={{ fontSize: '2rem', margin:"0.5rem" }} />
                                </button>
                                <button className="rounded-full hover:bg-gray-200">
                                    <ArrowForwardIcon sx={{ fontSize: '2rem', margin:"0.5rem" }}/>
                                </button>
                            </span>
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

const getDate=(index)=>{

}

function convertDateFormat(date: string): string {
    const [day, month, year] = date.split('.');
    return `${month}/${day}/${year}`;
}

const reformatDate = (date:string)=>{
    let dates = date.split("-"); // split the string into two dates

    let firstDate = dates[0];
    let secondDate = dates[1];

// remove the year from the dates
    firstDate = firstDate.slice(0, 5);
    secondDate = secondDate.slice(0, 5);

// combine the dates back into the desired format
    return firstDate + "-" + secondDate;
}
