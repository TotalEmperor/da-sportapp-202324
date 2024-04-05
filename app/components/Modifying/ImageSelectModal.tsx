import Image from "next/image";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import React from "react";
import AddIcon from "@mui/icons-material/Add";


export default function ImageSelectModal({isOpen, onClose, images, setSelectedExerciseImage}: { isOpen: boolean; onClose: () => void; images: {imageURL: string, imageName:string}[]; setSelectedExerciseImage: (imageURL:string)=>void}) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed z-10 inset-0 "
            id="AddExercise-modal"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 ">
                <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    aria-hidden="true"
                ></div>
                <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                >
                    &#8203;
                </span>
                <div
                    className="inline-block bg-opacity-80 bg-white dark:bg-neutral-800 rounded-lg text-left shadow-xl transform transition-all sm:align-middle p-6 overflow-hidden">
                        <h3 className={`mt-3 font-semibold flex border-b border-gray-500`}>Choose Image for your Exercise</h3>

                    <div className='flex flex-wrap gap-2 mt-5 max-h-[70vh] max-w-[50vw] overflow-y-scroll justify-center items-center'>
                        {images.map((imageData, index) => (
                            <div key={index}
                                 onClick={()=>{setSelectedExerciseImage(imageData.imageURL)}}
                                 className='rounded bg-green-300 bg-opacity-80 dark:bg-gray-600 mb-2 flex items-center justify-center p-2 flex-col hover:scale-150 transition delay-150 hover:cursor-pointer'>
                                <Image src={imageData.imageURL} height={200} width={200} alt={"image"} className='rounded'/>
                                <label>{imageData.imageName}</label>
                            </div>
                        ))}
                        <button className="absolute top-0 right-0 m-4" onClick={onClose}>
                            <CloseRoundedIcon/>
                        </button>
                    </div>


                </div>
            </div>
        </div>
    )

}