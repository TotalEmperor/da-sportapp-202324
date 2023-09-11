"use client"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import firebase_app from "@/firebase/config";
import {signOut, getAuth, createUserWithEmailAndPassword} from "firebase/auth";
const auth = getAuth(firebase_app);

export default async function logOut() {
    let result = null,
        error = null;
    try {
        result = await signOut(auth);
    } catch (e) {
        error = e;
    }

    return { result, error };
};