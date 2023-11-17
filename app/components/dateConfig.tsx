"use client"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import React, {Suspense, useEffect, useState} from "react";
import {getAuth} from "firebase/auth";
import getFirestoreDocument from "@/firebase/firestore/getData";
import {useContextData} from "@/context/ContextData";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {useRouter} from "next/navigation";

export default function DateConfig() {

    const days = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];
    const { day, week, setDay, setWeek } = useContextData();
    const [checkedDay, setCheckedDay] = useState<number | null>(null);
    const [checkedWeek, setCheckedWeek] = useState<number | 0>(0);
    const user = getAuth().currentUser.uid;

// keeps `userdata` up to date
    useEffect(() => {

        if (!user) {
            setDay(null);
            setWeek(null);
            setCheckedDay(null);
            return;
        }else {
            setCheckedDay(0);
            if(!day){
                getFirestoreDocument("userdata", user).then((res: any) => {
                    if (res.result.weeks) {
                        sortDates(Object.keys(res.result.weeks)).then((date:[string])=>{
                            setWeek(date[0]);
                            setDay(days[0].toUpperCase());
                        })
                    }
                });
            }else {
                getFirestoreDocument("userdata", user).then((res: any) => {
                    if (res.result.weeks) {
                        sortDates(Object.keys(res.result.weeks)).then((dates:string)=>{
                            setCheckedWeek(dates.indexOf(week));
                            setCheckedDay(days.indexOf(day));
                        })
                    }
                });
            }
        }
    }, [user]); // <-- rerun when user changes

    const handleClickDay = (i: number) => {
        if (checkedDay !== i) {
            setDay(days[i].toUpperCase());
            setCheckedDay(i);
        }
    };

    const handleClickWeek = (i: number) => {

        if (checkedWeek+i>=0 && checkedWeek+i<=3) {
            getFirestoreDocument("exercises", user).then((res: any) => {
                if (res.result) {
                    sortDates(Object.keys(res.result.exercises)).then((date:[string])=>{
                        setWeek(date[checkedWeek+i]);
                        setCheckedWeek( checkedWeek+i);
                    })
                }
            });
        }
    };

    useEffect(() => {

    }, [week]);

    return (
        <>
            <div className="rounded-xl border-2 border-[#9a9d93] w-[40rem] min-w-fit">
                <div className="w-fit justify-center flex-col mx-auto flex mb-3 px-4 pt-8 py-4">
                    <div className="flex w-full mb-[1rem] font-bold text-3xl flex-row">
                            <span className="w-full flex items-center">
                                <Suspense fallback={<></>}>
                                    {reformatDate(week)}
                                </Suspense>
                            </span>
                        <span className="flex">
                                <button className="rounded-full disabled:text-gray-300 enabled:hover:bg-gray-200" disabled={checkedWeek === 0}>
                                    <ArrowBackIcon onClick={() => handleClickWeek(-1)} sx={{ fontSize: '2rem', margin:"0.5rem"}} />
                                </button>
                                <button className="rounded-full disabled:text-gray-300 enabled:hover:bg-gray-200" disabled={checkedWeek === 3}>
                                    <ArrowForwardIcon onClick={() => handleClickWeek(1)} sx={{ fontSize: '2rem', margin:"0.5rem"}}/>
                                </button>
                            </span>
                    </div>
                    <div className="flex flex-row">
                        {days.map((day, index) => (
                            <div key={index} className="flex flex-col pe-3">
                                <div
                                    className="cursor-pointer hover:text-blue-700 flex justify-center"
                                >
                                    {checkedDay === index ? (
                                        <CheckCircleIcon onClick={() => handleClickDay(index)} sx={{ fontSize: '3rem', color: "limegreen" }} />
                                    ) : (
                                        <RadioButtonUncheckedIcon onClick={() => handleClickDay(index)} sx={{ fontSize: '3rem' }} />
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

const getExerciseStatus= (data:any):any=>{
    console.log(data)
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
