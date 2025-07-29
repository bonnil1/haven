import React from 'react'
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom'
import { loadFromSession } from '../utils/sessionStorage';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";

const Filter = () => {

    const slides = {
        property_types: ["House", "Apartment", "Condo", "Cottage", "Guesthouse", "Hotel"],
        space: [
            { label: "An entire place", value: 'Entire-Place' },
            { label: "A private room", value: 'Private-Room' },
            { label: "A shared room", value: 'Shared-Room' } 
        ],
        rooms: ["bedrooms", "beds", "bathrooms"],
        amenities: [
            { label: 'In-unit laundry', value: 'IU_laundry' },
            { label: 'Building laundry', value: 'B_laundry' }, 
            { label: 'Wifi', value: 'wifi' }, 
            { label: 'Heater', value: 'heater' },
            { label: 'Air conditioning', value: 'ac' },
            { label: 'Parking', value: 'parking' },
            { label: 'TV', value: 'tv' }, 
            { label: 'Kitchen', value: 'kitchen' },
            { label: 'Furnished', value: 'furnished' },
            { label: 'Gym', value: 'gym' },
            { label: 'Pool', value: 'pool' },
            { label: 'Pet friendly', value: 'pet_friendly' }
        ],
        kitchen: [
            { label: 'Stove', value: 'stove' }, 
            { label: 'Utensils', value: 'utensils' }, 
            { label: 'Dishwasher', value: 'dishwasher' }, 
            { label: 'Refrigerator', value: 'fridge' },
            { label: 'Oven', value: 'oven' },
            { label: 'Microwave', value: 'microwave' },
            { label: 'Pots & pans', value: 'potpans' },
            { label: 'Coffee or Kettle', value: 'coffee' },
            { label: 'Toaster', value: 'toaster' }
        ],
        furniture: [
            { label: 'Bed', value: 'bed' },
            { label: 'Workspace', value: 'workspace' }, 
            { label: 'Couch', value: 'couch' },
            { label: 'Dining table', value: 'D_table' },
            { label: 'Bar table', value: 'B_table' },
            { label: 'Coffee table', value: 'C_table' }
        ],
        safeties: [
            { label: 'Smoke detector', value: 'S_detector' },
            { label: 'CO detector', value: 'CO_detector' },
            { label: 'Fire extinguisher', value: 'F_extinguisher' }
        ]
    }

    /* load search info from session */
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)
    const city = searchParams.get("city")
    const state = searchParams.get("state")
    const country = searchParams.get("country")
    const adults = searchParams.get("adults")
    const children = searchParams.get("children")
    const pets = searchParams.get("pets")
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")

    // Create initial state with all values set to false
    const initializeCategoryState = (items) =>
        items.reduce((acc, item) => {
        acc[item.value] = false;
        return acc;
    }, {});

    const [formData, setFormData] = useState({
            city: city,
            state: state,
            country: country,
            adults: adults,
            children: children,
            pets: pets,
            date: [startDate, endDate],
            type: "",
            space: "",
            bedrooms: 1,
            beds: 1,
            bathrooms: 1,
            amenities: initializeCategoryState(slides.amenities),
            furniture: initializeCategoryState(slides.furniture),
            kitchen: initializeCategoryState(slides.kitchen),
            safeties: initializeCategoryState(slides.safeties),
    });
    const [selectedSpace, setSelectedSpace] = useState("");
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [selectedSafeties, setSelectedSafeties] = useState([]);
    const [showKitchen, setShowKitchen] = useState(false);
    const [showFurniture, setShowFurniture] = useState(false);
    const [showSafeties, setShowSafeties] = useState(false);

    const handleIncrement = (item) => {
        setFormData((prev) => ({
        ...prev,
        [item]: prev[item] + 1,
        }));
    };

    const handleDecrement = (item) => {
        setFormData((prev) => ({
        ...prev,
        [item]: Math.max(0, prev[item] - 1),
        }));
    };

    const toggleValue = (category, value) => {
        setFormData((prev) => ({
          ...prev,
          [category]: {
            ...prev[category],
            [value]: !prev[category][value],
          },
        }));
    };
    
    const renderCategory = (title, category) => (
        <div >
            <div className="flex flex-wrap">
            {slides[category].map((item) => {
                const isSelected = formData[category][item.value];
                return (
                <div
                    key={item.value}
                    onClick={() => toggleValue(category, item.value)}
                    className={`border border-[rgb(232,240,232)] border-1 p-1.5 rounded-lg hover:text-white hover:bg-slate-700 cursor-pointer text-sm flex flex-col justify-center mr-1 mb-1
                    ${isSelected ? "border-teal-700 bg-slate-700 text-white shadow-md" : "border-[rgb(232,240,232)]"}`}
                    style={{ userSelect: "none" }}
                >
                    {item.label}
                </div>
                );
            })}
            </div>
        </div>
    );

  return (
    <div>
        <form /*onSubmit={handleSubmit}*/ className="font-nunito">
        <h1 className='text-[rgb(42,98,112)] text-lg font-bold mb-2'>Search Filters</h1>

        {/* Property Type Dropdown */}
        <div>
        <label className="mb-1 font-bold text-sm">Type of Place</label>
        <div className="flex flex-wrap bg-white rounded-lg p-1 mb-1">
            {slides.space.map(item => {
                const isSelected = selectedSpace === item.value;
                return (
                    <div
                        key={item.value}
                        onClick={() => setSelectedSpace(item.value)}
                        className={`border border-[rgb(232,240,232)] border-1 p-1.5 rounded-lg hover:text-white hover:bg-slate-700 cursor-pointer text-sm flex flex-col justify-center mr-1 mb-1
                            ${isSelected ? "border-teal-700 bg-slate-700 text-white shadow-md" : "border-[rgb(232,240,232)]"}`}
                        //style={{ userSelect: 'none' }}
                        >
                        {item.label}
                    </div>
                );
            })}
        </div>
        </div>

        {/* Price Range */}
        <div className='w-2/3'>
        <label className="block mb-1 font-bold text-sm">Price Range</label>
        <div className='flex justify-between text-sm text-bold px-2 mb-4'>
            <div className='mr-2'>
                <labe>Minimum</labe>
                <input
                    className='border p-1 rounded-md focus:outline-gray-200'
                >
                </input>
            </div>
            <div>
                <label>Maximum</label>
                <input
                    className='border p-1 rounded-md focus:outline-gray-200'
                >
                </input>
            </div>
        </div>
        </div>

        {/* Number of rooms and beds */}
        <div className='w-2/3'>
        <label className="block mb-4 font-bold text-sm">Number of Rooms and Beds</label>
        <div className='px-2'>
        {slides.rooms.map((item, index) => (
            <div key={index} className="flex items-center justify-between mb-2">
                <label className="mb-2 text-gray-700 capitalize text-sm">
                    {item}
                </label>
                <div className="flex items-center space-x-1">
                    <button
                        type="button"
                        onClick={() => handleDecrement(item)}
                        className="w-6 h-6 text-sm font-bold text-gray-500 hover:bg-slate-700 hover:text-white border rounded-full"
                    >
                    −
                    </button>

                    <span className="w-8 text-center text-sm font-semibold text-slate-600">
                    {formData[item]}
                    </span>
                    
                    <button
                        type="button"
                        onClick={() => handleIncrement(item)}
                        className="w-6 h-6 text-sm font-bold text-gray-500 hover:bg-slate-700 hover:text-white border rounded-full"
                    >
                    +
                    </button>
                </div>
            </div>
        ))}
        </div>
        </div>

        {/* Amenities */}
        <div className='my-3'>
            <label className="block font-bold text-sm mb-3">Amenities</label>
            {renderCategory("Amenities", "amenities")}
        </div>

        {/* Kitchen */}
        <button 
            className="block mb-1 font-bold text-sm"
            type="button"
            onClick={() => setShowKitchen(!showKitchen)}
        >
            <div className='flex'>
                {showKitchen ? <MdKeyboardArrowUp className='size-5'/> : <MdOutlineKeyboardArrowDown className='size-5'/>} Kitchen
            </div>
        </button>
        {showKitchen && (
        <div className="flex flex-wrap bg-white rounded-lg p-2 mb-2">
            {renderCategory("Kitchen", "kitchen")}
        </div>
        )}

        {/* Furniture */}
        <button 
            className="block mb-1 font-bold text-sm"
            type="button"
            onClick={() => setShowFurniture(!showFurniture)}
        >
            <div className='flex'>
                {showFurniture ? <MdKeyboardArrowUp className='size-5'/> : <MdOutlineKeyboardArrowDown className='size-5'/>} Furniture
            </div>
        </button>
        {showFurniture && (
        <div className="flex flex-wrap bg-white rounded-lg p-2 mb-2">
            {renderCategory("Furniture", "furniture")}
        </div>
        )}

        {/* Safeties */}
        <button 
            className="block mb-1 font-bold text-sm"
            type="button"
            onClick={() => setShowSafeties(!showSafeties)}
        >
            <div className='flex'>
                {showSafeties ? <MdKeyboardArrowUp className='size-5'/> : <MdOutlineKeyboardArrowDown className='size-5'/>}Safety Features
            </div>
        </button>
        {showSafeties && (
        <div className="flex flex-wrap bg-white rounded-lg p-2 mb-2">
            {renderCategory("Safety Features", "safeties")}
        </div>
        )}

        {/* Buttons */}
        <div className="flex justify-end space-x-3">
            <button
                type="button"
                //onClick={onClose}
                className="px-2 py-1 border rounded text-sm"
            >
                Cancel
            </button>
            <button
                type="submit"
                className="px-2 py-1 bg-[rgb(42,98,112)] text-white rounded hover:bg-gray-400 text-sm"
            >
                Apply Filters
            </button>
        </div>
        </form>
    </div>
  )
}

export default Filter