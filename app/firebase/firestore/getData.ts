import firebase_app from "@/firebase/config";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore(firebase_app)
export default async function getDoument(collection, id) {
    let docRef = doc(db, collection, id);
    let docS = await getDoc(docRef);

    let result = null;
    let error = null;

    try {
        result = docS.get("name");
        console.log(result);
    } catch (e) {
        error = e;
    }

    return { result, error };
}