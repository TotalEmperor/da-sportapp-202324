"use client"
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import BasicModal from "@/components/DeleteModal"
import DeleteModal from "@/components/DeleteModal"
import {useSearchParams} from "next/navigation";

export default function DeleteAccount(){

    const searchParams = useSearchParams().get("modal")

    return(
        <>
            <div className="w-full flex-grow flex-shrink pt-1 flex-col flex px-3">
                <div className="flex w-full items-center border-b-2 border-gray-300 pb-[1.5rem]">
                    <Link
                        className="hover:bg-gray-200 rounded-full w-fit p-2"
                        href="/settings/Account">
                        <ArrowBackIcon/>
                    </Link>
                    <span className="font-bold text-xl ms-4">Delete Account</span>
                </div>
                <div className="flex flex-row w-full">
                    <Link href="/settings/delete?modal=true" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Delete my Account
                    </Link>
                </div>
            </div>
            {searchParams && <DeleteModal text="Test" title="Test123"/>}
        </>
    )

}