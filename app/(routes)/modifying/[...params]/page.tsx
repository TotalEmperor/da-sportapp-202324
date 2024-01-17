import React, {Suspense} from 'react';
import CreateExercise from "@/components/Modifying/CreateExercise";
import ModifyExerciseComponentCollection from "@/components/Modifying/ModifyExerciseComponentCollection";
import SearchExercise from "@/components/Modifying/SearchExercise";
import EditingSet from "@/components/Modifying/EditingSet";
import EditExercise from "@/components/Modifying/EditExercise";

export default function Page({params: {params}}) {
    return getComponent(params);
}

const getComponent=(params: string)=>{

    if(params=="createExercise"){
        return <CreateExercise/>
    }else if(params=="searchExercise"){
        return <SearchExercise/>
    } else if(params=="editingSet"){
        return <EditingSet/>
    }else if(params=="editingExercise"){
        return <EditExercise/>
    }else {
        return <ModifyExerciseComponentCollection setName={params}/>
    }

}
