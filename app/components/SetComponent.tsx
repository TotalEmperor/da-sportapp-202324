import Starfilled from '@/icons/stars.png';
import React from "react";
import Image from "next/image";
import Link from "next/link"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import styles from "../[home]/home.module.css";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";


export default function setComponent() {
    return (
        <>
            <div className="rounded-xl border-2 border-[#9a9d93] w-[85%] my-2">
                <div className="w-full justify-center flex-col mx-auto flex px-4 pt-8 py-4">
                    <div className="flex w-fit flex-row min-h-fit">
                        <span className="left-auto text-[1.8rem] font-bold me-6">Leg Set</span>
                        {Array.from({length: 3}, (_, i) => (
                            <div key={i} className="flex flex-col pe-2 justify-center">
                                <Image src={Starfilled} className="w-[2rem]" alt="starFilled"/>
                            </div>
                        ))}
                    </div>
                    <div className="relative h-[1.8rem] mb-3">
                        <Link href="#" className="absolute right-0 text-green-800"><span
                            className="text-[1.8rem] font-bold">View</span></Link>
                    </div>
                    <div className="text-[1rem] font-bold">
                        <span>Time:</span>
                    </div>
                </div>
            </div>
        </>
    )
}