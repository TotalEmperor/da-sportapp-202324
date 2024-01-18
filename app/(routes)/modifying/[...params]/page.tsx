import React, {Suspense} from 'react';
import ModifyExerciseComponentCollection from "@/components/Modifying/ModifyExerciseComponentCollection";

export default function Page({params: {params}}) {
    return <ModifyExerciseComponentCollection setName={params}/>
}