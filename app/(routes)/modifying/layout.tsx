import MainComponent from "@/components/MainComponents/mainComponent";
import React, {Suspense} from "react";
import SetComponentCollection from "@/components/Workout/SetComponentCollection";
import ConfPanel from "@/components/MainComponents/confPanel";
import ExerciseComponentCollection from "@/components/Workout/ExerciseComponentCollection";
import DateConfig from "@/components/MainComponents/dateConfig";
import ModifySetComponentCollection from "@/components/Modifying/ModifySetComponentCollection";
import LoadingModule from "@/components/loadingModule";

export default async function DashboardLayout({children,}: {
    children: React.ReactNode
}) {

    return (
        <>
            <MainComponent>
                    <ModifySetComponentCollection/>
            </MainComponent>
            <ConfPanel>
                {children}
            </ConfPanel>
        </>
    );
}
