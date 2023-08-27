import styles from "../[home]/home.module.css";
import React from "react";


export default function mainComponent({children}:{children: React.ReactNode}) {
    return (
        <>
                <main role="main" className={styles["w-center-fixed"] + " w-full flex-grow pt-1 px-3"}>
                    {children}
                </main>
        </>
    )
}