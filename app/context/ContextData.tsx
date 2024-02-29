"use client"
import {createContext, ReactNode, useContext, useEffect, useState} from "react";

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
    const [day, setDay] = useState<string>("");
    const [week, setWeek] = useState<string>("");
    const [activeButton, setActiveButton] = useState<string>(null);

    useEffect(() => {
        if(sessionStorage.getItem("day")){
            setDay(sessionStorage.getItem("day"));
            setWeek(sessionStorage.getItem("week"));
        }
    }, []);


    useEffect(() => {
        sessionStorage.setItem("day", day);
        sessionStorage.setItem("week", week);
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
