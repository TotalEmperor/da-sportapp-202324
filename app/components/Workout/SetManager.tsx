import Starfilled from '@/icons/stars.png';
import Image from "next/image";
import Link from "next/link"
import React from "react"
import {getAuth} from "firebase/auth";


export default function SetManager(props: {
    data: any;
    link: string;
    time: number;
    stars: number;
    exerciseNum: number;
    style?: string;
}) {
    const {data, link, time, stars, exerciseNum, style} = props;

    return (
        <>
            <div className={"rounded-xl border-2 border-[#9a9d93] w-[40rem] my-3 bg-white " + style}>
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
                    <div className="relative h-[1.8rem] mb-3">
                        <Link href={link} className="absolute right-0 text-green-800"><span
                            className="text-[1.8rem] font-bold">View</span>
                        </Link>
                    </div>
                    <div className="text-[1rem] font-bold">
                        <span className="me-3">Time: {time} Min.</span>
                        <span>Exercises: {exerciseNum}</span>
                    </div>
                </div>
            </div>
        </>
    )
}