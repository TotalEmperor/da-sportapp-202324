import React from "react";
import Link from "next/link";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import ContrastOutlinedIcon from '@mui/icons-material/ContrastOutlined';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

export default function General(){

    return(
        <div className="w-full flex-grow flex-shrink pt-1 flex-col flex">
            <div className="flex w-full flex-col border-b-2 border-gray-300 pb-[1.5rem]">
                <h1 className="font-bold text-xl">General</h1>
                <p>
                    All Settings related to user interactions.
                </p>
            </div>
            <div className="flex w-full flex-col border-b-2 border-gray-300 mt-[1.5rem] pb-[1.5rem]">
                <h1 className="font-bold text-2xl">Design</h1>
                <div className="flex flex-row mt-4">
                    <button className="me-3 rounded-xl px-2 py-2 bg-black text-white hover:invert">
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
                    <button className="me-3 rounded-xl hover:invert px-2 py-2 bg-white">
                        <span>
                            <LightModeIcon
                                sx={{
                                height: "3rem",
                                width: "3rem",
                            }} />
                            Lightmode
                        </span>
                    </button>
                    <button className="me-3 rounded-xl hover:bg-gray-200 px-2 py-2 bg-gradient-to-tr from-white via-gray-300 to-black hover:invert">
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