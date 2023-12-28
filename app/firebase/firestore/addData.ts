import {doc, setDoc, getFirestore} from "firebase/firestore";
import firebase_app from "@/firebase/config";
import {getAuth} from "firebase/auth";
export default async function addData(collection, id, data){
    const db = getFirestore(firebase_app)

    let docRef = doc(db, collection, id);
    await setDoc(docRef, data);
}

