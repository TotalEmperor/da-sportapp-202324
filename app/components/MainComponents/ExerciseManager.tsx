"use client"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Image from "next/image";
import Link from "next/link"
import React, {useEffect, useState} from "react"
import {ExpandLess} from "@mui/icons-material";
import {ExpandMore} from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import ModifyDeleteModal from "@/components/Modifying/ModifyDeleteModal";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import {getAuth} from "firebase/auth";
import {Exercise} from "@/interfaces/Exercise";
import getFirestoreDocument from "@/firebase/firestore/getData";
import AddModal from "@/components/Modifying/AddingExerciseModal";
import {useContextData} from "@/context/ContextData";
import setDocument from "@/firebase/firestore/setDocument";
import {useRouter} from "next/navigation";

export default function ExerciseManager(props: {
    data: Exercise;
    time: number;
    stars: number;
    moves: number;
    description: string;
    modify?: boolean;
    search?: boolean;
    setName?: string;
    exerciseName: string;
    style?: string;
}) {
    const {data, time, stars, moves, description, modify, search, setName, exerciseName, style} = props;

    const [isContentVisible, setIsContentVisible] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [setKeys, setSetKeys] = useState<string[]>([]);
    const [exerciseData, setExerciseData] = useState([]);
    const {day, week, setDay, setWeek} = useContextData();
    const router = useRouter();



    const [user, setuser] = useState(() => {
        // if a user is already logged in, use the current user object, or `undefined` otherwise.
        try {
            return getAuth().currentUser.uid || undefined;
        } catch (e) {
            console.log(e)
        }
    });

    useEffect(() => {
        if (user === null) {

            return;
        }

        if (!user) {
            // user still loading, do nothing yet
            return;
        } else {
            const unsubscribe = getFirestoreDocument('exercises', user, (data) => {
                if (data) {
                    setExerciseData(data);
                    setSetKeys(Object.keys(data.exercises[week][day]));
                }
            });

            return () => {
                unsubscribe();
            };
        }


    }, [user, day, week]); // <-- rerun when user changes

    const openAddModal = (e) => {
        e.preventDefault();
        search ? setAddModalOpen(true) : null
    }
    const closeAddModal = () => setAddModalOpen(false);

    const openDeleteModal = (e) => {
        e.preventDefault();
        setIsDeleteModalOpen(true);
    }

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    }

    const toggleContent = () => {
        setIsContentVisible(!isContentVisible);
    };

    const addExerciseToSet = (setName: string) => {
        let schedule = exerciseData["exercises"][week][day];

        schedule[setName][exerciseName] = {
            "image": data.image,
            "moves": data.moves, // Replace with the actual number of moves
            "description": data.description,
            "met": data.met,
            "time": data.time, // Replace with the actual time
            "stars": data.stars, // Replace with the actual stars rating
            "breakTime": data.breakTime // Replace with the actual break time

        };

        console.log(schedule)

        setExerciseData(exerciseData["exercises"][week][day] = schedule);

        setDocument("exercises", user, exerciseData).then(r => {
             router.push(`/modifying/${setName}`)
         });
    }

    const createNewSet = (setName: string) => {
        let schedule = exerciseData["exercises"][week][day];

        schedule[setName] = {
            [exerciseName]: {
                "image": data.image,
                "moves": data.moves, // Replace with the actual number of moves
                "description": data.description,
                "met": data.met,
                "time": data.time, // Replace with the actual time
                "stars": data.stars, // Replace with the actual stars rating
                "breakTime": data.breakTime // Replace with the actual break time
            }

        };
        setExerciseData(exerciseData["exercises"][week][day] = schedule);

        setDocument("exercises", user, exerciseData).then(r => {
           router.push(`/modifying/${setName}`)
        });
    };

    return (
        <>
            <div
                className={"rounded-xl w-full hover:bg-green-300 dark:hover:bg-opacity-40 dark:shadow-neutral-600 shadow-md bg-dark dark:bg-black dark:bg-opacity-[50%] " + style} onClick={openAddModal}>
                <div
                    className="w-full justify-center flex-col mx-auto flex px-4 pt-8 py-4">
                    <div className="flex w-fit flex-row min-h-fit">
                        <span className="left-auto text-[1.8rem] font-bold me-6">{exerciseName}</span>
                        {Array.from({length: stars}, (_, i) => (
                            <div key={i} className="flex flex-col pe-2 justify-center">
                                <StarRoundedIcon sx={{fontSize: "2.5rem", fill: "yellow"}} />
                            </div>
                        ))}
                    </div>
                    <div className="font-bold">
                        <div className="w-[70%] mb-2">
                            <h1 className={"text-lg"}>Description:</h1>
                            <p className="text-md font-light">{description}</p>
                        </div>
                        {
                            modify ?
                                <div className="flex justify-end items-end h-[2rem] mb-3">

                                    <button onClick={openDeleteModal}
                                            className={'p-2 rounded-full dark:hover:bg-opacity-5 me-2 dark:hover:bg-white'}>
                                        <DeleteIcon className={"z-10 hover:text-blue-400 text-red-600 rounded"}
                                                    sx={{fontSize: "2rem"}}/>
                                    </button>
                                    <Link href={{
                                            pathname: "/modifying/editExercise",
                                            query: {
                                                setName: setName,
                                                exerciseName: exerciseName,
                                            }
                                        }}
                                          className={'p-2 rounded-full dark:hover:bg-opacity-5 me-2 dark:hover:bg-white'}>
                                        <EditRoundedIcon
                                            className={"hover:text-blue-400 icon rounded-full text-lime-600"}
                                            sx={{fontSize: "2rem"}}/>
                                    </Link>
                                </div>
                                :
                                <>
                                </>
                        }
                        <div className="float-right">
                            {
                                moves != 0 ?
                                    <span className="me-3">x{moves}</span>
                                    :
                                    <></>
                            }
                            <span>Time: {time < 60 ? time + " sec." : Math.floor(time / 60) + ":" + (time % 60) + " Min."}</span>
                        </div>
                    </div>
                </div>
                {
                    data.image ?
                        <div className="w-full justify-center flex-col mx-auto flex items-center ">
                            <div
                                className="flex w-full hover:cursor-pointer items-center justify-center hover:bg-neutral-600 rounded-xl p-2"
                                onClick={toggleContent}>
                                <div className="flex flex-col pe-2 justify-center">
                                    {isContentVisible ? (
                                        <ExpandLess/>
                                    ) : (
                                        <ExpandMore/>
                                    )}
                                </div>
                                <label className="text-[1.2rem] hover:cursor-pointer font-bold me-6">Collapsible
                                    Tab</label>
                            </div>
                            {isContentVisible && (
                                <div
                                    className="flex justify-center items-center my-4">
                                    <Image src={data.image} width={300} height={300} alt={"image"}
                                           className={"rounded"}/>
                                </div>
                            )}
                        </div>
                        :
                        ""
                }
            </div>
            <ModifyDeleteModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}
                               setName={setName} exerciseName={exerciseName}/>
            <AddModal isOpen={isAddModalOpen} onClose={closeAddModal} setKeys={setKeys}
                      createNewSet={createNewSet} addExerciseToSet={addExerciseToSet}/>
        </>
    )
}

