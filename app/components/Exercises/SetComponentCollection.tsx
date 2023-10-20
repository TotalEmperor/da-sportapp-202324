"use client"
import getFirestoreDocument from "@/firebase/firestore/getData";
import {useEffect, useState} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import SetComponent from "@/components/Exercises/SetComponent"
import {week, day} from "@/components/dateConfig"
import {useRouter} from "next/navigation";
import addData from "@/firebase/firestore/addData";

export default function SetComponentCollection() {
    const [user, setuser] = useState(() => {
        // if a user is already logged in, use the current user object, or `undefined` otherwise.
        return getAuth().currentUser.uid || undefined;
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
                getExercises(res.result).then((exercisesData) => {
                    if (exercisesData) {
                        setuserdata(exercisesData.objArray);
                        setTime(exercisesData.time)
                        setNumSets(exercisesData.numSets)
                    }

                })
            }
        });


    }, [user]); // <-- rerun when user changes

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
                    <div className="flex flex-col text-4xl font-bold w-full bg-gray-100 justify-center items-center rounded-2xl">
                        <h1>{day}</h1>
                        <div className="flex felx-row border-b-2 border-black justify-center items-center">
                            <h2 className="text-sm me-[1rem]">{userdata.length ?  numSets: "0"}x Sets</h2>
                            <h1 className="text-xl font-bold">{userdata.length ? userdata.length : "0"}x. Exercises</h1>
                            <h2 className="text-sm ms-[1rem]">{userdata.length ?  time: "0"} Min.</h2>
                        </div>
                    </div>
                    {(
                    userdata.map((data, index) => (
                    <SetComponent key={index} data={data}/>
                    ))
                    )}
                </>
            }
        </>
    )
}

const getExercises = async (data: any) => {

    let objArray = [];
    let time = 0;
    let numSets = 0;


    if (day) {
        console.log(data.exercises[week][day])
        numSets = Object.keys(data.exercises[week][day]).length

        for (const exerciseTypes in data.exercises[week][day]) {
            const exercises = data.exercises[week][day][exerciseTypes];
            objArray.push(exercises)

            for (const exercise in data.exercises[week][day][exerciseTypes]){
                time = time + parseInt(data.exercises[week][day][exerciseTypes][exercise].time)
            }

        }
    }
    return {objArray, time, numSets};
};

