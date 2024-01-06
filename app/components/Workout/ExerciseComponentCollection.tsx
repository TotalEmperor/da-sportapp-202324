"use client"
import getFirestoreDocument from "@/firebase/firestore/getData";
import React, {Suspense, useEffect, useState} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import ExerciseManager from "@/components/ExerciseManager";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import {param} from "ts-interface-checker";
import {useContextData} from "@/context/ContextData";
import LoadingModule from "@/components/loadingModule";

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
    const { day, week, setDay, setWeek } = useContextData();



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

        const unsubscribe = getFirestoreDocument('exercises', user, (data) => {
            if (data) {
                getExercises(data, setName.setName, day, week).then((exercisesData) => {
                    if (exercisesData) {
                        setuserdata(exercisesData.objArray);
                        setTime(exercisesData.time)
                        setNumSets(exercisesData.numSets)
                    }

                })
            }
        });

        return () => {
            unsubscribe();
        };

    }, [user, day, week]); // <-- rerun when user changes


    return (
        <>
            {userdata.length == 0 ?
                <>
                    <LoadingModule/>
                </>
                :
                <>
                    <div className={"w-full overflow-y-scroll flex flex-col items-center my-2 px-3"}>
                        <div className="flex w-full bg-gray-100 dark:bg-gray-700 rounded-2xl mb-4 p-3 items-center">
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
                        <div className="w-full md:w-[80%] bg-gray-200 dark:bg-gray-400 rounded-2xl">
                            <Suspense>
                                {(
                                    userdata.map((data: any, index) => (
                                        <React.Fragment key={index}>
                                            <ExerciseManager data={data}
                                                             time={data[1].time}
                                                             stars={data[1].stars}
                                                             description={data[1].description}
                                                             style={"m-0 p-0"}
                                                             image={data[1].image}
                                                             moves={data[1].moves}
                                            />

                                            {
                                                data[1].break != 0 ?
                                                    <span
                                                        className={"flex items-center rounded-2xl justify-center dark:text-black text-2xl font-bold h-20"}>{data[1].break} Sec. Break</span>
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

const getExercises = async (data: any, setName:string, day:string, week:string) => {

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


    return {objArray, time, numSets};

};



