import React from 'react'
import { useState, useEffect } from 'react'
import { FaHouseChimney } from "react-icons/fa6";
import { MdApartment } from "react-icons/md";
import { FaBuilding } from "react-icons/fa";
import { MdCottage } from "react-icons/md";
import { HiHomeModern } from "react-icons/hi2";
import { FaHotel } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

const Lease1 = () => {

    const slides = [
        {
            title: "Which of these best describe your place?",
            content: ["House", "Apartment", "Condo", "Cottage", "Guesthouse", "Hotel"],
            extra: [<FaHouseChimney />, <MdApartment />, <FaBuilding />, <MdCottage />, <HiHomeModern />, <FaHotel />]
        },
        {
            title: "What type of place will your guest stay?",
            content: ["An entire place", "A private room", "A shared room"],
            extra: [
                "Guests will have the entire place to themselves.",
                "Guests will have a private room to themselves in a shared home.",
                "Guests will share the room with another person."
            ]
        },
      ];

    return (
        <div className="flex justify-center font-nunito font-semibold text-slate-700 bg-lease-bg bg-cover bg-opacity-25">
        <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="relative w-10 flex flex-col items-center">
            <div className="absolute top-24 bottom-0 w-3 bg-white bg-opacity-70"/>
            {slides.map((_, index) => (
            <div key={index} className="relative z-10 flex items-center justify-center w-10 h-10 mt-16 mb-80 bg-red-400 text-white text-xl rounded-full">
                {index + 1}
            </div>
            ))}
        </div>
        {/* Slides */}
        <div className="flex flex-col gap-12 p-10">
            {slides.map((slide, index) => (
            <section key={index} className="bg-white bg-opacity-70 p-8 pt-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">{slide.title}</h2>
                {slide.content.length === 6 ? (
                <div className="grid grid-cols-3 gap-2 bg-white rounded-lg p-3">
                    {slide.content.map((item, index) => (
                    <div
                        key={index}
                        className="border border-[rgb(232,240,232)] border-2 p-3 rounded-lg hover:shadow-lg cursor-pointer flex flex-col items-center gap-3"
                    >
                        <span className="text-4xl text-cyan-900">
                            {slide.extra?.[index]}
                        </span>
                        <span className='text-lg'>{item}</span>
                    </div>
                    ))}
                </div>
                ) : slide.content.length === 3 ? ( 
                <div className="grid grid-cols-1 gap-2 bg-white rounded-lg p-3">
                    {slide.content.map((item, index) => (
                    <div
                        key={index}
                        className="border border-[rgb(232,240,232)] border-2 p-4 rounded-lg hover:shadow-lg cursor-pointer text-xl flex flex-col"
                    >
                        <span className="text-xl">{item}</span>
                        <span className="text-sm text-slate-500 font-normal">
                            {slide.extra?.[index]}
                        </span>
                    </div>
                    ))}
                </div>
                ) : null}
            </section>
            ))}
        <div className='flex justify-end'>
            <button
            className="text-white bg-[rgb(232,240,232)] bg-opacity-50 font-bold rounded-full w-1/4"
        >
            <NavLink to="/lease-2">Next</NavLink> 
        </button>  
        </div>     
        </div>
        </div>
        </div>
    );

}

export default Lease1