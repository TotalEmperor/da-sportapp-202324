import React from "react";

export default function mainComponent({children, style}: { children: React.ReactNode, style?: string }) {
    return (

        <main role="main"
              className={"w-full flex-grow flex-shrink p-5 m-10 items-center my-5 bg-white bg-opacity-5 rounded-md flex-col flex bg-inherit "+style}>
            {children}
        </main>
    )
}