"use client"
import {useEffect, useState} from "react";
import getFirestoreDocument from "@/firebase/firestore/getData";
import {useContextData} from "@/context/ContextData";
import {getAuth} from "firebase/auth";
import setDocument from "@/firebase/firestore/setDocument";
import {doc, getFirestore} from "firebase/firestore";
import firebase_app from "@/firebase/config";

export default function Page() {
    const [user, setuser] = useState(() => {
        // if a user is already logged in, use the current user object, or `undefined` otherwise.
        try {
            return getAuth().currentUser.uid || undefined;
        } catch (e) {
            console.log(e)
        }
    });

    const [calorieCounter, setCalorieCounter] = useState();
    const [calorieKeys, setCalorieKeys] = useState<string[]>();
    const [timespan, setTimespan] = useState<string>();
    const [exercises, setExercises] = useState();
    const [exercisesKeys, setExercisesKeys] = useState<string[]>();
    const [selectedTopTap, setSelectedTopTap] = useState("bar");
    const [selectedBottomTap, setSelectedBottomTap] = useState("past");
    const {day, week, setDay, setWeek} = useContextData();

    useEffect(() => {
        if (user === null) {

            return;
        }

        if (sessionStorage.getItem("day")) {
            try {
                setDay(sessionStorage.getItem("day"));
                setWeek(sessionStorage.getItem("week"))
                console.log(day)
            } catch (e) {

            }
        }

        const unsubscribeCalorieCounter = getFirestoreDocument('caloriecounter', user, (data) => {
            if (data) {
                setCalorieCounter(data);
                setCalorieKeys(Object.keys(data));
            } else {
                console.error("Couldn't fetch Calorie Counter")
            }
        });

        unsubscribeCalorieCounter();

        const unsubscribe = getFirestoreDocument('exercises', user, (data) => {
            if (data) {
                setExercises(data);
                setExercisesKeys(Object.keys(data));
            } else {
                console.error("Couldn't fetch Exercises")
            }
        });

        return () => {
            unsubscribe();
        };

    }, [user, day, week]); // <-- rerun when user changes

    const db = getFirestore(firebase_app)

    const data: object = {
        "2024-01-30": [
            {"exerciseName": "Lifting", "time": 3600, "burned": 500, "date": "2024-01-30", "type": "Forearms"},
            {"exerciseName": "Cycling", "time": 1800, "burned": 250, "date": "2024-01-30", "type": "Legs"},
        ],
        "2024-01-29": [
            {"exerciseName": "Swimming", "time": 3000, "burned": 400, "date": "2024-01-29", "type": "Legs"},
            {"exerciseName": "Yoga", "time": 600, "burned": 100, "date": "2024-01-29", "type": "Abs"}
        ]
    };

    setDocument("caloriecounter", user, data);

    return (
        <>
            <div id={"graph"} className={'rounded-s-md w-full'}>
                <ul className={'flex flex-row bg-transparent rounded-t-md me-auto w-fit dark:bg-white dark:bg-opacity-10'}>
                    <li onClick={() => {
                        setSelectedTopTap("bar")
                    }}
                        className={`p-3 rounded-tl-md ${selectedTopTap == "bar" ? "dark:bg-white dark:bg-opacity-10" : ""}`}>
                        Bar
                    </li>
                    <li onClick={() => {
                        setSelectedTopTap("stackedArea")
                    }}
                        className={`p-3 ${selectedTopTap == "stackedArea" ? "dark:bg-white dark:bg-opacity-10" : ""}`}>
                        Area
                    </li>
                    <li onClick={() => {
                        setSelectedTopTap("Line")
                    }}
                        className={`p-3 rounded-tr-md ${selectedTopTap == "Line" ? "dark:bg-white dark:bg-opacity-10" : ""}`}>
                        Line
                    </li>
                </ul>
                <div id={'graph-content'}
                     className={'flex justify-center items-center dark:bg-white dark:bg-opacity-20 rounded-bl-md rounded-tr-md relative p-4'}>
                    <select name="timespan"
                            id="timespan-select"
                            onChange={(e)=>{setTimespan(e.target.value)}}
                            className={`absolute top-0 right-0 rounded mt-4 mr-4`}>
                        <option value="year">1 year</option>
                        <option value="sixMonths">6 Months</option>
                        <option value="1Month">1 Months</option>
                        <option value="1Week">1 Week</option>
                    </select>
                    {selectedTopTap}
                </div>
                <ul className={'flex flex-row bg-transparent rounded-b-md ms-auto w-fit dark:bg-white dark:bg-opacity-10'}>
                    <li onClick={(e) => {
                        setSelectedBottomTap("past")
                    }}
                        className={`p-3 rounded-bl-md ${selectedBottomTap == "past" ? "dark:bg-white dark:bg-opacity-10" : ""}`}>
                        Past
                    </li>
                    <li onClick={() => {
                        setSelectedBottomTap("future")
                    }}
                        className={`p-3 ${selectedBottomTap == "future" ? "dark:bg-white dark:bg-opacity-10" : ""}`}>
                        Future
                    </li>
                </ul>
            </div>
            <div id={"statistic"}
                 className={'flex flex-shrink'}>
                
            </div>
        </>
    );
}