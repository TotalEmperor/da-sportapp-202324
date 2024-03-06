import React from "react";


export default function GraphCard({title,style, onClick, selectedCard, children}:{title:string, style?:string, onClick?: ()=>void, selectedCard: boolean, children: React.ReactNode}){

    return(
        <div id={title}
             onClick={onClick}
             className={`rounded-md dark:bg-white dark:bg-opacity-10 p-4 w-fit m-4 min-h-fit h-[-webkit-fill-available] dark:shadow-neutral-600 shadow-md hover:cursor-pointer ${style} ${selectedCard?"border-2 border-blue-600 dark:bg-opacity-20 bg-lime-200":" bg-white"}`}>
            <h6>{title}</h6>
            {children}
        </div>
    )

}