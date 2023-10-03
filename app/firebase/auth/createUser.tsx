import {
    createUserWithEmailAndPassword, getAuth,
    sendEmailVerification,
    updateProfile,
} from 'firebase/auth';
import {doc, getFirestore, setDoc} from "firebase/firestore";
import firebase_app from "@/firebase/config";
import admin from "firebase-admin"

export default async function CreateUser(email: string, password: string, displayName:string) {
    const auth = getAuth();
    const db = getFirestore(firebase_app)
    let result = null;
    let error = null;


    await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

            const user = userCredential.user;
            updateProfile(auth.currentUser, {
                displayName: displayName
            })

            // Add a new document in collection "cities"
            setDoc(doc(db, "users", user.uid), {
                name: displayName,
                uid: user.uid
            }).then(()=>{
                sendEmailVerification(user);
            })

            result= true;

            // ...
        })
        .catch((error) => {
            error= error.code;
        });
}
