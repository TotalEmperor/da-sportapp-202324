import styles from "./workout.module.css"
import SetManager from "@/components/Workout/SetManager"
import SideNav from "@/components/SideNav";
import MainComponent from "@/components/MainScreen/mainComponent";
import ConfPanel from "@/components/confPanel";
import Image from "next/image";
import Head from "next/head";
import React from "react";
import {UseAuthContext} from "@/context/AuthContext";
import DateConfig from "@/components/dateConfig";
import getFirestoreDocument from "@/firebase/firestore/getData";
import SetComponentCollection from "@/components/Workout/SetComponentCollection";
import ExerciseComponentCollection from "@/components/Workout/ExerciseComponentCollection";

export default async function page() {

    return (
        <div className={ styles["contentWidth"] +" flex flex-col min-h-fit h-screen bg-[#F8FAF7]"}>
            <Head>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="icon"/>
            </Head>
            <div className="w-full flex flex-col sm:flex-row flex-wrap sm:flex-nowrap py-4 flex-grow h-[100vh]">
                <SideNav/>
                <MainComponent>
                    <SetComponentCollection/>
                </MainComponent>
                <ConfPanel>
                    <>
                        <DateConfig/>
                    </>
                </ConfPanel>
            </div>
        </div>
    );
}