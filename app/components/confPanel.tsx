"use client"
import styles from "../(routes)/home/home.module.css";
import DateConfig from "@/components/dateConfig";

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

export default function confPanel({children}:{children: React.ReactNode}){

    return(
            <div className={styles["w-right-fixed"] + " max-w-[-webkit-fill-available] sm:w-full flex justify-center flex-shrink flex-grow-0 mx-4 sm:mx-0 overflow-y-scroll"}>
                <div className="flex flex-col items-center w-full">
                    {children}
                </div>
            </div>
    )
}
