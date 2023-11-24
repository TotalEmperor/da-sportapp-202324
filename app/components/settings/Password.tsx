"use client"
import React, {useEffect} from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from "next/link";
import BorderContainer from "@/components/Authentication/borderContainer";
import {
    getAuth,
    reauthenticateWithCredential,
    updatePassword,
    AuthCredential,
    EmailAuthCredential,
    EmailAuthProvider
} from "firebase/auth";

export default function Password(){

    const [oldPassword, setOldPassword] = React.useState<string>();
    const [confirmNewPassword, setConfirmNewPassword] = React.useState<string>();
    const [newPassword, setNewPassword] = React.useState<string>();

    const handleForm =async ()=>{
        const auth = getAuth();
        const credential = EmailAuthProvider.credential(getAuth().currentUser.email, oldPassword);
        const user = auth.currentUser;
        reauthenticateWithCredential(auth.currentUser,credential).then(()=>{
            updatePassword(user, newPassword).then(() => {
                console.log("Success");
                // Update successful.
            }).catch((error) => {
                console.log("No Success")
                // An error ocurred
                // ...
            });
        }).catch(()=>{
            console.log("Reauthentication Failed")
        });
    }


    useEffect(() => {
        if(newPassword && confirmNewPassword){
            if(newPassword!=confirmNewPassword){
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
    }, [newPassword, confirmNewPassword]);

    return(
        <div className="w-full flex-grow flex-shrink pt-1 flex-col flex px-3">
            <div className="flex w-full items-center border-b-2 border-gray-300 pb-[1.5rem]">
                <Link
                    className="hover:bg-gray-200 rounded-full w-fit p-2"
                    href="/settings/Account">
                    <ArrowBackIcon/>
                </Link>
                <span className="font-bold text-xl ms-4">Change your password</span>
            </div>
            <form
                className="p-5 md:p-10 flex flex-col w-11/12 max-w-lg group" noValidate onSubmit={handleForm}>
                <label htmlFor="password" className="mb-5" >
                    <span>Enter old Password</span>
                    <input
                        type="password"
                        name="password"
                        id="oldPassword"
                        className="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                        placeholder="Password"
                        required
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </label>

                <label htmlFor="password" className="mt-5" >
                    <span>Enter new Password</span>
                    <input
                        type="password"
                        name="password"
                        id="firstPassword"
                        className="w-full mb-3 rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                        placeholder="Password"
                        required
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <span>Enter new Password Again</span>
                    <input
                        type="password"
                        name="password"
                        id="secondPassword"
                        className="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                        placeholder="Password"
                        required
                        onChange={e => setConfirmNewPassword(e.target.value)}
                    />
                    <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                Password don&apos;t match
                            </span>
                </label>
                <button type="submit" className="mt-5 bg-blue-500 py-3 rounded-md text-white group-invalid:pointer-events-none group-invalid:opacity-50" onSubmit={handleForm}>
                    Submit
                </button>
            </form>
        </div>
    )

}