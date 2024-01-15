"use client"
import React, {useEffect} from "react";
import Link from "next/link";
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import deleteCurrentUser from "@/firebase/auth/deleteCurrentUser";
import {useRouter} from "next/navigation";
import {getAuth} from "firebase/auth";
import getFirestoreDocument from "@/firebase/firestore/getData";
import {useContextData} from "@/context/ContextData";
import updateFirestoreDocument from "@/firebase/firestore/updateData";


export default function ModifyDeleteModal({isOpen, onClose, targetName}: { isOpen: boolean; onClose: () => void, targetName:string }) {
    const router = useRouter();
    const { day, week, setDay, setWeek } = useContextData();

    useEffect(() => {
        if (sessionStorage.getItem("day")) {
            try {
                setDay(sessionStorage.getItem("day"));
                setWeek(sessionStorage.getItem("week"))
            } catch (e) {

            }
        }
    }, []);
    const handleDelete = async (event) => {
        event.preventDefault()

        const unsubscribe = getFirestoreDocument('exercises', getAuth().currentUser.uid, async (data) => {
            if (data) {
                delete data.exercises[week][day][targetName]

                await updateFirestoreDocument("exercises", data);
            }
        });

        onClose();

        return () => {
            unsubscribe();
        };
    }

    if (!isOpen) return null;

    return (
        <div
            className="fixed z-10 inset-0 overflow-y-auto"
            id="delete-modal"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true">
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
                    className="inline-block align-bottom bg-white dark:bg-[#1D2125] text-gray-300 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                    <div className="md:flex items-center">
                        <div
                            className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                            <WarningAmberRoundedIcon/>
                        </div>
                        <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                            <p className="font-bold">Do you want to delete ?</p>
                        </div>
                    </div>
                    <div className="text-center md:text-right mt-4 md:flex md:justify-end">
                        <button
                            className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
                            onClick={handleDelete}>
                            Delete
                        </button>
                        <button
                            type="button"
                            className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4 md:mt-0 md:order-1"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}



