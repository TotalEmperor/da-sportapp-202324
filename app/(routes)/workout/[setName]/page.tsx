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

export default function Page({params: {setName}}) {
    return (
        <>

            <ExerciseComponentCollection setName={setName}/>

        </>
    );
}
