import Starfilled from '@/icons/stars.png';
import Image from "next/image";
import Link from "next/link"
import React from "react"
import {getAuth} from "firebase/auth";


export default function ExerciseManager(props: {
    data: any;
    time: number;
    stars: number;
    moves: number;
    description: string;
    style?: string;
}) {
    const {data, time, stars,moves, description, style} = props;

    return (
        <>
            <div className={"rounded-xl border-2 border-[#9a9d93] w-[40rem] bg-white " + style}>
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
                            <p className="text-sm font-light">{description}</p>
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
            </div>
        </>
    )
}

