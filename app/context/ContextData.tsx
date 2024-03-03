"use client"
import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import getFirestoreDocument from "@/firebase/firestore/getData";
import {getAuth} from "firebase/auth";
import {UserData} from "@/interfaces/userdata";
import {sortDates} from "@/components/MainComponents/dateConfig";

type ContextData = {
    day: string;
    week: string;
    activeButton: string;
    setDay: (day: string) => void;
    setWeek: (week: string) => void;
    setActiveButton : (activeButton: string) => void;
};

export const ContextData = createContext<ContextData | null>(null);
export function useContextData() {
    const context = useContext(ContextData);
    if (!context) {
        throw new Error("Please use ContextDataProvider in parent component");
    }
    return context;
};

type Props = {
    children: ReactNode;
};
export function ContextDataProvider({ children }: Props) {
    const [day, setDay] = useState<string>(null);
    const [week, setWeek] = useState<string>(null);
    const [activeButton, setActiveButton] = useState<string>(null);

    useEffect(() => {
        console.log(sessionStorage.getItem("day"))
        if (sessionStorage.getItem("day")!== "null") {
            setDay(sessionStorage.getItem("day"));
            setWeek(sessionStorage.getItem("week"));
        } else{
            getFirestoreDocument('userdata', getAuth().currentUser.uid, (data: UserData) => {
                if (data.weeks) {
                    sortDates(Object.keys(data.weeks)).then((dates: [string]) => {
                        setDay("MO");
                        sessionStorage.setItem("day", "MO");
                        setWeek(dates[0]);
                        sessionStorage.setItem("week",dates[0]);
                    })
                }
            });
        }
    }, []);

    useEffect(() => {
        if(day){
            sessionStorage.setItem("day", day);
            sessionStorage.setItem("week", week);
        }
    }, [day,week]);

    const value = {
        day,
        week,
        activeButton,
        setDay,
        setWeek,
        setActiveButton
    };
    return (
        <ContextData.Provider value={value} key={"dataProvider"}>
            {children}
        </ContextData.Provider>
    );
}
