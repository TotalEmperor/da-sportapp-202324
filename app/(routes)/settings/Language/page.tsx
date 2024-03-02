import React from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import ContrastOutlinedIcon from "@mui/icons-material/ContrastOutlined";

export default function Page(){

    return(
        <div className="w-full flex-grow flex-shrink pt-1 px-3 flex-col flex">
            <div className="flex w-full flex-col border-b-2 border-gray-300 pb-[1.5rem]">
                <h1 className="font-bold text-xl">Language</h1>
                <p>
                    All Settings Regarding your personal Account, including Username, Password, Authentication
                </p>
            </div>
            <div className="flex w-full flex-col border-b-2 border-gray-300 mt-[1.5rem] pb-[1.5rem]">
                <h1 className="font-bold text-2xl">Language</h1>
                <div className="flex flex-row mt-4">

                </div>
            </div>
            <div className="flex w-full flex-col border-b-2 border-gray-300 mt-[1.5rem] pb-[1.5rem]">
                <h1 className="font-bold text-2xl">Notifications</h1>
            </div>
        </div>
    )

}