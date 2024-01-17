"use client"
import Starfilled from '@/icons/stars.png';
import Image from "next/image";
import Link from "next/link"
import React, {useState} from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import ModifyDeleteModal from "@/components/Modifying/ModifyDeleteModal";

export default function SetManager(props: {
    data: any;
    link: string;
    time: number;
    stars: number;
    modify?: boolean;
    exerciseNum: number;
    style?: string;
}) {
    const {data, link, time, stars, modify, exerciseNum, style} = props;
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

    const openDeleteModal = (e) => {
        e.preventDefault();
        setIsDeleteModalOpen(true);
    }

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    }

    return (
        <>
            <Link href={link} prefetch={true}
                  className={"z-10 rounded-xl w-full my-3 dark:shadow-neutral-600 shadow-md bg-white dark:bg-white dark:bg-opacity-10 hover:bg-green-300 " + style}>
                <div
                    className="w-full justify-center flex-col mx-auto flex px-4 pt-8 py-4">
                    <div className="flex w-fit flex-row min-h-fit">
                        <span className="left-auto text-[1.8rem] font-bold me-6">{data[0]}</span>
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
                                    <Link href={"/modifying/editingSet"} prefetch={true} className={'p-2 rounded-full dark:hover:bg-gray-500 me-2'}>
                                        <EditRoundedIcon
                                            className={"hover:text-blue-400 icon rounded-full text-lime-600"}
                                            sx={{fontSize: "2rem"}}/>
                                    </Link>
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
            </Link>
            <ModifyDeleteModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}
                               setName={data[0]}/>
        </>
    )
}