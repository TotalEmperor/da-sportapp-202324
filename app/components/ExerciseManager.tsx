"use client"
import Starfilled from '@/icons/stars.png';
import Image from "next/image";
import Link from "next/link"
import React, {useState} from "react"
import {getAuth} from "firebase/auth";
import {ExpandLess} from "@mui/icons-material";
import {ExpandMore} from "@mui/icons-material";

export default function ExerciseManager(props: {
    data: any;
    time: number;
    stars: number;
    moves: number;
    description: string;
    image;
    style?: string;
}) {
    const {data, time, stars,moves, description, style} = props;

        const [isContentVisible, setIsContentVisible] = useState(false);

        const toggleContent = () => {
            setIsContentVisible(!isContentVisible);
        };

    return (
        <>
            <div className={"rounded-xl border-2 border-[#9a9d93] w-full bg-white dark:bg-neutral-700 " + style}>
                <div
                    className="w-full justify-center flex-col mx-auto flex px-4 pt-8 py-4">
                    <div className="flex w-fit flex-row min-h-fit">
                        <span className="left-auto text-[1.8rem] font-bold me-6">{data[0]}</span>
                        {Array.from({length: stars}, (_, i) => (
                            <div key={i} className="flex flex-col pe-2 justify-center">
                                <Image src={Starfilled} className="w-[2rem]" alt="starFilled"/>
                            </div>
                        ))}
                    </div>
                    <div className="font-bold">
                        <div className="w-[70%] mb-2">
                            <h1 className={"text-lg"}>Description:</h1>
                            <p className="text-md font-light">{description}</p>
                        </div>
                        <div className="float-right">
                            {
                                moves!=0 ?
                                    <span className="me-3">x{moves}</span>
                                :
                                    <></>
                            }
                            <span>Time: {time} Min.</span>
                        </div>
                    </div>
                </div>
                <div className="w-full justify-center flex-col mx-auto flex px-4 py-4 items-center">
                    <div className="flex items-center">
                        <div className="flex flex-col pe-2 justify-center">
                            {isContentVisible ? (
                                <ExpandLess onClick={toggleContent} />
                            ) : (
                                <ExpandMore onClick={toggleContent} />
                            )}
                        </div>
                        <span className="text-[1.2rem] font-bold me-6">Collapsible Tab</span>
                    </div>
                    {isContentVisible && (
                        <div
                            className="flex justify-center items-center mt-4">
                            <p>Test</p>
                            {/* Add any additional content here */}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

