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
import GraphCard from "@/components/caloriecounter/GraphCard";
import {ExerciseSchedule} from "@/interfaces/ExerciseSchedule";
import CalculateIcon from '@mui/icons-material/Calculate';

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
    const [timespan, setTimespan] = useState<string>("all");
    const [exercises, setExercises] = useState<ExerciseSchedule>();
    const [exercisesKeys, setExercisesKeys] = useState<string[]>();
    const [totalBurnedCal, setTotalBurnedCal] = useState<number>(0);
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

            getFirestoreDocument('exercises', user, (data:ExerciseSchedule) => {
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
            let newSet: WorkoutData = { date: sets.date, Abs: null, Forearms: null, Back: null, Biceps: null,Chest: null, Legs: null, others: null, Shoulders: null, Traps: null, Triceps:null, sum:null};
            sets.exercises.map((exercise)=>{
                if(exercise.type!==undefined){
                    const type = exercise.type;
                    newSet[type] += exercise.burned;
                }else {
                    newSet["others"] += exercise.burned;
                }

                newSet.sum += exercise.burned;
            })
            calorieData.push(newSet);
        });
        setCalorieCounter(calorieData);
        setTimespan("all");
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
        setTimespan(timeSpan);
        getTotalBurnedCal(timeSpan)
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
                return setDisplayData(calorieCounter);
            default:
                return setDisplayData(calorieCounter);
        }

        const newDisplaydata = calorieCounter.filter(item => parseDateString(item.date) >= startDate && parseDateString(item.date) <= currentDate);
        console.log(newDisplaydata);
        setDisplayData(newDisplaydata);
    }

    const getTotalBurnedCal =async (timespan:string)=>{
        const currentDate = new Date();
        let startDate: Date;
        switch (timespan) {
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
                const burnedCal:number = calorieCounter.reduce((totalCal, item)=>totalCal+item.sum)
                return setTotalBurnedCal(burnedCal);
        }

        const burnedCal = calorieCounter.reduce((totalCal, item) => totalCal + (parseDateString(item.date) >= startDate && parseDateString(item.date) <= currentDate ? item.sum : 0), 0);
        setTotalBurnedCal(burnedCal);
    }


    return (
        <>
            <div id={"graph"} className={'rounded-s-md w-[80%]'}>
                <ul className={'flex flex-row bg-transparent rounded-t-md me-auto w-fit dark:bg-white dark:bg-opacity-10 hover:cursor-pointer'}>
                    <li onClick={() => {
                        setSelectedTopTap("bar")
                    }}
                        className={`p-3 rounded-tl-md ${selectedTopTap == "bar" ? "dark:bg-white dark:bg-opacity-10" : ""}`}>
                        Bar
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
                        <LineGraph data={displayData}/>
                    }
                </div>
                <ul className={'flex flex-row bg-transparent rounded-b-md ms-auto w-fit dark:bg-white dark:bg-opacity-10 hover:cursor-pointer'}>
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
                 className={'flex flex-col flex-shrink w-[-webkit-fill-available] md:mx-[10%] dark:bg-white dark:bg-opacity-5 mt-2 p-4 rounded-md'}>
                <h1 className={"border-b-2 dark:border-white border-black"}>Statistics</h1>
                <div className={'flex flex-wrap justify-center'}>
                    <GraphCard title={"Total burned cal."}
                               text={`${formatCompactNumber(totalBurnedCal)} kcal`} style={"w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4"}/>
                    <GraphCard title={"Average burned cal."}
                               text={"Testing"}
                               style={"w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4"}>
                        <>Hope</>
                    </GraphCard>
                    <GraphCard title={"Time spent"}
                               text={"Testing"}
                               style={"w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4"}>
                        <>Hope</>
                    </GraphCard>
                    <GraphCard title={"Most effective"}
                               text={"Testing"}
                               style={"w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4"}>
                        <>Hope</>
                    </GraphCard>
                </div>
            </div>
        </>
    );

    function formatCompactNumber(number) {
        if (number < 1000) {
            return number;
        } else if (number >= 1000 && number < 1_000_000) {
            return (number / 1000).toFixed(1) + "K";
        } else if (number >= 1_000_000 && number < 1_000_000_000) {
            return (number / 1_000_000).toFixed(1) + "M";
        } else if (number >= 1_000_000_000 && number < 1_000_000_000_000) {
            return (number / 1_000_000_000).toFixed(1) + "B";
        } else if (number >= 1_000_000_000_000 && number < 1_000_000_000_000_000) {
            return (number / 1_000_000_000_000).toFixed(1) + "T";
        }
    }
}