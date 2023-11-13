"use client"
import getFirestoreDocument from "@/firebase/firestore/getData";
import React, {Suspense, useEffect, useState} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {week, day} from "@/components/dateConfig"
import ExerciseManager from "@/components/Workout/ExerciseManager";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import {param} from "ts-interface-checker";

export default function ExerciseComponentCollection(setName:any) {
    const [user, setuser] = useState(() => {
        // if a user is already logged in, use the current user object, or `undefined` otherwise.
        try {
            return getAuth().currentUser.uid || undefined;
        } catch (e) {
            console.log(e)
        }
    });
    const [userdata, setuserdata] = useState([]);
    const [time, setTime] = useState(0);
    const [numSets, setNumSets] = useState(0);


// keeps `userdata` up to date

    useEffect(() => {
        if (user === null) {
            setuserdata(null); // <-- clear data when not logged in

            return;
        }

        if (!user) {
            // user still loading, do nothing yet
            return;
        }

        getFirestoreDocument("exercises", user).then((res: any) => {
            if (res.result) {
                getExercises(res.result, setName.setName).then((exercisesData) => {
                    if (exercisesData) {
                        setuserdata(exercisesData.objArray);
                        setTime(exercisesData.time)
                        setNumSets(exercisesData.numSets)
                    }

                })
            }
        });


    }, [user, day, week]); // <-- rerun when user changes


    return (
        <>
            {userdata.length == 0 ?
                <>
                    <div className="border border-blue-300 shadow rounded-md p-4 w-[40rem] h-[10rem]">
                        <div className="animate-pulse flex space-x-4">
                            <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                            <div className="flex-1 space-y-6 py-1">
                                <div className="h-2 bg-slate-200 rounded opacity-50"></div>
                                <div className="space-y-3">
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                        <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                        <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                        <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                        <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                        <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                    </div>
                                    <div className="h-2 bg-slate-200 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                :
                <>
                    <div className={"w-full overflow-y-scroll flex flex-col items-center my-2"}>
                        <div className="flex w-full bg-gray-100 rounded-2xl mb-4 p-3 items-center">
                            <span className={"w-[20%]"}>
                                <Link
                                    className="hover:bg-gray-200 rounded-full p-3"
                                    href="/workout">
                                    <ArrowBackIcon/>
                                </Link>
                            </span>
                            <span className="font-bold ms-4 w-full justify-center flex text-4xl">{setName.setName}</span>
                            <span className={"w-[20%]"}></span>
                        </div>
                        <div className="w-fit bg-gray-200 rounded-2xl">
                            <Suspense>
                                {(
                                    userdata.map((data: any, index) => (
                                        <React.Fragment key={index}>
                                            <ExerciseManager data={data}
                                                             time={data[1].time}
                                                             stars={data[1].stars}
                                                             description={data[1].description}
                                                             style={"m-0 p-0"}
                                                             moves={data[1].moves}
                                            />

                                            {
                                                data[1].break != 0 ?
                                                    <span
                                                        className={"flex items-center rounded-2xl justify-center text-2xl font-bold h-20"}>{data[1].break} Sec. Break</span>
                                                    :
                                                    <></>
                                            }
                                        </React.Fragment>
                                    ))
                                )}
                            </Suspense>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

const getExercises = async (data: any, setName:string) => {

    let objArray: any[] = [];
    let time = 0;
    let numSets = 0;


    if (day) {
        objArray = objArray.concat(Object.entries(data.exercises[week][day][setName]))
            const exerciseSet = data.exercises[week][day][setName];
            for (const exerciseName in exerciseSet) {
                time += parseInt(exerciseSet[exerciseName].time);
            }
    }

    console.log(objArray)

    return {objArray, time, numSets};

};

