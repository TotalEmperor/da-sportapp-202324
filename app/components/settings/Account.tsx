import React from "react";
import styles from "./settings.module.css"
import Link from "next/link"
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function Account(){

    return(
        <div className="w-full flex-grow flex-shrink pt-1 flex-col flex">
            <div className="flex w-full flex-col border-b-2 border-gray-300 pb-[1.5rem]">
                <h1 className="font-bold text-xl">Account</h1>
                <p>
                    All Settings Regarding your personal Account, including Username, Password, Authentication
                </p>
            </div>
            <div className="flex w-full flex-col border-b-2 border-gray-300 mt-[1.5rem] pb-[1.5rem]">
                <h1 className="font-bold text-2xl">Personal Information</h1>
                    <Link
                        href="/settings/yourSportFit/account"
                        className="w-[100vw] text-xl h-[4em] flex items-center hover:bg-gray-200">
                        <span>
                            <PermIdentityOutlinedIcon/>
                            Personal Information
                            <ArrowForwardIosIcon className="" />
                        </span>
                    </Link>
                    <Link
                        href="/settings/password"
                        className="w-[100vw] text-xl h-[4em] flex items-center hover:bg-gray-200">
                            <span>
                                <PermIdentityOutlinedIcon/>
                                Password
                                <ArrowForwardIosIcon className="" />
                            </span>
                    </Link>
                    <Link
                        href="/settings/delete"
                        className="w-[100vw] text-xl h-[4em] flex items-center hover:bg-gray-200">
                                <span>
                                    <PermIdentityOutlinedIcon/>
                                    Delete Account
                                    <ArrowForwardIosIcon className="" />
                                </span>
                    </Link>
            </div>
        </div>
    )

}