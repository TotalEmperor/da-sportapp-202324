"use client"
import Starfilled from '@/icons/stars.png';
import Image from "next/image";
import Link from "next/link"
import React, {useEffect, useState} from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import ModifyDeleteModal from "@/components/Modifying/ModifyDeleteModal";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

export default function SetManager(props: {
    data: any;
    setName: string;
    link: string;
    time: number;
    stars: number;
    modify?: boolean;
    exerciseNum: number;
    style?: string;
}) {
    const {data, setName, link, time, stars, modify, exerciseNum, style} = props;
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [selectedSet, setSelectedSet] = useState<string>("");
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const openDeleteModal = (e) => {
        e.preventDefault();
        setIsDeleteModalOpen(true);
    }

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    }

    useEffect(() => {
        if (searchParams.get("setName")) {
            setSelectedSet(searchParams.get("setName"));
        } else {
            setSelectedSet(pathname.substring(pathname.lastIndexOf("/") + 1));
        }
    }, [pathname]);

    return (
        <>
            <div
                onClick={(e) => {
                    e.preventDefault();
                    router.push(link)
                }}
                className={`z-10 rounded-xl w-full my-3 hover:bg-green-300 dark:hover:bg-opacity-20 dark:shadow-neutral-600 shadow-md hover:cursor-pointer dark:bg-white ${selectedSet == setName ? "dark:bg-opacity-30" : " dark:bg-white dark:bg-opacity-10"} ` + style}>
                <div
                    className="w-full justify-center flex-col mx-auto flex px-4 pt-8 py-4">
                    <div className="flex w-fit flex-row min-h-fit">
                        <span className="left-auto text-[1.8rem] font-bold me-6">{setName}</span>
                        {Array.from({length: stars}, (_, i) => (
                            <div key={i} className="flex flex-col pe-2 justify-center">
                                <Image src={Starfilled} className="w-[2rem]" alt="starFilled"/>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end items-end h-[2rem] mb-3">

                        {
                            modify ?
                                <>
                                    <button onClick={openDeleteModal}
                                            className={'p-2 rounded-full dark:hover:bg-opacity-5 me-2 dark:hover:bg-white'}>
                                        <DeleteIcon className={"z-10 hover:text-blue-400 text-red-600 rounded"}
                                                    sx={{fontSize: "2rem"}}/>
                                    </button>
                                    <button onClick={(e) => {
                                        e.stopPropagation();
                                        router.push(`/modifying/editSet/${setName}`)
                                    }} className={'p-2 rounded-full dark:hover:bg-opacity-5 me-2 dark:hover:bg-white'}>
                                        <EditRoundedIcon
                                            className={"hover:text-blue-400 icon rounded-full text-lime-600"}
                                            sx={{fontSize: "2rem"}}/>
                                    </button>
                                </>
                                :
                                <>
                                </>
                        }
                    </div>

                    <div className="text-[1rem] font-bold">
                        <span className="me-3">Time: {time} Min.</span>
                        <span>Exercises: {exerciseNum}</span>
                    </div>
                </div>
            </div>
            <ModifyDeleteModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}
                               setName={data}/>
        </>
    )
}