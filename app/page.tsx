import Navbar from '@/components/MainComponents/Navbar'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Landing Page',
}

export default function Landing() {
  return(
      <>
        <div className="flex h-screen flex-col">
          <Navbar/>
          <main className={"flex-1 flex bg-gradient-to-tr from-green-400 to-[#9089fc] dark:from-violet-500 dark:to-green-800 dark:via-bl-700"}>
          </main>
        </div>
      </>

  )
}
