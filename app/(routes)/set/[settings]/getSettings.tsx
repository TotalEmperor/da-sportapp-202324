import React from "react"
import FC from "react"

import Account from "@/components/settings/Account";
import Language from "@/components/settings/Language"


export default function getSettings(setting:string){

    console.log(setting)
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
        case "":{
            return (
                <>
                </>
            )
        }
    }
}
