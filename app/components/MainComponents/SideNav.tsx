"use client"
import "app/globals.css"
import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/images/hope.svg';
import TimerIcon from "@mui/icons-material/Timer";
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import AccountDropdown from "@/components/AccountDropdown";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import React, {useEffect, useState} from "react";
import SettingsIcon from '@mui/icons-material/Settings';
import {useParams, usePathname} from "next/navigation";
import {useContextData} from "@/context/ContextData";
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
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
        setActiveButton("/"+result[1]);
    }, [path]);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    return (
        <>
            <nav
                className={`${menuVisible ? 'fixed top-0 left-0 h-full min-w-fit w-[60%]' : 'w-full'} w-left-fixed flex-shrink flex-grow-0 mb-2 z-10 bg-black bg-opacity-20`}>
                <div
                    className={'sm:sticky sm:top-0 sm:p-4 w-full h-full min-w-fit flex flex-col dark:text-neutral-300 z-10'}>
                    <div className="flex flex-row justify-center" >
                        <button className="me-auto ms-5 p-3 m-1 min-w-fit w-[5vw] flex sm:hidden" onClick={toggleMenu}>
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
                                    {activeButton === '/workout' ?
                                    <>
                                        <TimerIcon
                                            className={"icons fill-black sm:mx-2 mx-4 inline"}></TimerIcon>
                                        <span className="sm:inline">Workout</span>
                                    </>
                                    :
                                    <>
                                        <TimerOutlinedIcon
                                            className={"icons fill-black sm:mx-2 mx-4 inline"}></TimerOutlinedIcon>
                                        <span className="sm:inline">Workout</span>
                                    </>
                                }
                                </Link>
                            </li>
                            <li className={`py-2 my-1 rounded-xl dark:hover:bg-gray-700 hover:bg-[#d9e7cb] ${activeButton === '/modifying' ? 'dark:bg-gray-700 bg-[#d9e7cb]' : ''}`}>
                                <Link className="truncate" href="/modifying" onClick={() => setMenuVisible(false)}>
                                    {activeButton === '/modifying' ?
                                        <>
                                            <EditCalendarIcon
                                                className={"icons sm:mx-2 mx-4 inline"}></EditCalendarIcon>
                                            <span className="sm:inline font-medium ">Modifying</span>
                                        </>
                                        :
                                        <>
                                            <EditCalendarOutlinedIcon
                                                className={"icons sm:mx-2 mx-4 inline"}></EditCalendarOutlinedIcon>
                                            <span className="sm:inline font-medium ">Modifying</span>
                                        </>
                                    }
                                </Link>
                            </li>
                            <li className={`py-2 my-1 rounded-xl dark:hover:bg-gray-700 hover:bg-[#d9e7cb] ${activeButton === '/calCounter' ? 'dark:bg-gray-700 bg-[#d9e7cb]' : ''}`}>
                                <Link className="" href="/calCounter" prefetch onClick={() => setMenuVisible(false)}>
                                    {activeButton === '/calCounter' ?
                                        <>
                                            <InsertChartIcon className={"icons sm:mx-2 mx-4 inline"}></InsertChartIcon>
                                            <span className="sm:inline font-medium w-fit">Cal. Counter</span>
                                        </>
                                        :
                                        <>
                                            <InsertChartOutlinedIcon className={"icons sm:mx-2 mx-4 inline"}></InsertChartOutlinedIcon>
                                            <span className="sm:inline font-medium w-fit">Cal. Counter</span>
                                        </>
                                    }
                                </Link>
                            </li>
                            <li className={`py-2 my-1 rounded-xl dark:hover:bg-gray-700 hover:bg-[#d9e7cb] ${activeButton === '/settings' ? 'dark:bg-gray-700 bg-[#d9e7cb]' : ''}`}>
                                <Link href={`/settings/${"Account"}`} prefetch={true}
                                      onClick={() => setMenuVisible(false)}>
                                      {activeButton === '/settings' ?
                                          <>
                                              <SettingsIcon className={"icons sm:mx-2 mx-4 inline"}/>
                                              <span className="sm:inline font-medium ">Settings</span>
                                          </>
                                          :
                                          <>
                                              <SettingsOutlinedIcon className={"icons sm:mx-2 mx-4 inline"}/>
                                              <span className="sm:inline font-medium ">Settings</span>
                                          </>
                                      }
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
