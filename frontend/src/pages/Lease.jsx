import React from 'react'
import { useState, useEffect } from 'react'

const Lease = () => {

    const steps = [
        {
            title: "Which of these best describe your place?",
            content: ["House", "Apartment", "Condo", "Cottage", "Guesthouse", "Hotel"],
        },
        {
            title: "What type of place will your guest stay?",
            content: ["An entire place", "A private room", "A shared room"],
        },
        {
            title: "How many bedrooms?",
            content: ["Studio", "One room", "Two rooms", "Three rooms", "Four rooms", "Five rooms"]
        },
        {
            title: "Are you renting your place furnished?",
            content:["An entire place", "A private room", "A shared room"]
        }
      ];

    return (
        <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="relative w-48 flex flex-col items-center">
            <div className="absolute top-0 bottom-0 w-2 bg-[rgb(120,161,169)]" />
            {steps.map((_, index) => (
            <div key={index} className="relative z-10 flex items-center justify-center w-8 h-8 mt-16 mb-80 bg-red-400 text-white rounded-full">
                {index + 1}
            </div>
            ))}
        </div>
        {/* Slides */}
        <div className="flex-1 flex flex-col gap-24 p-10 mr-20">
            {steps.map((step, index) => (
            <section key={index} className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-6">{step.title}</h2>
                {step.content.length === 6 ? (
                <div className="grid grid-cols-2 gap-4">
                    {step.content.map((item, index) => (
                    <div
                        key={index}
                        className="border p-4 rounded-lg hover:shadow-md cursor-pointer"
                    >
                        {item}
                    </div>
                    ))}
                </div>
                ) : step.content.length === 3 ? (
                <div className="grid grid-cols-1 gap-4">
                    {step.content.map((item, index) => (
                    <div
                        key={index}
                        className="border p-4 rounded-lg hover:shadow-md cursor-pointer"
                    >
                        {item}
                    </div>
                    ))}
                </div>
                ) : null}
            </section>
            ))}
        </div>
        </div>
    );

}

export default Lease