"use client"
import React, { useState } from 'react';
import Head from "next/head";
import Navbar from "@/components/Navbar";


export default function Page() {

    const [split1, setSplit1] = useState(33); // Initial split at 33%
    const [split2, setSplit2] = useState(66); // Initial split at 66%

    const handleMouseMove1 = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const newSplit = (e.clientX / window.innerWidth) * 100;
        setSplit1(newSplit);
    };


    const handleMouseMove2 = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const newSplit = (e.clientX / window.innerWidth) * 100;
        setSplit2(newSplit);
    };

    const handleMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // @ts-ignore
        document.removeEventListener('mousemove', handleMouseMove1);
        // @ts-ignore
        document.removeEventListener('mousemove', handleMouseMove2);
        // @ts-ignore
        document.removeEventListener('mouseup', handleMouseUp);
    };


    const handleMouseDown1 = () => {
        // @ts-ignore
        document.addEventListener('mousemove', handleMouseMove1);
        // @ts-ignore
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseDown2 = () => {
        // @ts-ignore
        document.addEventListener('mousemove', handleMouseMove2);
        // @ts-ignore
        document.addEventListener('mouseup', handleMouseUp);
    };

    return (
        <>
            <div
                className="flex dark:bg-gradient-to-tr dark:from-green-700 dark:to-gray-100 dark:via-green-400 bg-gradient-to-tr from-gray-100 to-green-700 via-green-400 min-h-screen h-fit">
                <header>
                    <Navbar/>
                </header>
                <div style={{ flexBasis: `${split1}%` }} className="min-w-50 w-1/3 bg-white text-black">
                    Left Pane
                </div>
                <div
                    style={{
                        width: '10px',
                        background: 'gray',
                        cursor: 'col-resize',
                    }}
                    onMouseDown={handleMouseDown1}
                />
                <div style={{ flexBasis: `${split2 - split1}%`, minWidth: "33.333333%" }} className="min-h-full w-1/3 bg-white text-black">
                    Middle Pane
                </div>
                <div
                    style={{
                        width: '10px',
                        background: 'gray',
                        cursor: 'col-resize',
                    }}
                    onMouseDown={handleMouseDown2}
                />
                <div style={{ flexBasis: `${100 - split2}%` } } className="min-h-full w-1/3 bg-white text-black">
                    Right Pane
                </div>
            </div>
        </>
    )
}