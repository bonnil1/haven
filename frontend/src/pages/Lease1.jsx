import React from 'react'
import { useState, useEffect } from 'react'
import { FaHouseChimney } from "react-icons/fa6";
import { MdApartment } from "react-icons/md";
import { FaBuilding } from "react-icons/fa";
import { MdCottage } from "react-icons/md";
import { HiHomeModern } from "react-icons/hi2";
import { FaHotel } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import { saveToSession, loadFromSession } from '../utils/sessionStorage';

const Lease1 = () => {

    const [formData, setFormData] = useState({
        type: "",
        space: "",
        guests: 1,
        bedrooms: 1,
        beds: 1,
        bathrooms: 1,
    });

    const [selectedType, setSelectedType] = useState(() => {
        const savedForm = sessionStorage.getItem('form1');
        const type = savedForm ? JSON.parse(savedForm).type : null;
        return type
    });
    const [selectedSpace, setSelectedSpace] = useState(() => {
        const savedForm = sessionStorage.getItem('form1');
        const space = savedForm ? JSON.parse(savedForm).space : null;
        return space
    });
    const [message, setMessage] = useState("")
    const navigate = useNavigate();

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

    const slides = [
        {
            title: "Which of these best describe your place?",
            options: ["House", "Apartment", "Condo", "Cottage", "Guesthouse", "Hotel"],
            icon: [<FaHouseChimney />, <MdApartment />, <FaBuilding />, <MdCottage />, <HiHomeModern />, <FaHotel />]
        },
        {
            title: "What type of place will your guest stay?",
            options: ["An entire place", "A private room", "A shared room"],
            icon: [
                "Guests will have the entire place to themselves.",
                "Guests will have a private room to themselves in a shared home.",
                "Guests will share the room with another person."
            ]
        },
        {
            title: "Share some basics about your place.",
            options: ["guests", "bedrooms", "beds", "bathrooms"],
        },
    ];

    const handleSubmit = async (event) => {

        event.preventDefault();
        console.log(formData)

        try {
            const response = await fetch("http://localhost:4000/api/lease-1", {
                //"/api/lease-1"
                //"http://localhost:4000/api/lease-1"
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            console.log(data);

            if (data.message === "Lease 1 created successfully!") {
                setMessage(data.message);
                navigate('/lease-2')
            } 

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const stored = loadFromSession('form1');
        if (stored) setFormData(stored);
        //console.log(stored)
    }, []);
  
    const handleNext = (e) => {
      e.preventDefault();
      saveToSession('form1', formData);
      navigate('/lease-2');
    };

    return (
        <div className="flex justify-center font-nunito font-semibold text-slate-700 bg-lease-bg bg-cover bg-opacity-25">
        <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="relative w-10 flex flex-col items-center pt-10">
            <div className="absolute top-12 bottom-28 w-3 bg-white bg-opacity-70 rounded-md" />
            {slides.map((_, index) => (
                <div
                    key={index}
                    className="relative z-10 flex items-center justify-center w-10 h-10 mb-96 bg-red-400 text-white text-xl rounded-full"
                >
                    {index + 1}
                </div>
            ))}
            </div>
        {/* Slides */}
        <form onSubmit={handleNext} className="flex flex-col gap-12 p-10">
            {slides.map((slide, index) => (
            <section key={index} className="bg-white bg-opacity-70 p-8 pt-6 rounded-lg shadow-md w-[42rem]">
                <h2 className="text-2xl font-semibold mb-4">{slide.title}</h2>
                {slide.options.length === 6 ? (
                <div className="grid grid-cols-3 gap-2 bg-white rounded-lg p-3">
                    {slide.options.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => {
                            setSelectedType(item);
                            setFormData(prev => ({ ...prev, type: item }));
                        }}
                        className={`border border-[rgb(232,240,232)] border-2 p-3 rounded-lg hover:shadow-lg cursor-pointer flex flex-col items-center gap-3 
                        ${selectedType === item ? "border-teal-700 shadow-md" : "border-[rgb(232,240,232)]"}`}
                    >
                        <span className="text-4xl text-cyan-900">
                            {slide.icon?.[index]}
                        </span>
                        <span className='text-lg'>{item}</span>
                    </div>
                    ))}
                </div>
                ) : slide.options.length === 3 ? ( 
                <div className="grid grid-cols-1 gap-2 bg-white rounded-lg p-3">
                    {slide.options.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => {
                            setSelectedSpace(item);
                            setFormData(prev => ({ ...prev, space: item }));
                        }}
                        className={`border border-[rgb(232,240,232)] border-2 p-4 rounded-lg hover:shadow-lg cursor-pointer text-xl flex flex-col
                        ${selectedSpace === item ? "border-teal-700 shadow-md" : "border-[rgb(232,240,232)]"}`}
                    >
                        <span className="text-xl">{item}</span>
                        <span className="text-sm text-slate-500 font-normal">
                            {slide.icon?.[index]}
                        </span>
                    </div>
                    ))}
                </div>
                ) : slide.options.length === 4 ? ( 
                    <div className="grid grid-cols-1 gap-2 bg-white rounded-lg p-3">
                        <div className='border border-[rgb(232,240,232)] rounded-lg border-2 p-3'>
                        {slide.options.map((item, index) => (
                            <div key={index} className="flex items-center justify-between mb-4">
                                <label className="mb-2 text-gray-700 capitalize font-medium">
                                    {item}
                                </label>
                                <div className="flex items-center space-x-1">
                                    <button
                                        type="button"
                                        onClick={() => handleDecrement(item)}
                                        className="w-10 h-10 text-lg font-bold text-gray-400 hover:bg-gray-200 border rounded-full"
                                    >
                                    −
                                    </button>

                                    <span className="w-10 text-center text-lg font-semibold text-slate-600">
                                    {formData[item]}
                                    </span>
                                    
                                    <button
                                        type="button"
                                        onClick={() => handleIncrement(item)}
                                        className="w-10 h-10 text-lg font-bold text-gray-400 hover:bg-gray-200 border rounded-full"
                                    >
                                    +
                                    </button>
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                    ) : null}
            </section>
            ))}

            <div className='flex justify-end'>
                <button
                className="text-white bg-[rgb(232,240,232)] bg-opacity-50 font-bold rounded-full w-1/4"
                type="submit"
                >
                {/* <NavLink to="/lease-2">Next</NavLink> */}
                Next
            </button>  
            </div>     
        </form>
        </div>
        </div>
    );

}

export default Lease1