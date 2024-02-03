"use client"
import React, {useEffect} from 'react';
import {getAuth, onAuthStateChanged,} from 'firebase/auth';
import firebase_app from '@/firebase/config';
import {redirect, useRouter} from 'next/navigation'
import {RedirectType} from "next/dist/client/components/redirect";

const auth = getAuth(firebase_app);

export const AuthContext = React.createContext({});

//export const UseAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({children,}) => {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const router = useRouter();

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                // Activate the user's account
                if(user.emailVerified){
                    //router.push("/workout")
                }
            } else{
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    return (
        <AuthContext.Provider value={{user}}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};

export const CheckEmailVerification = ({children,}) => {
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user || !user.emailVerified) {
                router.push("/")
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <React.Fragment key="checkEmailVerification">
            {children}
        </React.Fragment>
    );
};

export const RedirectSignedUpUser = ({children,}) => {
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user && user.emailVerified) {
                router.push("/workout")
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <React.Fragment key="redirectSignedUpUser">
            {children}
        </React.Fragment>
    );

}
