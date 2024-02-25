"use client"
import getFirestoreDocument from "@/firebase/firestore/getData";
import {useEffect, useState} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import SetManager from "@/components/MainComponents/SetManager"
import {usePathname, useSearchParams} from "next/navigation";
import setDocument from "@/firebase/firestore/setDocument";
import {useContextData} from "@/context/ContextData";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import Link from "next/link";
import LoadingModule from "@/components/loadingModule";
import {ExerciseSet} from "@/interfaces/ExerciseSet";
import {ExerciseSchedule} from "@/interfaces/ExerciseSchedule";

export default function SetComponentCollection() {
    const [user, setuser] = useState(() => {
        // if a user is already logged in, use the current user object, or `undefined` otherwise.
        try {
            return getAuth().currentUser.uid || undefined;
        } catch (e) {
            console.log(e)
        }
    });
    const [userdata, setuserdata] = useState<ExerciseSet>();
    const [exerciseSetKeys, setExerciseSetKeys] = useState<string[]>([]);
    const [time, setTime] = useState(0);
    const [numSets, setNumSets] = useState(0);
    const {day, week, setDay, setWeek} = useContextData();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    useEffect(() => {

    }, []);

    useEffect(() => {
        if (user === null) {
            setuserdata(null); // <-- clear data when not logged in

            return;
        }

        if (sessionStorage.getItem("day")) {
            try {
                setDay(sessionStorage.getItem("day"));
                setWeek(sessionStorage.getItem("week"))
            } catch (e) {

            }
        }else{
            sessionStorage.setItem("day", "MO");
            setDay(sessionStorage.getItem("day"));
        }

        const unsubscribe = getFirestoreDocument('exercises', user, (data: ExerciseSchedule) => {
            if (data) {
                setuserdata(data.exercises[week][day]);
                let newExerciseKeys: string[]= [];
                newExerciseKeys = newExerciseKeys.concat(Object.keys(data.exercises[week][day]));
                newExerciseKeys.sort((a, b) => a.localeCompare(b));
                setExerciseSetKeys(newExerciseKeys);
                getSets(data, day, week).then((exercisesData) => {
                    if (exercisesData) {
                        setTime(exercisesData.time)
                        setNumSets(exercisesData.exerciseNum)

                    }else {
                        setuserdata(null);
                    }

                });
            }else {
                setExerciseSetKeys(null)
            }
        });

        return () => {
            unsubscribe();
        };

    }, [user, day, week]); // <-- rerun when user changes

    useEffect(() => {
        if (searchParams.get("setName")) {
            sortSets(searchParams.get("setName"));
        } else {
            sortSets(pathname.substring(pathname.lastIndexOf("/") + 1))
        }

        }, [pathname, searchParams]);

    const sortSets = async (selectedSet: string) => {
        if(exerciseSetKeys.includes(selectedSet)){
            let sortedKeys :string[] = [];
            let keys = exerciseSetKeys;

            sortedKeys.push(selectedSet);
            keys.splice(keys.indexOf(selectedSet), 1);
            keys.sort((a, b) => a.localeCompare(b)); // Sort the remaining names in the array

            let finalArray: string[] = [selectedSet].concat(keys); // Concatenate the selected name with the sorted array of the remaining names

            if(finalArray){
                setExerciseSetKeys(finalArray)
            }
        }
    }

    return (
        <>
            {exerciseSetKeys.length!==null ?
                <>
                    <>
                        <div
                            className="flex flex-col text-4xl font-bold w-full bg-gray-100 dark:bg-transparent justify-center items-center">
                            <h1>{day}</h1>
                            <div
                                className="flex felx-row border-b-2 border-black dark:border-white justify-center items-center">
                                <h2 className="text-sm me-[1rem]">{exerciseSetKeys.length ? exerciseSetKeys.length : "0"}x Sets</h2>
                                <h1 className="text-xl font-bold">{exerciseSetKeys.length ? numSets : "0"}x. Exercises</h1>
                                <h2 className="text-sm ms-[1rem]">{(time < 60) ?
                                    time + " sec." :
                                    Math.floor(time / 60).toString() + ":" + (time % 60).toString().padStart(2, '0') + " Min."}</h2>
                            </div>
                        </div>
                        <div className={"w-[80%] overflow-y-auto flex flex-col items-center my-2 sm:px-5 mx-10"}>
                            {(
                                exerciseSetKeys.map((key: any, index) => (
                                    <SetManager key={index}
                                                setName={key}
                                                data={userdata[key]} link={`/workout/${key}`}
                                                time={getSetTime(userdata[key])}
                                                exerciseNum={userdata[key] ? Object.entries(userdata[key]).length : 0}
                                                stars={getAverageDifficulty(userdata[key])}/>
                                ))
                            )}
                        </div>
                        <div className={"mt-auto w-[80%] flex"}>
                            <Link href={`/modifying`} prefetch={true}
                                  className={"p-5 mb-20 ms-auto rounded-2xl bg-green-300 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-700"}>
                                <EditCalendarIcon/>
                            </Link>
                        </div>
                    </>
                </>
                :
                <LoadingModule/>
            }
        </>
    )
}

const getSets = async (data: any, day: string, week: string) => {

    let objArray: any[] = [];
    let exerciseNum = 0;
    let time = 0;


    if (day) {
        for (const setName in data.exercises[week][day]) {
            const exerciseSet = data.exercises[week][day][setName];
            exerciseNum += Object.entries(exerciseSet).length;
            for (const exerciseName in exerciseSet) {
                time += parseInt(exerciseSet[exerciseName].time);
            }
        }

        objArray = objArray.concat(Object.entries(data.exercises[week][day]));

    }


    return {objArray, exerciseNum, time};

};

const getSetTime = (data: any): number => {
    let setTime = 0;

    for (const exercise in data) {
        setTime += parseInt(data[exercise].time);
    }
    return setTime;

}

const getAverageDifficulty = (data: any): number => {
    let totalStars = 0;
    let exerciseCount = 0;

    for (const exercise in data) {
        totalStars += parseInt(data[exercise].stars);
        exerciseCount++;
    }

    if (exerciseCount === 0) {
        return 0; // Return 0 if there are no exercises with star ratings
    }

    return totalStars / exerciseCount;
}


