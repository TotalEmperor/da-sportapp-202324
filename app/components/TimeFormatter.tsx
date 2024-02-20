import React from 'react';
import {number} from "prop-types";


const timeFormatter = (seconds:number):string => {
    const formatTime = (timeInSeconds: number): string => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = Math.floor(timeInSeconds % 60);

        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');

        if(formattedHours=="00" && formattedMinutes=="00" && formattedSeconds=="00"){
            return '0s'
        }else if(formattedHours=="00" && formattedMinutes=="00"){
            return `${formattedSeconds}s`;
        }else if(formattedHours=="00"){
            return `${formattedMinutes}min ${formattedSeconds}s`;
        }else {
            return `${formattedHours}h ${formattedMinutes}min ${formattedSeconds}s`;
        }
    };

    return formatTime(seconds);
};

export default timeFormatter;