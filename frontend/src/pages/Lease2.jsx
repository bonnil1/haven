import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MdOutlineLocalLaundryService } from "react-icons/md";
import { GiWashingMachine } from "react-icons/gi";
import { FaWifi } from "react-icons/fa";
import { FaFire } from "react-icons/fa6";
import { FaRegSnowflake } from "react-icons/fa";
import { FaCar } from "react-icons/fa6";
import { ImTv } from "react-icons/im";
import { TbToolsKitchen3 } from "react-icons/tb";
import { FaCouch } from "react-icons/fa";
import { CgGym } from "react-icons/cg";
import { MdOutlinePool } from "react-icons/md";
import { FaPaw } from "react-icons/fa";
import { BiSolidFridge } from "react-icons/bi";
import { PiOven } from "react-icons/pi";
import { TbMicrowaveFilled } from "react-icons/tb";
import { GiCookingPot } from "react-icons/gi";
import { GiCoffeePot } from "react-icons/gi";
import { GiToaster } from "react-icons/gi";
import { FaBed } from "react-icons/fa";
import { MdOutlineTableRestaurant } from "react-icons/md";
import { GiDesk } from "react-icons/gi";
import { MdOutlineLocalBar } from "react-icons/md";
import { MdOutlineTableBar } from "react-icons/md";
import { LuAlarmSmoke } from "react-icons/lu";
import { GoAlertFill } from "react-icons/go";
import { FaFireExtinguisher } from "react-icons/fa6";
import { saveToSession, loadFromSession } from '../utils/sessionStorage';

