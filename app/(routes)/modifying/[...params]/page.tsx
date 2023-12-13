import React, {Suspense} from 'react';
import CreateExercise from "@/components/Modifying/CreateExercise";
import ModifyExerciseComponentCollection from "@/components/Modifying/ModifyExerciseComponentCollection";

export default function Page({params: {params}}) {
    return getComponent(params);
}


const getComponent=(params)=>{
    if(params=="createExercise"){
        return(
            <CreateExercise/>
        )
    }else {
        return (
            <>
                <ModifyExerciseComponentCollection setName={params}/>
            </>
        );
    }
}
