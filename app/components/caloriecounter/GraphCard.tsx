import React from "react";


export default function GraphCard({title, text, children,style}:{title:string, text:string, children?: React.ReactNode, style?:string}){

    return(
        <div id={title}
             className={`rounded-md dark:bg-white dark:bg-opacity-10 flex flex-col p-4 w-fit m-4 ${style}`}>
            <h6>{title}</h6>
            <h1 className={'font-bold dark:text-gray-400'}>{text}</h1>
            <div>
                {children}
            </div>
        </div>
    )

}