const Lease2 = () => {

    const slides = {
        amenities: [
            { label: 'In-unit laundry', value: 'IU_laundry', icon: <MdOutlineLocalLaundryService className='size-8 mb-1'/> },
            { label: 'Building laundry', value: 'B_laundry', icon: <GiWashingMachine className='size-8 mb-1'/> }, 
            { label: 'Wifi', value: 'wifi', icon: <FaWifi className='size-8 mb-1'/> }, 
            { label: 'Heater', value: 'heater', icon: <FaFire className='size-8 mb-1'/> },
            { label: 'Air conditioning', value: 'ac', icon: <FaRegSnowflake className='size-8 mb-1'/> },
            { label: 'Parking', value: 'parking', icon: <FaCar className='size-8 mb-1'/> },
            { label: 'TV', value: 'tv', icon: <ImTv className='size-8 mb-1'/> }, 
            { label: 'Kitchen', value: 'kitchen', icon: <TbToolsKitchen3 className='size-8 mb-1'/> },
            { label: 'Furnished', value: 'furnished', icon: <FaCouch className='size-8 mb-1'/> },
            { label: 'Gym', value: 'gym', icon: <CgGym className='size-8 mb-1'/> },
            { label: 'Pool', value: 'pool', icon: <MdOutlinePool className='size-8 mb-1'/> },
            { label: 'Pet friendly', value: 'pet_friendly', icon: <FaPaw className='size-8 mb-1'/> }
        ],
        kitchen: [
            { label: 'Stove', value: 'stove', icon: <PiOven className='size-8 mb-1'/>  }, 
            { label: 'Utensils', value: 'utensils', icon: <TbToolsKitchen3 className='size-8 mb-1'/> }, 
            { label: 'Dishwasher', value: 'dishwasher', icon: <MdOutlineLocalLaundryService className='size-8 mb-1'/> }, 
            { label: 'Refrigerator', value: 'fridge', icon: <BiSolidFridge className='size-8 mb-1'/> },
            { label: 'Oven', value: 'oven', icon: <PiOven className='size-8 mb-1'/> },
            { label: 'Microwave', value: 'microwave', icon: <TbMicrowaveFilled className='size-8 mb-1'/> },
            { label: 'Pots & pans', value: 'potpans', icon: <GiCookingPot className='size-8 mb-1'/> },
            { label: 'Coffee or Kettle', value: 'coffee', icon: <GiCoffeePot className='size-8 mb-1'/> },
            { label: 'Toaster', value: 'toaster', icon: <GiToaster className='size-8 mb-1'/> }
        ],
        furniture: [
            { label: 'Bed', value: 'bed', icon: <FaBed className='size-8 mb-1'/> },
            { label: 'Workspace', value: 'workspace', icon: <GiDesk className='size-8 mb-1'/> }, 
            { label: 'Couch', value: 'couch', icon: <FaCouch className='size-8 mb-1'/> },
            { label: 'Dining table', value: 'D_table', icon: <MdOutlineTableRestaurant className='size-8 mb-1'/>},
            { label: 'Bar table', value: 'B_table', icon: <MdOutlineLocalBar className='size-8 mb-1' /> },
            { label: 'Coffee table', value: 'C_table', icon: <MdOutlineTableBar className='size-8 mb-1'/> }
        ],
        safeties: [
            { label: 'Smoke detector', value: 'S_detector', icon: <LuAlarmSmoke className='size-8 mb-1'/> },
            { label: 'CO detector', value: 'CO_detector', icon: <GoAlertFill className='size-8 mb-1'/>},
            { label: 'Fire extinguisher', value: 'F_extinguisher', icon: <FaFireExtinguisher className='size-8 mb-1'/> }
        ]
    }

    const initializeCategoryState = (items) =>
        items.reduce((acc, item) => {
        acc[item.value] = false;
        return acc;
    }, {});

    const savedForm = sessionStorage.getItem('form2');
    const parsedForm = savedForm ? JSON.parse(savedForm) : null;

    const [formData, setFormData] = useState({
    amenities: parsedForm?.amenities || initializeCategoryState(slides.amenities),
    furniture: parsedForm?.furniture || initializeCategoryState(slides.furniture),
    kitchen: parsedForm?.kitchen || initializeCategoryState(slides.kitchen),
    safeties: parsedForm?.safeties || initializeCategoryState(slides.safeties),
    });
    /*
    const [selectedAmenities, setSelectedAmenities] = useState(() => {
        const savedForm = sessionStorage.getItem('form2');
        const amenities = savedForm ? JSON.parse(savedForm).amenities : [];
        return amenities
    });

    const [selectedKitchen, setSelectedKitchen] = useState(() => {
        const savedForm = sessionStorage.getItem('form2');
        const kitchen = savedForm ? JSON.parse(savedForm).kitchen : [];
        return kitchen
    })

    const [selectedFurniture, setSelectedFurniture] = useState(() => {
        const savedForm = sessionStorage.getItem('form2');
        const furniture = savedForm ? JSON.parse(savedForm).furniture : [];
        return furniture
    })

    const [selectedSafeties, setSelectedSafeties] = useState(() => {
        const savedForm = sessionStorage.getItem('form2');
        const safeties = savedForm ? JSON.parse(savedForm).safeties : [];
        return safeties
    });
    */
    const navigate = useNavigate();
    
    const handleSubmit = async (event) => {
        
        event.preventDefault();
        console.log(formData)

        try {
            const response = await fetch("http://localhost:4000/api/lease-2", {
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

    useEffect(() => {
        const stored = loadFromSession('form2');
        if (stored) setFormData(stored);
        //console.log(stored)
    }, []);
    
    const handleNext = (e) => {
        e.preventDefault();
        saveToSession('form2', formData);
        navigate('/lease-3');
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
        <div>
            <div className="grid grid-cols-3 gap-2 bg-white rounded-lg p-3 mb-6">
            {slides[category].map((item) => {
                const isSelected = formData[category][item.value];
                return (
                <div
                    key={item.value}
                    onClick={() => toggleValue(category, item.value)}
                    className={`flex flex-col items-center border border-[rgb(232,240,232)] border-1 p-3 rounded-lg hover:text-white hover:bg-slate-700 cursor-pointer text-sm flex flex-col justify-center mr-1 mb-1
                    ${isSelected ? "border-teal-700 bg-slate-600 text-white shadow-md" : "border-[rgb(232,240,232)]"}`}
                >
                    {item.icon}{item.label} 
                </div>
                );
            })}
            </div>
        </div>
    );

    return (
        <div className="flex justify-center font-nunito font-semibold text-slate-700 bg-lease-bg bg-cover bg-opacity-25">
        <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="relative w-10 flex flex-col items-center overflow-hidden">
            <div className={`absolute top-10 w-3 bg-white bg-opacity-70 rounded-md ${formData.amenities.kitchen ? "mb-[29rem]" : "bottom-80"}
            ${formData.amenities.furnished ? "mb-[23rem]" : "bottom-80"} ${formData.amenities.kitchen && formData.amenities.furnished ? "bottom-[50rem]" : "bottom-80"}`}/>
                {Array.from({ length: 2 }).map((_, index) => (
                    <div key={index} className={`relative z-10 flex items-center justify-center w-10 h-10 mt-9 bg-red-400 text-white text-xl rounded-full
                    ${formData.amenities.kitchen ? "mb-[61rem]" : "mb-[32rem]"} ${formData.amenities.furnished ? "mb-[55rem]" : "mb-[32rem]"}
                    ${formData.amenities.kitchen && formData.amenities.furnished ? "mb-[85rem]" : "mb-[32rem]"}`}>
                        {index + 4}
                    </div>
                ))}
        </div>
        
        {/* Slides */}
        <form onSubmit={handleNext} className="flex flex-col gap-12 p-10">
            <div className="bg-white bg-opacity-70 p-10 pt-6 pb-0 rounded-lg shadow-md w-[42rem]">
                <h2 className="text-2xl font-semibold mb-1">Tell guests what your place has to offer.</h2>
                <h4 className="text-lg font-light mb-4">Select items that apply.</h4>
                {renderCategory("Amenities", "amenities")}
            </div>

            {formData.amenities.kitchen && (
                <div className="bg-white bg-opacity-70 p-10 pt-6 pb-0 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-1">Kitchen</h2>
                    <h4 className="text-lg font-light mb-4">Kitchen supplies (pots, pans, dishes, utensils).</h4>
                    {renderCategory("Kitchen", "kitchen")}
                </div>
            )}

            {formData.amenities.furnished && (
                <div className="bg-white bg-opacity-70 p-10 pt-6 pb-0 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-1">Furniture</h2>
                    <h4 className="text-lg font-light mb-4">Select furnitures in your place.</h4>
                    {renderCategory("Furniture", "furniture")}
                </div>
            )}          

            <div className="bg-white bg-opacity-70 p-10 pt-6 pb-0 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-1">Safety Features.</h2>
                <h4 className="text-lg font-light mb-4">What safety features does your home have.</h4>
                {renderCategory("Safety Features", "safeties")}
            </div>
   
            <div className='flex justify-between'>
                <button
                    className="text-white bg-[rgb(232,240,232)] bg-opacity-50 font-bold rounded-full w-1/4"
                >
                    <NavLink to="/lease-1">Back</NavLink>
                </button> 
                <button
                    className="text-[rgb(42,98,112)] bg-[rgb(232,240,232)] bg-opacity-50 font-bold rounded-full w-1/4"
                    type="submit"
                >
                    {/* <NavLink to="/lease-3">Next</NavLink> */}
                    Next
                </button>  
            </div>
        </form>         
        </div>     
        </div>
    )
}

export default Lease2