"use client"
import getFirestoreDocument from "@/firebase/firestore/getData";
import {useEffect, useState} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import SetComponent from "@/components/Exercises/SetComponent"
import {week, day} from "@/components/dateConfig"
import {useRouter} from "next/navigation";

export default function SetComponentCollection() {
    const [user, setuser] = useState(() => {
        // if a user is already logged in, use the current user object, or `undefined` otherwise.
        return getAuth().currentUser.uid || undefined;
    });
    const [userdata, setuserdata] = useState([]);
    const [currentDay, setCurrentDay] = useState(day);
    const [currentWeek, setCurrentWeek] = useState(week);
    const router = useRouter();


// keeps `userdata` up to date

    useEffect(() => {
        setCurrentDay(day)
        setCurrentWeek(week)
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
                getExercises(res.result).then((exercises) => {
                    if (exercises) {
                        setuserdata(exercises);
                    }

                })
            }
        });


    }, [user, day, week]); // <-- rerun when user changes

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

    if(day!=null){
        for (const exerciseType in data.exercises[week][day]) {
            const exercises = data.exercises[week][day][exerciseType];
            objArray.push(exercises)
        }
    }
    return objArray;
};

