"use client"
import React, {useState} from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Head from "next/head";
import BorderContainer from "@/components/Authentication/borderContainer";
import signIn from "@/firebase/auth/signin";
import {useRouter} from "next/navigation";
import {getAuth} from "firebase/auth";
import addData from "@/firebase/firestore/addData";

export default function SignIn() {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const router = useRouter()
    if(getAuth().currentUser){
        router.push("/home")
    }
    const handleForm = async (event) => {
        event.preventDefault()

        const { result, error } = await signIn(email, password);

        if (error) {
            return console.log(error)
        }

        // else successful
        console.log(result)
        return router.push("/home")
    }

    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };


    return (
        <>
            <Head>
                <title>Welcome Page</title>
            </Head>
            <div
                className="flex flex-col dark:bg-gradient-to-tr dark:from-green-700 dark:to-gray-100 dark:via-green-400 bg-gradient-to-tr from-gray-100 to-green-700 via-green-400 min-h-screen h-fit">
                <header>
                    <Navbar/>
                </header>
                <div className="flex-1 flex justify-center items-center">
                    <form className="rounded-3xl p-2 bg-white min-h-fit max-h-screen w-[30rem] min-w-max" onSubmit={handleForm}>
                        <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Personal
                                    Information</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where
                                    you
                                    can receive mail.
                                </p>
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                                    <div className="sm:col-span-full">
                                        <BorderContainer title=" Email">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                required
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="example@mail.com"
                                                className="text-center outline-0 w-full"
                                            />
                                        </BorderContainer>
                                    </div>

                                    <div className="sm:col-span-full">
                                        <BorderContainer title="Enter Password">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                id="password"
                                                required
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="password"
                                                className="text-center outline-0 w-full"
                                            />
                                            <button
                                                type="submit"
                                                onClick={handleTogglePassword}
                                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-gray-600 cursor-pointer"
                                            >
                                                {showPassword ? 'Hide' : 'Show'}
                                            </button>
                                        </BorderContainer>
                                    </div>


                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button
                                type="submit"
                                className="rounded-md bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}