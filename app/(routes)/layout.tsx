import {CheckEmailVerification} from "@/context/AuthContext";
import SideNav from "@/components/MainComponents/SideNav";
import React, {Suspense} from "react";
import {ContextDataProvider} from "@/context/ContextData";
export default async function DashboardLayout({children,}: {
    children: React.ReactNode
}) {

    return (
        <CheckEmailVerification>
            <ContextDataProvider>
                <div id={"rootElement"} className={"flex flex-col min-h-fit h-screen bg-[#F8FAF7] dark:bodyScreen"}>
                    <div className="w-full flex flex-col sm:flex-row sm:flex-nowrap flex-grow overflow-hidden">
                        <SideNav/>
                        <>
                            {children}
                        </>
                    </div>
                </div>
            </ContextDataProvider>
        </CheckEmailVerification>
    )
}