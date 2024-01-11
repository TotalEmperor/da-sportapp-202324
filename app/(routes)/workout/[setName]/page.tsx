import React, {Suspense} from 'react';
import ExerciseComponentCollection from "@/components/Workout/ExerciseComponentCollection";

export default function Page({params: {setName}}) {
    return (
        <>
            <ExerciseComponentCollection setName={setName}/>
        </>
    );
}
