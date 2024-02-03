"use client"
import {useEffect, useState} from "react";
import getFirestoreDocument from "@/firebase/firestore/getData";
import {useContextData} from "@/context/ContextData";
import {getAuth} from "firebase/auth";
import setDocument from "@/firebase/firestore/setDocument";
import {doc, getFirestore} from "firebase/firestore";
import firebase_app from "@/firebase/config";

interface WorkoutData {
    date: string;
    Legs?: number;
    Forearms?: number;
    Abs?: number;
    Back?: number;
    Biceps?: number;
    Chest?: number;
    Shoulders?: number;
    Traps?: number;
    Triceps?: number;
    others?: number;
}

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
            } catch (e) {

            }
        }

        const unsubscribe = ()=>{

            getFirestoreDocument('exercises', user, (data) => {
                if (data) {
                    setExercises(data);
                    setExercisesKeys(Object.keys(data));
                } else {
                    console.error("Couldn't fetch Exercises")
                }
            });

            getFirestoreDocument('caloriecounter', user, (data) => {
                if (data) {
                    analyseData(data).then(r => {});
                } else {
                    console.error("Couldn't fetch Calorie Counter")
                }
            });

        }

        return () => {
            unsubscribe();
        };

    }, [user, day, week]); // <-- rerun when user changes

    const analyseData = async (data: any) =>{
        const calorieCounterKeys = data.calorieCounter.map((object)=>{
            return object.date;
        })
        setCalorieKeys(calorieCounterKeys);
        let calorieData: WorkoutData[] = [];
        data.calorieCounter.map((sets)=>{
            let newSet: WorkoutData = { date: sets.date, Abs: 0, Forearms: 0, Back: 0, Biceps: 0,Chest:0, Legs: 0, others: 0, Shoulders: 0, Traps: 0, Triceps:0};
            sets.exercises.map((exercise)=>{
                const type = exercise.type;
                newSet[type] += exercise.burned;
            })
            calorieData.push(newSet);
        })

        console.log(calorieData);

    };

    const db = getFirestore(firebase_app)

    const data: object = {"calorieCounter": [
            {
                "date": "2024-01-28",
                "exercises": [
                    {"exerciseName": "Leg Press", "time": 2400, "burned": 300, "type": "Legs"},
                    {"exerciseName": "Forearm Plank", "time": 1500, "burned": 120, "type": "Forearms"}
                ]
            },
            {
                "date": "2024-01-27",
                "exercises": [
                    {"exerciseName": "Leg Extension", "time": 1800, "burned": 250, "type": "Legs"},
                    {"exerciseName": "Abs Crunches", "time": 1200, "burned": 150, "type": "Abs"}
                ]
            },
            {
                "date": "2024-01-26",
                "exercises": [
                    {"exerciseName": "Pull-ups", "time": 1800, "burned": 200, "type": "Back"},
                    {"exerciseName": "Bicep Curls", "time": 2100, "burned": 250, "type": "Biceps"}
                ]
            },
            {
                "date": "2024-01-25",
                "exercises": [
                    {"exerciseName": "Leg Curl", "time": 2400, "burned": 300, "type": "Legs"},
                    {"exerciseName": "Shoulder Press", "time": 1800, "burned": 220, "type": "Shoulders"}
                ]
            },
            {
                "date": "2024-01-24",
                "exercises": [
                    {"exerciseName": "Sit-ups", "time": 1200, "burned": 150, "type": "Abs"},
                    {"exerciseName": "Deadlifts", "time": 2400, "burned": 350, "type": "Back"}
                ]
            },
            {
                "date": "2024-01-23",
                "exercises": [
                    {"exerciseName": "Hammer Curls", "time": 1800, "burned": 200, "type": "Biceps"},
                    {"exerciseName": "Leg Raise", "time": 1500, "burned": 120, "type": "Legs"}
                ]
            },
            {
                "date": "2024-01-22",
                "exercises": [
                    {"exerciseName": "Push-ups", "time": 2100, "burned": 250, "type": "Chest"},
                    {"exerciseName": "Plank", "time": 1800, "burned": 220, "type": "Abs"}
                ]
            },
            {
                "date": "2024-01-21",
                "exercises": [
                    {"exerciseName": "Lat Pulldowns", "time": 2400, "burned": 300, "type": "Back"},
                    {"exerciseName": "Tricep Dips", "time": 1800, "burned": 200, "type": "Shoulders"}
                ]
            },
            {
                "date": "2024-01-20",
                "exercises": [
                    {"exerciseName": "Leg Press", "time": 1500, "burned": 180, "type": "Legs"},
                    {"exerciseName": "Russian Twists", "time": 1200, "burned": 150, "type": "Abs"}
                ]
            },
            {
                "date": "2024-01-19",
                "exercises": [
                    {"exerciseName": "Chest Flyes", "time": 2100, "burned": 250, "type": "Chest"},
                    {"exerciseName": "Reverse Flyes", "time": 1800, "burned": 220, "type": "Shoulders"}
                ]
            }
        ]}

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