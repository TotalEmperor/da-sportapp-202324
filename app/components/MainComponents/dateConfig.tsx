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
import LoadingModule from "@/components/MainComponents/loadingModule";
import {UserData} from "../../../public/interfaces/userdata";

export default function DateConfig() {

    const days = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];
    const {day, week, setDay, setWeek} = useContextData();
    const [checkedDay, setCheckedDay] = useState<number | 0>();
    const [checkedWeek, setCheckedWeek] = useState<number | 0>();
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
            setDay("");
            setWeek("");
            setCheckedDay(0);
            setCheckedWeek(0)
            return;
        } else {
            const unsubscribe = getFirestoreDocument('userdata', getAuth().currentUser.uid, (data:UserData) => {
                if (data.weeks) {
                    console.log(data.weeks)
                    sortDates(Object.keys(data.weeks)).then((dates: [string]) => {
                        console.log("Weeks____________");
                        console.log(dates);
                        console.log(dates.indexOf(week));
                        console.log("week:")
                        if (!sessionStorage.getItem("day")) {
                            setDay(days[0].toUpperCase());
                            setWeek(dates[0]);
                            setCheckedDay(0);
                            setCheckedWeek(0);
                        } else {
                            setCheckedWeek(dates.indexOf(week));
                            setCheckedDay(days.indexOf(day));
                        }

                    })

                }
            });

            // Unsubscribe when the component unmounts
            return () => {
                unsubscribe();
            };
        }
    }, [user]); // <-- rerun when user changes

    useEffect(() => {
        const unsubscribe = getFirestoreDocument('userdata', user, (data: UserData) => {
            if (data.weeks[week]) {
                days.forEach((day) => {
                    setExerciseStatusAtIndex(days.indexOf(day), getExerciseStatus(day, data.weeks[week]));
                });
            }
        });

        return () => {
            unsubscribe();
        };
        }, [week, day, user]);


    const handleClickDay = (i: number) => {
        if (checkedDay !== i) {
            setDay(days[i].toUpperCase());
            setCheckedDay(i);
        }
    };

    const handleClickWeek = (i: number) => {

        if (checkedWeek + i >= 0 && checkedWeek + i <= 3) {
            const unsubscribe = getFirestoreDocument('exercises', user, (data) => {
                if (data) {
                    sortDates(Object.keys(data.exercises)).then((date: [string]) => {
                        setWeek(date[checkedWeek + i]);
                        setCheckedWeek(checkedWeek + i);
                    });
                }
            });

            return () => {
                unsubscribe();
            };

        }
    };


    return (
        <>
            {day && week ?
                <div className="rounded-xl w-fit md:px-10 dark:bg-white dark:bg-opacity-5 bg-[#efefef] dark:shadow-neutral-600 shadow-md min-w-fit flex-shrink">
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
                                        className={`cursor-pointer flex items-center rounded flex-col dark:hover:bg-gray-400 hover:bg-gray-200 ${currentDay === day ? "bg-red-200 text-white dark:bg-red-400" : ""}`}
                                        onClick={() => handleClickDay(index)}
                                    >
                                        {
                                            getExerciseStatusAtIndex(index) === true ? (
                                                <CheckCircleIcon sx={{
                                                    fontSize: '4vh',
                                                    color: `${currentDay === day ? "" : "#b7f397"}`
                                                }}/>
                                            ) : getExerciseStatusAtIndex(index) === false ? (
                                                <CheckCircleOutlineIcon sx={{fontSize: '4rvh', color: "#b7f397"}}/>
                                            ) : (<RadioButtonUncheckedIcon sx={{fontSize: '4vh'}}/>)
                                        }
                                        <h2 key={index} className="flex justify-center text-xl">{day}</h2>
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


export const sortDates = async (weeks: any) => {
    weeks.sort((a, b) => {
        // Split the string and take the first part as the starting date of the week
        const firstWeek = new Date(convertDateFormat(a.split('-')[0]));
        const secondWeek = new Date(convertDateFormat(b.split('-')[0]));
        return firstWeek.getTime() - secondWeek.getTime();
    });
    return weeks;
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
