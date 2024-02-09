import {Exercise} from "@/interfaces/Exercise";

export interface ExerciseSet {
    [exerciseNames: string]: Exercise;
}