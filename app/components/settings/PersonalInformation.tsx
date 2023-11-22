"use client"
import React, {Suspense, useEffect, useState} from "react"
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import getFirestoreDocument from "@/firebase/firestore/getData";
import {getAuth} from "firebase/auth";

export default function PersonalInformation() {

    const [email, setEmail] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [weight, setWeight] = useState<number>(0);
    const [birthday, setBirthday] = React.useState<string>('');
    const [lastName, setLastName] = React.useState('');
    const [heightUnit, setHeightUnit] = useState<string>("");
    const [weightUnit, setWeightUnit] = useState<string>("");
    const [height, setHeight] = useState<number>(0);


    useEffect(() => {
        getFirestoreDocument("userdata", getAuth().currentUser.uid).then((res) => {
            if (res.result) {
                setFirstName(res.result.personaldata.firstName);
                setLastName(res.result.personaldata.lastName);
                setEmail(getAuth().currentUser.email);
                setBirthday(res.result.personaldata.birthday);
                setHeight(res.result.personaldata.height);
                setWeight(res.result.personaldata.weight);
                setWeightUnit(res.result.settingsdata.weightUnit);
                setHeightUnit(res.result.settingsdata.heightUnit);
            }
        });
    }, []);


    return (
        <div className="w-full flex-grow flex-shrink pt-1 flex-col flex px-3">
            <div className="flex w-full items-center border-b-2 border-gray-300 pb-[1.5rem]">
                <Link
                    className="hover:bg-gray-200 rounded-full w-fit p-2"
                    href="/settings/Account">
                    <ArrowBackIcon/>
                </Link>
                <span className="font-bold text-xl ms-4">Personal Information</span>
            </div>
            <form className={"flex flex-col"} noValidate>
                <div className="flex w-full flex-col border-b-2 border-gray-300 mt-[1.5rem] pb-[1.5rem]">
                    <h1 className="font-bold text-2xl">Information</h1>
                    <div className="flex flex-row mb-5">
                        <div className="me-3">
                            <span>First Name</span>
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                className="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                                placeholder={firstName}
                                required
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div>
                            <span>Last Name</span>
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                className="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 text-neutral-800 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                                placeholder={lastName}
                                required
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </div>

                    <label htmlFor="email" className="mb-5">
                        <span>Email</span>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                            placeholder={email}
                            required
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <span
                            className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                        Please enter a valid email address
                    </span>
                    </label>

                    <label htmlFor="birthday" className="mb-5">
                        <span>Birthday</span>
                        <input type="text"
                               placeholder={dateFormat(birthday)}
                               className="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                               onChange={(e) => setBirthday(e.target.value)}
                               onBlur={(e) => {
                                   e.target.type = "text"
                               }}
                               onMouseOverCapture={(e) => {
                                   e.type = "date"
                               }}
                               onFocus={(e) => {
                                   e.target.type = "date"
                               }}
                        />
                    </label>
                </div>

                <div className="flex w-full flex-col border-b-2 border-gray-300 mt-[1.5rem] pb-[1.5rem]">
                    <h1 className="font-bold text-2xl">Body specific Stats</h1>
                    <div className="flex flex-row mb-5">
                        <label htmlFor="height" className="me-5">
                            <span>Height</span>
                            <input type="number"
                                   placeholder={height.toString()}
                                   className="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                                   onChange={(e) => setHeight(e.target.valueAsNumber)}>
                            </input>
                        </label>

                        <label htmlFor="weight">
                            <span>Weight</span>
                                <input type="number"
                                       placeholder={weight.toString()}
                                       className="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                                       onChange={(e) => setWeight(e.target.valueAsNumber)}>
                                </input>
                        </label>
                    </div>
                </div>

                <button type="submit"
                        className="mt-5 bg-blue-500 py-3 rounded-md text-white group-invalid:pointer-events-none group-invalid:opacity-50">
                    Submit
                </button>
            </form>
        </div>
    )
}

const dateFormat = (date: string) => {
    const [year, month, day] = date.split('.');
    return `${day}-${month}-${year}`;
}