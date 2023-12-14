"use client"
import React from "react";
import Link from "next/link";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import deleteCurrentUser from "@/firebase/auth/deleteCurrentUser";
import {useRouter} from "next/navigation";
import {getAuth} from "firebase/auth";


export default function AddControlModal({style, isOpen, onClose}: {
    style?: string,
    isOpen: boolean,
    onClose: () => void,
}) {
    const router = useRouter();
    if (!isOpen) return null;

    return (
        <div
            className="fixed z-10 inset-0 overflow-y-auto"
            id="AddExercise-modal"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    aria-hidden="true"
                ></div>
                <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                >
                    &#8203;
                </span>
                <div
                    className="inline-block align-bottom bg-opacity-80 bg-white dark:bg-neutral-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg min-w-fit p-6">
                    <div className="md:flex items-center flex-col">
                        <div className="rounded-full border border-gray-300 flex items-center justify-center text-green-500 w-16 h-16 flex-shrink-0"
                        >
                            <AddCircleRoundedIcon
                                sx={{
                                    width: '70%',
                                    height: '70%',
                                }}
                            />
                        </div>
                        <h3 className={`border-b border-gray-500 mt-3 font-semibold`}>Adding Exercise</h3>
                        <div className={`mt-5 flex flex-col`}>
                            <Link href={""} className={`p-3 bg-green-400 rounded-lg mb-2 dark:bg-green-800`}>
                                Search Exercise
                            </Link>
                            <Link href={"/modifying/createExercise"} onClick={onClose} className={`p-3 bg-green-400 rounded-lg dark:bg-green-800`}>
                                Create Exercise
                            </Link>
                        </div>

                        <button className="absolute top-0 right-0 m-4" onClick={onClose}>
                            <CloseRoundedIcon/>
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}



