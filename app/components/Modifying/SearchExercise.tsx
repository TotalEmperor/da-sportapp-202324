"use client"
import React, {useEffect, useState} from "react";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import AddModal from "@/components/Modifying/AddingExerciseModal";
import SetManager from "@/components/Workout/SetManager";
import {getAuth} from "firebase/auth";
import getFirestoreDocument from "@/firebase/firestore/getData";
import {doc, getFirestore, onSnapshot} from "firebase/firestore";
import firebase_app from "@/firebase/config";


export default function SearchExercise() {

    const [searchValue, setSearchValue] = useState<string>("");
    const [templateExercises, setTemplateExercises] = useState([]);
    const [selectedExercises, setSelectedExercises] = useState([]);

    const [time, setTime] = useState(0);
    const [numSets, setNumSets] = useState(0);
    const user = getAuth().currentUser.uid;
    const db = getFirestore(firebase_app)


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
                getSets(data.exampleexercises).then((exercisesData) => {
                    if (exercisesData) {
                        setTemplateExercises(exercisesData.objArray)
                        setSelectedExercises(exercisesData.objArray)
                        setTime(exercisesData.time)
                        setNumSets(exercisesData.exerciseNum)
                    }

                })            }
        });

        return () => {
            unsubscribe();
        };



    }, [user]);

    const setNewSearchValue = (searchValue: string)=>{
        setSearchValue(searchValue);
        let chache = [];

        templateExercises.forEach((set)=>{
            if(set[0].includes(searchValue)){
                chache.push(set);
            }
        })

        if(!chache){
            setSelectedExercises(templateExercises);
        }else {
            setSelectedExercises(chache)
        }

    }


    return (
        <>
            <div className="w-full flex-grow flex-shrink pt-1 flex-col flex px-3 dark:text-white text-neutral-800">
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
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
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

                    <div className={`w-full px-[10%]`}>
                        {(
                            selectedExercises.map((data: any, index) => (
                                <SetManager key={index}
                                            data={data} link={`/workout/${data[0]}`}
                                            time={getSetTime(data)}
                                            exerciseNum={data[1] ? Object.entries(data[1]).length : 0}
                                            stars={getAverageDifficulty(data)}/>
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

const getSetTime =(data: any): number =>{
    let setTime = 0;

    for (const exercise in data[1]) {
        setTime += parseInt(data[1][exercise].time);
    }
    return setTime;

}

const getAverageDifficulty = (data:any):number =>{

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

