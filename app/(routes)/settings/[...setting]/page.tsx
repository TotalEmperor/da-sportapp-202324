import styles from "./settings.module.css"
import SideNav from "@/components/MainComponents/SideNav";
import MainComponent from "@/components/MainComponents/mainComponent";
import ConfPanel from "@/components/MainComponents/confPanel";
import Head from "next/head";
import Link from "next/link"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React, {Suspense} from "react";
import getSettings from "./getSettings";

export default function page({params : {setting}} ) {
    return (
        <>
            <MainComponent>
                <>
                    <div className="flex flex-col w-full">
                        <div className="border-y-2 border-gray-500 flex flex-row justify-center items-center rounded">
                            <Link
                                href={`/settings/Account`}
                                aria-current="true"
                                className="block w-full cursor-pointer bg-primary-100 p-4 text-primary-600 dark:hover:bg-gray-500 hover:bg-[#F5F3F3]">
                                Account
                                <ArrowForwardIosIcon className={"float-right"} />
                            </Link>
                        </div>
                        <div className="border-b-2 border-gray-500 flex flex-row justify-center items-center rounded">
                            <Link
                                href={`/settings/General`}
                                aria-current="true"
                                className="block w-full cursor-pointer bg-primary-100 p-4 text-primary-600 dark:hover:bg-gray-500 hover:bg-[#F5F3F3]">
                                General
                                <ArrowForwardIosIcon className={"float-right"} />
                            </Link>
                        </div>
                        <div className="border-b-2 border-gray-500 flex flex-row justify-center items-center rounded">
                            <Link
                                href={`/settings/Language`}
                                aria-current="true"
                                className="block w-full cursor-pointer bg-primary-100 p-4 text-primary-600 dark:hover:bg-gray-500 hover:bg-[#F5F3F3]">
                                Language
                                <ArrowForwardIosIcon className={"float-right"} />
                            </Link>
                        </div>
                    </div>
                </>
            </MainComponent>
            <ConfPanel>
                <Suspense>
                    {getSettings(setting)}
                </Suspense>
            </ConfPanel>
        </>
    );
}

