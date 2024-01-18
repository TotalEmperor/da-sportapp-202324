"use client"
import getFirestoreDocument from "@/firebase/firestore/getData";
import {useEffect, useState} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import SetManager from "@/components/MainComponents/SetManager"
import {useRouter} from "next/navigation";
import addData from "@/firebase/firestore/addData";
import {useContextData} from "@/context/ContextData";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import LoadingModule from "@/components/loadingModule";

export default function SetComponentCollection() {
    const [user, setuser] = useState(() => {
        // if a user is already logged in, use the current user object, or `undefined` otherwise.
        try {
            return getAuth().currentUser.uid || undefined;
        } catch (e) {
            console.log(e)
        }
    });
    const [userdata, setuserdata] = useState([]);
    const [time, setTime] = useState(0);
    const [numSets, setNumSets] = useState(0);
    const {day, week, setDay, setWeek} = useContextData();

    useEffect(() => {
        if (sessionStorage.getItem("day")) {
            try {
                setDay(sessionStorage.getItem("day"));
                setWeek(sessionStorage.getItem("week"))
                console.log(day)
            } catch (e) {

            }
        }
    }, []);


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

        const unsubscribe = getFirestoreDocument('exercises', user, (data) => {
            if (data) {
                getSets(data, day, week).then((exercisesData) => {
                    if (exercisesData) {
                        console.log(exercisesData)
                        setuserdata(exercisesData.objArray);
                        setTime(exercisesData.time)
                        setNumSets(exercisesData.exerciseNum)
                    }

                })
            }
        });

        return () => {
            unsubscribe();
        };

    }, [user, day, week]); // <-- rerun when user changes

    return (
        <>
            {userdata.length>0 ?
                <>
                    <>
                        <div
                            className="flex flex-col text-4xl font-bold w-full bg-gray-100 dark:bg-transparent justify-center items-center">
                            <h1>{day}</h1>
                            <div
                                className="flex felx-row border-b-2 border-black dark:border-white justify-center items-center">
                                <h2 className="text-sm me-[1rem]">{userdata.length ? userdata.length : "0"}x Sets</h2>
                                <h1 className="text-xl font-bold">{userdata.length ? numSets : "0"}x. Exercises</h1>
                                <h2 className="text-sm ms-[1rem]">{userdata.length ? time : "0"} Min.</h2>
                            </div>
                        </div>
                        <div className={"w-[80%] overflow-y-auto flex flex-col items-center my-2 sm:px-5 mx-10"}>
                            {(
                                userdata.map((data: any, index) => (
                                    <SetManager key={index}
                                                data={data} link={`/workout/${data[0]}`}
                                                time={getSetTime(data)}
                                                exerciseNum={data[1] ? Object.entries(data[1]).length : 0}
                                                stars={getAverageDifficulty(data)}/>
                                ))
                            )}
                        </div>
                        <div className={"mt-auto w-[80%] flex"}>
                            <Link href="/modifying" prefetch={true}
                                  className={"p-5 mb-20 ms-auto border-2 border-black rounded-2xl bg-green-300 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-700"}>
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

    for (const exercise in data[1]) {
        setTime += parseInt(data[1][exercise].time);
    }
    return setTime;

}

const getAverageDifficulty = (data: any): number => {

    let totalStars = 0;
    let exerciseCount = 0;

    for (const exercise in data[1]) {
        totalStars += parseInt(data[1][exercise].stars);
        exerciseCount++;
    }

    if (exerciseCount === 0) {
        return 0; // Return 0 if there are no exercises with star ratings
    }

    return totalStars / exerciseCount;
}


