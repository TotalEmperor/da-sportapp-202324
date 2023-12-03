import styles from "../../(routes)/workout/workout.module.css";
import React from "react";

export default function mainComponent({children, style}: { children: React.ReactNode, style?: string }) {
    return (

        <main role="main"
              className={styles["w-center-fixed"] + " w-full flex-grow flex-shrink pt-1 px-3 items-center flex-col flex bg-inherit "+style}>
            {children}
        </main>
    )
}