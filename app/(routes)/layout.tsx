import {CheckEmailVerification} from "@/context/AuthContext";
import styles from "./workout/workout.module.css";
import Head from "next/head";
import SideNav from "@/components/MainComponents/SideNav";
import MainComponent from "@/components/MainComponents/mainComponent";
import React, {Suspense} from "react";
import SetComponentCollection from "@/components/Workout/SetComponentCollection";
import ConfPanel from "@/components/MainComponents/confPanel";
import ExerciseComponentCollection from "@/components/Workout/ExerciseComponentCollection";
import {ContextDataProvider} from "@/context/ContextData";
export default async function DashboardLayout({children,}: {
    children: React.ReactNode
}) {

    return (
        <CheckEmailVerification>
            <ContextDataProvider>
                <div id={"rootElement"} className={"flex flex-col min-h-fit h-screen bg-[#F8FAF7] dark:bodyScreen"}>
                    <Head>
                        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="icon"/>
                    </Head>
                    <div className="w-full flex flex-col sm:flex-row sm:flex-nowrap py-4 flex-grow overflow-hidden">
                        <SideNav/>
                        <>
                            {children}
                        </>
                    </div>
                </div>
            </ContextDataProvider>
        </CheckEmailVerification>
    )
}