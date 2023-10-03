"use client"
import {
    getAuth,
} from 'firebase/auth';
import firebase_app from '@/firebase/config';

export default function deleteUser() {

    getAuth(firebase_app).currentUser.delete()
        .then(() => {
            console.log('Successfully deleted user');
            return true;
        })
        .catch((error) => {
            console.error('Error deleting user:', error);
            return false;
        });
    return null
}