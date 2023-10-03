"use client"
import {getAuth} from "firebase/auth";
import Navbar from "@/components/Navbar";
import firebase_app from "@/firebase/config";
import { useRouter } from 'next/navigation'
import {useEffect, useState} from "react";
export default function Verification() {

    const router = useRouter();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;
        const user = getAuth().currentUser;

        // Function to check the attribute
        const checkAttribute = async () => {
            // Replace the following line with the actual logic to check the attribute
            await user.reload()

            if (user.emailVerified) {
                setIsReady(true);
                clearInterval(intervalId);
                router.push("/home")
            }else {
                console.log(user.emailVerified)
            }
        };

        // Check the attribute every second
        intervalId = setInterval(checkAttribute, 1000);

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);


return (
    <div
        className="flex flex-col dark:bg-gradient-to-tr dark:from-green-700 dark:to-gray-100 dark:via-green-400 bg-gradient-to-tr from-gray-100 to-green-700 via-green-400 min-h-screen h-fit">
        <header>
            <Navbar/>
        </header>
        <div id="div2" className="flex-1 flex justify-center items-center">
        </div>
    </div>
)
}