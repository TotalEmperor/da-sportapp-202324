"use client"
import { useEffect } from 'react';
import getFirestoreDocument from "@/firebase/firestore/getData";
import {getAuth} from "firebase/auth";
import DateConfig from "@/components/settings/dateConfig";


export default function Page() {

    useEffect(() => {
        const unsubscribe = getFirestoreDocument('exercises', getAuth().currentUser.uid, (data) => {
            console.log(data);
        });

        // Unsubscribe when the component unmounts
        return () => {
            unsubscribe();
        };
    }, []);


    return(
        <>
            <DateConfig/>
        </>
    )

    // ...
}
