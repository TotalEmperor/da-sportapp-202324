import React from "react"
import FC from "react"

import Account from "@/components/settings/Account";
import Language from "@/components/settings/Language"
import General from "@/components/settings/General";


export default function getSettings(setting:string){
    switch (setting){
        case "Account":
            return (
                <>
                    <Account/>
                </>
            )
        case "Language":
            return (
                <>
                    <Language/>
                </>
            )
        case "General":{
            return (
                <>
                    <General/>
                </>
            )
        }
    }
}
