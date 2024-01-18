"use client"
import React, {Suspense, useEffect, useState} from "react"
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import getFirestoreDocument from "@/firebase/firestore/getData";
import {getAuth, updateEmail} from "firebase/auth";
import createUser from "@/firebase/auth/createUser";
import updateFirestoreDocument from "@/firebase/firestore/updateData";
import {useRouter} from "next/navigation";
import UserData from "@/firebase/firestore/firestoreClasses/Userdata"

export default function PersonalInformation() {

    const [email, setEmail] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [weight, setWeight] = useState<number>(null);
    const [birthday, setBirthday] = React.useState<string>('');
    const [lastName, setLastName] = React.useState('');
    const [heightUnit, setHeightUnit] = useState<string>("");
    const [weightUnit, setWeightUnit] = useState<string>("");
    const [height, setHeight] = useState<number>(null);
    const [userData, setUserdata] = useState<UserData>(new UserData());
    const [isFormValid, setIsFormValid] = useState(false);
    const router = useRouter();
    const user = getAuth().currentUser;

    useEffect(() => {
        const unsubscribe = getFirestoreDocument('userdata', getAuth().currentUser.uid, (data) => {
            if (data) {
                console.log(data)
                setUserdata(data);
                setFirstName(data.personaldata.firstName);
                setLastName(data.personaldata.lastName);
                setWeight(data.personaldata.weight);
                setHeight(data.personaldata.height);
                setWeightUnit(data.settingsdata.weightUnit);
                setHeightUnit(data.settingsdata.heightUnit);
                setEmail(getAuth().currentUser.email);
            }
        });

        return () => {
            unsubscribe();
        };

    }, [user]);

    const handleForm = async (event) => {
        event.preventDefault();
        userData.personaldata.firstName = firstName;
        userData.personaldata.lastName = lastName;
        userData.personaldata.height = height;
        userData.personaldata.weight = weight;
        userData.personaldata.birthday = birthday;
        await updateFirestoreDocument("userdata", userData);

        await updateEmail(getAuth().currentUser, email);

        router.refresh();

    }

    const changeHeightUnit = (newHeightUnit: string) =>{
        if(newHeightUnit=="CM" && newHeightUnit!=heightUnit){
            setHeight(height / 0.0328);
        }else if(newHeightUnit!=heightUnit){
            setHeight(height * 0.0328);
        }

        setHeightUnit(newHeightUnit);
    }

    const changeWeightUnit = (newWeightUnit:string)=>{
        if (newWeightUnit == "KG" && newWeightUnit!=weightUnit) {
            setWeight(weight / 2.2);
        } else if(newWeightUnit!=weightUnit){
            setWeight(weight * 2.2);
        }

        setWeightUnit(newWeightUnit);
    }


    return (
        <div className="w-full flex-grow flex-shrink pt-1 flex-col flex px-3 dark:text-white text-neutral-800">
            <div className="flex w-full items-center border-b-2 border-gray-300 pb-[1.5rem]">
                <Link
                    className="hover:bg-gray-200 rounded-full w-fit p-2"
                    href="/settings/Account">
                    <ArrowBackIcon/>
                </Link>
                <span className="font-bold text-xl ms-4">Personal Information</span>
            </div>
            <form className={"flex flex-col group px-10"}>
                <div className="flex w-full flex-col border-b-2 border-gray-300 mt-[1.5rem] pb-[1.5rem]">
                    <h1 className="font-bold text-2xl">Information</h1>
                    <div className="flex flex-row mb-5">
                        <div className="me-3 flex flex-row w-full">
                            <label className="flex flex-col me-3 sm:w-[30%]">
                                <span>First Name</span>
                                <input
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    className="rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                                <span
                                    className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                        Please enter valid firstname
                    </span>
                            </label>
                            <label className="flex flex-col sm:w-[30%]">
                                <span>Last Name</span>
                                <input
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    className="rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                                <span
                                    className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                        Please enter a valid lastname
                    </span>
                            </label>
                        </div>
                    </div>

                    <label htmlFor="email" className="mb-5 sm:w-[50%] flex flex-col">
                        <span>Email</span>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <span
                            className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                            Please enter a valid email address
                        </span>
                    </label>

                    <label htmlFor="birthday" className="mb-5 sm:w-fit flex flex-col">
                        <span>Birthday</span>
                        <input type="text"
                               value={dateFormat(birthday)}
                               className="rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
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
                               required
                        />
                    </label>
                </div>

                <div className="flex w-full flex-col border-b-2 border-gray-300 mt-[1.5rem] pb-[1.5rem]">
                    <h1 className="font-bold text-2xl">Body specific Stats</h1>
                    <div className="flex sm:flex-row mb-5 flex-col">
                        <label htmlFor="height" className="me-5">
                            <span>Height</span>
                            <div
                                className="flex flex-row w-full dark:bg-neutral-800 shadow mt-2 shadow-gray-100 appearance-none outline-none items-center rounded border border-gray-300 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer">

                                <input type="number"
                                       id={"heightInput"}
                                       min={heightUnit == "CM" ? 121 : 3.96982}
                                       max={heightUnit == "CM" ? 219 : 7.18504}
                                       value={height}
                                       className="bg-inherit p-3 outline-none w-[5vw]"
                                       required
                                       onChange={(e) => setHeight(e.target.valueAsNumber)}>
                                </input>
                                <select
                                    className="border-s-2 border-black dark:border-neutral-400 p-2 bg-inherit min-w-fit w-[15%] text-md text-center outline-0 appearance-none"
                                    onChange={(e) => changeHeightUnit(e.target.value)} value={heightUnit}>
                                    <option value="CM">cm</option>
                                    <option value="FEET">feet</option>
                                </select>
                            </div>
                        </label>

                        <label htmlFor="weight">
                            <span>Weight</span>
                            <div
                                className="flex flex-row w-full dark:bg-neutral-800 shadow mt-2 shadow-gray-100 appearance-none outline-none items-center rounded border border-gray-300 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer">
                                <input type="number"
                                       id={"weightInput"}
                                       min={weightUnit == "KG" ? 30 : 66.1387}
                                       max={weightUnit == "KG" ? 250 : 551.156}
                                       value={weight}
                                       className="bg-inherit p-3 outline-none w-[5vw]"
                                       onChange={(e) => setWeight(e.target.valueAsNumber)}
                                       required>
                                </input>
                                <select
                                    className="border-s-2 border-black dark:border-neutral-400 p-2 bg-inherit min-w-fit w-[15%] text-md text-center outline-0 appearance-none"
                                    onChange={(e) => changeWeightUnit(e.target.value)} value={weightUnit}>
                                    <option value="KG">kg</option>
                                    <option value="POUND">pounds</option>
                                </select>
                            </div>
                        </label>

                    </div>
                </div>

                <button type="submit"
                        onClick={handleForm}
                        className="mt-5 bg-blue-500 py-3 w-fit hover:bg-blue-300 px-2 rounded-md text-white group-invalid::opacity-50">
                    Save Changes
                </button>
            </form>
        </div>
    )
}

const dateFormat = (date: string) => {
    const [year, month, day] = date.split('.');
    return `${day}-${month}-${year}`;
}