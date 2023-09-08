"use client";
import styles from "./settings.module.css"
import SetComponent from "@/components/SetComponent"
import SideNav from "@/components/SideNav";
import MainComponent from "@/components/mainComponent";
import ConfPanel from "@/components/confPanel";
import Image from "next/image";
import Head from "next/head";
import React from "react";
import {useAuthContext} from "@/context/AuthContext";
import {useRouter} from "next/navigation";

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function page() {

    // eslint-disable-next-line react-hooks/rules-of-hooks

    return (
        <div className={ styles["contentWidth"] +" flex flex-col min-h-fit h-screen bg-[#F8FAF7]"}>
            <Head>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="icon"/>
            </Head>
            <div className="w-full flex flex-col sm:flex-row flex-wrap sm:flex-nowrap py-4 flex-grow">
                <SideNav/>
                <MainComponent>
                    <>
                        <div className="flex flex-col w-full">
                            <div className="border-y-2 border-gray-500 flex flex-row justify-center items-center hover:bg-[#F5F3F3]">
                                <a
                                    href="#!"
                                    aria-current="true"
                                    className="block w-full cursor-pointer rounded-lg bg-primary-100 p-4 text-primary-600 hover:bg-[#F5F3F3]">
                                    Account
                                </a>
                                <ArrowForwardIosIcon/>
                            </div>
                            <div className="border-b-2 border-gray-500 flex flex-row justify-center items-center hover:bg-[#F5F3F3]">
                                <a
                                    href="#!"
                                    className="block w-full cursor-pointer rounded-lg p-4 transition duration-500 hover:bg-neutral-100 hover:text-neutral-500 focus:bg-neutral-100 focus:text-neutral-500 focus:ring-0 dark:hover:bg-neutral-600 dark:hover:text-neutral-200 dark:focus:bg-neutral-600 dark:focus:text-neutral-200">
                                    Language
                                </a>
                                <ArrowForwardIosIcon/>
                            </div>
                            <div className="border-b-2 border-gray-500 flex flex-row justify-center items-center hover:bg-[#F5F3F3]">
                                <a
                                    href="#!"
                                    className="block w-full cursor-pointer rounded-lg p-4 transition duration-500 hover:bg-neutral-100 hover:text-neutral-500 focus:bg-neutral-100 focus:text-neutral-500 focus:ring-0 dark:hover:bg-neutral-600 dark:hover:text-neutral-200 dark:focus:bg-neutral-600 dark:focus:text-neutral-200">
                                    Measurement Units
                                </a>
                                <ArrowForwardIosIcon/>
                            </div>
                            <div className="border-b-2 border-gray-500 flex flex-row justify-center items-center hover:bg-[#F5F3F3]">
                                <a
                                    href="#!"
                                    className="block w-full cursor-pointer rounded-lg p-4 transition duration-500 hover:bg-neutral-100 hover:text-neutral-500 focus:bg-neutral-100 focus:text-neutral-500 focus:ring-0 dark:hover:bg-neutral-600 dark:hover:text-neutral-200 dark:focus:bg-neutral-600 dark:focus:text-neutral-200">
                                    Weight Units
                                </a>
                                <ArrowForwardIosIcon/>
                            </div>
                        </div>
                    </>
                </MainComponent>
                <ConfPanel>
                    <>
                    </>
                </ConfPanel>
            </div>
        </div>
    );
}