import React, {Suspense} from 'react';
import getFirestoreDocument from "@/firebase/firestore/getData";
import ExerciseComponentCollection from "@/components/Workout/ExerciseComponentCollection";
import styles from "../workout.module.css";
import Head from "next/head";
import SideNav from "@/components/SideNav";
import MainComponent from "@/components/MainScreen/mainComponent";
import SetComponentCollection from "@/components/Workout/SetComponentCollection";
import ConfPanel from "@/components/confPanel";
import DateConfig from "@/components/dateConfig";

export default function Page({params : {setName}}) {
    return (
        <div className={styles["contentWidth"] + " flex flex-col min-h-fit h-screen bg-[#F8FAF7]"}>
            <Head>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="icon"/>
            </Head>
            <div className="w-full flex flex-col sm:flex-row flex-wrap sm:flex-nowrap py-4 flex-grow h-[100vh]">
                <SideNav/>
                <MainComponent>
                    <Suspense fallback={<p>Loading user...</p>}>
                        <ExerciseComponentCollection setName={setName} />
                    </Suspense>
                </MainComponent>
                <ConfPanel>
                    <>
                    </>
                </ConfPanel>
            </div>
        </div>
    );
}
