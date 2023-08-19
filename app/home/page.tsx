"use client"
import React, {useState} from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Head from "next/head";
import BorderContainer from "@/components/borderContainer";
import GenderDropdown from "@/components/genderDropdown";


export default function Page() {

    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const [activeTab, setActiveTab] = useState(0);

    const switchTab = (index: number) => {
        setActiveTab(index);
    };

    return (
        <>
            <Head>
                <title>Welcome Page</title>
            </Head>
            <div
                className="flex flex-col dark:bg-gradient-to-tr dark:from-green-700 dark:to-gray-100 dark:via-green-400 bg-gradient-to-tr from-gray-100 to-green-700 via-green-400 min-h-screen h-fit">
                <header>
                    <Navbar/>
                </header>
                <div className="flex-1 flex justify-center items-center">
                    <h1>Test</h1>
                </div>
            </div>
        </>
    )
}