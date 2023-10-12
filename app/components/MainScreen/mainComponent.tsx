"use client"
import styles from "../../(routes)/home/home.module.css";
import React from "react";
import addData from "@/firebase/firestore/addData";
import {getAuth} from "firebase/auth";


export default function mainComponent({children}:{children: React.ReactNode}) {
    return (
        <>
                <main role="main" className={styles["w-center-fixed"] + " w-full flex-grow flex-shrink pt-1 px-3 items-center flex-col flex"}>
                    {children}
                </main>
        </>
    )
}