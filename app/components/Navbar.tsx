"use client"
import React, {useState} from "react";
import Link from 'next/link'
import Image from 'next/image'
import Logo from '../../public/images/hope.svg'
import LogoDark from "../../public/images/irgendwiesohalt.svg"

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <header className={`flex justify-center w-full bg-white dark:bg-black`}>
            <div className="container">
                <div className="relative flex items-center justify-between -mx-4">
                    <div className="max-w-full px-4 w-60">
                        <Link href="/" className="block w-full py-5">
                            <Image
                                src={Logo}
                                alt="logo"
                                className="w-full dark:invert"

                            />
                        </Link>
                    </div>
                    <div className="flex items-center justify-between w-full px-4">
                        <div>
                            <button
                                // @click="navbarOpen = !navbarOpen"
                                onClick={() => setOpen(!open)}
                                // :className="navbarOpen && 'navbarTogglerActive' "
                                id="navbarToggler"
                                className={` ${
                                    open && "navbarTogglerActive"
                                } absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden`}
                            >
                                <span
                                    className="relative my-[6px] block h-[2px] w-[30px] dark:bg-white bg-black"></span>
                                <span
                                    className="relative my-[6px] block h-[2px] w-[30px] dark:bg-white bg-black"></span>
                                <span
                                    className="relative my-[6px] block h-[2px] w-[30px] dark:bg-white bg-black"></span>
                            </button>
                            <nav
                                // :className="!navbarOpen && 'hidden' "
                                id="navbarCollapse"
                                className={`absolute right-4 top-full w-full max-w-[250px] rounded-lg dark:bg-black bg-white py-5 px-6 shadow lg:static lg:block lg:w-full lg:max-w-full lg:shadow-none ${
                                    !open && "hidden"
                                } `}
                            >
                                <ul className="block lg:flex">
                                    <ListItem
                                        navItemStyles="dark:hover:text-blue-400 hover:text-green-600"
                                        NavLink="/#"
                                    >
                                        Home
                                    </ListItem>
                                    <ListItem
                                        navItemStyles="dark:hover:text-blue-400 hover:text-green-600"
                                        NavLink="/#"

                                    >
                                        <button

                                        >
                                            Preview
                                        </button>
                                    </ListItem>
                                    <ListItem
                                        navItemStyles="dark:hover:text-blue-400 hover:text-green-600"
                                        NavLink="/#"
                                    >
                                        About
                                    </ListItem>
                                    <ListItem
                                        navItemStyles="dark:hover:text-blue-400 hover:text-green-600"
                                        NavLink="/#"
                                    >
                                        Blog
                                    </ListItem>
                                </ul>
                            </nav>
                        </div>
                        <div className="justify-end hidden pr-16 sm:flex lg:pr-0">
                            <Link
                                href="/SignIn"
                                className="py-3 text-base font-medium px-7 dark:text-white hover:text-primary"
                            >
                                Sign in
                            </Link>

                            <Link
                                href="/SignUp"
                                className="py-3 text-base font-medium text-white bg-black dark:text-black dark:bg-white rounded-lg bg-primary px-7 hover:bg-opacity-90"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

const ListItem = ({children, navItemStyles, NavLink}: { children: React.ReactNode, navItemStyles: unknown, NavLink: string }) => {
    return (
        <>
            <li>
                <a
                    href={NavLink}
                    className={`flex py-2 text-base font-medium lg:ml-12 lg:inline-flex ${navItemStyles}`}
                >
                    {children}
                </a>
            </li>
        </>
    );
};
