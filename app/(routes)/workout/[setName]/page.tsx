import React, {Suspense} from 'react';
import getFirestoreDocument from "@/firebase/firestore/getData";
import ExerciseComponentCollection from "@/components/Workout/ExerciseComponentCollection";
import styles from "../workout.module.css";
import Head from "next/head";
import SideNav from "@/components/MainComponents/SideNav";
import MainComponent from "@/components/MainComponents/mainComponent";
import SetComponentCollection from "@/components/Workout/SetComponentCollection";
import ConfPanel from "@/components/MainComponents/confPanel";
import DateConfig from "@/components/settings/dateConfig";

export default function Page({params: {setName}}) {
    return (
        <>
            <ExerciseComponentCollection setName={setName}/>
        </>
    );
}
