"use client"
import {useEffect, useState} from "react";
import getFirestoreDocument from "@/firebase/firestore/getData";
import {useContextData} from "@/context/ContextData";
import {getAuth} from "firebase/auth";
import setDocument from "@/firebase/firestore/setDocument";
import {doc, getFirestore} from "firebase/firestore";
import firebase_app from "@/firebase/config";
import StackedBarGraph from "@/components/caloriecounter/StackedBarGraph";
import LineGraph from "@/components/caloriecounter/LineGraph";
import StackedAreaGraph from "@/components/caloriecounter/StackedAreaGraph";
import {random} from "nanoid";

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
    sum?: number;
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

    const [calorieCounter, setCalorieCounter] = useState([]);
    const [displayData, setDisplayData] = useState([]);
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
                    analyseData(data);
                } else {
                    console.error("Couldn't fetch Calorie Counter")
                }
            });

        }

        return () => {
            unsubscribe();
        };

    }, [user, day, week]); // <-- rerun when user changes

    const analyseData = (data: any) =>{
        const calorieCounterKeys = data.calorieCounter.map((object)=>{
            return object.date;
        })
        setCalorieKeys(calorieCounterKeys);
        let calorieData: WorkoutData[] = [];
        data.calorieCounter.map((sets)=>{
            let newSet: WorkoutData = { date: sets.date, Abs: 0, Forearms: 0, Back: 0, Biceps: 0,Chest: 0, Legs: 0, others: 0, Shoulders: 0, Traps: 0, Triceps:0, sum:0};
            sets.exercises.map((exercise)=>{
                const type = exercise.type;
                newSet[type] += exercise.burned;
                newSet.sum += exercise.burned;
            })
            calorieData.push(newSet);
        });
        setCalorieCounter(calorieData);
        setDisplayData(calorieData);
        console.log(calorieCounter)

    };
    const db = getFirestore(firebase_app)

/*
    const data = {
        "calorieCounter": []
    };

    const startDate = new Date("2023-01-01");
    const exerciseTypes = ["Legs", "Forearms", "Abs", "Back", "Biceps", "Chest", "Shoulders"];

    const currentDate = new Date();

    for (let i = 0; startDate <= currentDate; i++) {
        const exercises = Array.from({ length: 2 }, () => {
            const exerciseName = "Exercise" + (Math.floor(Math.random() * 1000) + 1);
            const time = Math.floor(Math.random() * 2400) + 600; // Random time between 600 and 3000 seconds
            const burned = Math.floor(Math.random() * 201) + 100; // Random burned between 100 and 300
            const type = exerciseTypes[Math.floor(Math.random() * exerciseTypes.length)];

            return { exerciseName, time, burned, type };
        });

        data.calorieCounter.push({
            date: startDate.toISOString().split('T')[0],
            exercises: exercises,
        });

        startDate.setDate(startDate.getDate() + 1); // Move to the next day
    }


            setDocument("caloriecounter", user, data);
            */

    const parseDateString = (dateString: string): Date => {
        // Assuming the date string is in the format 'YYYY-MM-DD'
        const [year, month, day] = dateString.split('-').map(Number);
        return new Date(year, month - 1, day); // Month is 0-indexed in JavaScript Date
    };

    const setTimeSpan = (timeSpan:string)=>{
        const currentDate = new Date();
        let startDate: Date;

        switch (timeSpan) {
            case 'year':
                startDate = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate());
                break;
            case '6Months':
                startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 6, currentDate.getDate());
                break;
            case '1Month':
                startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());
                break;
            case '1Week':
                startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7);
                break;
            case "all":
                startDate = new Date();
                break;
            default:
                startDate = new Date();
                break;
        }

        const newDisplaydata = calorieCounter.filter(item => parseDateString(item.date) >= startDate && parseDateString(item.date) <= currentDate);
        console.log(newDisplaydata);
        setDisplayData(newDisplaydata);
    }



    return (
        <>
            <div id={"graph"} className={'rounded-s-md w-[40vw]'}>
                <ul className={'flex flex-row bg-transparent rounded-t-md me-auto w-fit dark:bg-white dark:bg-opacity-10 hover:cursor-pointer'}>
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
                     className={'flex justify-center flex-col items-center dark:bg-white dark:bg-opacity-20 rounded-bl-md rounded-tr-md min-h-fit sm:h-[40vh] p-4'}>
                    <select name="timespan"
                            id="timespan-select"
                            onChange={(e) => {
                                setTimeSpan(e.target.value)
                            }}
                            className={`ms-auto rounded mt-4 mr-4`}>
                        <option value="all">All time</option>
                        <option value="year">1 year</option>
                        <option value="6Months">6 Months</option>
                        <option value="1Month">1 Months</option>
                        <option value="1Week">1 Week</option>
                    </select>
                    {selectedTopTap == "bar"
                        ?
                        <StackedBarGraph data={displayData}/>
                        :
                        selectedTopTap=="stackedArea"
                            ?
                            <StackedAreaGraph data={displayData}/>
                            :
                            <LineGraph data={displayData}/>
                    }
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