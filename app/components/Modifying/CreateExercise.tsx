"use client"
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, {useEffect, useState} from "react";
import StarRoundedIcon from '@mui/icons-material/StarRounded';

export default function CreateExercise() {

    const [difficulty, setDifficulty] = useState<number>(0)
    const [hoverDifficulty, setHoverDifficulty] = useState<number>(-1)


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
                <form className={"flex flex-col group px-10"} noValidate>
                    <label htmlFor="exerciseName" className="mb-5 sm:w-[50%] flex flex-col">
                        <span>Name</span>
                        <input
                            type="text"
                            name="exerciseName"
                            id="exerciseName"
                            placeholder={"e.g Pull Ups"}
                            className="rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                        />
                    </label>
                    <label htmlFor="exerciseDescription" className="mb-5 sm:w-[50%] flex flex-col">
                        <span>Description</span>
                        <textarea
                            name="exerciseDescription"
                            id="exerciseDescription"
                            placeholder={"Move your sorry ass"}
                            className="rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
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
                                       className="bg-inherit p-3 outline-none w-[5vw]">
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
                                       className="bg-inherit p-3 outline-none w-[5vw]">
                                </input>
                            </div>
                        </label>
                    </div>
                    <label>
                        <span>Difficulty</span>
                        <div className={"flex flex-row"}>
                            {[...Array(4)].map((_, index) => {
                                const starCount = index + 1;

                                return (
                                    <>
                                        <StarRoundedIcon key={index}
                                                         className={`${index<=difficulty ? "text-yellow-300": ""} ${index<=hoverDifficulty ? "text-blue-200": ""} hover:cursor-pointer me-2`} sx={{fontSize:"3.5rem"}}
                                                         onClick={()=>{setDifficulty(index)}}
                                                         onMouseEnter={()=>{setHoverDifficulty(index)}}
                                                         onMouseLeave={()=>{setHoverDifficulty(-1)}}/>
                                    </>
                                );
                            })}
                        </div>
                    </label>
                </form>
            </div>
        </>
    )

}