"use client"
import getFirestoreDocument from "@/firebase/firestore/getData";
import React, {Suspense, useEffect, useState} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import ExerciseManager from "@/components/MainComponents/ExerciseManager";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import {param} from "ts-interface-checker";
import {useContextData} from "@/context/ContextData";
import LoadingModule from "@/components/MainComponents/loadingModule";
import {Exercise} from "@/interfaces/Exercise";
import {ExerciseSchedule} from "@/interfaces/ExerciseSchedule";


export default function ExerciseComponentCollection(setName:any) {
    const [user, setuser] = useState(() => {
        // if a user is already logged in, use the current user object, or `undefined` otherwise.
        try {
            return getAuth().currentUser.uid || undefined;
        } catch (e) {
            console.log(e)
        }
    });
    const [exerciseData, setExerciseData] = useState<Exercise[]>();
    const [exerciseKeys, setExerciseKeys] = useState<string[]>([]);
    const [time, setTime] = useState(0);
    const [numSets, setNumSets] = useState(0);
    const { day, week, setDay, setWeek } = useContextData();



// keeps `exerciseData` up to date

    useEffect(() => {
        if (user === null) {
            setExerciseData(null); // <-- clear data when not logged in

            return;
        }

        if (!user) {
            // user still loading, do nothing yet
            return;
        }

        const unsubscribe = getFirestoreDocument('exercises', user, (data:ExerciseSchedule) => {
            if (data) {
                setExerciseData(data.exercises[week][day][setName.setName]);
                let newExerciseKeys: string[]= [];
                newExerciseKeys = newExerciseKeys.concat(Object.keys(data.exercises[week][day][setName.setName]));
                newExerciseKeys.sort((a, b) => a.localeCompare(b));
                setExerciseKeys(newExerciseKeys);
            }
        });

        return () => {
            unsubscribe();
        };

    }, [user, day, week]); // <-- rerun when user changes


    return (
        <>
            {exerciseKeys.length == 0 ?
                <>
                    <LoadingModule/>
                </>
                :
                <>
                    <div className={"w-full max-h-full flex flex-col items-center px-3 bg-white bg-opacity-5 p-4 rounded-md"}>
                        <div className="flex w-full bg-gray-100 dark:bg-transparent rounded-2xl mb-4 p-3 items-center">
                            <span className={"w-[20%]"}>
                                <Link
                                    className="hover:bg-gray-200 rounded-full p-3 dark:hover:bg-gray-400"
                                    href="/workout">
                                    <ArrowBackIcon/>
                                </Link>
                            </span>
                            <span className="font-bold ms-4 w-full justify-center flex text-4xl">{setName.setName}</span>
                            <span className={"w-[20%]"}></span>
                        </div>
                        <div className={'w-[80%] my-2 mx-10 flex overflow-y-scroll'}>
                            <div
                                className={"w-full h-fit flex flex-col items-center justify-center p-[2px] rounded-xl z-50 bg-gray-300 dark:bg-gray-400 dark:bg-opacity-80"}>
                                {(
                                    exerciseKeys.map((key: any, index) => (
                                        <div key={index} className={'w-full'}>
                                            <ExerciseManager data={exerciseData[key]}
                                                             time={exerciseData[key].time}
                                                             stars={exerciseData[key].stars}
                                                             description={exerciseData[key].description}
                                                             style={"m-0 p-0"}
                                                             key={index}
                                                             exerciseName={key}
                                                             moves={exerciseData[key].moves}
                                            />
                                            <span
                                                className={"flex items-center rounded-2xl justify-center dark:text-black text-2xl font-bold h-20"}>{exerciseData[key].breakTime ? exerciseData[key].breakTime + "  Sec. Break" : ""}</span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}