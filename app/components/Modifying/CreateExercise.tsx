"use client"
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, {useEffect, useState} from "react";
import AddModal from "@/components/Modifying/AddingExerciseModal";
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import {useContextData} from "@/context/ContextData";
import getFirestoreDocument from "@/firebase/firestore/getData";
import {getAuth} from "firebase/auth";

export default function CreateExercise() {
    const [user, setuser] = useState(() => {
        // if a user is already logged in, use the current user object, or `undefined` otherwise.
        try {
            return getAuth().currentUser.uid || undefined;
        } catch (e) {
            console.log(e)
        }
    });

    const [difficulty, setDifficulty] = useState<number>(0)
    const [hoverDifficulty, setHoverDifficulty] = useState<number>(-1);
    const [userdata, setUserdata]= useState([])
    const { day, week, setDay, setWeek } = useContextData();


    useEffect(() => {
        if(localStorage.getItem("day")){
            try {
                setDay(localStorage.getItem("day"));
                setWeek(localStorage.getItem("week"))
            }catch (e){

            }
            console.log("Test")
        }    }, []);



    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = (e) => {
        e.preventDefault();
        setModalOpen(true);
    }
    const closeModal = () => setModalOpen(false);


// keeps `userdata` up to date

    useEffect(() => {
        if (user === null) {
            setUserdata(null); // <-- clear data when not logged in

            return;
        }

        if (!user) {
            // user still loading, do nothing yet
            return;
        }

        getFirestoreDocument("exercises", user).then((res: any) => {
            if (res.result) {
                getSets(res.result, day, week).then((exercisesData) => {
                    console.log("REs: "+res)
                    if (exercisesData) {
                        setUserdata(exercisesData.objArray);
                    }

                })
            }
        });


    }, [user, day, week]); // <-- rerun when user changes



    return (
        <>
            <div className="w-full flex-grow flex-shrink pt-1 flex-col flex px-3 dark:text-white text-neutral-800">
                <div className="flex w-full items-center border-b-2 border-gray-300 pb-[1.5rem]">
                    <Link
                        className="hover:bg-gray-200 rounded-full w-fit p-2"
                        href="/modifying">
                        <ArrowBackIcon/>
                    </Link>
                    <span className="font-bold text-xl ms-4">Create Exercise</span>
                </div>
                <form className={"flex flex-col group px-10 mt-5 w-fit"} onSubmit={(e)=>{openModal(e)}}>
                    <label htmlFor="exerciseName" className="mb-5 sm:w-[50%] flex flex-col">
                        <span>Name</span>
                        <input
                            type="text"
                            name="exerciseName"
                            id="exerciseName"
                            placeholder={"e.g Pull Ups"}
                            pattern={`^[A-Za-z0-9\\s\\-_]+$`}
                            className="rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
                            required
                        />
                    </label>
                    <label htmlFor="exerciseDescription" className="mb-5 sm:w-[50%] flex flex-col">
                        <span>Description</span>
                        <textarea
                            name="exerciseDescription"
                            id="exerciseDescription"
                            placeholder={"Move your sorry ass"}
                            className="rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                            required
                        />
                    </label>
                    <div className="flex sm:flex-row mb-5 flex-col">
                        <label htmlFor="mode" className="me-5">
                            <span>Mode</span>
                            <div
                                className="flex flex-row w-full dark:bg-neutral-800 shadow mt-2 shadow-gray-100 appearance-none outline-none items-center rounded border border-gray-300 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer">
                                <select
                                    className="border-e-2 border-black dark:border-neutral-400 p-2 bg-inherit min-w-fit w-[15%] text-md text-center outline-0 appearance-none">
                                    <option value="CM">Timer</option>
                                    <option value="FEET">It should take</option>
                                </select>
                                <input type="number"
                                       id={"modeInput"}
                                       className="bg-inherit p-3 outline-none w-[5vw]"
                                       required>
                                </input>
                            </div>
                        </label>

                        <label htmlFor="repMode">
                            <span>rep. Mode</span>
                            <div
                                className="flex flex-row w-full dark:bg-neutral-800 shadow mt-2 shadow-gray-100 appearance-none outline-none items-center rounded border border-gray-300 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer">
                                <select
                                    className="border-e-2 border-black dark:border-neutral-400 p-2 bg-inherit min-w-fit w-[15%] text-md text-center outline-0 appearance-none">
                                    <option value="x. Times">x. Times</option>
                                    <option value="∞">∞</option>
                                </select>
                                <input type="number"
                                       id={"secInput"}
                                       className="bg-inherit p-3 outline-none w-[5vw]"
                                       required>
                                </input>
                            </div>
                        </label>
                    </div>
                    <label>
                        <span>Difficulty</span>
                        <div className={"flex flex-row"}>
                            <input value={difficulty} hidden type={"number"} required>
                            </input>
                            {[...Array(4)].map((_, index) => {
                                const starCount = index + 1;

                                return (
                                    <>
                                        <StarRoundedIcon key={index}
                                                         className={`${index<=hoverDifficulty ? "text-blue-200": ""} ${index<=difficulty ? "text-yellow-300": ""} hover:cursor-pointer me-2`} sx={{fontSize:"3.5rem"}}
                                                         onClick={()=>{setDifficulty(index)}}
                                                         onMouseEnter={()=>{setHoverDifficulty(index)}}
                                                         onMouseLeave={()=>{setHoverDifficulty(-1)}}/>
                                    </>
                                );
                            })}
                        </div>
                    </label>
                    <button type="submit" className="mt-5 bg-green-500 dark:bg-green-800 py-3 rounded-md text-white group-invalid:pointer-events-none group-invalid:opacity-50"
                        onSubmit={(e)=>{openModal(e)}}>
                        Create Exercise
                    </button>

                    <AddModal isOpen={isModalOpen} onClose={closeModal} userData={userdata}/>
                </form>
            </div>
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