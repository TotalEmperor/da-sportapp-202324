import {
    createUserWithEmailAndPassword, getAuth,
    sendEmailVerification,
    updateProfile
} from 'firebase/auth';
import { redirect } from 'next/navigation';
import {doc, getFirestore, setDoc} from "firebase/firestore";
import {useRouter} from "next/navigation";
import firebase_app from "@/firebase/config";

export default async function CreateUser(email: string, password: string, displayName:string) {
    const auth = getAuth();
    const db = getFirestore(firebase_app)
    const router = useRouter();


    await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            sendEmailVerification(user).then(()=>{return false})
            updateProfile(auth.currentUser, {
                displayName: displayName
            }).catch(()=>{return false})

            // Add a new document in collection "cities"
            setDoc(doc(db, "users", user.uid), {
                name: displayName,
                uid: user.uid
            }).catch(()=>{
                return false;
            });

            router.push("/Verification")


            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            return false;
            // ..
        });
}