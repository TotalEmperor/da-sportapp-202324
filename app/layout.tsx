import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {AuthContextProvider} from '@/context/AuthContext'
import {Provider} from "./Provider";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'myFit',
    description: 'Getting Fit',
    icons: ""
}

export default function RootLayout({children,}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <Provider>
            <AuthContextProvider>
                {children}
            </AuthContextProvider>
        </Provider>
        </body>
        </html>
    )
}
