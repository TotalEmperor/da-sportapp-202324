"use client"
import React, {Suspense, useEffect, useState} from 'react';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExerciseManager from "@/components/MainComponents/ExerciseManager";
import {getAuth} from "firebase/auth";
import {useContextData} from "@/context/ContextData";
import {useRouter} from "next/navigation";
import getFirestoreDocument from "@/firebase/firestore/getData";

export default function Page({params: {params}}) {
    const [user, setuser] = useState(() => {
        // if a user is already logged in, use the current user object, or `undefined` otherwise.
        try {
            return getAuth().currentUser.uid || undefined;
        } catch (e) {
            console.log(e)
        }
    });
    const [exampleExerciseData, setExampleExerciseData] = useState([]);
    const [exerciseKeys, setExerciseKeys] = useState<string[]>([]);
    const {day, week, setDay, setWeek} = useContextData();

    const router = useRouter();

    useEffect(() => {
        if (user === null) {
            setExampleExerciseData(null); // <-- clear data when not logged in

            return;
        }

        if (!user) {
            // user still loading, do nothing yet
            return;
        } else {
            const unsubscribe = getFirestoreDocument('exampleexercises', "CB6Eqnz7qfDrfcwuZJPn", (data) => {
                if (data) {
                    console.log(params)
                    setExampleExerciseData(data.exampleexercises[params]);
                    console.log(data.exampleexercises[params])
                    let newExerciseKeys: string[]= [];
                    newExerciseKeys = newExerciseKeys.concat(Object.keys(data.exampleexercises[params]));
                    newExerciseKeys.sort((a, b) => a.localeCompare(b));
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
                                <button
                                    type={"button"}
                                    className="hover:bg-gray-200 rounded-full p-3 dark:hover:bg-gray-400"
                                    onClick={router.back}>
                                    <ArrowBackIcon/>
                                </button>
                            </span>
                                <span
                                    className="font-bold ms-4 w-full justify-center flex text-4xl">{params}</span>
                                <span className={"w-[20%]"}></span>
                            </div>
                            <div className={'w-[80%] my-2 mx-10 flex overflow-y-scroll'}>
                                <div
                                    className={"w-full h-fit flex flex-col items-center justify-center p-[2px] rounded-xl z-50 dark:bg-gray-400 dark:bg-opacity-80"}>
                                    {(
                                        exerciseKeys.map((key: string, index) => (
                                            <div key={index} className={"sm:w-[-webkit-fill-available]"}>
                                                <ExerciseManager
                                                    data={exampleExerciseData[key]}
                                                    time={exampleExerciseData[key].time}
                                                    stars={exampleExerciseData[key].stars}
                                                    description={exampleExerciseData[key].description}
                                                    style={"m-0 p-0"}
                                                    moves={exampleExerciseData[key].moves}
                                                    setName={params[0]}
                                                    exerciseName={key}
                                                    search={true}
                                                />
                                                <span
                                                    className={"flex items-center rounded-2xl justify-center dark:text-black text-2xl font-bold h-20"}>{exampleExerciseData[key].breakTime? exampleExerciseData[key].breakTime +"  Sec. Break<": ""}</span>
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



