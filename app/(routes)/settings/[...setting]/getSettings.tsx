import React from "react"
import Account from "@/components/settings/Account";
import Language from "@/components/settings/Language"
import General from "@/components/settings/General";
import Password from "@/components/settings/Password";
import PersonalInformation from "@/components/settings/PersonalInformation"
import DeleteAccount from "@/components/settings/DeleteAccount";

export default function getSettings(setting:any){



    switch (setting[0]){
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
        case "General":
            return (
                <>
                    <General/>
                </>
            )
        case "password":
            return (
                <>
                    <Password/>
                </>
            )
        case "yourSportFit":
            return (
                <>
                    <PersonalInformation/>
                </>
            )
        case "delete":
            return (
                <>
                    <DeleteAccount />
                </>
            )
        default:
            return (
                <>
                    {setting}
                </>
            )
    }
}
