import React from 'react'
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const Lease2 = () => {

        const [formData, setFormData] = useState({
            amenities: [],
        });

    const handleAmenitiesChange = (event) => {
        const { value, checked } = event.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            amenities: checked
                ? [...prevFormData.amenities, value] // Add the value if checked
                : prevFormData.amenities.filter((option) => option !== value), // Remove the value if unchecked
        }));
    };

    const slides = [
        {
            title: "Tell guests what your place has to offer.",
            content:["Yes", "No", "Partially"]
        },
        {
            title: "Safety features.",
            content: ["Smoke detector", "CO detector", "Fire extinguisher"],
        },
    ]

    return (
        <div className="flex justify-center font-nunito font-semibold text-slate-700 bg-lease-bg bg-cover bg-opacity-25">
        <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="relative w-10 flex flex-col items-center">
            <div className="absolute top-24 bottom-0 w-3 bg-white bg-opacity-70"/>
            {slides.map((_, index) => (
            <div key={index} className="relative z-10 flex items-center justify-center w-10 h-10 mt-16 mb-80 bg-red-400 text-white text-xl rounded-full">
                {index + 4}
            </div>
            ))}
            </div>
        {/* Slides */}
        <div className="flex flex-col gap-12 p-10">
            <div className="bg-white bg-opacity-70 p-10 pt-6 pb-0 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-1">Tell guests what your place has to offer.</h2>
                <h4 className="text-lg font-light mb-4">Select items that apply.</h4>
                    <div className='flex flex-col space-x-4 mb-6 ml-3'>
                        <div className='flex text-sm mb-1 ml-4'>
                            <input
                                type="checkbox"
                                value="dishwasher"
                                checked={formData.amenities.includes("dishwasher")}
                                onChange={handleAmenitiesChange}
                                className="w-4 h-4 mr-2 mt-0.5"
                            />
                            <span>Dishwasher</span>
                        </div>
                        <div className='flex text-sm mb-1'>
                            <input
                                type="checkbox"
                                value="AC"
                                checked={formData.amenities.includes("AC")}
                                onChange={handleAmenitiesChange}
                                className="w-4 h-4 mr-2 mt-0.5"
                            />
                            <span>AC</span>
                        </div>
                        <div className='flex text-sm mb-1'>
                            <input
                                type="checkbox"
                                value="building laundry"
                                checked={formData.amenities.includes("building laundry")}
                                onChange={handleAmenitiesChange}
                                className="w-4 h-4 mr-2 mt-0.5"
                            />
                            <span>Building laundry</span>
                        </div>
                        <div className='flex text-sm mb-1'>
                            <input
                                type="checkbox"
                                value="in unit laundry"
                                checked={formData.amenities.includes("in unit laundry")}
                                onChange={handleAmenitiesChange}
                                className="w-4 h-4 mr-2 mt-0.5"
                            />
                            <span>In unit laundry</span>
                        </div>
                        <div className='flex text-sm mb-1'>
                            <input
                                type="checkbox"
                                value="wifi"
                                checked={formData.amenities.includes("wifi")}
                                onChange={handleAmenitiesChange}
                                className="w-4 h-4 mr-2 mt-0.5"
                            />
                            <span>WiFi</span>
                        </div>
                        <div className='flex text-sm mb-1'>
                            <input
                                type="checkbox"
                                value="parking"
                                checked={formData.amenities.includes("parking")}
                                onChange={handleAmenitiesChange}
                                className="w-4 h-4 mr-2 mt-0.5"
                            />
                            <span>Parking</span>
                        </div>
                        <div className='flex text-sm mb-1'>
                            <input
                                type="checkbox"
                                value="gym"
                                checked={formData.amenities.includes("gym")}
                                onChange={handleAmenitiesChange}
                                className="w-4 h-4 mr-2 mt-0.5"
                            />
                            <span>Gym</span>
                        </div>
                    </div>
            </div>

            <div className="bg-white bg-opacity-70 p-10 pt-6 pb-0 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-1">Safety Features.</h2>
                <h4 className="text-lg font-light mb-4">What safety features does your home have.</h4>
                <div className="grid grid-cols-3 gap-2 bg-white rounded-lg p-3 mb-6">
                    {['Smoke detector', 'CO detector', 'Fire extinguisher'].map((field) => (
                        <div
                            key={field}
                            className="border border-[rgb(232,240,232)] border-2 p-4 rounded-lg hover:shadow-lg cursor-pointer text-xl flex flex-col"
                        >
                            {/*<span className="text-xl">{photo}</span>*/}
                            <span className="flex justify-center text-sm text-slate-500 font-normal">
                                {field}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
   
            <div className='flex justify-end'>
                <button
                    className="text-white bg-[rgb(232,240,232)] bg-opacity-50 font-bold rounded-full w-1/4"
                >
                <NavLink to="/lease-3">Next</NavLink> 
                </button>  
            </div>
        </div>         
        </div>     
        </div>
    )
}

export default Lease2