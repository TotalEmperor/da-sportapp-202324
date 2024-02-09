import {ExerciseSet} from "@/interfaces/ExerciseSet";

export interface ExerciseSchedule {
    exercises: {
        [week: string]: {
            "MO": {[setNames: string]: ExerciseSet},
            "TU": {[setNames: string]: ExerciseSet},
            "WE": {[setNames: string]: ExerciseSet},
            "TH": {[setNames: string]: ExerciseSet},
            "FR": {[setNames: string]: ExerciseSet},
            "SA": {[setNames: string]: ExerciseSet},
            "SU": {[setNames: string]: ExerciseSet},
        }
    }
}
