"use client"
import "app/globals.css"
import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/images/hope.svg';
import styles from "../../(routes)/workout/workout.module.css";
import TimerIcon from "@mui/icons-material/Timer";
import BarChartIcon from "@mui/icons-material/BarChart";
import AccountDropdown from "@/components/AccountDropdown";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import React, {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import {useContextData} from "@/context/ContextData";
import MenuIcon from '@mui/icons-material/Menu';

export default function SideNav() {
    const {activeButton, setActiveButton} = useContextData();
    const [menuVisible, setMenuVisible] = useState(false);

    const path = usePathname();

    useEffect(() => {
        const parts = path.split('/');

        // Check the length of parts array
        const result = parts.length >= 3 ? parts.slice(0, 3) : parts.slice(0, 2);

        result.join('/');

        setActiveButton("/"+result[1])
    }, [path]);

    useEffect(() => {
        if(!activeButton && sessionStorage.getItem("currentPage")){
            setActiveButton(sessionStorage.getItem("currentPage"))
        }
        sessionStorage.setItem("currentPage", activeButton);
    }, [activeButton]);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    return (
        <>
            <nav
                className={styles["w-left-fixed"] + ` flex-shrink flex-grow-0 mb-2 sm:px-4 z-[2] ${menuVisible ? 'fixed top-0 left-0 h-full min-w-fit w-[60%]' : 'w-full px-4'}`}>
                <div
                    className={styles["w-left-panel"] + ` sm:sticky sm:top-0 sm:p-4 rounded-xl w-full h-full bg-[#F3F6EB] min-w-fit dark:bg-neutral-950 flex flex-col dark:text-neutral-300 z-10`}>
                    <div className="flex flex-row justify-center" >
                        <button className="me-auto ms-5 p-3 m-1 rounded-xl min-w-fit w-[5vw] flex sm:hidden" onClick={toggleMenu}>
                            <MenuIcon/>
                        </button>
                        <div className={`${menuVisible ? 'hidden' : 'w-full flex me-[75%] sm:hidden items-center'}`}>
                            <Link href={activeButton? activeButton: ""} className={`${menuVisible ? 'hidden' : 'w-[20vw] flex me-[60%] items-center'}`}>
                                {activeButton}
                            </Link>
                        </div>
                    </div>
                    <div
                        className={`flex-col sm:justify-center sm:items-center mb-[15%] mt-[15%] sm:flex dark:fill-white ${menuVisible ? '' : 'hidden'}`}>
                        <Image src={Logo} alt="Logo" priority={true} className="dark:invert sm:h-full h-[48px] w-fit sm:w-full"/>
                    </div>
                    <div
                        className={`flex-col sm:mt-[20%] items-center min-w-fit ${menuVisible ? "" : "hidden sm:flex"}`}>
                        <ul className="flex flex-col overflow-hidden justify-center content-center sm:w-[75%] min-w-fit">
                            <li className={`py-2 my-1 rounded-xl dark:hover:bg-gray-700 hover:bg-[#d9e7cb] ${activeButton === '/workout' ? 'bg-[#d9e7cb] dark:bg-gray-700' : ''}`}>
                                <Link href="/workout" prefetch onClick={() => setMenuVisible(false)}>
                                    <TimerIcon
                                        className={styles["icons"] + " fill-black sm:mx-2 mx-4 inline"}></TimerIcon>
                                    <span className="sm:inline">Workout</span>
                                </Link>
                            </li>
                            <li className={`py-2 my-1 rounded-xl dark:hover:bg-gray-700 hover:bg-[#d9e7cb] ${activeButton === '/modifying' ? 'dark:bg-gray-700 bg-[#d9e7cb]' : ''}`}>
                                <Link className="truncate" href="/modifying" onClick={() => setMenuVisible(false)}>
                                    <FitnessCenterIcon
                                        className={styles["icons"] + " sm:mx-2 mx-4 inline"}></FitnessCenterIcon>
                                    <span className="sm:inline font-medium ">Modifying</span>
                                </Link>
                            </li>
                            <li className={`py-2 my-1 rounded-xl dark:hover:bg-gray-700 hover:bg-[#d9e7cb] ${activeButton === '/calculate' ? 'dark:bg-gray-700 bg-[#d9e7cb]' : ''}`}>
                                <Link className="" href="#" prefetch onClick={() => setMenuVisible(false)}>
                                    <BarChartIcon className={styles["icons"] + " sm:mx-2 mx-4 inline"}></BarChartIcon>
                                    <span className="sm:inline font-medium w-fit">Calc. Counter</span>
                                </Link>
                            </li>
                            <li className={`py-2 my-1 rounded-xl dark:hover:bg-gray-700 hover:bg-[#d9e7cb] ${activeButton === '/settings' ? 'dark:bg-gray-700 bg-[#d9e7cb]' : ''}`}>
                                <Link href={`/settings/${"Account"}`} prefetch={true}
                                      onClick={() => setMenuVisible(false)}>
                                    <SettingsOutlinedIcon className={styles["icons"] + " sm:mx-2 mx-4 inline"}/>
                                    <span className="sm:inline font-medium ">Settings</span>
                                </Link>
                            </li>
                            <li className="mt-[50%]">
                                <AccountDropdown/>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div
                className={`${menuVisible ? 'fixed top-0 right-0 h-full w-full bg-gray-300 opacity-30 z-[1]' : ''}`}>

            </div>
        </>
    );
}
