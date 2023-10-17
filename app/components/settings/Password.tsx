import React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from "next/link";
import BorderContainer from "@/components/Authentication/borderContainer";

export default function Password(){

    return(
        <div className="w-full flex-grow flex-shrink pt-1 flex-col flex px-3">
            <div className="flex w-full items-center border-b-2 border-gray-300 pb-[1.5rem]">
                <Link
                    className="hover:bg-gray-200 rounded-full w-fit p-2"
                    href="/settings/Account">
                    <ArrowBackIcon/>
                </Link>
                <span className="font-bold text-xl ms-4">Change your password</span>
            </div>
            <div className="flex flex-col mt-3">
                <BorderContainer title="Current Password" style="md:w-[30vw] mb-10">
                    <input
                        type="password"
                        name="password-name"
                        id="password"
                        className="text-center outline-0 w-full"
                    />
                </BorderContainer>
                <BorderContainer title="New Password" style="md:w-[30vw]">
                    <input
                        type="password"
                        name="password-name"
                        id="password"
                        className="text-center outline-0 w-full"
                    />
                </BorderContainer>

                <BorderContainer title="New Password again" style="md:w-[30vw] mt-5">
                    <input
                        type="password"
                        name="password-name"
                        id="password"
                        className="text-center outline-0 w-full"
                    />
                </BorderContainer>
            </div>
            <div className="mt-4 w-full flex">
                <Link href="" className="ms-auto me-[10vw] rounded-md bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Save
                </Link>
            </div>
        </div>
    )

}