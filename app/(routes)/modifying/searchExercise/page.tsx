"use client"
import React, {useEffect, useState} from "react";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SetManager from "@/components/MainComponents/SetManager";
import {getAuth} from "firebase/auth";
import getFirestoreDocument from "@/firebase/firestore/getData";

export default function Page(){
    const [searchValue, setSearchValue] = useState<string>("");
    const [templateExercises, setTemplateExercises] = useState([]);
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [exerciseSetKeys, setExerciseSetKeys] = useState<string[]>([]);
    const [exercises, setExercises] = useState<string[]>([]);


    const [time, setTime] = useState(0);
    const [numSets, setNumSets] = useState(0);
    const user = getAuth().currentUser.uid;


    useEffect(() => {
        if (user === null) {
            setTemplateExercises(null); // <-- clear data when not logged in

            return;
        }

        if (!user) {
            // user still loading, do nothing yet
            return;
        }

        const unsubscribe = getFirestoreDocument('exampleexercises', "CB6Eqnz7qfDrfcwuZJPn", (data) => {
            if (data) {
                setExercises(data.exampleexercises)
                setSelectedExercises(data.exampleexercises);
                let newExerciseKeys: string[]= [];
                newExerciseKeys = newExerciseKeys.concat(Object.keys(data.exampleexercises));
                newExerciseKeys.sort((a, b) => a.localeCompare(b));
                setExerciseSetKeys(newExerciseKeys);
                setSelectedExercises(newExerciseKeys);
                getSets(data.exampleexercises).then((exercisesData) => {
                    if (exercisesData) {
                        setTime(exercisesData.time)
                        setNumSets(exercisesData.exerciseNum)
                    }

                })            }
        });

        return () => {
            unsubscribe();
        };



    }, [user]);

    const setNewSearchValue = async (newSearchValue: string)=>{
        setSearchValue(newSearchValue);
        let chache = [];

        exerciseSetKeys.forEach((set)=>{
            if(set.includes(newSearchValue)){
                chache.push(set);
            }
        })

        if(!chache){
            setSelectedExercises(exerciseSetKeys);
        }else {
            setSelectedExercises(chache)
        }

    }


    return (
        <>
            <div className="w-full flex-grow overflow-y-scroll flex-shrink pt-1 flex-col flex px-3 dark:text-white text-neutral-800 dark:bg-white dark:bg-opacity-5 p-4 rounded-md">
                <div className="flex w-full items-center border-b-2 border-gray-300 pb-[1.5rem]">
                    <Link
                        className="hover:bg-gray-200 rounded-full w-fit p-2"
                        href="/modifying">
                        <ArrowBackIcon/>
                    </Link>
                    <span className="font-bold text-xl ms-4">Search for Exercises</span>
                </div>
                <div className={`flex flex-col mt-5 ms-4`}>
                    <div className='max-w-md w-full pb-3 border-b-2 border-white ms-[10%]'>
                        <div
                            className="relative flex items-center w-full min-h-fit h-12 rounded-lg focus-within:shadow-lg dark:bg-neutral-700 bg-white overflow-hidden">
                            <div className="grid place-items-center h-full w-12 dark:text-white text-gray-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                     viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                </svg>
                            </div>

                            <input
                                className="peer h-full w-full outline-none text-sm dark:text-white text-gray-700 pr-2"
                                type="text"
                                onChange={(e) => {
                                    setNewSearchValue(e.target.value)
                                }}
                                id="search"
                                placeholder="Search something.."/>
                        </div>
                    </div>
                    <div className={"w-[80%] overflow-y-auto flex flex-col items-center my-2 sm:px-5 mx-10"}>
                        {(
                            selectedExercises.map((key: any, index) => (
                                <SetManager key={index}
                                            setName={key}
                                            data={exercises[key]} link={`/modifying/searchExercise/templates/${key}`}
                                            time={getSetTime(exercises[key])}
                                            exerciseNum={exercises[key] ? Object.entries(exercises[key]).length : 0}
                                            stars={getAverageDifficulty(exercises[key])}/>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    )

}

const getSets = async (data: any) => {

    let objArray: any[] = [];
    let exerciseNum = 0;
    let time = 0;


    for (const setName in data) {
        const exerciseSet = data[setName];
        exerciseNum += Object.entries(exerciseSet).length;
        for (const exerciseName in exerciseSet) {
            time += parseInt(exerciseSet[exerciseName].time);
        }
    }

    objArray = objArray.concat(Object.entries(data));


    return {objArray, exerciseNum, time};

};

const getSetTime = (data: any): number => {
    let setTime = 0;

    for (const exercise in data) {
        setTime += parseInt(data[exercise].time);
    }
    return setTime;

}

const getAverageDifficulty = (data:any):number =>{

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