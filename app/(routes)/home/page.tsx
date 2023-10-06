import styles from "./home.module.css"
import SetComponent from "@/components/MainScreen/SetComponent"
import SideNav from "@/components/SideNav";
import MainComponent from "@/components/MainScreen/mainComponent";
import ConfPanel from "@/components/confPanel";
import Image from "next/image";
import Head from "next/head";
import React from "react";
import {UseAuthContext} from "@/context/AuthContext";
import DateConfig from "@/components/dateConfig";
import getFirestoreDocument from "@/firebase/firestore/getData";

export default async function page() {

    const dataSet = await getExerciseData();
    const dataSetKeys = Object.keys(dataSet).map((key) => ({
        id: key,
        ...dataSet[key],
    }))

    //console.log(dataSet.result["Exampleexercises"]["Abs"]["Crunches"])

    return (
        <div className={ styles["contentWidth"] +" flex flex-col min-h-fit h-screen bg-[#F8FAF7]"}>
            <Head>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="icon"/>
            </Head>
            <div className="w-full flex flex-col sm:flex-row flex-wrap sm:flex-nowrap py-4 flex-grow">
                <SideNav/>
                <MainComponent>
                    <SetComponent/>
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

async function getExerciseData(){

        return await getFirestoreDocument("Exampleexercises", "EbMQMKrsoqPK4sRvVNlocuXqLUG2")
            .then((data) => {
                return data;
            });
}

/*{dataSet.result["Abs"]["Crunches"].map((item) => (
                      <>
                          <SetComponent/>
                      </>
                  ))}*/