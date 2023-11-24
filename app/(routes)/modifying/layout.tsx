
import MainComponent from "@/components/MainScreen/mainComponent";
import React, {Suspense} from "react";
import SetComponentCollection from "@/components/Workout/SetComponentCollection";
import ConfPanel from "@/components/confPanel";
import ExerciseComponentCollection from "@/components/Workout/ExerciseComponentCollection";
import DateConfig from "@/components/dateConfig";
export default function DashboardLayout({children,}: {
    children: React.ReactNode
}) {

    return (
        <>
            <MainComponent>
                <SetComponentCollection/>
            </MainComponent>
            <ConfPanel>
                {children}
            </ConfPanel>
        </>
    );
}
