"use client"
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Image from "next/image";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import AddModal from "@/components/Modifying/AddingExerciseModal";
import ImageSelectModal from "@/components/Modifying/ImageSelectModal";
import React from "react";
import {useRouter} from "next/navigation";


export default function EditingSet(){

    const router = useRouter();

    return(
        <>
            <div className="w-full flex-grow flex-shrink pt-1 flex-col flex px-3 dark:text-white text-neutral-800">
                <div className="flex w-full items-center border-b-2 border-gray-300 pb-[1.5rem]">
                    <button
                        onClick={router.back}
                        className="hover:bg-gray-200 rounded-full w-fit p-2">
                        <ArrowBackIcon/>
                    </button>
                    <span className="font-bold text-xl ms-4">Edit Set</span>
                </div>

            </div>
        </>
    )

}