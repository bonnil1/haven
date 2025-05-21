import React from 'react'
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Lease2 = () => {

    const [formData, setFormData] = useState({
        guests: 1,
        bedrooms: 1,
        beds: 1,
        bathrooms: 1,
        amenities: [],
    });

    const handleIncrement = (field) => {
        setFormData((prev) => ({
        ...prev,
        [field]: prev[field] + 1,
        }));
    };

    const handleDecrement = (field) => {
        setFormData((prev) => ({
        ...prev,
        [field]: Math.max(0, prev[field] - 1), // Prevent going below 0
        }));
    };

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
            title: "Share some basics about your place.",
            content: ["Guests", "Bedrooms", "Beds", "Bathrooms"],
        },
        {
            title: "Tell guests what your place has to offer.",
            content:["Yes", "No", "Partially"]
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
                {index + 3}
            </div>
            ))}
            </div>
        {/* Slides */}
        <div className="flex flex-col gap-12 p-10">

            <div className="bg-white bg-opacity-70 p-10 pt-6 pb-0 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-1">Share some basics about your place for the user.</h2>
                <h4 className="text-lg font-light mb-4">You'll add more details later.</h4>
                {['guests', 'bedrooms', 'beds', 'bathrooms'].map((field) => (
                    <div key={field} className="flex items-center justify-between mb-6">
                    <label className="mb-2 text-gray-700 capitalize font-medium">
                        {field}
                    </label>
                    <div className="flex items-center space-x-1">
                        <button
                            type="button"
                            onClick={() => handleDecrement(field)}
                            className="w-10 h-10 text-lg font-bold text-gray-400 hover:bg-gray-200 border rounded-full"
                        >
                        −
                        </button>

                        <span className="w-10 text-center text-lg font-semibold text-slate-600">
                        {formData[field]}
                        </span>
                        
                        <button
                            type="button"
                            onClick={() => handleIncrement(field)}
                            className="w-10 h-10 text-lg font-bold text-gray-400 hover:bg-gray-200 border rounded-full"
                        >
                        +
                        </button>
                    </div>
                    </div>
                ))}
            </div>

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
    )
}

export default Lease2