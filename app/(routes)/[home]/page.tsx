import styles from "./home.module.css"
import SetComponent from "@/components/SetComponent"
import SideNav from "@/components/SideNav";
import MainComponent from "@/components/mainComponent";
import ConfPanel from "@/components/confPanel";
import Image from "next/image";
import Head from "next/head";
import DateConfig from "@/components/dateConfig";
import {uId} from "@/context/AuthContext";
import getDocument from "@/firebase/firestore/getData"

export default function page(data ) {

    console.log(data)
    return (
        <div className={ styles["contentWidth"] +" flex flex-col min-h-fit h-screen bg-[#F8FAF7]"}>
            <Head>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="icon"/>
            </Head>
            <div className="w-full flex flex-col sm:flex-row flex-wrap sm:flex-nowrap py-4 flex-grow">
                <SideNav/>
                <MainComponent>
                    <>
                        {data.map((document) => (
                            <>
                                <SetComponent document={document} />
                            </>
                        ))}
                    </>
                </MainComponent>
                <ConfPanel>
                    <>
                        <DateConfig/>
                    </>
                </ConfPanel>
            </div>
        </div>
    );
}

export async function getServerSideProps() {
    const doc = await getDocument("exercises", uId())

    return {
        props: {
            data: doc,
        },
    };
}