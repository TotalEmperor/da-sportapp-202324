import React from "react";
import styles from "./settings.module.css"
import Link from "next/link"
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PasswordIcon from '@mui/icons-material/Password';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

export default function Account() {

    return (
        <div className="w-full flex-grow flex-shrink pt-1 flex-col flex px-3">
            <div className="flex w-full flex-col border-b-2 border-gray-300 pb-[1.5rem]">
                <h1 className="font-bold text-xl">Account</h1>
                <p>
                    All Settings Regarding your personal Account, including Username, Password, Authentication
                </p>
            </div>
            <div className="flex w-full flex-col border-b-2 border-gray-300 mt-[1.5rem] pb-[1.5rem]">
                <h1 className="font-bold text-2xl">Personal Information</h1>
                <div className="flex flex-row justify-center items-center hover:bg-gray-200 rounded-xl overflow-hidden p-2">
                    <Link
                        href="/settings/yourSportFit/account"
                        className="w-[100vw] text-xl h-[4em] flex items-center hover:bg-gray-200">
                        <PermIdentityOutlinedIcon/>
                        <span className="flex flex-row ms-3">
                            Personal Information
                        </span>
                    </Link>
                    <ArrowForwardIosIcon/>
                </div>
                <div className="flex flex-row justify-center items-center hover:bg-gray-200 rounded-xl overflow-hidden p-2">
                    <Link
                        href="/settings/password"
                        className="w-[100vw] text-xl flex flex-row h-[4em] items-center">
                        <PasswordIcon/>
                        <span className="flex flex-row ms-3">
                                Password
                        </span>
                    </Link>
                    <ArrowForwardIosIcon/>
                </div>
                <div className="flex flex-row justify-center items-center hover:bg-gray-200 rounded-xl overflow-hidden p-2">
                    <Link
                        href="/settings/delete"
                        className="w-[100vw] text-xl h-[4em] flex items-center hover:bg-gray-200">
                        <PersonRemoveIcon/>
                        <span className="flex flex-row ms-3">
                            Delete Account
                        </span>
                    </Link>
                    <ArrowForwardIosIcon/>

                </div>
            </div>
        </div>
    )

}