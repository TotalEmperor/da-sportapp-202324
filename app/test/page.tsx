import styles from "./test.module.css"
import React from "react";

import modifyingOff from "@/icons/modifyingoff.svg"
import TimerIcon from '@mui/icons-material/Timer';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import BarChartIcon from '@mui/icons-material/BarChart';
import Logo from "@/images/hope.svg"

import Image from "next/image";
import Head from "next/head";


export default function page() {
    return (
        <div className="flex flex-col min-h-fit h-screen">
            <Head>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="icon"/>
            </Head>
            <div
                className="w-full flex flex-col sm:flex-row flex-wrap sm:flex-nowrap py-4 flex-grow min-h-fit h-screen ">
                <div className={styles["w-left-fixed"] + " w-full flex-shrink flex-grow-0 px-4 "}>
                    <div
                        className="flex flex-col sticky top-0 sm:p-4 rounded-xl w-full h-full bg-[#F3F6EB] border-solid border-gray-300 border-2 min-w-fit">
                        <div className="flex-col justify-center items-center mb-[15%] mt-[15%] hidden sm:flex">
                            <Image src={Logo} alt="Logo"/>
                        </div>
                        <div className="flex flex-col sm:mt-[20%] items-center min-w-fit">
                            <ul className="flex sm:flex-col overflow-hidden justify-center content-center w-[75%] min-w-fit">
                                <li className="py-2 rounded-3xl hover:bg-[#d9e7cb]">
                                    <a className="truncate" href="#">
                                        <TimerIcon className={styles["icons"]+" fill-black dark:fill-none sm:mx-2 mx-4 inline"}></TimerIcon>
                                        <span className="hidden sm:inline">Workout</span>
                                    </a>
                                </li>
                                <li className="py-2 rounded-3xl hover:bg-[#d9e7cb]">
                                    <a className="truncate" href="#">
                                        <Image src={modifyingOff} alt="ModifyingOn" className={styles["icons"] + " sm:mx-2 mx-4 inline"} />
                                        <span className="hidden sm:inline">Modifying</span>
                                    </a>
                                </li>
                                <li className="py-2 rounded-3xl hover:bg-[#d9e7cb]">
                                    <a className="" href="#">
                                        <BarChartIcon className={styles["icons"] + " sm:mx-2 mx-4 inline"}></BarChartIcon>
                                        <span className="hidden sm:inline">Calc. Counter</span>
                                    </a>
                                </li>
                                <li className={"py-2 rounded-3xl hover:bg-[#d9e7cb]"}>
                                    <a className="" href="#">
                                        <ManageAccountsOutlinedIcon className={styles["icons"] + " sm:mx-2 mx-4 inline"}></ManageAccountsOutlinedIcon>
                                        <span className="hidden sm:inline">Options</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="flex justify-center items-center flex-col sm:mt-[40%]">
                            <button className={"w-full text-4xl rounded-3xl bg-[#046a4f] inline text-white font-bold p-2 hover:bg-green-500"}>
                                Start
                            </button>
                        </div>
                    </div>
                </div>
                <main role="main" className={styles["w-center-fixed"] + " w-full flex-grow pt-1 px-3"}>
                    <h1 className="text-3xl md:text-5xl mb-4 font-extrabold" id="home">Test Layout</h1>
                </main>
                <div className={styles["w-right-fixed"] + " w-full flex-shrink flex-grow-0 px-2 p-4"}>
                    <div className="flex sm:flex-col px-2">
                        <div className="bg-gray-50 rounded-xl border mb-3 w-full">
                            <div
                                className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:py-12 lg:px-8 lg:flex lg:items-center lg:justify-between">
                                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                    <span className="block text-indigo-600">Made with Tailwind CSS!</span>
                                </h2>
                            </div>
                        </div>
                        <div className="p-2"></div>
                        <div className="bg-gray-100 rounded-xl mb-3 w-full">
                            <div
                                className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:py-12 lg:px-8 lg:flex lg:items-center lg:justify-between">
                                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                    <span className="block">Ready to dive in?</span>
                                </h2>
                            </div>
                        </div>
                        <div className="p-2"></div>
                        <div className="bg-gray-50 rounded-xl border mb-3 w-full">
                            <div
                                className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:py-12 lg:px-8 lg:flex lg:items-center lg:justify-between">
                                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                    <span className="block text-indigo-600">Play free at Codeply today.</span>
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}