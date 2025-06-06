import React from 'react'
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const Lease2 = () => {

    const [formData, setFormData] = useState({
        amenities: [],
        safety: [],
    });

    const kitchen = false;
    const furniture = false;

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
            options:["Yes", "No", "Partially"]
        },
        {
            title: "Safety features.",
            options: ["Smoke detector", "CO detector", "Fire extinguisher"],
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
                <div className="grid grid-cols-3 gap-2 bg-white rounded-lg p-3 mb-6">
                    {['In-unit laundry', 'Building laundry', 'Wifi', 'Heater', 'Air conditioning', 'Parking',
                    'TV', 'Kitchen', 'Fully furnished', 'Gym', 'Pool', 'Pet friendly'].map((field) => (
                        <div
                            key={field}
                            className="border border-[rgb(232,240,232)] border-2 p-4 rounded-lg hover:shadow-lg cursor-pointer text-xl flex flex-col justify-center"
                        >
                            {/*<span className="text-xl">{photo}</span>*/}
                            <span className="flex justify-center text-sm text-slate-500 font-bold">
                                {field}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {kitchen && (
                <div className="bg-white bg-opacity-70 p-10 pt-6 pb-0 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-1">Kitchen</h2>
                <h4 className="text-lg font-light mb-4">Kitchen supplies (pots, pans, dishes, utensils).</h4>
                    <div className="grid grid-cols-3 gap-2 bg-white rounded-lg p-3 mb-6">
                        {['Dishes', 'Utensils', 'Dishwasher', 'Refrigerator', 'Stove',
                        'Microwave', 'Pots & pans', 'Coffee or Kettle', 'Toaster'].map((field) => (
                            <div
                                key={field}
                                className="border border-[rgb(232,240,232)] border-2 p-4 rounded-lg hover:shadow-lg cursor-pointer text-xl flex flex-col"
                            >
                                {/*<span className="text-xl">{photo}</span>*/}
                                <span className="flex justify-center text-sm text-slate-500 font-bold">
                                    {field}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {furniture && (
                <div className="bg-white bg-opacity-70 p-10 pt-6 pb-0 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-1">Furniture</h2>
                <h4 className="text-lg font-light mb-4">Select furnitures in your place.</h4>
                    <div className="grid grid-cols-3 gap-2 bg-white rounded-lg p-3 mb-6">
                        {['Bed', 'Workspace', 'Couch', 'Dining table', 'Bar table', 'Coffee table'].map((field) => (
                            <div
                                key={field}
                                className="border border-[rgb(232,240,232)] border-2 p-4 rounded-lg hover:shadow-lg cursor-pointer text-xl flex flex-col"
                            >
                                {/*<span className="text-xl">{photo}</span>*/}
                                <span className="flex justify-center text-sm text-slate-500 font-bold">
                                    {field}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}          

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
                            <span className="flex justify-center text-sm text-slate-500 font-bold">
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