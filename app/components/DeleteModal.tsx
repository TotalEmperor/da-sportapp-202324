"use client"
import React from "react";
import Link from "next/link";
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import deleteUser from "@/firebase/auth/deleteUser";
import {useRouter} from "next/navigation";


export default function DeleteModal({style, title, text}: { style?: string, title: string, text: string }) {
    const router = useRouter();

    const handleDelete = async (event) => {
        event.preventDefault()

        const res = await deleteUser();

        if (res) {
            router.push("/")

        }else{
            router.push("/settings/delete?deleteError=true")
        }
    }

    return (
        <div
            className="fixed z-10 inset-0 overflow-y-auto"
            id="error-modal"
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
                    className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                        <div className="md:flex items-center">
                            <div className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                                <WarningAmberRoundedIcon/>
                            </div>
                            <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                                <p className="font-bold">Delete your account</p>
                                <p className="text-sm text-gray-700 mt-1">You will lose all of your data by deleting your account. This action cannot be undone.
                                </p>
                            </div>
                        </div>
                        <div className="text-center md:text-right mt-4 md:flex md:justify-end">
                            <button className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2" onClick={handleDelete}>Delete
                                Account</button>
                            <Link
                                href="/settings/delete"
                                type="button"
                                className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4 md:mt-0 md:order-1"
                            >
                                Cancel
                            </Link>
                        </div>
                </div>
            </div>
        </div>
    );
}



