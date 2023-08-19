import React from "react";
import BorderContainer from "@/components/borderContainer";
export default function genderDopdown() {



    return (
            <BorderContainer title="Gender">
                <div className="relative flex justify-center">
                    <select className="font-medium text-gray-600 bg-transparent w-full text-center hover:border-gray-400 focus:outline-none appearance-none">
                        <option>Male</option>
                        <option>Female</option>
                    </select>
                </div>
            </BorderContainer>
    );
}
