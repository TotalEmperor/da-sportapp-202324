"use client"
import React, {useEffect, useState} from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import BorderContainer from "@/components/Authentication/borderContainer";
import createUser from "@/firebase/auth/createUser";
import {useRouter} from "next/navigation";
import {getAuth} from "firebase/auth";
import emptySchedule from "@/scheduleTemplates/emptySchedule.json"
import * as fs from 'fs';
import addData from "@/firebase/firestore/addData";
import Head from "next/head";
import userdata from "@/templates/userdata.json";
import signIn from "@/firebase/auth/signin";

export default function SignUp() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [confirmPassword, setConfirmPassword] = useState('');



    const [showPassword, setShowPassword] = useState(false);
    const router  = useRouter();

    if(getAuth().currentUser && getAuth().currentUser.emailVerified){
        router.push("/Verification")
    }


    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    async function editSchedule(){
        const userData = await reformateTemplate(firstName, lastName);
        await addData("userdata", getAuth().currentUser.uid, userData);
    }

    const handleForm = async (event) => {
        event.preventDefault()

        createUser(email, password, firstName+" "+lastName).then((userCredential)=>{
            editSchedule();
            router.push("/configureAccount")        }
        ).catch((error)=>{
            const errorCode = error.code;
            const errorMessage = error.message;
        })
    }

    useEffect(() => {
        if(password!=confirmPassword){
            const passwordInput =  document.getElementsByName("password");
            passwordInput.forEach((e:HTMLInputElement)=>{
                e.setCustomValidity("Invalid")
            })
        }else {
            const passwordInput =  document.getElementsByName("password");
            passwordInput.forEach((e:HTMLInputElement)=>{
                e.setCustomValidity("")
            })
        }
    }, [password, confirmPassword]);


    return (
        <>
            <div
                className="flex flex-col dark:bg-gradient-to-tr dark:from-green-700 dark:to-gray-100 dark:via-green-400 bg-gradient-to-tr from-gray-100 to-green-700 via-green-400 min-h-screen h-fit">
                <header>
                    <Navbar/>
                </header>
                <div className="flex-1 flex justify-center items-center">
                    <form
                        className="bg-white shadow-lg rounded-md p-5 md:p-10 flex flex-col w-11/12 max-w-lg group" noValidate onSubmit={handleForm}>
                        <div className="flex flex-row">
                            <div className="me-3">
                                <span>First Name</span>
                                <input
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    className="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                                    placeholder="Markus"
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
                                   className="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                                   placeholder="Mustermann"
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
                                placeholder="yourFit@email.com"
                                required
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
            Please enter a valid email address
          </span>
                        </label>
                        <label htmlFor="password" className="mb-5" >
                            <span>Enter Password</span>
                            <input
                                type="password"
                                name="password"
                                id="firstPassword"
                                className="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                                placeholder="Password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <input
                                type="password"
                                name="password"
                                id="secondPassword"
                                className="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                                placeholder="Password"
                                required
                                onChange={e => setConfirmPassword(e.target.value)}
                            />
                            <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                Password don&apos;t match
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

const reformateTemplate = (firstName:string, lastName:string):any=>{
    const userData = userdata;
    userData.personaldata.firstName = firstName;
    userData.personaldata.lastName = lastName;
    return userData;
}