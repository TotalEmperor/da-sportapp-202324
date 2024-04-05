"use client"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import React, {Suspense, useEffect, useState} from "react";
import {getAuth} from "firebase/auth";
import getFirestoreDocument from "@/firebase/firestore/getData";
import {useContextData} from "@/context/ContextData";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import LoadingModule from "@/components/MainComponents/loadingModule";
import {UserData} from "@/interfaces/userdata";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
export default function DateConfig() {

  // Days Array
  const days = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];
  // current Day & Week Context (Day: MO, Week: 25.3.2024-31.3.2024)
  const {day, week, setDay, setWeek} = useContextData();
  // Index of checked Circle
  const [checkedDay, setCheckedDay] = useState<number | 0>(0);
  // Index of checked Week
  const [checkedWeek, setCheckedWeek] = useState<number | 0>(0);
  // If Exercises are planned, done or not done
  const [exerciseStatus, setExerciseStatus] = useState<boolean[]>(new Array(7).fill(null));

  // Date Object
  const date = new Date();
  // Current Day
  const currentDay = days[date.getDay() - 1];

  // Mark Exercise Status of a day
  const setExerciseStatusAtIndex = (index: number, value: boolean) => {
    setExerciseStatus(prevStatus => prevStatus.map((status, i) => i === index ? value : status));
  };
  // Get Exercise Status of a day
  const getExerciseStatusAtIndex = (index: number): boolean | null => {
    return exerciseStatus[index];
  };

  // Current User
  const user = getAuth().currentUser.uid;

  useEffect(() => {
    // If User is not set, return nothing
    if (!user) {
      return;
    }

    // Fetch userdata from Firestore
    const unsubscribe = getFirestoreDocument('userdata', user, (userdata: UserData) => {
      // If data is not null
      if (userdata.weeks) {
        // Sort Weeks
        sortDates(Object.keys(userdata.weeks)).then((weeks: [string]) => {
          // If day and week are not set in SessionStorage, then set day to MO and week to the earliest week in weeks
          if (sessionStorage.getItem("day") == null) {
            setCheckedDay(0);
            setCheckedWeek(0);
          } else {
            // Set the UI to currently active week and day
            setCheckedWeek(weeks.indexOf(week));
            setCheckedDay(days.indexOf(day));
          }

        })
        // Go through all days and set Exercise Status
        days.forEach((day) => {
          setExerciseStatusAtIndex(days.indexOf(day), getExerciseStatus(day, userdata.weeks[week]));
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, [week, day, user]);


  const handleClickDay = (i: number) => {
    // Set new active day
    if (checkedDay !== i) {
      setDay(days[i].toUpperCase());
      setCheckedDay(i);
    }
  };

  const handleClickWeek = (i: number) => {

    if (checkedWeek + i >= 0 && checkedWeek + i <= 3) {
      // Set new active week
      const unsubscribe = getFirestoreDocument('userdata', user, (data) => {
        if (data) {
          sortDates(Object.keys(data.weeks)).then((date: [string]) => {
            setWeek(date[checkedWeek + i]);
            setCheckedWeek(checkedWeek + i);
          });
        }
      });

      return () => {
        unsubscribe();
      };

    }
  };


  return (
    <>
      {
        // If day and week are set
      }
      {day && week ?
        <div
          className="rounded-xl w-fit md:px-10 dark:bg-white dark:bg-opacity-5 bg-[#efefef] dark:shadow-neutral-600 shadow-md min-w-fit flex-shrink">
          <div className="w-fit justify-center flex-col mx-auto flex mb-3 px-4 pt-8 py-4">
            <div className="flex w-full mb-[1rem] font-bold text-3xl flex-row">
              <p className="w-full flex items-center">
                <Suspense fallback={<></>}>
                  {reformatDate(week)}
                </Suspense>
              </p>
              <p className="flex">
                <button className="rounded-full disabled:text-gray-300 enabled:hover:bg-gray-200"
                        disabled={checkedWeek === 0}>
                  <ArrowBackIcon onClick={() => handleClickWeek(-1)}
                                 sx={{fontSize: '2rem', margin: "0.5rem"}}/>
                </button>
                <button className="rounded-full disabled:text-gray-300 enabled:hover:bg-gray-200"
                        disabled={checkedWeek === 3}>
                  <ArrowForwardIcon onClick={() => handleClickWeek(1)}
                                    sx={{fontSize: '2rem', margin: "0.5rem"}}/>
                </button>
              </p>
            </div>
            <div className="flex flex-row">
              {days.map((day, index) => (
                <div key={index} className={`flex flex-col pe-3 items-center`}>
                  <div className={"h-[-webkit-fill-available]"}>
                  </div>
                  {checkedDay === index
                    ?
                    <FiberManualRecordIcon sx={{fontSize: '2vh'}}/>
                    :
                    <></>
                  }
                  <div
                    className={`cursor-pointer flex items-center rounded flex-col dark:hover:bg-gray-400 hover:bg-gray-200 ${currentDay === day ? "bg-red-200 text-white dark:bg-red-400" : ""}`}
                    onClick={() => handleClickDay(index)}
                  >
                    {
                      getExerciseStatusAtIndex(index) === null?
                        <RadioButtonUncheckedIcon sx={{fontSize: '4vh'}}/>
                        :
                        (getExerciseStatusAtIndex(index)===false?
                            <CancelOutlinedIcon sx={{
                              fontSize: '4vh'
                            }}/>
                          :
                            <CheckCircleOutlineIcon sx={{fontSize: '4vh', color: "#b7f397"}}/>
                        )
                    }
                    <h2 key={index} className="flex justify-center text-xl">{day}</h2>
                    <div className={`${checkedDay === index ? "h-[1vh]" : ""}`}>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        :
        <LoadingModule/>
      }
    </>
  )
}


// Sort dates from earliest to latest
export const sortDates = async (weeks: any) => {
  weeks.sort((a, b) => {
    // Split the string and take the first part as the starting date of the week
    const firstWeek = new Date(convertDateFormat(a.split('-')[0]));
    const secondWeek = new Date(convertDateFormat(b.split('-')[0]));
    return firstWeek.getTime() - secondWeek.getTime();
  });
  return weeks;
}

// Get ExerciseStatus
const getExerciseStatus = (day: string, data: any): any => {
  switch (data[day]) {
    case "TRAINING_DONE":
      return true;
    case "TRAINING_INCOMPLETE":
      return false;
    case "":
      return null;

  }
}

// Formate week from European standard to international standard
function convertDateFormat(date: string): string {
  const [day, month, year] = date.split('.');
  return `${month}/${day}/${year}`;
}

// Reformate Date from dd.mm.yyyy-dd.mm.yyyy to dd.mm-dd.mm
const reformatDate = (week: string) => {
  if (week) {
    let dates = week.split("-"); // split the string into two dates

    try {
      let firstDate = dates[0];
      let secondDate = dates[1];

      firstDate = firstDate.slice(0, firstDate.length - 5);
      secondDate = secondDate.slice(0, secondDate.length - 5);
      return firstDate + "-" + secondDate;
    } catch (e) {

    }
  }
  return null;
}
