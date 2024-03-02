"use client"
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, {useEffect} from "react";
import DeleteModal from "@/components/settings/DeleteModal"
import {useRouter, useSearchParams} from "next/navigation";
import {router} from "next/client";


export default function Page() {
    const router = useRouter();

    const searchParams = useSearchParams().get("modal");
    let deleteError = useSearchParams().get("deleteError");
    console.log(deleteError);

    const handleDelete = async (event) => {
        event.preventDefault();
        router.push("/settings/delete");
    }

    return (
        <>
            {deleteError &&
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-[-webkit-fill-available] mx-[7%]" role="alert">
                    <strong className="font-bold">Sorry, something went wrong</strong>
                    <span className="block sm:inline ps-1">We couldnt delete your Account, pls try later again</span>
                    <button className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={handleDelete}>
                        <svg className="fill-current h-6 w-6 text-red-500 block" role="button" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 20 20"><title>Close</title><path
                            d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
                        </svg>
                    </button>
                    <button>

                    </button>
                </div>
            }
            <div className="w-full flex-grow flex-shrink pt-1 flex-col flex px-3">
                <div className="flex w-full items-center border-b-2 border-gray-300 pb-[1.5rem]">
                    <Link
                        className="hover:bg-gray-200 rounded-full w-fit p-2"
                        href="/settings/Account">
                        <ArrowBackIcon/>
                    </Link>
                    <span className="font-bold text-xl ms-4">Delete Account</span>
                </div>
                <div className="flex flex-row w-full mt-4 ms-4">
                    <Link href="/settings/delete?modal=true"
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Delete my Account
                    </Link>
                </div>
            </div>
            {searchParams && <DeleteModal text="Test" title="Test123"/>}
        </>
    )

}