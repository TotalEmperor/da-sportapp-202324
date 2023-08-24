import styles from "./test.module.css"
import React from "react";
import workoutOff from "@/icons/workoutoff.png";
import workoutOn from "@/icons/workoutOn.png";
import modifyingOn from "@/icons/modifyingon.png"
import modifyingOff from "@/icons/modifyingoff.png"
import statisticOff from "@/icons/statisticoff.png"
import statisticOn from "@/icons/statisticOn.png"
import settingsOff from "@/icons/settingsoff.png"
import settingsOn from "@/icons/settingson.png"
import accountsettingOff from "@/icons/accountsettingoff.png"
import accountsettingOn from "@/icons/accountsettingon.png"
import Logo from '../../public/images/hope.svg'





import Image from "next/image";


export default function page(){
    return(
        <div className="flex flex-col min-h-fit h-screen">
            <div className="w-full flex flex-col sm:flex-row flex-wrap sm:flex-nowrap py-4 flex-grow min-h-fit h-screen ">
                <div className={styles["w-left-fixed"]+ " w-full flex-shrink flex-grow-0 px-4 "}>
                    <div className="sticky top-0 p-4 bg-gray-100 rounded-xl w-full h-full">
                        <ul className="flex sm:flex-col overflow-hidden content-center justify-center">
                            <li className="py-2 hover:bg-indigo-300 rounded">
                                <a className="truncate" href="#">
                                    <img src="//cdn.jsdelivr.net/npm/heroicons@1.0.1/outline/home.svg" className="w-7 sm:mx-2 mx-4 inline" />
                                    <span className="hidden sm:inline">Home</span>
                                </a>
                            </li>
                            <li className="py-2 hover:bg-indigo-300 rounded">
                                <a className="truncate" href="#">
                                    <img src="//cdn.jsdelivr.net/npm/heroicons@1.0.1/outline/cog.svg" className="w-7 sm:mx-2 mx-4 inline" /> <span className="hidden sm:inline">Settings</span>
                                </a>
                            </li>
                            <li className="py-2 hover:bg-indigo-300 rounded">
                                <a className="" href="#">
                                    <img src="//cdn.jsdelivr.net/npm/heroicons@1.0.1/outline/gift.svg" className="w-7 sm:mx-2 mx-4 inline" /> <span className="hidden sm:inline">Products</span>
                                </a>
                            </li>
                            <li className="py-2 hover:bg-indigo-300 rounded">
                                <a className="" href="#">
                                    <img src="//cdn.jsdelivr.net/npm/heroicons@1.0.1/outline/chart-bar.svg" className="w-7 sm:mx-2 mx-4 inline" /> <span className="hidden sm:inline">Reports</span>
                                </a>
                            </li>
                            <li className="py-2 hover:bg-indigo-300 rounded">
                                <a className="" href="#">
                                    <img src="//cdn.jsdelivr.net/npm/heroicons@1.0.1/outline/collection.svg" className="w-7 sm:mx-2 mx-4 inline" /> <span className="hidden sm:inline">Integrations</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <main role="main" className={styles["w-center-fixed"]+ " w-full flex-grow pt-1 px-3"}>
                    <h1 className="text-3xl md:text-5xl mb-4 font-extrabold" id="home">Test Layout</h1>
                </main>
                <div className={styles["w-right-fixed"]+" w-full flex-shrink flex-grow-0 px-2"}>
                    <div className="flex sm:flex-col px-2">
                        <div className="bg-gray-50 rounded-xl border mb-3 w-full">
                            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:py-12 lg:px-8 lg:flex lg:items-center lg:justify-between">
                                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                    <span className="block text-indigo-600">Made with Tailwind CSS!</span>
                                </h2>
                            </div>
                        </div>
                        <div className="p-2"></div>
                        <div className="bg-gray-100 rounded-xl mb-3 w-full">
                            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:py-12 lg:px-8 lg:flex lg:items-center lg:justify-between">
                                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                    <span className="block">Ready to dive in?</span>
                                </h2>
                            </div>
                        </div>
                        <div className="p-2"></div>
                        <div className="bg-gray-50 rounded-xl border mb-3 w-full">
                            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:py-12 lg:px-8 lg:flex lg:items-center lg:justify-between">
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