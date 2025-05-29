import React from 'react'
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const Lease3 = () => {

    const slides = [
        {
            title: "Where is this place located?",
        },
        {
            title: "Confirm the address.",
        }
    ]

    return (
        <div className="flex justify-center font-nunito font-semibold text-slate-700 bg-lease-bg bg-cover bg-opacity-25">
        <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="relative w-10 flex flex-col items-center">
            <div className="absolute top-24 bottom-0 w-3 bg-white bg-opacity-70"/>
            {slides.map((_, index) => (
            <div key={index} className="relative z-10 flex items-center justify-center w-10 h-10 mt-16 mb-80 bg-red-400 text-white text-xl rounded-full">
                {index + 5}
            </div>
            ))}
            </div>
        {/* Slides */}
        <div className="flex flex-col gap-12 p-10">
            <div className="bg-white bg-opacity-70 p-10 pt-6 pb-0 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-1">Where is the place located?</h2>
                <h4 className="text-lg font-light mb-4">The address will be kept private until you confirm the reservation.</h4>
                

            </div>

            <div className="bg-white bg-opacity-70 p-10 pt-6 pb-0 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-1">Confirm the address.</h2>
                <h4 className="text-lg font-light mb-4">Please check all details before we continue...</h4>
 
            </div>

            <div className='flex justify-end'>
                <button
                    className="text-white bg-[rgb(232,240,232)] bg-opacity-50 font-bold rounded-full w-1/4"
                >
                <NavLink to="/lease-4">Next</NavLink> 
                </button>  
            </div>
        </div>     
        </div>
        </div>
    )
}

export default Lease3