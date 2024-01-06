import React, {Suspense} from 'react';
import CreateExercise from "@/components/Modifying/CreateExercise";
import ModifyExerciseComponentCollection from "@/components/Modifying/ModifyExerciseComponentCollection";
import SearchExercise from "@/components/Modifying/SearchExercise";

export default function Page({params: {params}}) {
    return getComponent(params);
}

const getComponent=(params: string)=>{

    if(params=="createExercise"){
        return <CreateExercise/>
    }else if(params=="searchExercise"){
        return <SearchExercise/>
    } else {
        return <ModifyExerciseComponentCollection setName={params}/>
    }

}
