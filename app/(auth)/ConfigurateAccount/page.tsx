import React from "react"
import Head from "next/head";
import Navbar from "@/components/Navbar";

export default function page() {


    return (
        <>

            <div
                className="flex flex-col dark:bg-gradient-to-tr dark:from-green-700 dark:to-gray-100 dark:via-green-400 bg-gradient-to-tr from-gray-100 to-green-700 via-green-400 min-h-screen h-fit">
                <div className="flex-1 flex justify-center items-center">
                    <form className="bg-white shadow-lg rounded-md p-5 md:p-10 flex flex-col min-w-fit max-w-lg group"
                          noValidate>
                        <div className="border-b-2 border-black mb-[2vh]">
                            <h1>Pls enter your personal Information, so we can customize your experience</h1>
                        </div>
                        <label htmlFor="birthday" className="mb-5">
                            <span>Birthday</span>
                            <input type="date"
                                   className="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"/>
                        </label>
                        <label htmlFor="weight" className="mb-5">
                            <span>Weight</span>
                            <div
                                className="flex flex-row w-full bg-inherit shadow shadow-gray-100 appearance-none outline-none text-neutral-800 items-center rounded border border-gray-300 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer">
                                <input type="number" className="w-full  bg-inherit p-3  outline-none"/>
                                <select
                                    className="border-s-2 border-black p-2 w-[15%] text-md text-center outline-0 appearance-none">
                                    <option value="kg">kg</option>
                                    <option value="pounds">pounds</option>
                                </select>
                            </div>
                        </label>
                        <label htmlFor="height" className="mb-5">
                            <span>Height</span>
                            <div
                                className="flex flex-row w-full bg-inherit shadow shadow-gray-100 appearance-none outline-none text-neutral-800 items-center rounded border border-gray-300 invalid:border-red-500 peer">
                                <input type="number" className="w-full bg-inherit p-3 outline-none"/>
                                <select
                                    className="border-s-2 border-black p-2 w-[15%] text-md text-center outline-0 appearance-none">
                                    <option value="cm">cm</option>
                                    <option value="feet">feet</option>
                                </select>
                            </div>
                        </label>
                        <label  htmlFor="Language" className="mb-5">
                            <div
                                className="flex flex-row min-w-fit w-[10vw] bg-inherit shadow shadow-gray-100 appearance-none outline-none text-neutral-800 items-center rounded border border-gray-300 invalid:border-red-500 peer">
                                <select
                                    id="language"
                                    name="language"
                                    autoComplete="language-name"
                                    className="text-center outline-0 w-full border-none  p-4">
                                    <option>German</option>
                                    <option>English</option>
                                    <option>Turkish</option>
                                </select>
                            </div>
                        </label>
                    </form>
                </div>
            </div>
        </>
    )
}