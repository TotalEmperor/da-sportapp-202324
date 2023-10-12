"use client"
import getFirestoreDocument from "@/firebase/firestore/getData";
import {useEffect, useState} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import SetComponent from "@/components/Exercises/SetComponent"
import {week, day} from "@/components/dateConfig"
import {useRouter} from "next/navigation";

export default function SetComponentCollection() {
    const [user, setuser] = useState(() => {
        // if a user is already logged in, use the current user object, or `undefined` otherwise.
        return getAuth().currentUser.uid || undefined;
    });
    const [userdata, setuserdata] = useState([]);


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
                getExercises(res.result).then((exercises) => {
                    if (exercises) {
                        setuserdata(exercises);
                    }

                })
            }
        });


    }, [user, day, week]); // <-- rerun when user changes

    return (
        <>
            {userdata.length == 0 ?
                <>
                    <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                        <div className="animate-pulse flex space-x-4">
                            <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                            <div className="flex-1 space-y-6 py-1">
                                <div className="h-2 bg-slate-200 rounded opacity-50"></div>
                                <div className="space-y-3">
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                        <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                    </div>
                                    <div className="h-2 bg-slate-200 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                : (
                    userdata.map((data, index) => (
                        <SetComponent key={index} data={data}/>
                    ))
                )}
        </>
    )
}

const getExercises = async (data: any) => {

    let objArray = [];

    if (day != null) {
        for (const exerciseType in data.exercises[week][day]) {
            const exercises = data.exercises[week][day][exerciseType];
            objArray.push(exercises)
            return objArray
        }
    }
    return null;
};

