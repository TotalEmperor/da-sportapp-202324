import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AddIcon from '@mui/icons-material/Add';
import React, {useEffect, useState} from "react";
import {useContextData} from "@/context/ContextData";

export default function AddModal({isOpen, onClose, setKeys, createNewSet, addExerciseToSet}: {
    isOpen: boolean;
    onClose: () => void,
    setKeys: any,
    createNewSet: (setName: string) => void,
    addExerciseToSet: (setName: string) => void
}) {

    const [newSetName, setNewSetName] = useState<string>();

    const [isFormValid, setIsFormValid] = useState(null);

    const onSetNameChange = (name) => {
        if (!setKeys.includes(name)) {
            setNewSetName(name);
            setIsFormValid(true);
        } else {
            setNewSetName(name);
            setIsFormValid(false);
        }
    }




    if (!isOpen) return null;

    return (
        <div
            className="fixed z-10 inset-0 overflow-y-auto"
            id="AddExercise-modal"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
                    className="inline-block align-bottom bg-opacity-80 bg-white dark:bg-neutral-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg w-full p-6">
                    <div className="md:flex items-center flex-col w-full">
                        <h3 className={`mt-3 font-semibold w-full flex border-b border-gray-500`}>Choose Set</h3>

                        <div className={`w-full border-b-2 border-gray-500 mt-5`}>
                            <label htmlFor="height" className="me-5">
                                <h4>Create new Set</h4>
                                <form
                                    className="flex flex-row w-full dark:bg-neutral-800 shadow overflow-hidden mt-2 shadow-gray-100 appearance-none outline-none items-center rounded border border-gray-300 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer">
                                    <input type="text"
                                           id={"setName"}
                                           onChange={(e) => {
                                               onSetNameChange(e.target.value)
                                           }}
                                           pattern={"[^\\s]*[^\\s]"}
                                           title="Must contain at least one character and no spaces"
                                           className="bg-inherit p-3 outline-none w-full">
                                    </input>
                                    <button
                                        type={"button"}
                                        disabled={!isFormValid}
                                        onClick={() => {
                                            createNewSet(newSetName)
                                        }}
                                        className="border-s-2 border-black dark:border-neutral-400 p-3 disabled:bg-gray-500 disabled:brightness-100 bg-lime-800 text-md text-center outline-0 appearance-none hover:brightness-125"
                                    >
                                        <AddIcon/>
                                    </button>
                                </form>
                                <span
                                    className={`mt-2 text-sm p-3 rounded-md text-white bg-red-500 border-red-700 ${isFormValid == false && isFormValid != null ? "block" : "hidden"}`}>
                                This exercise already exists!
                                </span>
                            </label>
                        </div>

                        <div className={`mt-5 flex flex-col w-full`}>
                            <h6>Or add Exercise to existing Set</h6>
                            {(
                                setKeys.map((setName: any, index) => (
                                        <button value={setName} key={index} onClick={(e) => {
                                            addExerciseToSet(setName)
                                        }}
                                                className={`p-4 my-2 bg-green-500 dark:bg-green-800 w-4rem rounded-md`}>{setName}</button>
                                    )
                                )
                            )}
                        </div>

                        <button className="absolute top-0 right-0 m-4" onClick={onClose}>
                            <CloseRoundedIcon/>
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}