import {
    createUserWithEmailAndPassword, getAuth,
    sendEmailVerification,
    updateProfile
} from 'firebase/auth';
import {useRouter} from "next/navigation";


export default async function CreateUser(email: string, password: string, displayName:string) {
    const auth = getAuth();

    await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user)
            sendEmailVerification(user)
            updateProfile(auth.currentUser, {
                displayName: displayName
            })

            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            return false;
            // ..
        });
}