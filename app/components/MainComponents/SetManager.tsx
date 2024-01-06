import Starfilled from '@/icons/stars.png';
import Image from "next/image";
import Link from "next/link"
import React from "react"
import VisibilityIcon from '@mui/icons-material/Visibility';
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
            <Link href={link} prefetch={true}
                    className={"w-full"}>
                <div
                    className={"rounded-xl border-2 border-[#9a9d93] w-full my-3 dark:shadow-neutral-600 shadow-md bg-white dark:bg-neutral-700 hover:bg-green-300 " + style}>
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
                        <div className="relative h-[2rem] mb-3">
                            <Link href={link} className="absolute right-0" prefetch={true}>
                                <VisibilityIcon className={"hover:text-blue-400"} sx={{fontSize: "2rem"}}/>
                            </Link>
                        </div>
                        <div className="text-[1rem] font-bold">
                            <span className="me-3">Time: {time} Min.</span>
                            <span>Exercises: {exerciseNum}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}