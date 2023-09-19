import React from "react"
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BorderContainer from "@/components/Authentication/borderContainer";

export default function PersonalInformation(){


    return(
        <div className="w-full flex-grow flex-shrink pt-1 flex-col flex px-3">
            <div className="flex w-full items-center border-b-2 border-gray-300 pb-[1.5rem]">
                <Link
                    className="hover:bg-gray-200 rounded-full w-fit p-2"
                    href="/settings/Account">
                    <ArrowBackIcon/>
                </Link>
                <span className="font-bold text-xl ms-4">Personal Information</span>
            </div>
           <div>

           </div>
        </div>
    )
}