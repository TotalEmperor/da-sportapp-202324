"use client"

import React, {useEffect, useState} from "react";
import Link from "next/link";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import ContrastOutlinedIcon from '@mui/icons-material/ContrastOutlined';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useTheme } from 'next-themes'

export default function Page(){

    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return(
        <div className="w-full flex-grow flex-shrink pt-1 flex-col flex px-3">
            <div className="flex w-full flex-col border-b-2 border-gray-300 pb-[1.5rem]">
                <h1 className="font-bold text-xl">General</h1>
                <p>
                    All Settings related to user interactions.
                </p>
            </div>
            <div className="flex w-full flex-col border-b-2 border-gray-300 mt-[1.5rem] pb-[1.5rem]">
                <h1 className="font-bold text-2xl">Design</h1>
                <div className="flex flex-row mt-4">
                    <button className={`me-3 rounded-xl px-2 py-2 bg-black text-white border-2 border-black hover:invert ${theme=="dark"? "border-blue-500":""}`} onClick={() => setTheme('dark')}>
                        <span>
                            <DarkModeIcon
                                sx={{
                                    height: "3rem",
                                    width: "3rem",
                                }}
                            />
                            Darkmode
                        </span>
                    </button>
                    <button className={`me-3 rounded-xl hover:invert px-2 dark:text-black border-2 py-2 bg-white ${theme=="light"? "border-blue-500":""}`}onClick={() => setTheme('light')}>
                        <span>
                            <LightModeIcon
                                sx={{
                                    height: "3rem",
                                    width: "3rem",
                                }} />
                            Lightmode
                        </span>
                    </button>
                    <button className={`me-3 rounded-xl hover:bg-gray-200 px-2 py-2 dark:text-black bg-gradient-to-tr from-white via-gray-300 to-black hover:invert ${theme=="system"? "border-2 border-blue-500":""}`} onClick={() => setTheme('system')}>
                        <span>
                            <ContrastOutlinedIcon
                                sx={{
                                    height: "3rem",
                                    width: "3rem",
                                }}
                            />
                            System
                        </span>
                    </button>
                </div>
            </div>
            <div className="flex w-full flex-col border-b-2 border-gray-300 mt-[1.5rem] pb-[1.5rem]">
                <h1 className="font-bold text-2xl">Notifications</h1>
            </div>
        </div>
    )

}