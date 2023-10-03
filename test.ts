import {
    createUserWithEmailAndPassword, getAuth,
    sendEmailVerification,
    updateProfile,
} from 'firebase/auth';
import {doc, getFirestore, setDoc} from "firebase/firestore";
import firebase_app from "@/firebase/config";


export async function checkIfEmailExists(email:string){
}