import {CheckEmailVerification, RedirectSignedUpUser} from "@/context/AuthContext";
import styles from "./workout/workout.module.css";
import Head from "next/head";
import SideNav from "@/components/MainComponents/SideNav";
import MainComponent from "@/components/MainComponents/mainComponent";
import React, {Suspense} from "react";
import SetComponentCollection from "@/components/Workout/SetComponentCollection";
import ConfPanel from "@/components/MainComponents/confPanel";
import ExerciseComponentCollection from "@/components/Workout/ExerciseComponentCollection";
import {ContextDataProvider} from "@/context/ContextData";
export default function DashboardLayout({children,}: {
    children: React.ReactNode
}) {

    return (
        <RedirectSignedUpUser>
            {children}
        </RedirectSignedUpUser>
    )
}