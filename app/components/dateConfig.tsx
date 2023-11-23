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
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import LoadingModule from "@/components/loadingModule";

export default function DateConfig() {

    const days = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];
    const {day, week, setDay, setWeek} = useContextData();
    const [checkedDay, setCheckedDay] = useState<number | 0>(0);
    const [checkedWeek, setCheckedWeek] = useState<number | 0>(0);
    const [exerciseStatus, setExerciseStatus] = useState<boolean[]>(new Array(7).fill(null));
    const date = new Date();
    const currentDay = days[date.getDay() - 1];

    const setExerciseStatusAtIndex = (index: number, value: boolean) => {
        setExerciseStatus(prevStatus => prevStatus.map((status, i) => i === index ? value : status));
    };
    const getExerciseStatusAtIndex = (index: number): boolean | null => {
        return exerciseStatus[index];
    };

    const user = getAuth().currentUser.uid;

// keeps `userdata` up to date
    useEffect(() => {

        if (!user) {
            setDay(null);
            setWeek(null);
            setCheckedDay(0);
            setCheckedWeek(0)
            return;
        } else {
            getFirestoreDocument("userdata", user).then((res: any) => {
                if (res.result.weeks) {
                    sortDates(Object.keys(res.result.weeks)).then((date: [string]) => {
                        if (!day) {
                            setWeek(date[0]);
                            setDay(days[0].toUpperCase());
                            setCheckedDay(0);
                            setCheckedWeek(0);
                        } else {
                            setCheckedWeek(date.indexOf(week));
                            setCheckedDay(days.indexOf(day));
                        }

                    })

                }
            });

        }
    }, [user]); // <-- rerun when user changes

    useEffect(() => {
        checkExerciseStatus().then()
    }, [week]);


    const checkExerciseStatus = async () => await getFirestoreDocument("userdata", user).then((res: any) => {
        console.log(res)
        if (res.result.weeks[week]) {
            days.forEach((day) => {
                setExerciseStatusAtIndex(days.indexOf(day), getExerciseStatus(day, res.result.weeks[week]));
            });
        }
    });

    const handleClickDay = (i: number) => {
        if (checkedDay !== i) {
            setDay(days[i].toUpperCase());
            setCheckedDay(i);
        }
    };

    const handleClickWeek = (i: number) => {

        if (checkedWeek + i >= 0 && checkedWeek + i <= 3) {
            getFirestoreDocument("exercises", user).then((res: any) => {
                if (res.result) {
                    sortDates(Object.keys(res.result.exercises)).then((date: [string]) => {
                        setWeek(date[checkedWeek + i]);
                        setCheckedWeek(checkedWeek + i);
                    });
                }
            });
        }
    };


    return (
        <>
            {day && week ?
                <div className="rounded-xl border-2 border-[#9a9d93] w-[80%] min-w-fit">
                    <div className="w-fit justify-center flex-col mx-auto flex mb-3 px-4 pt-8 py-4">
                        <div className="flex w-full mb-[1rem] font-bold text-3xl flex-row">
                            <span className="w-full flex items-center">
                                <Suspense fallback={<></>}>
                                    {reformatDate(week)}
                                </Suspense>
                            </span>
                            <span className="flex">
                                <button className="rounded-full disabled:text-gray-300 enabled:hover:bg-gray-200"
                                        disabled={checkedWeek === 0}>
                                    <ArrowBackIcon onClick={() => handleClickWeek(-1)}
                                                   sx={{fontSize: '2rem', margin: "0.5rem"}}/>
                                </button>
                                <button className="rounded-full disabled:text-gray-300 enabled:hover:bg-gray-200"
                                        disabled={checkedWeek === 3}>
                                    <ArrowForwardIcon onClick={() => handleClickWeek(1)}
                                                      sx={{fontSize: '2rem', margin: "0.5rem"}}/>
                                </button>
                            </span>
                        </div>
                        <div className="flex flex-row">
                            {days.map((day, index) => (
                                <div key={index} className={`flex flex-col pe-3 items-center`}>
                                    <div className={"h-[-webkit-fill-available]"}>
                                    </div>
                                    {checkedDay === index
                                        ?
                                        <FiberManualRecordIcon sx={{fontSize: '2vh'}}/>
                                        :
                                        <></>
                                    }
                                    <div
                                        className={`cursor-pointer hover:text-blue-700 flex items-center rounded flex-col ${currentDay === day ? "bg-red-200 text-white" : ""}`}
                                        onClick={() => handleClickDay(index)}
                                    >
                                        {
                                            getExerciseStatusAtIndex(index) === true ? (
                                                <CheckCircleIcon sx={{
                                                    fontSize: '4vh',
                                                    color: `${currentDay === day ? "" : "limegreen"}`
                                                }}/>
                                            ) : getExerciseStatusAtIndex(index) === false ? (
                                                <CheckCircleOutlineIcon sx={{fontSize: '4rvh', color: "lightgray"}}/>
                                            ) : (<RadioButtonUncheckedIcon sx={{fontSize: '4vh'}}/>)
                                        }
                                        <h2 key={index} className="flex justify-center">{day}</h2>
                                        <div className={`${checkedDay === index ? "h-[1vh]" : ""}`}>

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                :
                <LoadingModule/>
            }
        </>
    )
}


const sortDates = async (dates: any) => {
    dates.sort((a, b) => {
        // Split the string and take the first part as the starting date of the week
        const date1 = new Date(convertDateFormat(a.split('-')[0]));
        const date2 = new Date(convertDateFormat(b.split('-')[0]));
        return date1.getTime() - date2.getTime();
    });
    return dates;
}

const getExerciseStatus = (day: string, data: any): any => {
    switch (data[day]) {
        case "TRAINING_DONE":
            return true;
        case "TRAINING_INCOMPLETE":
            return false;

    }
}

function convertDateFormat(date: string): string {
    const [day, month, year] = date.split('.');
    return `${month}/${day}/${year}`;
}

const reformatDate = (date: string) => {
    if (date) {
        let dates = date.split("-"); // split the string into two dates

        let firstDate = dates[0];
        let secondDate = dates[1];

// remove the year from the dates
        firstDate = firstDate.slice(0, 5);
        secondDate = secondDate.slice(0, 5);

// combine the dates back into the desired format
        return firstDate + "-" + secondDate;
    }
    return null;
}
