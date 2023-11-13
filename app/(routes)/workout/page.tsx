import styles from "./workout.module.css"
import SetManager from "@/components/Workout/SetManager"
import SideNav from "@/components/SideNav";
import MainComponent from "@/components/MainScreen/mainComponent";
import ConfPanel from "@/components/confPanel";
import Image from "next/image";
import Head from "next/head";
import React, {Suspense} from "react";
import {UseAuthContext} from "@/context/AuthContext";
import DateConfig from "@/components/dateConfig";
import getFirestoreDocument from "@/firebase/firestore/getData";
import SetComponentCollection from "@/components/Workout/SetComponentCollection";
import ExerciseComponentCollection from "@/components/Workout/ExerciseComponentCollection";

export default async function page() {

    return (
        <>
                <>
                    <DateConfig/>
                </>
        </>
    );
}