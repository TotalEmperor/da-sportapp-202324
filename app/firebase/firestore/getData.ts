import firebase_app from "@/firebase/config";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore(firebase_app)
export default async function getDoument(collection, id) {
    let docRef = doc(db, "users", "kzXT1jAE8gb7rHz3MyWES7YBCf83");
    let docS = await getDoc(docRef);

    let result = null;
    let error = null;

    try {
        result = docS.get("name");
    } catch (e) {
        error = e;
    }

    return { result, error };
}