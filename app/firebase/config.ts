// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyClocuSap9hY4P3r--R221H-WKU0u8H_5s",
    authDomain: "fir-d150a.firebaseapp.com",
    databaseURL: "https://fir-d150a-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "fir-d150a",
    storageBucket: "fir-d150a.appspot.com",
    messagingSenderId: "728786659989",
    appId: "1:728786659989:web:83512e31f6cfd2501a499c",
    measurementId: "G-LJ84K7MZXP"
};

// Initialize Firebase
let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default firebase_app;