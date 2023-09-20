import Navbar from "@/components/Navbar";
import BorderContainer from "@/components/Authentication/borderContainer";
import Link from "next/link";
import React from "react";
import {getAuth} from "firebase/auth";
import {useRouter} from "next/navigation";

export default function Verification(){


    return(
        <div
            className="flex flex-col dark:bg-gradient-to-tr dark:from-green-700 dark:to-gray-100 dark:via-green-400 bg-gradient-to-tr from-gray-100 to-green-700 via-green-400 min-h-screen h-fit">
            <header>
                <Navbar/>
            </header>
            <div className="flex-1 flex justify-center items-center">

            </div>
        </div>
    )
}