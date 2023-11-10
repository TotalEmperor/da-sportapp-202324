"use client"
import firebase_app from "@/firebase/config";
import {getFirestore, doc, getDocs, getDoc, collection, orderBy, onSnapshot} from "firebase/firestore";
import {getAuth} from "firebase/auth";


export default async function getFirestoreDocument(collection:string, id?:string) {
    const db = getFirestore(firebase_app)
    const userId = getAuth().currentUser.uid

    let docRef = doc(db, collection, userId);
    let docS = await getDoc(docRef);

    let result = null;
    let error = null;

    try {
        result = docS.data();
    } catch (e) {
        error = e;
    }
    return { result, error };
}
