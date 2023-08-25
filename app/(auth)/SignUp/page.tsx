"use client"
import React, {useState} from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Head from "next/head";
import BorderContainer from "@/components/borderContainer";
import GenderDropdown from "@/components/genderDropdown";


export default function Page() {

    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const [activeTab, setActiveTab] = useState(0);

    const switchTab = (index: number) => {
        setActiveTab(index);
    };

    return (
        <>
            <div
                className="flex flex-col dark:bg-gradient-to-tr dark:from-green-700 dark:to-gray-100 dark:via-green-400 bg-gradient-to-tr from-gray-100 to-green-700 via-green-400 min-h-screen h-fit">
                <header>
                    <Navbar/>
                </header>
                <div className="flex-1 flex justify-center items-center">
                    {activeTab === 0 && (
                        <form className="rounded-3xl p-2 bg-white min-h-fit max-h-screen w-1/4 min-w-max">
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">Personal
                                        Information</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where
                                        you
                                        can receive mail.
                                    </p>
                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <BorderContainer title="First Name">
                                                <input
                                                    type="text"
                                                    name="first-name"
                                                    id="first-name"
                                                    autoComplete="given-name"
                                                    className="text-center outline-0 w-full"
                                                />
                                            </BorderContainer>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <BorderContainer title="Last Name">
                                                <input
                                                    type="text"
                                                    name="last-name"
                                                    id="last-name"
                                                    autoComplete="family-name"
                                                    className="text-center outline-0 w-full"
                                                />
                                            </BorderContainer>
                                        </div>

                                        <div className="sm:col-span-4">
                                            <BorderContainer title=" Email">
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    autoComplete="email"
                                                    className="text-center outline-0 w-full"
                                                />
                                            </BorderContainer>
                                        </div>

                                        <fieldset className="col-span-5">
                                            <div className="col-span-5 mb-5">
                                                <BorderContainer title="Enter Password">
                                                    <input
                                                        type={showPassword ? 'text' : 'password'}
                                                        name="password"
                                                        id="password"
                                                        autoComplete="password"
                                                        className="text-center outline-0 w-full"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={handleTogglePassword}
                                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-gray-600 cursor-pointer"
                                                    >
                                                        {showPassword ? 'Hide' : 'Show'}
                                                    </button>
                                                </BorderContainer>
                                            </div>

                                            <div className="col-span-5">
                                                <BorderContainer title="Enter Password agian">
                                                    <input
                                                        type={showPassword ? 'text' : 'password'}
                                                        name="password"
                                                        id="passwordRepeat"
                                                        autoComplete="password"
                                                        className="text-center outline-0 w-full"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={handleTogglePassword}
                                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-gray-600 cursor-pointer"
                                                    >
                                                        {showPassword ? 'Hide' : 'Show'}
                                                    </button>
                                                </BorderContainer>
                                            </div>
                                        </fieldset>

                                        <div className="col-span-3">
                                            <BorderContainer title="Country">
                                                <select
                                                    id="language"
                                                    name="language"
                                                    autoComplete="language-name"
                                                    className="text-center outline-0 w-full border-none appearance-none">
                                                    <option>Austria</option>
                                                    <option>UK</option>
                                                    <option>Turkey</option>
                                                </select>
                                            </BorderContainer>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <Link type="button" className="text-sm font-semibold leading-6 text-gray-900"
                                      href="/landing">
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    className="rounded-md bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={() => switchTab(1)}
                                >
                                    Next
                                </button>
                            </div>
                        </form>
                    )}

                    {activeTab === 1 && (
                        <form className="rounded-3xl p-2 bg-white min-h-fit max-h-screen w-1/4">
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">Personal
                                        Information</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where
                                        you
                                        can receive mail.</p>

                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 flex-grow">
                                        <div className="sm:col-span-3">
                                            <BorderContainer title="Birthday">

                                                <input
                                                    type="date"
                                                    name="birthday"
                                                    id="birthday"
                                                    autoComplete="birthday"
                                                    placeholder="dd/mm/yyyy"
                                                    className="text-center outline-0 w-full"
                                                />

                                            </BorderContainer>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <BorderContainer title="Height (cm)">

                                                <input
                                                    type="text"
                                                    name="height"
                                                    id="height"
                                                    autoComplete="height"
                                                    placeholder="{cm}"
                                                    className="text-center outline-0 min-w-fit w-full"
                                                    pattern="{0,1}\d{1,3}?(?:\\s*cm)"
                                                />

                                            </BorderContainer>
                                        </div>

                                        <div className="sm:col-span-full flex-col flex items-center justify-center">
                                            <BorderContainer title="Weight (kg)" width="w-8/12">

                                                <input
                                                    type="text"
                                                    name="weight"
                                                    id="weight"
                                                    autoComplete="weight"
                                                    placeholder="{kg}"
                                                    className="text-center outline-0 w-full"
                                                    pattern="{0,1}\d{1,3}kg"
                                                />

                                            </BorderContainer>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <GenderDropdown/>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <BorderContainer title="BMI">

                                                <input
                                                    type="text"
                                                    name="bmi"
                                                    id="bmi"
                                                    autoComplete="bmi"
                                                    placeholder="BMI Number"
                                                    className="text-center outline-0 w-full"
                                                    pattern="[1-9][0-9]?$|^100"
                                                />

                                            </BorderContainer>
                                        </div>

                                        <div className="col-span-full flex flex-col justify-center items-center">
                                            <div className="min-w-fit w-10/12 my-2">
                                                <input type="radio" name="option" id="1" value="1" className="peer hidden" />
                                                <label htmlFor="1" className="block cursor-pointer border-2 text-black select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">1</label>
                                            </div>
                                            <div className="min-w-fit w-10/12 my-2">
                                                <input type="radio" name="option" id="2" value="2" className="peer hidden" />
                                                <label htmlFor="2" className="block cursor-pointer border-2 text-black select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">2</label>
                                            </div>
                                            <div className="min-w-fit w-10/12 my-2">
                                                <input type="radio" name="option" id="3" value="3" className="peer hidden" />
                                                <label htmlFor="3" className="block cursor-pointer border-2 text-black select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">3</label>
                                            </div>
                                            <div className="min-w-fit w-10/12 my-2">
                                                <input type="radio" name="option" id="4" value="4" className="peer hidden" />
                                                <label htmlFor="4" className="block cursor-pointer border-2 text-black select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">I am doing my own</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <button type="button" className="text-sm font-semibold leading-6 text-gray-900"
                                        onClick={() => switchTab(0)}>
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-md bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </>
    )
}