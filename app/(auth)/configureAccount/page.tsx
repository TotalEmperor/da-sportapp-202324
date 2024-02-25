"use client"
import React, {useState} from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import getFirestoreDocument from "@/firebase/firestore/getData";
import {getAuth, sendEmailVerification} from "firebase/auth";
import setDocument from "@/firebase/firestore/setDocument";
import {useRouter} from "next/navigation";
import updateFirestoreDocument from "@/firebase/firestore/updateData";
import {Exercise} from "@/interfaces/Exercise";
import {ExerciseSchedule} from "@/interfaces/ExerciseSchedule";
import {ExerciseSet} from "@/interfaces/ExerciseSet";

export default function Page() {

    const [birthday, setBirthday] = useState<string>("");
    const [weight, setWeight] = useState<number>();
    const [height, setHeight] = useState<number>();
    const [heightUnit, setHeightUnit] = useState<string>("CM");
    const [weightUnit, setWeightUnit] = useState<string>("KG");
    const [language, setLanguage] = useState<string>("GERMAN");
    const [gender, setGender] = useState<string>("MALE");
    const user = getAuth().currentUser;

    const router = useRouter();
    const updatingUserData = async ()=>{
        const [year, month, day] = birthday.split('-');
        const formattedDateString = `${day}.${month}.${year}`;


        const unsubscribe = getFirestoreDocument('userdata', getAuth().currentUser.uid, async (data) => {
            if (data) {
                data.personaldata.birthday = formattedDateString;
                data.personaldata.height = height;
                data.personaldata.weight = weight;
                data.settingsdata.heightUnit = heightUnit;
                data.settingsdata.weightUnit = weightUnit;
                data.settingsdata.language = language;
                data.personaldata.gender = gender;

                const next4Weeks = getNext4WeeksDates();

                let workoutSchedule: ExerciseSchedule = {
                    exercises: {}
                };

                let weeksSchedule:any = {};

                next4Weeks.forEach(date => {
                    const dateString = date.startDate + "-" + date.endDate;
                    const exerciseWeek: {
                        "MO": { [setNames: string]: ExerciseSet },
                        "TU": { [setNames: string]: ExerciseSet },
                        "WE": { [setNames: string]: ExerciseSet },
                        "TH": { [setNames: string]: ExerciseSet },
                        "FR": { [setNames: string]: ExerciseSet },
                        "SA": { [setNames: string]: ExerciseSet },
                        "SU": { [setNames: string]: ExerciseSet }
                    } = {
                        "MO": {},
                        "TU": {},
                        "WE": {},
                        "TH": {},
                        "FR": {},
                        "SA": {},
                        "SU": {}
                    };

                    const scheduleWeek= {
                        "MO": "",
                        "TU": "",
                        "WE": "",
                        "TH": "",
                        "FR": "",
                        "SA": "",
                        "SU": ""
                    };
                    workoutSchedule.exercises[dateString] = exerciseWeek;
                    weeksSchedule[dateString] = scheduleWeek;
                });

                data.weeks = weeksSchedule;

                await updateFirestoreDocument("userdata", data);
                await setDocument("exercises", getAuth().currentUser.uid, workoutSchedule);
                await setDocument("caloriecounter", getAuth().currentUser.uid, {});
                await sendEmailVerification(user);

                router.push("/Verification");
            }
        });

        return () => {
            unsubscribe();
        };
    }

    const handleForm = async (event)=> {
        event.preventDefault();
        await updatingUserData();
    }

    return (
        <>

            <div
                className="flex flex-col dark:bg-gradient-to-tr dark:from-green-700 dark:to-gray-100 dark:via-green-400 bg-gradient-to-tr from-gray-100 to-green-700 via-green-400 min-h-screen h-fit">
                <div className="flex-1 flex justify-center items-center">
                    <form className="bg-white shadow-lg rounded-md p-5 m-4 md:p-10 flex flex-col min-w-fit max-w-lg group">
                        <div className="border-b-2 border-black mb-[2vh]">
                            <h1>Pls enter your personal Information, so we can customize your experience</h1>
                        </div>
                        <label htmlFor="birthday" className="mb-5">
                            <span>Birthday</span>
                            <input type="date"
                                   className="w-full rounded border border-gray-300 p-3 bg-white shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                                   onChange={(e) => setBirthday(e.target.value)}/>
                        </label>
                        <label htmlFor="weight" className="mb-5">
                            <span>Weight</span>
                            <div
                                className="flex flex-row w-full bg-inherit shadow shadow-gray-100 appearance-none outline-none text-neutral-800 items-center rounded border border-gray-300 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer">
                                <input type="number" className="w-full  bg-inherit p-3  outline-none" onChange={(e) => setWeight(e.target.valueAsNumber)}/>
                                <select
                                    className="border-s-2 border-black p-2 w-[15%] bg-inherit text-md text-center outline-0 appearance-none"
                                    onChange={(e) => setWeightUnit(e.target.value)}>
                                    <option value="KG">kg</option>
                                    <option value="POUNDS">pounds</option>
                                </select>
                            </div>
                        </label>
                        <label htmlFor="height" className="mb-5">
                            <span>Height</span>
                            <div
                                className="flex flex-row w-full bg-inherit shadow shadow-gray-100 appearance-none outline-none text-neutral-800 items-center rounded border border-gray-300 invalid:border-red-500 peer">
                                <input type="number" className="w-full bg-inherit p-3 outline-none" onChange={(e) => setHeight(e.target.valueAsNumber)}/>
                                <select
                                    className="border-s-2 border-black bg-inherit p-2 w-[15%] text-md text-center outline-0 appearance-none"
                                    onChange={(e) => setHeightUnit(e.target.value)}>
                                    <option value="CM">cm</option>
                                    <option value="FEET">feet</option>
                                </select>
                            </div>
                        </label>
                        <div className={"flex flex-col sm:flex-row"}>
                            <label  htmlFor="Language" className="mb-5">
                                <span>Language</span>
                                <div
                                    className="min-w-fit sm:w-[10vw) bg-inherit shadow shadow-gray-100 appearance-none outline-none text-neutral-800 items-center rounded border border-gray-300 invalid:border-red-500 peer">
                                    <select
                                        id="language"
                                        onChange={(e) => setLanguage(e.target.value)}
                                        name="language"
                                        autoComplete="language-name"
                                        className="text-center outline-0 bg-inherit w-full border-none  p-4">
                                        <option value="GERMAN">German</option>
                                        <option value="ENGLISH">English</option>
                                        <option value="TURKISH">Turkish</option>
                                    </select>
                                </div>
                            </label>
                            <label  htmlFor="Language" className="mb-5 sm:ms-4">
                                <span>Gender</span>
                                <div
                                    className="min-w-fit sm:w-[10vw] bg-inherit shadow shadow-gray-100 appearance-none outline-none text-neutral-800 items-center rounded border border-gray-300 invalid:border-red-500">
                                    <select
                                        id="gender"
                                        onChange={(e) => setGender(e.target.value)}
                                        name="gender"
                                        autoComplete="gender"
                                        className="text-center outline-0 bg-inherit w-full border-none  p-4">
                                        <option value="MALE">Male</option>
                                        <option value="FEMALE">Female</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                </div>
                            </label>
                        </div>
                        <button type="button" className="mt-5 bg-blue-500 py-3 rounded-md text-white group-invalid:pointer-events-none group-invalid:opacity-50" onClick={handleForm}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

function getNext4WeeksDates(): { startDate: string, endDate: string }[] {
    const currentDate = new Date();
    const next4WeeksDates: { startDate: string, endDate: string }[] = [];

    for (let i = 0; i < 4; i++) {
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() + i * 7 - (currentDate.getDay() + 6) % 7); // Start from the current week and adjust for the day of the week

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // End of the week is 6 days after the start

        const formattedStartDate = startOfWeek.toLocaleDateString('de');
        const formattedEndDate = endOfWeek.toLocaleDateString('de');

        next4WeeksDates.push({ startDate: formattedStartDate, endDate: formattedEndDate });
    }

    return next4WeeksDates;
}