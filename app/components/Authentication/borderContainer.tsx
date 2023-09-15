import React from "react";
export default function borderContainer({children, width, title}:{children: React.ReactNode, width?: string, title: string}) {

    return (
        <div className={"bg-white text-black row-span2 flex-col" + (width ? " "+ width: "")}>
            <div className="container mx-auto">
                <div className="relative rounded-md border border-gray-600 min-w-fit flex">
                    <h2 className="absolute inline-flex top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-fit">
                        <span className="bg-white font-bold text-sm w-max px-1">{title}</span>
                    </h2>
                    <main className="my-2 mx-2 w-full">{children}</main>
                </div>
            </div>
        </div>
    );
}

