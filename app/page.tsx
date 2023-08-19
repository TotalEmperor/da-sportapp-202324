import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Head from "next/head";
const inter = Inter({ subsets: ['latin'] })

export default function Landing() {
  return(
      <>
        <Head>
          <title>Welcome Page</title>
        </Head>
        <div className="flex h-screen flex-col">
          <Navbar/>
          <main className={"flex-1 flex bg-gradient-to-tr from-green-400 to-[#9089fc] dark:from-violet-500 dark:to-green-800 dark:via-bl-700"}>
          </main>
        </div>
      </>

  )
}
