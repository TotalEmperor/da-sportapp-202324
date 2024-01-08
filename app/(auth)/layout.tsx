import {RedirectSignedUpUser} from "@/context/AuthContext";
import React, {Suspense} from "react";
export default function DashboardLayout({children,}: {
    children: React.ReactNode
}) {

    return (
        <RedirectSignedUpUser>
            {children}
        </RedirectSignedUpUser>
    )
}