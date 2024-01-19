"use client"
import Starfilled from '@/icons/stars.png';
import Image from "next/image";
import Link from "next/link"
import React, {useState} from "react"
import {getAuth} from "firebase/auth";
import {ExpandLess} from "@mui/icons-material";
import {ExpandMore} from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import ModifyDeleteModal from "@/components/Modifying/ModifyDeleteModal";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

export default function ExerciseManager(props: {
    data: any;
    time: number;
    stars: number;
    moves: number;
    description: string;
    modify?: boolean;
    setName?: string;
    image;
    style?: string;
}) {
    const {data, time, stars, moves, description, modify, setName, style} = props;

    const [isContentVisible, setIsContentVisible] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

    const openDeleteModal = (e) => {
        e.preventDefault();
        setIsDeleteModalOpen(true);
    }

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    }

    const toggleContent = () => {
        setIsContentVisible(!isContentVisible);
    };

    return (
        <>
            <div
                className={"rounded-xl w-full hover:bg-green-300 dark:hover:bg-opacity-40 dark:shadow-neutral-600 shadow-md bg-dark dark:bg-black dark:bg-opacity-[50%] " + style}>
                <div
                    className="w-full justify-center flex-col mx-auto flex px-4 pt-8 py-4">
                    <div className="flex w-fit flex-row min-h-fit">
                        <span className="left-auto text-[1.8rem] font-bold me-6">{data[0]}</span>
                        {Array.from({length: stars}, (_, i) => (
                            <div key={i} className="flex flex-col pe-2 justify-center">
                                <StarRoundedIcon sx={{fontSize: "2.5rem", fill: "yellow"}} />
                            </div>
                        ))}
                    </div>
                    <div className="font-bold">
                        <div className="w-[70%] mb-2">
                            <h1 className={"text-lg"}>Description:</h1>
                            <p className="text-md font-light">{description}</p>
                        </div>
                        {
                            modify ?
                                <div className="flex justify-end items-end h-[2rem] mb-3">

                                    <button onClick={openDeleteModal}
                                            className={'p-2 rounded-full dark:hover:bg-opacity-5 me-2 dark:hover:bg-white'}>
                                        <DeleteIcon className={"z-10 hover:text-blue-400 text-red-600 rounded"}
                                                    sx={{fontSize: "2rem"}}/>
                                    </button>
                                    <Link href={{
                                            pathname: "/modifying/editExercise",
                                            query: {
                                                setName: setName,
                                                exerciseName: data[0],
                                            }
                                        }}
                                          className={'p-2 rounded-full dark:hover:bg-opacity-5 me-2 dark:hover:bg-white'}>
                                        <EditRoundedIcon
                                            className={"hover:text-blue-400 icon rounded-full text-lime-600"}
                                            sx={{fontSize: "2rem"}}/>
                                    </Link>
                                </div>
                                :
                                <>
                                </>
                        }
                        <div className="float-right">
                            {
                                moves != 0 ?
                                    <span className="me-3">x{moves}</span>
                                    :
                                    <></>
                            }
                            <span>Time: {time<60? time+" sec." : Math.floor(time / 60) +":"+(time%60)+" Min."}</span>
                        </div>
                    </div>
                </div>
                {
                    data[1].image ?
                        <div className="w-full justify-center flex-col mx-auto flex items-center ">
                            <div
                                className="flex w-full hover:cursor-pointer items-center justify-center hover:bg-neutral-600 rounded-xl p-2"
                                onClick={toggleContent}>
                                <div className="flex flex-col pe-2 justify-center">
                                    {isContentVisible ? (
                                        <ExpandLess/>
                                    ) : (
                                        <ExpandMore/>
                                    )}
                                </div>
                                <label className="text-[1.2rem] hover:cursor-pointer font-bold me-6">Collapsible
                                    Tab</label>
                            </div>
                            {isContentVisible && (
                                <div
                                    className="flex justify-center items-center my-4">
                                    <Image src={data[1].image} width={300} height={300} alt={"image"}
                                           className={"rounded"}/>
                                </div>
                            )}
                        </div>
                        :
                        ""
                }
            </div>
            <ModifyDeleteModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}
                               setName={setName} exerciseName={data[0]}/>
        </>
    )
}

