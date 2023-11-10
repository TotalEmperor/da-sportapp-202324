"use client"
import React, {useState} from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import BorderContainer from "@/components/Authentication/borderContainer";
import createUser from "@/firebase/auth/createUser";
import {useRouter} from "next/navigation";
import {getAuth} from "firebase/auth";
import emptySchedule from "@/scheduleTemplates/emptySchedule.json"
import * as fs from 'fs';
import addData from "@/firebase/firestore/addData";

export default function SignUp() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')


    const [showPassword, setShowPassword] = useState(false);
    const router  = useRouter();

    if(getAuth().currentUser){
        router.push("/workout")
    }


    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    async function handleSignUp() {
        await createUser(email, password, firstName+" "+lastName)
        await editSchedule();
        router.push("/Verification")
    }

    async function editSchedule(){
        await addData("exercises", getAuth().currentUser.uid, emptySchedule)
    }

    return (
        <>
            <div
                className="flex flex-col dark:bg-gradient-to-tr dark:from-green-700 dark:to-gray-100 dark:via-green-400 bg-gradient-to-tr from-gray-100 to-green-700 via-green-400 min-h-screen h-fit">
                <header>
                    <Navbar/>
                </header>
                <div className="flex-1 flex justify-center items-center">

                    <div className="rounded-3xl p-2 bg-white min-h-fit max-h-screen w-1/4 min-w-fit">
                        <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Personal
                                    Information</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where
                                    you
                                    can receive mail.
                                </p>
                                <div className="mt-10 grid grid-cols-6 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="col-span-3">
                                        <BorderContainer title="First Name">
                                            <input
                                                type="text"
                                                name="first-name"
                                                id="first-name"
                                                onChange={(e) => setFirstName(e.target.value)}
                                                autoComplete="given-name"
                                                className="text-center outline-0 w-full"
                                            />
                                        </BorderContainer>
                                    </div>

                                    <div className="col-span-3">
                                        <BorderContainer title="Last Name">
                                            <input
                                                type="text"
                                                name="last-name"
                                                id="last-name"
                                                onChange={(e) => setLastName(e.target.value)}
                                                autoComplete="family-name"
                                                className="text-center outline-0 w-full"
                                            />
                                        </BorderContainer>
                                    </div>

                                    <div className="col-span-4">
                                        <BorderContainer title=" Email">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                onChange={(e) => setEmail(e.target.value)}
                                                autoComplete="email"
                                                className="text-center outline-0 w-full"
                                            />
                                        </BorderContainer>
                                    </div>

                                    <fieldset className="col-span-5">
                                        <div className="col-span-5 mb-5">
                                            <BorderContainer title="Enter Password">
                                                <input
                                                    type={showPassword ? 'text' : 'password'}
                                                    name="password"
                                                    id="password"
                                                    autoComplete="password"
                                                    className="text-center outline-0 w-full"
                                                    pattern={"^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$"}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={handleTogglePassword}
                                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-gray-600 cursor-pointer"
                                                >
                                                    {showPassword ? 'Hide' : 'Show'}
                                                </button>
                                            </BorderContainer>
                                        </div>

                                        <div className="col-span-5">
                                            <BorderContainer title="Enter Password agian">
                                                <input
                                                    type={showPassword ? 'text' : 'password'}
                                                    name="password"
                                                    id="passwordRepeat"
                                                    autoComplete="password"
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="text-center outline-0 w-full"
                                                    pattern={"^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$"}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={handleTogglePassword}
                                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-gray-600 cursor-pointer"
                                                >
                                                    {showPassword ? 'Hide' : 'Show'}
                                                </button>
                                            </BorderContainer>
                                        </div>
                                    </fieldset>

                                    <div className="col-span-3">
                                        <BorderContainer title="Country">
                                            <select
                                                id="language"
                                                name="language"
                                                autoComplete="language-name"
                                                className="text-center outline-0 w-full border-none appearance-none">
                                                <option>Austria</option>
                                                <option>UK</option>
                                                <option>Turkey</option>
                                            </select>
                                        </BorderContainer>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <Link type="button" className="text-sm font-semibold leading-6 text-gray-900"
                                  href="/landing">
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                className="rounded-md bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={handleSignUp}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}