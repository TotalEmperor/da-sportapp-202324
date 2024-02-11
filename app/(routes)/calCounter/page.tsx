"use client"
import {useEffect, useState} from "react";
import getFirestoreDocument from "@/firebase/firestore/getData";
import {useContextData} from "@/context/ContextData";
import {getAuth} from "firebase/auth";
import {doc, getFirestore} from "firebase/firestore";
import firebase_app from "@/firebase/config";
import LineGraph from "@/components/caloriecounter/LineGraph";
import GraphCard from "@/components/caloriecounter/GraphCard";
import {ExerciseSchedule} from "@/interfaces/ExerciseSchedule";
import CalculateIcon from '@mui/icons-material/Calculate';

interface WorkoutData {
    date: string;
    time?: number;
    average?: number;
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

    const [pastCalorieData, setPastCalorieData] = useState([]);
    const [planedCalorieData, setPlanedCalorieData] = useState([]);
    const [displayData, setDisplayData] = useState([]);
    const [timespan, setTimespan] = useState<string>("all");
    const [exercises, setExercises] = useState<ExerciseSchedule>();
    const [exercisesKeys, setExercisesKeys] = useState<string[]>();
    const [totalBurnedCal, setTotalBurnedCal] = useState<number>(0);
    const [averageBurnedCal, setAverageBurnedCal] = useState<number>(0);
    const [timeSpent, setTimeSpent] = useState<number>(0);
    const [selectedKey, setSelectedKey] = useState<string>("average");
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
                    analyseExerciseData(data);
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

    const analyseData = async (data: any) =>{
        let calorieData: WorkoutData[] = [];
        data.calorieCounter.map((sets)=>{
            let newSet: WorkoutData = { date: sets.date, time: null, average: null,sum:null};
            sets.exercises.map((exercise)=>{
                newSet.time +=exercise.time;
                newSet.sum += exercise.burned;
            });
            newSet.average = newSet.sum/Object.entries(sets.exercises).length;
            calorieData.push(newSet);
        });
        setPastCalorieData(calorieData);
        setDisplayData(calorieData);
        setTimespan("all")
    };

    const analyseExerciseData =  async (data: any) =>{
        let calorieData: WorkoutData[] = [];
        let weeks = Object.keys(data.exercises);
        const days = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"]
        weeks.map((week)=>{
            let newSet: WorkoutData = { date: "date", time: null, average: null,sum:null};
            days.map((day)=>{
                const exerkeys = Object.keys(data.exercises[week][day]);
                exerkeys.map((exerciseKey)=>{
                    newSet.time +=data.exercises[week][day][exerciseKey].time;
                    newSet.sum += data.exercises[week][day][exerciseKey].burned;
                });
                newSet.average = newSet.sum/exerkeys.length;
                console.log(newSet);
            })
            calorieData.push(newSet);
            console.log(calorieData)
        });
        setPlanedCalorieData(calorieData);
        setTimespan("all")
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

    const setNewTimespan = (newTimespan:string)=>{
        setTimespan(newTimespan);
        const currentDate = new Date();
        let startDate: Date;

        switch (newTimespan) {
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
                startDate = new Date(currentDate.getFullYear()-100);
        }

        const newDisplaydata = pastCalorieData.filter(item => parseDateString(item.date) >= startDate && parseDateString(item.date) <= currentDate);
        const averageCal = pastCalorieData.reduce((totalCal, item) => totalCal + (parseDateString(item.date) >= startDate && parseDateString(item.date) <= currentDate ? item.average : 0), 0);
        const timeSpent = pastCalorieData.reduce((totalCal, item) => totalCal + (parseDateString(item.date) >= startDate && parseDateString(item.date) <= currentDate ? item.time : 0), 0);
        const burnedCal = pastCalorieData.reduce((totalCal, item) => totalCal + (parseDateString(item.date) >= startDate && parseDateString(item.date) <= currentDate ? item.sum : 0), 0);
        setAverageBurnedCal(averageCal);
        setTotalBurnedCal(burnedCal);
        setTimeSpent(timeSpent);
        setDisplayData(newDisplaydata);
    }

    const setPast = ()=>{
        setSelectedBottomTap("past");
        setDisplayData(pastCalorieData);
    }

    const setFuture = ()=>{
        setSelectedBottomTap("planned");
        setDisplayData(planedCalorieData);
    }

    return (
        <>
            <div id={"graph"} className={'rounded-s-md w-[80%]'}>
                <div id={'graph-content'}
                     className={'flex justify-center flex-col items-center dark:bg-white dark:bg-opacity-20 rounded-bl-md rounded-t-md min-h-fit sm:h-[40vh] p-4'}>
                    <select name="timespan"
                            id="timespan-select"
                            value={timespan}
                            onChange={(e) => {
                                setNewTimespan(e.target.value)
                            }}
                            className={`ms-auto rounded mt-4 mr-4 ${selectedBottomTap==="planned" ? "hidden":""}`}>
                        <option value="all">All time</option>
                        <option value="year">1 year</option>
                        <option value="6Months">6 Months</option>
                        <option value="1Month">1 Months</option>
                        <option value="1Week">1 Week</option>
                    </select>
                    <LineGraph data={displayData} lineKey={selectedKey}/>
                </div>
                <ul className={'flex flex-row bg-transparent rounded-b-md ms-auto w-fit dark:bg-white dark:bg-opacity-10 hover:cursor-pointer'}>
                    <li onClick={(e) => {
                        setPast()
                    }}
                        className={`p-3 rounded-bl-md ${selectedBottomTap == "past" ? "dark:bg-white dark:bg-opacity-10" : ""}`}>
                        Past
                    </li>
                    <li onClick={() => {
                        setFuture()
                    }}
                        className={`p-3 ${selectedBottomTap == "planned" ? "dark:bg-white dark:bg-opacity-10" : ""}`}>
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
                               text={`${formatCompactNumber(averageBurnedCal)} kcal`}
                               style={"w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4"}>
                        <>Hope</>
                    </GraphCard>
                    <GraphCard title={"Time spent"}
                               text={`${timeSpent}`}
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