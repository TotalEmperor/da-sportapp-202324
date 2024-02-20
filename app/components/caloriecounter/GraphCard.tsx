import React from "react";


export default function GraphCard({title, text,style, onClick, selectedCard}:{title:string, text:string, style?:string, onClick?: ()=>void, selectedCard: boolean}){

    return(
        <div id={title}
             onClick={onClick}
             className={`rounded-md dark:bg-white dark:bg-opacity-10 p-4 w-fit m-4 min-h-fit h-[-webkit-fill-available] hover:cursor-pointer ${style} ${selectedCard?"border-2 border-blue-600 dark:bg-opacity-20":""}`}>
            <h6>{title}</h6>
            <h1 className={'font-bold dark:text-gray-400'}>{text}</h1>
        </div>
    )

}