"use client"
import React, {Suspense, useEffect, useState} from "react"
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import getFirestoreDocument from "@/firebase/firestore/getData";
import {getAuth, updateEmail} from "firebase/auth";
import createUser from "@/firebase/auth/createUser";
import updateFirestoreDocument from "@/firebase/firestore/updateData";
import {useRouter} from "next/navigation";

export default function PersonalInformation() {

    const [email, setEmail] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [weight, setWeight] = useState<number>(0);
    const [birthday, setBirthday] = React.useState<string>('');
    const [lastName, setLastName] = React.useState('');
    const [heightUnit, setHeightUnit] = useState<string>("");
    const [weightUnit, setWeightUnit] = useState<string>("");
    const [height, setHeight] = useState<number>(0);
    const [userData, setUserdata] = useState<UserData>();
    const [isFormValid, setIsFormValid] = useState(false);


    const router = useRouter();
    const user = getAuth().currentUser;



    useEffect(() => {
        getFirestoreDocument("userdata", getAuth().currentUser.uid).then((res) => {
            if (res.result) {
                setUserdata(res.result);
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
    }, [user]);

    useEffect(() => {
        if (firstName !== "" || lastName !== "" || email !== "" || birthday !== "" || height !== 0 || weight !== 0 || heightUnit !== "" || weightUnit !== "") {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }, [firstName, lastName, email, birthday, height, weight, heightUnit, weightUnit]);

    const handleForm = async (event)=>{
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
            <form className={"flex flex-col group"} noValidate onSubmit={handleForm}>
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
                                    pattern="^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$"
                                    className="rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                                    placeholder={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
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
                                    pattern="^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$"
                                    className="rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                                    placeholder={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
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
                            className="rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                            placeholder={email}
                            pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <span
                            className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                        Please enter a valid email address
                    </span>
                    </label>

                    <label htmlFor="birthday" className="mb-5 sm:w-fit flex flex-col">
                        <span>Birthday</span>
                        <input type="text"
                               placeholder={dateFormat(birthday)}
                               className="rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
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
                                   min={heightUnit=="CM" ? 121:3.96982}
                                   max={heightUnit=="CM" ? 219:7.18504}
                                   placeholder={height.toString()}
                                   className="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                                   onChange={(e) => setHeight(e.target.valueAsNumber)}>
                            </input>
                        </label>

                        <label htmlFor="weight">
                            <span>Weight</span>
                                <input type="number"
                                       min={weightUnit=="KG" ? 30 : 66.1387}
                                       max={weightUnit=="KG" ? 250 : 551.156}
                                       placeholder={weight.toString()}
                                       className="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                                       onChange={(e) => setWeight(e.target.valueAsNumber)}>
                                </input>
                        </label>
                    </div>
                </div>

                <button type="submit" onClick={handleForm}
                        className="mt-5 bg-blue-500 py-3 w-fit hover:bg-blue-300 px-2 rounded-md text-white group-invalid:pointer-events-none group-invalid::opacity-50"
                        disabled={!isFormValid}>
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