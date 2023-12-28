import firebase_app from "@/firebase/config";
import {doc, getFirestore, onSnapshot} from "firebase/firestore";


const db = getFirestore(firebase_app)



export default function getFirestoreDocument(
    collectionName: string,
    userId: string,
    callback: (data: any) => void
) {
    const docRef = doc(db, collectionName, userId);

    return onSnapshot(docRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
            callback(docSnapshot.data());
        } else {
            console.log("No such document!");
        }
    });
}
