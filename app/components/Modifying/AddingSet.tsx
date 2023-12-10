"use client"
import React, {Suspense, useEffect, useState} from "react"
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import getFirestoreDocument from "@/firebase/firestore/getData";
import {getAuth, updateEmail} from "firebase/auth";
import createUser from "@/firebase/auth/createUser";
import updateFirestoreDocument from "@/firebase/firestore/updateData";
import {useRouter} from "next/navigation";
import UserData from "@/firebase/firestore/firestoreClasses/Userdata"

export default function AddingSet() {

    const router = useRouter();
    const user = getAuth().currentUser;


    return (
        <div className="w-full flex-grow flex-shrink pt-1 flex-col flex px-3 dark:text-white text-neutral-800">
            <div className="flex w-full items-center border-b-2 border-gray-300 pb-[1.5rem]">
                <Link
                    className="hover:bg-gray-200 rounded-full w-fit p-2"
                    href="/settings/Account">
                    <ArrowBackIcon/>
                </Link>
                <span className="font-bold text-xl ms-4">Personal Information</span>
            </div>
            <form className={"flex flex-col group px-10"} noValidate>

            </form>
        </div>
    )
}

const dateFormat = (date: string) => {
    const [year, month, day] = date.split('.');
    return `${day}-${month}-${year}`;
}