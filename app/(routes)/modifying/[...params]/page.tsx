"use client"
import getFirestoreDocument from "@/firebase/firestore/getData";
import React, {Suspense, useEffect, useState} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import ExerciseManager from "@/components/MainComponents/ExerciseManager";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import {useContextData} from "@/context/ContextData";
import LoadingModule from "@/components/loadingModule";
import {useRouter} from "next/navigation";



export default function Page({params: {params}}) {
    const [user, setuser] = useState(() => {
        // if a user is already logged in, use the current user object, or `undefined` otherwise.
        try {
            return getAuth().currentUser.uid || undefined;
        } catch (e) {
            console.log(e)
        }
    });
    const [exerciseData, setExerciseData] = useState([]);
    const [exerciseKeys, setExerciseKeys] = useState<string[]>([]);
    const [time, setTime] = useState(0);
    const [numSets, setNumSets] = useState(0);
    const {day, week, setDay, setWeek} = useContextData();

    const router = useRouter();


    useEffect(() => {
        if (user === null) {
            setExerciseData(null); // <-- clear data when not logged in

            return;
        }

        if (sessionStorage.getItem("day")) {
            try {
                setDay(sessionStorage.getItem("day"));
                setWeek(sessionStorage.getItem("week"))
            } catch (e) {

            }
        }

        if (!user) {
            // user still loading, do nothing yet
            return;
        } else {
            const unsubscribe = getFirestoreDocument('exercises', user, (data) => {
                if (data) {
                    setExerciseData(data.exercises[week][day][params[0]]);
                    let newExerciseKeys:string[] = (Object.keys(data.exercises[week][day][params[0]]).sort((a, b) => a.localeCompare(b)));
                    setExerciseKeys(newExerciseKeys);
                }
            });


            return () => {
                unsubscribe();
            };
        }


    }, [user, day, week]); // <-- rerun when user changes

    return (
        <>
            <Suspense>
                <>
                    <div className={"w-full max-h-full flex flex-col items-center px-3 bg-white bg-opacity-5 p-4 rounded-md"}>
                        <div className="flex w-full bg-gray-100 dark:bg-transparent rounded-xl mb-4 p-3 items-center">
                            <span className={"w-[20%]"}>
                                <Link
                                    className="hover:bg-gray-200 rounded-full p-3 dark:hover:bg-gray-400"
                                    href="/modifying">
                                    <ArrowBackIcon/>
                                </Link>
                            </span>
                            <span
                                className="font-bold ms-4 w-full justify-center flex text-4xl">{params[0]}</span>
                            <span className={"w-[20%]"}></span>
                        </div>
                        <div className={'w-[80%] my-2 mx-10 flex overflow-y-scroll'}>
                            <div
                                className={"w-full h-fit flex flex-col items-center justify-center p-[2px] rounded-xl z-50 dark:bg-gray-400 dark:bg-opacity-80"}>
                                {(
                                    exerciseKeys.map((key: string, index) => (
                                        <div key={index} className={"sm:w-[-webkit-fill-available]"}>
                                            <ExerciseManager
                                                data={exerciseData[key]}
                                                time={time}
                                                stars={exerciseData[key].stars}
                                                description={exerciseData[key].description}
                                                style={"m-0 p-0"}
                                                moves={exerciseData[key].moves}
                                                setName={params[0]}
                                                exerciseName={key}
                                                modify={true}
                                            />
                                            {
                                                exerciseData[key].breakTime != 0 ?
                                                    <span
                                                        className={"flex items-center rounded-2xl justify-center dark:text-black text-2xl font-bold h-20"}>{exerciseData[key].breakTime} Sec. Break</span>
                                                    :
                                                    <></>
                                            }
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </>
            </Suspense>
        </>
    )
}