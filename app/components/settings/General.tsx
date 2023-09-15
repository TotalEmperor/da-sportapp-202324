import React from "react";
import Link from "next/link";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ContrastOutlinedIcon from '@mui/icons-material/ContrastOutlined';
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
                    <button className="me-3 rounded-xl hover:bg-gray-200 px-2 py-2">
                        <span>
                            <FiberManualRecordIcon
                                sx={{
                                    height: "3rem",
                                    width: "3rem",
                                }}
                            />
                            Darkmode
                        </span>
                    </button>
                    <button className="me-3 rounded-xl hover:bg-gray-200 px-2 py-2">
                        <span>
                            <FiberManualRecordIcon
                                sx={{
                                    height: "3rem",
                                    width: "3rem",
                                    color: "#F0EBE6",
                                }}/>
                            Lightmode
                        </span>
                    </button>
                    <button className="me-3 rounded-xl hover:bg-gray-200 px-2 py-2">
                        <span>
                            <ContrastOutlinedIcon
                                sx={{
                                height: "2.5rem",
                                width: "2.5rem",
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