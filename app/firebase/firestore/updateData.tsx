"use client"
import firebase_app from "@/firebase/config";
import {getFirestore, doc, getDocs, getDoc, collection, orderBy, onSnapshot, updateDoc} from "firebase/firestore";
import {getAuth} from "firebase/auth";


export default async function updateFirestoreDocument(collection:string, data:any) {
    const db = getFirestore(firebase_app)
    const userId = getAuth().currentUser.uid

    let docRef = doc(db, collection, userId);
    let docS = await updateDoc(docRef, data);

    let result = null;
    let error = null;

    try {
        result = docS;
    } catch (e) {
        error = e;
    }
    return {
        result, error
    };
}
