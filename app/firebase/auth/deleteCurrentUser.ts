"use client"
import { getAuth, deleteUser } from "firebase/auth";

export default function deleteCurrentUser(): boolean {

    const user = getAuth().currentUser;
    if (user) {
        user.delete().then(() => {

            return false;
        }).catch((error) => {
            console.log('Error deleting user:', error);
            return true;
        });
    }

    return null;
}