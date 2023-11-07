import firebase_app from "@/firebase/config";
import {getFirestore, doc, getDocs, getDoc, collection, orderBy, onSnapshot} from "firebase/firestore";


export default async function getFirestoreDocument(collection, id) {
    const db = getFirestore(firebase_app)


    let docRef = doc(db, collection, id);
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

