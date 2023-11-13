import {CheckEmailVerification} from "@/context/AuthContext";
import styles from "./workout/workout.module.css";
import Head from "next/head";
import SideNav from "@/components/SideNav";
import MainComponent from "@/components/MainScreen/mainComponent";
import React, {Suspense} from "react";
import SetComponentCollection from "@/components/Workout/SetComponentCollection";
import ConfPanel from "@/components/confPanel";
import ExerciseComponentCollection from "@/components/Workout/ExerciseComponentCollection";
export default function DashboardLayout({children,}: {
    children: React.ReactNode
}) {

    return (
        <CheckEmailVerification>
            <div className={styles["contentWidth"] + " flex flex-col min-h-fit h-screen bg-[#F8FAF7]"}>
            <Head>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="icon"/>
            </Head>
            <div className="w-full flex flex-col sm:flex-row flex-wrap sm:flex-nowrap py-4 flex-grow h-[100vh]">
                <SideNav/>
                <>
                    {children}
                </>
            </div>
        </div>
        </CheckEmailVerification>
    )
}