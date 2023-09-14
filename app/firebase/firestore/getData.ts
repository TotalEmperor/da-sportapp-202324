"use client"
import firebase_app from "@/firebase/config";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import {getAuth} from "firebase/auth";
import { useEffect, useState } from 'react';
import {getDocument} from "@floating-ui/utils/react";

const db = getFirestore(firebase_app)
export default async function getDoument(collection, id) {
    const auth = getAuth(firebase_app);

    const uid = auth.currentUser.uid
    let docRef = doc(db, collection, uid);
    let docS = await getDoc(docRef);

    let result = null;
    let error = null;

    try {
        result = docS;
    } catch (e) {
        error = e;
    }

    return { result, error };
}



