import React from 'react'
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const Lease2 = () => {

    const [formData, setFormData] = useState({
        amenities: [],
        safeties: [],
    });

    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [selectedSafeties, setSelectedSafeties] = useState([]);
    const [kitchen, setKitchen] = useState(false);
    const [furniture, setFurniture] = useState(false);

    const slides = [
        {
            title: "Tell guests what your place has to offer.",
            options:['In-unit laundry', 'Building laundry', 'Wifi', 'Heater', 'Air conditioning', 'Parking',
                'TV', 'Kitchen', 'Fully furnished', 'Gym', 'Pool', 'Pet friendly']
        },
        {
            title: "Safety features.",
            options: ["Smoke detector", "CO detector", "Fire extinguisher"],
        },
    ]
    
    const handleSubmit = async (event) => {
        
        event.preventDefault();

        try {
            const response = await fetch("/api/lease-2", {
                //"/api/lease-2"
                //"http://localhost:4000/api/lease-2"
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            console.log(data);

            if (data.message === "Lease 2 created successfully!") {
                setMessage(data.message);
                navigate('/lease-3')
            } 

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex justify-center font-nunito font-semibold text-slate-700 bg-lease-bg bg-cover bg-opacity-25">
        <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="relative w-10 flex flex-col items-center">
            <div className="absolute top-24 bottom-0 w-3 bg-white bg-opacity-70"/>
            {slides.map((_, index) => (
                <div key={index} className={`relative z-10 flex items-center justify-center w-10 h-10 mt-16 bg-red-400 text-white text-xl rounded-full 
                ${kitchen ? "mb-[45rem]" : "mb-80"} ${furniture ? "mb-[42rem]" : "mb-80"} ${kitchen && furniture ? "mb-[65rem]" : "mb-80"}`}>
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
                    'TV', 'Kitchen', 'Fully furnished', 'Gym', 'Pool', 'Pet friendly'].map((item) => (
                        <div
                            key={item}
                            onClick={() => {
                                const isSelected = formData.amenities.includes(item)
                                const updatedAmenities = isSelected 
                                    ? formData.amenities.filter(a => a !== item) // creates a new array with that item removed
                                    : [...formData.amenities, item] // creates a new array with the item added to the end
                                setKitchen(updatedAmenities.includes('Kitchen'));
                                setFurniture(updatedAmenities.includes('Fully furnished'));
                                setFormData(prev => ({ ...prev, amenities: updatedAmenities }));
                                setSelectedAmenities(updatedAmenities);
                            }}
                            className={`border border-[rgb(232,240,232)] border-2 p-4 rounded-lg hover:shadow-lg cursor-pointer text-xl flex flex-col justify-center
                            ${selectedAmenities.includes(item) ? "border-teal-700 shadow-md" : "border-[rgb(232,240,232)]"}`}
                        >
                            {/*<span className="text-xl">{photo}</span>*/}
                            <span className="flex justify-center text-sm text-slate-500 font-bold">
                                {item}
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
                        'Microwave', 'Pots & pans', 'Coffee or Kettle', 'Toaster'].map((item) => (
                            <div
                                key={item}
                                onClick={() => {
                                    const isSelected = formData.amenities.includes(item)
                                    const updatedAmenities = isSelected 
                                        ? formData.amenities.filter(a => a !== item) // creates a new array with that item removed
                                        : [...formData.amenities, item] // creates a new array with the item added to the end
                                    setFormData(prev => ({ ...prev, amenities: updatedAmenities }));
                                    setSelectedAmenities(updatedAmenities);
                                }}
                                className={`border border-[rgb(232,240,232)] border-2 p-4 rounded-lg hover:shadow-lg cursor-pointer text-xl flex flex-col
                                ${selectedAmenities.includes(item) ? "border-teal-700 shadow-md" : "border-[rgb(232,240,232)]"}`}
                            >
                                {/*<span className="text-xl">{photo}</span>*/}
                                <span className="flex justify-center text-sm text-slate-500 font-bold">
                                    {item}
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
                        {['Bed', 'Workspace', 'Couch', 'Dining table', 'Bar table', 'Coffee table'].map((item) => (
                            <div
                                key={item}
                                onClick={() => {
                                    const isSelected = formData.amenities.includes(item)
                                    const updatedAmenities = isSelected 
                                        ? formData.amenities.filter(a => a !== item) // creates a new array with that item removed
                                        : [...formData.amenities, item] // creates a new array with the item added to the end
                                    setFormData(prev => ({ ...prev, amenities: updatedAmenities }));
                                    setSelectedAmenities(updatedAmenities);
                                }}
                                className={`border border-[rgb(232,240,232)] border-2 p-4 rounded-lg hover:shadow-lg cursor-pointer text-xl flex flex-col
                                ${selectedAmenities.includes(item) ? "border-teal-700 shadow-md" : "border-[rgb(232,240,232)]"}`}
                            >
                                {/*<span className="text-xl">{photo}</span>*/}
                                <span className="flex justify-center text-sm text-slate-500 font-bold">
                                    {item}
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
                    {['Smoke detector', 'CO detector', 'Fire extinguisher'].map((item) => (
                        <div
                            key={item}
                            onClick={() => {
                                const isSelected = formData.safeties.includes(item)
                                const updatedSafeties = isSelected 
                                    ? formData.safeties.filter(a => a !== item) // creates a new array with that item removed
                                    : [...formData.safeties, item] // creates a new array with the item added to the end
                                setFormData(prev => ({ ...prev, safeties: updatedSafeties }));
                                setSelectedSafeties(updatedSafeties);
                            }}
                            className={`border border-[rgb(232,240,232)] border-2 p-4 rounded-lg hover:shadow-lg cursor-pointer text-xl flex flex-col
                            ${selectedSafeties.includes(item) ? "border-teal-700 shadow-md" : "border-[rgb(232,240,232)]"}`}
                        >
                            {/*<span className="text-xl">{photo}</span>*/}
                            <span className="flex justify-center text-sm text-slate-500 font-bold">
                                {item}
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