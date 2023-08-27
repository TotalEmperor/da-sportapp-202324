import styles from "../[home]/home.module.css";
import React from "react";


export default function confPanel({children}:{children: React.ReactNode}){
    return(
            <div className={styles["w-right-fixed"] + " max-w-[-webkit-fill-available] sm:w-full flex justify-center flex-shrink flex-grow-0 px-2 mx-4 sm:mx-0 overflow-x-scroll"}>
                <div className="flex flex-col ju px-2 w-[80%]">

                    {children}

                    <div className="bg-gray-50 rounded-xl border mb-3 w-full">
                        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:py-12 lg:px-8 lg:flex lg:items-center lg:justify-between">
                            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                <span className="block text-indigo-600">Made with Tailwind CSS!</span>
                            </h2>
                        </div>
                    </div>
                    <div className="p-2"></div>
                    <div className="bg-gray-100 rounded-xl mb-3 w-full">
                        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:py-12 lg:px-8 lg:flex lg:items-center lg:justify-between">
                            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                <span className="block">Ready to dive in?</span>
                            </h2>
                        </div>
                    </div>
                    <div className="p-2"></div>
                    <div className="bg-gray-50 rounded-xl border mb-3 w-full">
                        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:py-12 lg:px-8 lg:flex lg:items-center lg:justify-between">
                            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                <span className="block text-indigo-600">Play free at Codeply today.</span>
                            </h2>
                        </div>
                    </div>

                </div>
            </div>
    )
}