"use client"
import {getAuth, sendEmailVerification} from "firebase/auth";
import Navbar from "@/components/MainComponents/Navbar";
import firebase_app from "@/firebase/config";
import { useRouter } from 'next/navigation'
import {useEffect, useState} from "react";
import EmailIcon from '@mui/icons-material/Email';
export default function Verification() {

    const router = useRouter();
    const user = getAuth().currentUser;
    const auth = getAuth();
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
                router.push("/workout")
            }
        };

        // Check the attribute every second
        intervalId = setInterval(checkAttribute, 1000);

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);


    const handleResend = async ()=>{
        await sendEmailVerification(user);
    }


return (
    <div
        className="flex flex-col dark:bg-gradient-to-tr dark:from-green-700 dark:to-neutral-700 dark:via-green-400 bg-gradient-to-tr from-gray-100 to-green-700 via-green-400 min-h-screen h-fit">
        <header>
            <Navbar/>
        </header>
        <div className="flex-1 flex justify-center items-center ">
            <div className="flex p-[5%] bg-white rounded-2xl m-5 flex-col items-center">
                <div className="rounded-full bg-blue-100 flex p-4 w-fit">
                    <div className="rounded-full bg-blue-300 flex p-6 w-fit">
                        <EmailIcon/>
                    </div>
                </div>

                <div className="flex flex-col text-center mt-4 justify-center items-center">
                    <h1 className="font-bold text-xl sm:text-5xl mt-4 ">Please verify your email</h1>
                    <p className="mt-4 sm:text-2xl">You are almost there. We sent an email to:</p>
                    <h1 className="font-extrabold text-lg sm:text-2xl mt-4 ">{user.email}</h1>

                    <p className="md:w-[40vw] mt-8 sm:text-2xl">
                        Just click on the link in the email to complete your signup. If you dont see it, may need to check your spam folder.
                    </p>
                    <p className="mt-[5%] sm:text-2xl">
                        Still cant find the email? No Problem.
                    </p>
                    <button onClick={handleResend} className="bg-gray-400 hover:bg-gray-300 rounded-xl sm:text-2xl p-4 mt-[5%]">
                        Resend Verification Email
                    </button>
                </div>
            </div>
        </div>
    </div>
)
}