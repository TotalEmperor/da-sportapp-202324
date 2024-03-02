"use client"
import React, {useState} from "react";
import Navbar from "@/components/MainComponents/Navbar";
import Link from "next/link";
import Head from "next/head";
import BorderContainer from "@/components/Authentication/borderContainer";
import signIn from "@/firebase/auth/signin";
import {useRouter} from "next/navigation";
import {getAuth} from "firebase/auth";
import setDocument from "@/firebase/firestore/setDocument";

export default function SignIn() {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const router = useRouter()
    if(getAuth().currentUser){
        router.push("/workout")
    }
    const handleForm = async (event) => {
        event.preventDefault()

        const { result, error } = await signIn(email, password);

        if (error) {
            return console.log(error)
        }

        // else successful
        return router.push("/workout")
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
                    <form
                        className="bg-white shadow-lg rounded-md p-5 md:p-10 flex flex-col w-11/12 max-w-lg group" noValidate onSubmit={handleForm}>
                        <label htmlFor="email" className="mb-5">
                            <span>Email</span>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                                placeholder="yourFit@email.com"
                                required
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
            Please enter a valid email address
          </span>
                        </label>
                        <label htmlFor="password" className="mb-5">
                            <span>Password</span>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                                placeholder="Password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
            Your password must be at least 7 characters long
          </span>
                        </label>
                        <button type="submit" className="mt-5 bg-blue-500 py-3 rounded-md text-white group-invalid:pointer-events-none group-invalid:opacity-50" onClick={handleForm}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}