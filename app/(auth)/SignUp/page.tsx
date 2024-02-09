"use client"
import React, {useEffect, useState} from "react";
import Navbar from "@/components/Navbar";
import createUser from "@/firebase/auth/createUser";
import {useRouter} from "next/navigation";
import setDocument from "@/firebase/firestore/setDocument";
import {getAuth} from "firebase/auth";
import {UserData} from "../../../public/interfaces/userdata";

export default function SignUp() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState<string>("");
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState<string>("");



    const [showPassword, setShowPassword] = useState(false);
    const router  = useRouter();

    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    async function editSchedule(){
        const userData = await reformateTemplate(firstName, lastName);
        await setDocument("userdata", getAuth().currentUser.uid, userData);

        router.push("/configureAccount")
    }

    const handleForm = async (event) => {
        event.preventDefault()

        createUser(email, password, firstName+" "+lastName).then(()=>{
            editSchedule();
        }
        ).catch((error)=>{
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorMessage +"\n"+errorCode)
        })
    }

    useEffect(() => {
        if(password && confirmPassword){
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
        }
    }, [password, confirmPassword]);


    return (
        <>
            <div
                className="flex flex-col bg-gradient-to-tr dark:from-neutral-800 dark:via-blue-600 dark:to-green-900 dark:from-80% dark:via-40% dark:to-10% from-gray-100 to-green-700 via-green-400 min-h-screen h-fit">
                <header>
                    <Navbar/>
                </header>
                <div className="flex-1 flex justify-center items-center">
                    <form
                        className="bg-white shadow-lg rounded-md p-5 md:p-10 flex flex-col w-11/12 max-w-lg group" noValidate>
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
    let userData:UserData = {} as UserData;
    userData.personaldata.firstName = firstName;
    userData.personaldata.lastName = lastName;
    return userData;
}