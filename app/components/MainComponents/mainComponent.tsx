import React from "react";

export default function mainComponent({children, style}: { children: React.ReactNode, style?: string }) {
    return (

        <main role="main"
              className={"w-auto sm:w-full flex-grow p-5 items-center m-5 dark:bg-white dark:bg-opacity-5 bg-[#efefef] rounded-md flex-col flex "+style}>
            {children}
        </main>
    )
}