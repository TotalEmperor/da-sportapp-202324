import React from "react"
import FC from "react"

import Account from "@/components/settings/Account";
import Language from "@/components/settings/Language";

type Params = {
    params:{
        setting: string
    }

}
export default function settingDetail({params : {setting}}){

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
    }
}

export async function getStaticProps({ params }) {
    return {
        props: {
            params,
        },
    };
}