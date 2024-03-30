"use client"
import Image from "next/image";
import Link from "next/link"
import React, {useEffect, useState} from "react"
import {ExpandLess} from "@mui/icons-material";
import {ExpandMore} from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import ModifyDeleteModal from "@/components/Modifying/ModifyDeleteModal";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import {getAuth} from "firebase/auth";
import {Exercise} from "@/interfaces/Exercise";
import {useContextData} from "@/context/ContextData";
import {useRouter, redirect} from "next/navigation";
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
export default function ExerciseManager(props: {
    data: Exercise;
    time: number;
    stars: number;
    moves: number;
    description: string;
    modify?: boolean;
    search?: boolean;
    setName?: string;
    exerciseName: string;
    style?: string;
}) {
    const {data, time, stars, moves, description, modify, search, setName, exerciseName, style} = props;

    const [isContentVisible, setIsContentVisible] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const {day, week, setDay, setWeek} = useContextData();
    const router = useRouter();




    const [user, setuser] = useState(() => {
        // if a user is already logged in, use the current user object, or `undefined` otherwise.
        try {
            return getAuth().currentUser.uid || undefined;
        } catch (e) {
            console.log(e)
        }
    });

    useEffect(() => {
        if (user === null) {

            return;
        }

        if (!user) {
            // user still loading, do nothing yet
            return;
        }

    }, [user, day, week]); // <-- rerun when user changes

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

    const redirect = () => {
        if (search) {
            router.push(`/modifying/searchExercise/templates/configure?setName=${setName}&exerciseName=${exerciseName}`)
        }
    }

    return (
        <>
            <div
                className={"rounded-xl w-full hover:bg-green-100 dark:hover:bg-opacity-40 dark:shadow-neutral-600 shadow-md bg-[#efefef] dark:bg-black dark:bg-opacity-[50%] " + style}
                onClick={redirect}>
                <div
                    className="w-full justify-center flex-col mx-auto flex px-4 pt-8 py-4">
                    <div className="flex w-fit flex-row min-h-fit">
                        <span className="left-auto text-[1.8rem] font-bold me-6">{exerciseName}</span>
                        {Array.from({length: stars}, (_, i) => (
                            <div key={i} className="flex flex-col pe-2 justify-center">
                                <StarRoundedIcon sx={{fontSize: "2.5rem", fill: "gold"}}/>
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
                                            exerciseName: exerciseName,
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
                            <span>Time: {time < 60 ? time + " sec." : Math.floor(time / 60) + ":" + (time % 60) + " Min."}</span>
                        </div>
                    </div>
                </div>
                {
                    data.image ?
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
                                <label className="text-[1.2rem] hover:cursor-pointer font-bold me-6">Image</label>
                            </div>
                            {isContentVisible && (
                                <div
                                    className="flex justify-center items-center my-4">
                                    <Image src={data.image} width={300} height={300} alt={"image"}
                                           className={"rounded"}/>
                                </div>
                            )}
                        </div>
                        :
                        ""
                }
            </div>
            <ModifyDeleteModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}
                               setName={setName} exerciseName={exerciseName}/>
        </>
    )
}

