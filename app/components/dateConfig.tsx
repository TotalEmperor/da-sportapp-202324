import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import styles from "../[home]/home.module.css";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import React, {useState} from "react";


export default function dateConfig() {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [checked, setChecked] = useState<boolean[]>([]);

    const handleClick = (i: number) => {
        const newCheckedState = [...checked];
        newCheckedState[i] = !newCheckedState[i];
        setChecked(newCheckedState);
    };

    return (
        <>
            <div className="rounded-xl border-2 border-[#9a9d93] w-[70%] min-w-fit">
                <div className="w-fit justify-center flex-col mx-auto flex mb-3 px-4 pt-8 py-4">
                    <div className="flex w-fit ">
                        <span className="font-bold text-3xl">22.5-29.5</span>
                    </div>
                    <div className="flex flex-row">
                        {Array.from({length: 7}, (_, i) => (
                            <div key={i} className="flex flex-col pe-2">
                                <div
                                    onClick={() => handleClick(i)}
                                    className="cursor-pointer text-blue-500 hover:text-blue-700 flex justify-center"
                                >
                                    {checked[i] ? <CheckCircleOutlineIcon
                                            className={styles["icons"] + " fill-[#1f1f1f] hover:fill-[#9a9d93] flex justify-center"}/> :
                                        <RadioButtonUncheckedIcon
                                            className={styles["icons"] + " fill-[#9a9d93] hover:fill-[#d9e7cb] flex justify-center items-center"}/>}
                                </div>
                                <h2 className="flex justify-center">Mon</h2>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="p-2"></div>

        </>
    )
}