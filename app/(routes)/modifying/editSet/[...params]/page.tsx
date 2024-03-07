"use client"
import React, {Suspense, useEffect, useState} from 'react';
import {useRouter} from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import setDocument from "@/firebase/firestore/setDocument";
import getFirestoreDocument from "@/firebase/firestore/getData";
import {getAuth} from "firebase/auth";
import {useContextData} from "@/context/ContextData";

export default function Page({params: {params}}) {
    const [setName, setSetName] = useState(params);
    const [exerciseData, setExerciseData] = useState<any>([]);
    const {day, week, setDay, setWeek} = useContextData();


    const router = useRouter();

    const [user, setuser] = useState(() => {
        // if a user is already logged in, use the current user object, or `undefined` otherwise.
        try {
            return getAuth().currentUser.uid || undefined;
        } catch (e) {
            console.log(e)
        }
    });

    useEffect(() => {
        if (user === null) {
            setExerciseData(null); // <-- clear data when not logged in

            return;
        }

        if (!user) {
            // user still loading, do nothing yet
            return;
        }
        const unsubscribe = getFirestoreDocument('exercises', user, (data) => {
            if (data) {
                setExerciseData(data);
            }
        });

        return () => {
            unsubscribe();
        };

    }, [user, day, week]); // <-- rerun when user changes

    const handleSubmit = ()=>{
        const newSchedule = renameKey(params, setName);

        setDocument("exercises", user, newSchedule).then(r => {
            router.push(`/modifying/${setName}`)
        });
    }

    function renameKey(oldKey: string, newKey: string): any {
        let schedule = exerciseData;
        const set = exerciseData["exercises"][week][day][oldKey];
        delete schedule["exercises"][week][day][oldKey];

        schedule["exercises"][week][day][newKey] = set;

        return schedule;
    }

    return (
        <div className="w-full flex-grow flex-shrink pt-1 flex-col flex px-3 dark:text-white text-neutral-800">
            <div className="flex w-full items-center border-b-2 border-gray-300 pb-[1.5rem]">
                <Link
                    className="hover:bg-gray-200 rounded-full w-fit p-2"
                    href="/modifying">
                    <ArrowBackIcon/>
                </Link>
                <span className="font-bold text-xl ms-4">Edit Exercise</span>
            </div>
            <form className={"flex flex-col group px-10 mt-5 w-fit"}>
                <label htmlFor="setName" className="mb-5 sm:w-[50%] flex flex-col">
                    <span>Name</span>
                    <input
                        type="text"
                        name="setName"
                        onChange={(e) => {
                            setSetName(e.target.value)
                        }}
                        value={setName}
                        id="setName"
                        pattern={`^[A-Za-z0-9\\s\\-_]+$`}
                        className="rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
                        required
                    />
                </label>
                <button type="button"
                        onClick={handleSubmit}
                        className="mt-5 bg-green-500 dark:bg-green-800 py-3 rounded-md text-white group-invalid:pointer-events-none group-invalid:opacity-50">
                    Update Set
                </button>
            </form>
        </div>
)
}