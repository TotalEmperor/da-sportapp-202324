"use client"
import {useEffect, useState} from "react";
import getFirestoreDocument from "@/firebase/firestore/getData";
import {ContextData, useContextData} from "@/context/ContextData";
import {getAuth} from "firebase/auth";
import LineGraph from "@/components/caloriecounter/LineGraph";
import GraphCard from "@/components/caloriecounter/GraphCard";
import {ExerciseSchedule} from "@/interfaces/ExerciseSchedule";
import {UserData} from "@/interfaces/userdata";
import timeFormatter from "@/components/TimeFormatter";
import {sortDates} from "@/components/MainComponents/dateConfig";
import {useRouter} from "next/navigation";

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
    const [totalBurnedCal, setTotalBurnedCal] = useState<number>(0);
    const [averageBurnedCal, setAverageBurnedCal] = useState<number>(0);
    const [timeSpent, setTimeSpent] = useState<number>(0);
    const [selectedKey, setSelectedKey] = useState<string>("average");
    const [selectedBottomTap, setSelectedBottomTap] = useState("past");

    const {day, week} = useContextData();
    const router = useRouter();

    useEffect(() => {
        if (user === null) {

            return;
        }

        const unsubscribe = ()=>{
            getFirestoreDocument('caloriecounter', user,  (data) => {
                if (data) {
                    analyseData(data);
                } else {
                    console.error("Couldn't fetch Calorie Counter")
                }
            });

            getFirestoreDocument('exercises', user,  (data:ExerciseSchedule) => {
                getFirestoreDocument('userdata', user,  (userData: UserData) => {
                    if (data) {
                        analyseExerciseData(data, userData.personaldata.weight);
                    } else {
                        console.error("Couldn't fetch Exercises")
                    }
                });
            });
            router.refresh();

        }

        return () => {
            unsubscribe();
        };

    }, [user, day, week]); // <-- rerun when user changes

    const analyseData =  (data: any) =>{
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
        setNewTimespan("all", calorieData);
    };

    function getDatesWithinWeek(week: string): string[] {

// Split the week range into two dates
        const [startDateStr, endDateStr] = week.split('-');
        const [startDay, startMonth, startYear] = startDateStr.split('.').map(Number);
        const [endDay, endMonth, endYear] = endDateStr.split('.').map(Number);

// Create start and end dates
        const startDate = new Date(startYear, startMonth - 1, startDay); // Month in JavaScript Date starts from 0
        const endDate = new Date(endYear, endMonth - 1, endDay);

        const dates: string[] = [];
        const currentDate = new Date(startDate);

        // Loop through each day within the range
        while (currentDate <= endDate) {
            // Format the date to yyyy-mm-dd
            const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
            dates.push(formattedDate);

            // Move to the next day
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dates;
    }

    const analyseExerciseData = async (data: any, weight: number) =>{
        let calorieData: WorkoutData[] = [];
        let weeks =  await sortDates(Object.keys(data.exercises));
        const days = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];

        weeks.map((week)=>{
            const dateList = getDatesWithinWeek(week);
            days.map((day, index)=>{
                let newSet: WorkoutData = { date: dateList[index], time: 0, average: 0,sum:0};
                const setKeys = Object.keys(data.exercises[week][day]);
                setKeys.map((setKey)=>{
                    const exerkeys = Object.keys(data.exercises[week][day][setKey]);
                    exerkeys.map((exerciseKey)=>{
                        newSet.time += Number(data.exercises[week][day][setKey][exerciseKey].time);
                        newSet.sum += calculateBurnedCal(Number(data.exercises[week][day][setKey][exerciseKey].met), newSet.time, weight, "");
                    });
                    newSet.average = newSet.average + (newSet.sum/exerkeys.length);
                })
                calorieData.push(newSet);
                console.log(newSet)
            })
        });
        setPlanedCalorieData(calorieData);
    };

    const parseDateString = (dateString: string): Date => {
        // Assuming the date string is in the format 'YYYY-MM-DD'
        const [year, month, day] = dateString.split('-').map(Number);
        return new Date(year, month - 1, day); // Month is 0-indexed in JavaScript Date
    };

    const setNewTimespan = (newTimespan:string, calorieData:any)=>{
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

        const newDisplaydata = calorieData.filter(item => parseDateString(item.date) >= startDate && parseDateString(item.date) <= currentDate);
        const averageCal = calorieData.reduce((totalCal, item) => totalCal + (parseDateString(item.date) >= startDate && parseDateString(item.date) <= currentDate ? item.average : 0), 0);
        const timeSpent = calorieData.reduce((totalCal, item) => totalCal + (parseDateString(item.date) >= startDate && parseDateString(item.date) <= currentDate ? item.time : 0), 0);
        const burnedCal = calorieData.reduce((totalCal, item) => totalCal + (parseDateString(item.date) >= startDate && parseDateString(item.date) <= currentDate ? item.sum : 0), 0);
        setAverageBurnedCal(averageCal);
        setTotalBurnedCal(burnedCal);
        setTimeSpent(timeSpent);
        setDisplayData(newDisplaydata);
    }

    const setPast = ()=>{
        setSelectedBottomTap("past");
        setDisplayData(pastCalorieData);
        setNewTimespan("all", pastCalorieData)
    }

    const setFuture =  ()=>{
        setSelectedBottomTap("planned");
        setDisplayData(planedCalorieData);
        const newDisplaydata = planedCalorieData.filter(item => parseDateString(item.date) >= new Date(-100) && parseDateString(item.date) <= new Date());
        const averageCal = planedCalorieData.reduce((totalCal, item) => totalCal + (parseDateString(item.date) >= new Date(-100)  && parseDateString(item.date) <= new Date() ? item.average : 0), 0);
        const timeSpent = planedCalorieData.reduce((totalCal, item) => totalCal + (parseDateString(item.date) >= new Date(-100)  && parseDateString(item.date) <= new Date() ? item.time : 0), 0);
        const burnedCal = planedCalorieData.reduce((totalCal, item) => totalCal + (parseDateString(item.date) >= new Date(-100)  && parseDateString(item.date) <= new Date() ? item.sum : 0), 0);
        setAverageBurnedCal(averageCal);
        setTotalBurnedCal(burnedCal);
        setTimeSpent(timeSpent);
        setDisplayData(newDisplaydata);
    }

    const getExerciseRanglist=()=>{

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
                                setNewTimespan(e.target.value, pastCalorieData)
                            }}
                            className={`ms-auto rounded mt-4 mr-4 ${selectedBottomTap==="planned" ? "hidden":""}`}>
                        <option value="all">All time</option>
                        <option value="year">1 year</option>
                        <option value="6Months">6 Months</option>
                        <option value="1Month">1 Months</option>
                        <option value="1Week">1 Week</option>
                    </select>
                    <LineGraph data={displayData} lineKey={selectedKey} />
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
                 className={'flex flex-col flex-shrink w-[-webkit-fill-available] md:mx-[10%] dark:bg-white dark:bg-opacity-5 mt-2 p-4 rounded-md overflow-y-scroll h-max'}>
                <h1 className={"border-b-2 dark:border-white border-black"}>Statistics</h1>
                <div className={'flex flex-col flex-wrap justify-center'}>
                    <div id={"Graphcard Container"} className={'min-h-fit max-h-min flex flex-wrap mx-auto'}>
                        <GraphCard title={"Total burned cal."}
                                   onClick={()=>{setSelectedKey("sum")}}
                                   selectedCard={selectedKey == "sum"}>
                            <h1>{formatCompactNumber(totalBurnedCal)} kcal</h1>
                        </GraphCard>
                        <GraphCard title={"Average burned cal."}
                                   onClick={()=>{setSelectedKey("average")}}
                                   selectedCard={selectedKey == "average"}>
                            <h1>{formatCompactNumber(averageBurnedCal)} kcal per day <br/> {formatCompactNumber(averageBurnedCal)} kcal per exercise</h1>
                        </GraphCard>
                        <GraphCard title={"Time spent"}
                                   onClick={()=>{setSelectedKey("time")}}
                                   selectedCard={selectedKey == "time"}>
                            <h1>{timeFormatter(timeSpent)}</h1>
                        </GraphCard>
                    </div>
                    <div id={"Tables"} className={'flex flex-wrap flex-row justify-center'}>

                    </div>
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

    function calculateBurnedCal(met: number, time: number, weight: number, weightUnit: string): number {
        if(isNaN(weight * met * 0.0175 * time)){
            return 0
        }
        return weight * met * 0.0175 * time;
    }




}