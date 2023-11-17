import Head from "next/head";
import SideNav from "@/components/SideNav";
import MainComponent from "@/components/MainScreen/mainComponent";
import ConfPanel from "@/components/confPanel";
import DateConfig from "@/components/dateConfig";
import React from "react";


export default function page(){

    return(
        <>
            <MainComponent>
                <>
                </>
            </MainComponent>
            <ConfPanel>
                <>
                    <DateConfig/>
                </>
            </ConfPanel>
        </>
    )
}