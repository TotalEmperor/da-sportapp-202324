"use client"
import getFirestoreDocument from "@/firebase/firestore/getData";
import {Suspense, useEffect, useState} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import SetManager from "@/components/MainComponents/SetManager"
import {useContextData} from "@/context/ContextData";
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from '@mui/icons-material/Add';
import AddControlModal from "@/components/Modifying/AddControlModal";
import LoadingModule from "@/components/loadingModule";
import {usePathname, useSearchParams} from "next/navigation";

export default function ModifySetComponentCollection() {
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
    const [exerciseSetKeys, setExerciseSetKeys] = useState<string[]>([]);
    const {day, week, setDay, setWeek} = useContextData();
    const searchParams = useSearchParams();
    const pathname = usePathname();

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


    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);


// keeps `userdata` up to date

    useEffect(() => {
        if (user === null) {
            setuserdata(null); // <-- clear data when not logged in

            return;
        }

        const unsubscribe = getFirestoreDocument('exercises', user, (data) => {
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

                })
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
            {
                userdata!== null?
                    <>
                        <div
                            className="flex flex-col text-4xl font-bold w-full dark:bg-transparent justify-center items-center rounded-2xl">
                            <h1>{day}</h1>
                            <div
                                className="flex felx-row border-b-2 border-black dark:border-white justify-center items-center">
                                <h2 className="text-sm me-[1rem]">{exerciseSetKeys.length ? exerciseSetKeys.length : "0"}x Sets</h2>
                                <h1 className="text-xl font-bold">{exerciseSetKeys.length ? numSets : "0"}x. Exercises</h1>
                                <h2 className="text-sm ms-[1rem]">{(time < 60) ?
                                    time + " sec." :
                                    Math.floor(time / 60).toString() + ":" + (time % 60).toString().padStart(2, '0') + " Min."}</h2>                            </div>
                        </div>
                        {exerciseSetKeys.length == 0 ?
                            <div className={`w-[80%] h-full flex justify-center items-center relative`}>
                                <div className={`dark:bg-neutral-500 hover:bg-neutral-200 opacity-20 hover:dark:brightness-150 rounded-xl z-10`}>
                                    <button
                                        onClick={openModal}
                                        className={"w-[5vw] h-[5vw] flex items-center justify-center  z-[5]"}>
                                        <AddIcon/>
                                    </button>
                                </div>
                            </div>
                            :
                            <>
                                <div
                                    className={"w-[80%] overflow-y-auto flex flex-col items-center my-2 sm:px-5 mx-10"}>
                                    {(
                                        exerciseSetKeys.map((key: any, index) => (
                                            <SetManager key={index}
                                                        setName={key}
                                                        data={userdata[key]} link={`/modifying/${key}`}
                                                        time={getSetTime(userdata[key])}
                                                        exerciseNum={userdata[key] ? Object.entries(userdata[key]).length : 0}
                                                        stars={getAverageDifficulty(userdata[key])}
                                                        modify={true}/>
                                        ))
                                    )}
                                </div>
                                <div className={"mt-auto w-[80%] flex mb-20"}>
                                    <button
                                        onClick={openModal}
                                        className={"p-5 ms-auto rounded-2xl bg-green-300 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-700"}>
                                        <AddIcon/>
                                    </button>
                                </div>
                            </>
                        }


                        <AddControlModal isOpen={isModalOpen} onClose={closeModal}/>
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