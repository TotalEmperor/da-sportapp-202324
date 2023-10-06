import Head from "next/head";
import SideNav from "@/components/SideNav";
import MainComponent from "@/components/MainScreen/mainComponent";
import SetComponent from "@/components/MainScreen/SetComponent";
import ConfPanel from "@/components/confPanel";
import DateConfig from "@/components/dateConfig";
import React from "react";


export default function page(){

    return(
        <div className={"flex flex-col min-h-fit h-screen bg-[#F8FAF7]"}>
            <Head>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="icon"/>
            </Head>
            <div className="w-full flex flex-col sm:flex-row flex-wrap sm:flex-nowrap py-4 flex-grow">
                <SideNav/>
                <MainComponent>
                    <SetComponent/>
                </MainComponent>
                <ConfPanel>
                    <>
                        <DateConfig/>
                    </>
                </ConfPanel>
            </div>
        </div>
    )
}