import React from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { useState, useEffect, useRef } from 'react'

import { loadFromSession } from '../utils/sessionStorage';

const Booking = ({id}) => {

    const [formData, setFormData] = useState({
        adults: 0,
        children: 0,
        pets: 0,
    });
    const [guests, setGuests] = useState("")
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [activeInput, setActiveInput] = useState('start');
    const datepickerRef = useRef();

    const [showPopup, setShowPopup] = useState(false);
    const popupRef = useRef(null);
    const inputRef = useRef(null);

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

    useEffect(() => {
        const stored = loadFromSession('search');

        if (stored) {
            const { adults, children, pets } = stored.formData;

            setFormData(prev => ({
                ...prev,
                adults,
                children,
                pets
            }));

            const { startDate, endDate } = stored.dateRange || {};

            if (startDate && endDate) {
                setDateRange([new Date(startDate), new Date(endDate)]);
            }

        }
    }, []);

    const slides = [
        {
            title: "Occupancy",
            options: ["adults", "children", "pets"],
            extra: ["Ages 13 and above", "Ages 2-12"]
        },
    ]

  return (
    <div className='font-nunito'>
        <div className='flex flex-col items-center w-1/2 bg-white rounded-lg p-5'>
        <div className="grid grid-cols-1 w-full max-w-xl mx-auto">

        <div className="grid grid-cols-2 ">
            {/* Check In */}
            <div className="flex flex-col">
            <label className="text-[rgb(42,98,112)] font-semibold">Check In</label>
            <input
                type="text"
                value={startDate ? startDate.toLocaleDateString() : ''}
                readOnly
                onClick={() => {
                setActiveInput('start');
                datepickerRef.current.setOpen(true);
                }}
                className="appearance-none block w-full text-gray-700 leading-tight focus:outline-none border-b border-gray-300 py-1"
                placeholder="Select date"
            />
            </div>

            {/* Check Out */}
            <div className="flex flex-col">
            <label className="text-[rgb(42,98,112)] font-semibold">Check Out</label>
            <input
                type="text"
                value={endDate ? endDate.toLocaleDateString() : ''}
                readOnly
                onClick={() => {
                setActiveInput('end');
                datepickerRef.current.setOpen(true);
                }}
                className="appearance-none block w-full text-gray-700 leading-tight focus:outline-none border-b border-gray-300 py-1"
                placeholder="Select date"
            />
            </div>

            <div className='availability-calendar'>
                <DatePicker
                    ref={datepickerRef}
                    selected={activeInput === 'start' ? startDate : endDate}
                    onChange={(update) => {
                        setDateRange(update);
                        if (update[0] && update[1]) {
                            datepickerRef.current.setOpen(false); // Close after both dates are selected
                        }
                    }}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    inline={false}
                    monthsShown={2}
                    minDate={new Date()}
                    className="hidden"
                />
            </div>
        </div>

        <div className="flex flex-col relative">
            <label className="text-[rgb(42,98,112)] font-semibold">Guests</label>
            <input 
                ref={inputRef}
                onClick={() => setShowPopup(!showPopup)}
                className="appearance-none block w-full bg-white text-gray-700 leading-tight focus:outline-none" 
                type="text" 
                value={
                    (() => {
                        const parts = [];
                        if (formData.adults > 0) parts.push(`${formData.adults} Adult${formData.adults > 1 ? 's' : ''}`);
                        if (formData.children > 0) parts.push(`${formData.children} Child${formData.children > 1 ? 'ren' : ''}`);
                        if (formData.pets > 0) parts.push(`${formData.pets} Pet${formData.pets > 1 ? 's' : ''}`);
                        return parts.length > 0 ? parts.join(', ') : '';
                    })()
                }
                readOnly
            >
            </input>

            {showPopup && (
            <div
                ref={popupRef}
                className="absolute left-0 top-full z-10 bg-white p-4 shadow-lg border rounded-xl w-64 mt-2"
            >
                {slides.map((slide, index) => (
                <div key={index}>
                    {slide.options.map((item, subIndex) => (
                    <div key={subIndex} className="flex justify-between mb-2">
                        <div className="flex flex-col">
                        <label className="block text-md text-[rgb(42,98,112)] font-bold capitalize">
                            {item}
                        </label>
                        <span className="block text-xs text-gray-500 mb-1">
                            {slide.extra[subIndex]}
                        </span>
                        </div>
                        <div className="flex items-center space-x-2">
                        <button
                            type="button"
                            onClick={() => handleDecrement(item)}
                            className="w-8 h-8 text-lg font-bold text-gray-500 hover:bg-gray-200 border rounded-full"
                        >
                            −
                        </button>
                        <span className="w-5 text-center text-md text-gray-600">
                            {formData[item]}
                        </span>
                        <button
                            type="button"
                            onClick={() => handleIncrement(item)}
                            className="w-8 h-8 text-lg font-bold text-gray-500 hover:bg-gray-200 border rounded-full"
                        >
                            +
                        </button>
                        </div>
                    </div>
                    ))}
                </div>
                ))}
            </div>
            )}
        </div>

        <button 
            className="w-full px-4 py-2 text-md text-white bg-[rgb(42,98,112)] hover:bg-gray-800 rounded-lg mt-2"
        >
            Book
        </button>
        </div>
        </div>
    </div>
  )
}

export default Booking