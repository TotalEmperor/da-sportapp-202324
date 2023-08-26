import React from "react";
import Link from 'next/link'
import Image from 'next/image'
import Logo from '../../public/images/hope.svg'
import LogoDark from "../../public/images/irgendwiesohalt.svg"
import styles from "../[home]/home.module.css";
import TimerIcon from "@mui/icons-material/Timer";
import modifyingOff from "@/icons/modifyingoff.svg";
import BarChartIcon from "@mui/icons-material/BarChart";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

export default function SideNav() {
    return (
        <>
            <div className={styles["w-left-fixed"] + " w-full flex-shrink flex-grow-0 px-4 "}>
                <div
                    className="sticky top-0 sm:p-4 rounded-xl w-full h-full bg-[#F3F6EB] border-solid border-gray-300 border-2 min-w-fit flex flex-col">
                    <div className="flex-col justify-center items-center mb-[15%] mt-[15%] hidden sm:flex">
                        <Image src={Logo} alt="Logo"/>
                    </div>
                    <div className="flex flex-col sm:mt-[20%] items-center min-w-fit">
                        <ul className="flex sm:flex-col overflow-hidden justify-center content-center w-[75%] min-w-fit">
                            <li className="py-2 rounded-3xl hover:bg-[#d9e7cb]">
                                <a className="truncate" href="#">
                                    <TimerIcon className={styles["icons"]+" fill-black dark:fill-none sm:mx-2 mx-4 inline"}></TimerIcon>
                                    <span className="hidden sm:inline">Workout</span>
                                </a>
                            </li>
                            <li className="py-2 rounded-3xl hover:bg-[#d9e7cb]">
                                <a className="truncate" href="#">
                                    <Image src={modifyingOff} alt="ModifyingOn" className={styles["icons"] + " sm:mx-2 mx-4 inline"} />
                                    <span className="hidden sm:inline">Modifying</span>
                                </a>
                            </li>
                            <li className="py-2 rounded-3xl hover:bg-[#d9e7cb]">
                                <a className="" href="#">
                                    <BarChartIcon className={styles["icons"] + " sm:mx-2 mx-4 inline"}></BarChartIcon>
                                    <span className="hidden sm:inline">Calc. Counter</span>
                                </a>
                            </li>
                            <li className={"py-2 rounded-3xl hover:bg-[#d9e7cb]"}>
                                <a className="" href="#">
                                    <ManageAccountsOutlinedIcon className={styles["icons"] + " sm:mx-2 mx-4 inline"}></ManageAccountsOutlinedIcon>
                                    <span className="hidden sm:inline">Options</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="flex justify-center items-center flex-col sm:mt-[40%]">
                        <button className={"w-full text-4xl rounded-3xl bg-[#046a4f] inline text-white font-bold p-2 hover:bg-green-500"}>
                            Start
                        </button>
                    </div>
                    <div className="flex justify-center items-center flex-col flex-grow">
                        <a className="hover:bg-[#d9e7cb] rounded-3xl py-2 w-full justify-center items-center hidden sm:flex">
                            <AccountCircleOutlinedIcon className={styles["icons"]+ " sm:mx-2 mx-4 inline"}></AccountCircleOutlinedIcon>
                            <span className="hidden sm:inline">TestAccount</span>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}