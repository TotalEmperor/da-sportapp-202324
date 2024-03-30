"use client"
import React, {useEffect, useState} from "react";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Image from "next/image";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import ImageSelectModal from "@/components/Modifying/ImageSelectModal";
import {getAuth} from "firebase/auth";
import {useContextData} from "@/context/ContextData";
import {useRouter, useSearchParams} from "next/navigation";
import {getDownloadURL, getStorage, listAll, ref} from "firebase/storage";
import getFirestoreDocument from "@/firebase/firestore/getData";
import setDocument from "@/firebase/firestore/setDocument";
import AddModal from "@/components/Modifying/AddingExerciseModal";

export default function Page() {
    const [user, setuser] = useState(() => {
        // if a user is already logged in, use the current user object, or `undefined` otherwise.
        try {
            return getAuth().currentUser.uid || undefined;
        } catch (e) {
            console.log(e)
        }
    });

    const [difficulty, setDifficulty] = useState<number>(0)
    const [hoverDifficulty, setHoverDifficulty] = useState<number>(-1);
    const [exerciseName, setExerciseName] = useState<string>("");
    const [setNames, setSetNames] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [repMode, setRepMode] = useState<boolean>(true);
    const [rep, setRep] = useState<number>(0);
    const [timerMode, setTimerMode] = useState<boolean>(true);
    const [timer, setTimer] = useState<number>(0);
    const [breakTime, setBreakTime] = useState<number>(0);
    const [selectedImage, setSelectedImage] = useState("");
    const [images, setImages] = useState<{ imageURL: string, imageName: string }[]>([]);
    const [exerciseData, setExerciseData] = useState<any>([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentExercise, setCurrentExercise] = useState<any>([]);
    const [setKeys, setSetKeys] = useState<string[]>([]);


    const [isImageSelectModalOpen, setIsImageSelectModalOpen] = useState(false);

    const {day, week, setDay, setWeek} = useContextData();

    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            setExerciseData(null); // <-- clear data when not logged in
            return;
        }

        const storage = getStorage();

        const listRef = ref(storage, 'images');

        listAll(listRef)
            .then((res) => {
                res.items.forEach((itemRef) => {
                    getDownloadURL(itemRef).then((imageURL: string) => {
                        const imageData = {imageURL: imageURL, imageName: itemRef.name};
                        images.push(imageData)
                    });
                });
            }).catch((error) => {
            // Uh-oh, an error occurred!
        });

        listAll(listRef);

        const unsubscribe =()=>{
            getFirestoreDocument('exampleexercises', "CB6Eqnz7qfDrfcwuZJPn", (data) => {
                if (data) {
                    const exerciseName = searchParams.get("exerciseName");
                    const setName = searchParams.get("setName");
                    const currentExercise = data.exampleexercises[setName][exerciseName];
                    setCurrentExercise(currentExercise);
                    setDescription(currentExercise.description);
                    setTimer(currentExercise.time);
                    setRep(currentExercise.moves);
                    setTimerMode(currentExercise.time != 0);
                    setRepMode(currentExercise.moves != 0);
                    setDifficulty(currentExercise.stars);
                    setSelectedImage(currentExercise.image);
                    setBreakTime(currentExercise.breakTime);
                    setExerciseName(exerciseName);
                    setHoverDifficulty(currentExercise.stars);
                    setSetNames(setName);
                }
                });

            getFirestoreDocument('exercises', user, (data) => {
                if (data) {
                    setExerciseData(data);
                    setSetKeys(Object.keys(data.exercises[week][day]));
                }
            });
        };

        return () => {
            unsubscribe();
        };

    }, [user, day, week]); // <-- rerun when user changes

    useEffect(() => {
        if (!repMode) {
            setRep(0)
        }
    }, [repMode]);

    useEffect(() => {
        if (!timerMode) {
            setTimer(0)
        }
    }, [timerMode]);

    const openImageSelectModal = (e) => {
        e.preventDefault();
        setIsImageSelectModalOpen(true);
    }

    const closeImageSelectModal = () => {
        setIsImageSelectModalOpen(false);
    }

    const setSelectedExerciseImage = (imageURL: string) => {
        setIsImageSelectModalOpen(false);
        setSelectedImage(imageURL);
    }

    const openModal = (e) => {
        e.preventDefault();
        setModalOpen(true);
    }
    const closeModal = () => setModalOpen(false);

    const addExerciseToSet = (setName: string) => {
        let schedule = exerciseData["exercises"][week][day];

        schedule[setName][exerciseName] = {
            "image": selectedImage,
            "moves": rep, // Replace with the actual number of moves
            "description": description,
            "met": currentExercise.met,
            "time": timer, // Replace with the actual time
            "stars": difficulty + 1, // Replace with the actual stars rating
            "breakTime": breakTime // Replace with the actual break time

        };
        
        setExerciseData(exerciseData["exercises"][week][day] = schedule);

        setDocument("exercises", user, exerciseData).then(r => {
            router.push(`/modifying/${setName}`)
        });
    }

    const createNewSet = (setName: string) => {
        let schedule = exerciseData["exercises"][week][day];

        schedule[setName] = {
            [exerciseName]: {
                "image": selectedImage,
                "moves": rep, // Replace with the actual number of moves
                "description": description,
                "met": currentExercise.met,
                "time": timer, // Replace with the actual time
                "stars": difficulty + 1, // Replace with the actual stars rating
                "breakTime": breakTime // Replace with the actual break time
            }

        };
        setExerciseData(exerciseData["exercises"][week][day] = schedule);

        setDocument("exercises", user, exerciseData).then(r => {
            router.push(`/modifying/${setName}`)
        });
    };

    return (
        <>
            <div className="w-full flex-grow flex-shrink pt-1 flex-col flex px-3 dark:text-white text-neutral-800">
                <div className="flex w-full items-center border-b-2 border-gray-300 pb-[1.5rem]">
                    <button
                        className="hover:bg-gray-200 rounded-full w-fit p-2"
                        onClick={router.back}>
                        <ArrowBackIcon/>
                    </button>
                    <span className="font-bold text-xl ms-4">Configure Exercise</span>
                </div>
                <form className={"flex flex-col group px-10 mt-5 w-fit"}>
                    <label htmlFor="exerciseName" className="mb-5 sm:w-[50%] flex flex-col">
                        <span>Name</span>
                        <input
                            type="text"
                            name="exerciseName"
                            onChange={(e) => {
                                setExerciseName(e.target.value)
                            }}
                            value={exerciseName}
                            id="exerciseName"
                            pattern={`^[A-Za-z0-9\\s\\-_]+$`}
                            className="rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
                            required
                        />
                    </label>
                    <label htmlFor="exerciseDescription" className="mb-5 sm:w-[50%] flex flex-col">
                        <span>Description</span>
                        <textarea
                            name="exerciseDescription"
                            id="exerciseDescription"
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value)
                            }}
                            className="rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                            required
                        />
                    </label>
                    <div className="flex sm:flex-row mb-5 flex-col">
                        <label htmlFor="timer" className="me-5">
                            <span>Mode</span>
                            <div
                                className="flex flex-row w-full dark:bg-neutral-800 shadow mt-2 shadow-gray-100 appearance-none outline-none items-center rounded border border-gray-300 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer">
                                <select
                                    id={"timer"}
                                    value={timerMode.toString()}
                                    onChange={(e) => {
                                        setTimerMode(JSON.parse(e.target.value))
                                    }}
                                    className="border-e-2 border-black dark:border-neutral-400 p-2 bg-inherit min-w-fit w-[15%] text-md text-center outline-0 appearance-none">
                                    <option value={"true"}>Timer</option>
                                    <option value={"false"}>It should take</option>
                                </select>
                                <input type="number"
                                       id={"modeInput"}
                                       value={timer}
                                       onChange={(e) => {
                                           setTimer(e.target.valueAsNumber)
                                       }}
                                       className={`bg-inherit p-3 outline-none w-[5vw] ${timerMode ? "" : "text-transparent"}`}
                                       disabled={!timerMode}
                                       required>
                                </input>
                            </div>
                        </label>

                        <label htmlFor="repMode">
                            <span>rep. Mode</span>
                            <div
                                className="flex flex-row w-full dark:bg-neutral-800 shadow mt-2 shadow-gray-100 appearance-none outline-none items-center rounded border border-gray-300 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer">
                                <select
                                    id={"repMode"}
                                    value={repMode.toString()}
                                    onChange={(e) => {
                                        setRepMode(JSON.parse(e.target.value))
                                    }}
                                    className="border-e-2 border-black dark:border-neutral-400 p-2 bg-inherit min-w-fit w-[15%] text-md text-center outline-0 appearance-none">
                                    <option value="true">x. Times</option>
                                    <option value="false">∞</option>
                                </select>
                                <input type="number"
                                       id={"secInput"}
                                       value={rep}
                                       onChange={(e) => {
                                           setRep(e.target.valueAsNumber)
                                       }}
                                       className={`bg-inherit p-3 outline-none w-[5vw] ${repMode ? "" : "text-transparent"}`}
                                       disabled={!repMode}
                                       required>
                                </input>
                            </div>
                        </label>
                    </div>
                    <div className={'bg-green-500 hover:bg-lime-700 rounded flex flex-col justify-center w-fit mb-2'}>
                        {selectedImage ?
                            <Image src={selectedImage} alt={"image"} height={200} width={200}
                                   className={`${selectedImage ? "" : "hidden"} rounded hover:scale-150 transition delay-300`}/>
                            :
                            <></>
                        }
                        <button
                            className={'p-2'}
                            onClick={(e) => {
                                openImageSelectModal(e)
                            }}>Select Image
                        </button>
                    </div>
                    <div>
                        <span>Difficulty</span>
                        <div className={"flex flex-row"}>
                            {Array.from({length: 4}).map((_, index) => (
                                <StarRoundedIcon key={index}
                                                 className={`${index <= hoverDifficulty ? "text-blue-200" : ""} ${index <= difficulty ? "text-yellow-300" : ""} hover:cursor-pointer me-2`}
                                                 sx={{fontSize: "3.5rem"}}
                                                 onClick={() => {
                                                     setDifficulty(index)
                                                 }}
                                                 onMouseEnter={() => {
                                                     setHoverDifficulty(index)
                                                 }}
                                                 onMouseLeave={() => {
                                                     setHoverDifficulty(-1)
                                                 }}/>
                            ))}
                        </div>
                    </div>
                    <label htmlFor="breakTime" className="mb-5 sm:w-[50%] flex flex-col">
                        <span>Break Time.</span>
                        <input
                            type="number"
                            name="breakTime"
                            value={breakTime}
                            onChange={(e) => {
                                setBreakTime(e.target.valueAsNumber)
                            }}
                            id="breakTime"
                            min={1}
                            placeholder={"time (s.)"}
                            className="rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
                            required
                        />
                    </label>
                    <button type="button"
                            onClick={openModal}
                            className="mt-5 bg-green-500 dark:bg-green-800 py-3 rounded-md text-white group-invalid:pointer-events-none group-invalid:opacity-50">
                        Add Exercise
                    </button>
                </form>
            </div>
            <ImageSelectModal isOpen={isImageSelectModalOpen} onClose={closeImageSelectModal} images={images}
                              setSelectedExerciseImage={setSelectedExerciseImage}/>
            <AddModal isOpen={isModalOpen} onClose={closeModal} setKeys={setKeys}
                      createNewSet={createNewSet} addExerciseToSet={addExerciseToSet}/>
        </>
    )
}