"use client"
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import React, {useEffect, useState} from "react";
import logOut from "@/firebase/auth/logOut";
import {useRouter} from "next/navigation";
import {getAuth} from "firebase/auth";
import firebase_app from "@/firebase/config";
import Link from 'next/link'
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import SwitchAccountOutlinedIcon from '@mui/icons-material/SwitchAccountOutlined';

export default function AccountDropdown() {

    const router = useRouter();

    const [username, setUsers] = useState(String);
    const [isOpen, setIsOpen] = useState(false);


    useEffect(() => {
        const auth = getAuth(firebase_app);

        if (auth.currentUser !== null) {
            setUsers(auth.currentUser.displayName)
        }

    },[]);

    const handleLogOut = async (event) => {
        event.preventDefault()

        const {result, error} = await logOut();

        if (error) {
            return console.log(error)
        }

        // else successful
        console.log(result)
        return router.push("/")
    }

    return (
        <>
            <div className="flex justify-center items-center flex-col flex-grow mt-6">
                <div className="relative inline-block text-left min-h-fit">
                    <div>
                        <button
                            type="button"
                            className="inline-flex justify-center dark:hover:bg-gray-700 hover:bg-[#d9e7cb] w-full rounded-2xl shadow-sm p-3 hover:opacity-200 text-sm font-medium"
                            id="options-menu"
                            aria-haspopup="true"
                            aria-expanded="true"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <span className="sm:inline font-medium text-[1.5rem] w-full">
                                <AccountCircleOutlinedIcon className={"icons sm:mx-2 mx-4 inline"}></AccountCircleOutlinedIcon>{username}
                            </span>
                        </button>
                    </div>

                    <div
                        className={`origin-bottom-right absolute right-0 bottom-full dark:text-gray-300 text-gray-700 dark:bg-gray-800 mt-2 min-w-fit w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 ease-in-out transform ${isOpen ? 'opacity-100 scale-100 absolute' : 'opacity-0 scale-95 hidden'}`}
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                    >
                        <div className="py-1" role="none">
                            <Link
                                href="/settings/Account"
                                className="block px-4 py-2 text-sm  hover:bg-gray-100 hover:text-gray-900 text-center rounded"
                                role="menuitem"
                            >
                                <span><ManageAccountsOutlinedIcon className={"icons sm:mx-2 mx-4 inline"}/> Account settings</span>
                            </Link>
                            <Link
                                href="#"
                                className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 text-center rounded"
                                role="menuitem"
                            >
                                <span><SwitchAccountOutlinedIcon className={"icons sm:mx-2 mx-4 inline"}/>Change Account</span>
                            </Link>
                            <button
                                onClick={handleLogOut}
                                className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 w-full rounded"
                                role="menuitem"
                            >
                                <span><LogoutIcon/> Sign out</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}