"use client"
import getFirestoreDocument from "@/firebase/firestore/getData";
import {useEffect, useState} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import SetComponent from "@/components/Exercises/SetComponent"
import addData from "@/firebase/firestore/addData";

type Exercise = {
    stars: string,
    time: string,
    break: string,
    image: string,
    moves: string,
    description: string
};
export default function SetComponentCollection() {
    const [user, setuser] = useState(() => {
        // if a user is already logged in, use the current user object, or `undefined` otherwise.
        return getAuth().currentUser.uid || undefined;
    });
    const [userdata, setuserdata] = useState([]);

// keeps `userdata` up to date
    useEffect(() => {
        if (user === null) {
            setuserdata(null); // <-- clear data when not logged in
            return;
        }

        if (!user) {
            // user still loading, do nothing yet
            return;
        }

        getFirestoreDocument("exercises", user).then((res: any) => {
            if (res.result) {
                getExercises(res.result).then((exercises)=>{
                    if(exercises){
                        setuserdata(exercises);
                    }

                })
            }
        });

    }, [user]); // <-- rerun when user changes

    return (
        <>
            {
                userdata.map((data, index) => (
                    <SetComponent key={index} data={data}/>
                ))
            }
        </>
    )
}

const getExercises = async (data: any) => {
    let objArray = [];
    const dates = await sortDates(Object.keys(data.exercises))

    const date = dates[0]
    //const day = Object.keys(data.exercises[date])["MON"]

    for (const exerciseType in data.exercises[date]["MO"]) {
        const exercises = data.exercises[date]["MO"][exerciseType];
        objArray.push(exercises)
    }

    return objArray;
};

const sortDates = async (dates:any)=>{
    dates.sort((a, b) => {
        // Split the string and take the first part as the starting date of the week
        const date1 = new Date(convertDateFormat(a.split('-')[0]));
        const date2 = new Date(convertDateFormat(b.split('-')[0]));
        return date1.getTime() - date2.getTime();
    });
    return dates;
}

function convertDateFormat(date: string): string {
    const [day, month, year] = date.split('.');
    return `${month}/${day}/${year}`;
}

