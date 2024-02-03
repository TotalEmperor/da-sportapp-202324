import {doc, setDoc, getFirestore} from "firebase/firestore";
import firebase_app from "@/firebase/config";
import {getAuth} from "firebase/auth";
export default async function setDocument(collection: string, id:string, data:any){
    const db = getFirestore(firebase_app)

    let docRef = doc(db, collection, id);
    return await setDoc(docRef, data);
}

