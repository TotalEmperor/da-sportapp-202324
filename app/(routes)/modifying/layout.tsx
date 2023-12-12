import MainComponent from "@/components/MainComponents/mainComponent";
import React, {Suspense} from "react";
import SetComponentCollection from "@/components/Workout/SetComponentCollection";
import ConfPanel from "@/components/MainComponents/confPanel";
import ExerciseComponentCollection from "@/components/Workout/ExerciseComponentCollection";
import DateConfig from "@/components/dateConfig";
import ModifySetComponentCollection from "@/components/Modifying/ModifySetComponentCollection";
import LoadingModule from "@/components/loadingModule";

export default async function DashboardLayout({children,}: {
    children: React.ReactNode
}) {

    return (
        <>
            <MainComponent>
                <Suspense fallback={<LoadingModule/>}>
                    <ModifySetComponentCollection/>
                </Suspense>
            </MainComponent>

            <ConfPanel>
                {children}
            </ConfPanel>
        </>
    );
}
