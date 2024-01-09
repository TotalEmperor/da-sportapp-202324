"use client"
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, {Suspense, useEffect, useState} from "react";
import AddModal from "@/components/Modifying/AddingExerciseModal";
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import {useContextData} from "@/context/ContextData";
import getFirestoreDocument from "@/firebase/firestore/getData";
import {getAuth} from "firebase/auth";
import addData from "@/firebase/firestore/addData";
import {useRouter} from "next/navigation";
import {getStorage, ref, listAll, getDownloadURL} from "firebase/storage";
import Image from "next/image";
import ImageSelectModal from "@/components/Modifying/ImageSelectModal";

export default function CreateExercise() {
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
    const [description, setDescription] = useState<string>("");
    const [repMode, setRepMode] = useState<boolean>(true);
    const [rep, setRep] = useState<number>(0);
    const [timerMode, setTimerMode] = useState<boolean>(true);
    const [timer, setTimer] = useState<number>(0);
    const [breakTime, setBreakTime] = useState<number>(0);
    const [selectedImage, setSelectedImage] = useState("");
    const [images, setImages] = useState([]);
    const [userdata, setUserdata] = useState([]);
    const [exerciseData, setExerciseData] = useState([]);

    const [isModalOpen, setModalOpen] = useState(false);
    const [isImageSelectModalOpen, setIsImageSelectModalOpen] = useState(false);

    const {day, week, setDay, setWeek} = useContextData();
    const router = useRouter();


    useEffect(() => {
        if (sessionStorage.getItem("day")) {
            try {
                setDay(sessionStorage.getItem("day"));
                setWeek(sessionStorage.getItem("week"))
            } catch (e) {

            }
        }
    }, []);

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



    const openModal = (e) => {
        e.preventDefault();
        setModalOpen(true);
    }
    const closeModal = () => setModalOpen(false);

    const openImageSelectModal = (e)=>{
        e.preventDefault();
        setIsImageSelectModalOpen(true);
    }

    const closeImageSelectModal = ()=>{
        setIsImageSelectModalOpen(false);
    }


// keeps `userdata` up to date

    useEffect(() => {
        if (user === null) {
            setUserdata(null); // <-- clear data when not logged in

            return;
        }

        if (!user) {
            // user still loading, do nothing yet
            return;
        }

        const storage = getStorage();

        const listRef = ref(storage, 'images');

        listAll(listRef)
            .then((res) => {
                res.items.forEach((itemRef) => {
                    getDownloadURL(itemRef).then((imageURL:string)=>{
                        const imageData = [imageURL, itemRef.name];
                        images.push(imageData)
                    });
                });
            }).catch((error) => {
            // Uh-oh, an error occurred!
        });

        listAll(listRef);

        const unsubscribe = getFirestoreDocument('exercises', user, (data) => {
            if (data) {
                setUserdata(data)
                getSets(data, day, week).then((exercisesData) => {
                    if (exercisesData) {
                        setExerciseData(exercisesData.objArray);
                    }

                })
            }
        });

        return () => {
            unsubscribe();
        };

    }, [user, day, week]); // <-- rerun when user changes




    const createNewSet = (setName: string) => {
        let schedule = userdata["exercises"][week][day];

        schedule[setName] = {
            [exerciseName]: {
                "image": selectedImage,
                "moves": rep, // Replace with the actual number of moves
                "description": description,
                "time": timer, // Replace with the actual time
                "stars": difficulty+1, // Replace with the actual stars rating
                "breakTime": breakTime // Replace with the actual break time
            }

        };

        setUserdata(userdata["exercises"][week][day]=schedule)
        addData("exercises", user, userdata).then(r => {
            router.push(`/modifying/${setName}`)
        });



        //addData("exercise", user, "");
    };

    const addExerciseToSet = (setName:string)=>{
        let schedule = userdata["exercises"][week][day];

        schedule[setName][exerciseName] = {
                "image": selectedImage,
                "moves": rep, // Replace with the actual number of moves
                "description": description,
                "time": timer, // Replace with the actual time
                "stars": difficulty+1, // Replace with the actual stars rating
                "breakTime": breakTime // Replace with the actual break time

        };


        setUserdata(userdata["exercises"][week][day]=schedule)
        addData("exercises", user, userdata).then(r => {
            router.push(`/modifying/${setName}`)
        });
    }

    const setSelectedExerciseImage = (imageURL:string) =>{
        setIsImageSelectModalOpen(false);
        setSelectedImage(imageURL);
    }


    return (
        <>
            <div className="w-full flex-grow flex-shrink pt-1 flex-col flex px-3 dark:text-white text-neutral-800">
                <div className="flex w-full items-center border-b-2 border-gray-300 pb-[1.5rem]">
                    <Link
                        className="hover:bg-gray-200 rounded-full w-fit p-2"
                        href="/modifying">
                        <ArrowBackIcon/>
                    </Link>
                    <span className="font-bold text-xl ms-4">Create Exercise</span>
                </div>
                <form className={"flex flex-col group px-10 mt-5 w-fit"} onSubmit={(e) => {
                    openModal(e)
                }}>
                    <label htmlFor="exerciseName" className="mb-5 sm:w-[50%] flex flex-col">
                        <span>Name</span>
                        <input
                            type="text"
                            name="exerciseName"
                            onChange={(e) => {
                                setExerciseName(e.target.value)
                            }}
                            id="exerciseName"
                            placeholder={"e.g Pull Ups"}
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
                            onChange={(e) => {
                                setDescription(e.target.value)
                            }}
                            placeholder={"Move your sorry ass"}
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
                                    onChange={(e) => {
                                        setTimerMode(JSON.parse(e.target.value))
                                    }}
                                    className="border-e-2 border-black dark:border-neutral-400 p-2 bg-inherit min-w-fit w-[15%] text-md text-center outline-0 appearance-none">
                                    <option value={"true"}>Timer</option>
                                    <option value={"false"}>It should take</option>
                                </select>
                                <input type="number"
                                       id={"modeInput"}
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
                                    onChange={(e) => {
                                        setRepMode(JSON.parse(e.target.value))
                                    }}
                                    className="border-e-2 border-black dark:border-neutral-400 p-2 bg-inherit min-w-fit w-[15%] text-md text-center outline-0 appearance-none">
                                    <option value="true">x. Times</option>
                                    <option value="false">∞</option>
                                </select>
                                <input type="number"
                                       id={"secInput"}
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
                    <label htmlFor={"exerciseImage"}>
                        <div className={'bg-lime-800 hover:bg-lime-700 rounded flex flex-col justify-center w-fit mb-2'}>
                            <Image src={selectedImage} alt={"image"} height={200} width={200} className={`${selectedImage ? "":"hidden"} rounded hover:scale-150 transition delay-300`}/>
                            <button
                                className={'p-2'}
                                onClick={(e) => {
                                    openImageSelectModal(e)
                                }}>Select Image</button>
                        </div>
                    </label>
                    <label>
                        <span>Difficulty</span>
                        <div className={"flex flex-row"}>
                            <input value={difficulty} hidden type={"number"} required>
                            </input>
                            {[...Array(4)].map((_, index) => {
                                const starCount = index + 1;

                                return (
                                    <>
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
                                    </>
                                );
                            })}
                        </div>
                    </label>
                    <label htmlFor="breakTime" className="mb-5 sm:w-[50%] flex flex-col">
                        <span>Break Time.</span>
                        <input
                            type="number"
                            name="breakTime"
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
                    <button type="submit"
                            className="mt-5 bg-green-500 dark:bg-green-800 py-3 rounded-md text-white group-invalid:pointer-events-none group-invalid:opacity-50"
                            onSubmit={(e) => {
                                openModal(e)
                            }}>
                        Create Exercise
                    </button>

                    <AddModal isOpen={isModalOpen} onClose={closeModal} userData={exerciseData}
                              createNewSet={createNewSet} addExerciseToSet={addExerciseToSet}/>
                    <ImageSelectModal isOpen={isImageSelectModalOpen} onClose={closeImageSelectModal} images={images} setSelectedExerciseImage={setSelectedExerciseImage}/>
                </form>
            </div>
        </>
    )
}



const getSets = async (data: any, day: string, week: string) => {

    let objArray: any[] = [];
    let exerciseNum = 0;
    let time = 0;


    if (day) {
        for (const setName in data.exercises[week][day]) {
            const exerciseSet = data.exercises[week][day][setName];
            exerciseNum += Object.entries(exerciseSet).length;
            for (const exerciseName in exerciseSet) {
                time += parseInt(exerciseSet[exerciseName].time);
            }
        }

        objArray = objArray.concat(Object.entries(data.exercises[week][day]));

    }


    return {objArray, exerciseNum, time};
};
