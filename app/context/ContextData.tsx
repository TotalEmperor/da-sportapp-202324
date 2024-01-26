"use client"
import {createContext, ReactNode, useContext, useState} from "react";

type ContextData = {
    day: string;
    week: string;
    activeButton: string;
    setDay: (day: string) => void;
    setWeek: (week: string) => void;
    setActiveButton : (activeButton: string) => void;
};

const ContextData = createContext<ContextData | null>(null);
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
    const [week, setWeek] = useState<string>("");
    const [activeButton, setActiveButton] = useState<string>(null);


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
