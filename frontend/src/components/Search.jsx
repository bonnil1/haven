import React from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { useState, useRef, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { FaSearch } from "react-icons/fa";
import { Autocomplete } from '@react-google-maps/api';

function getAddressComponent(components, type) {
    const comp = components.find((c) => c.types.includes(type));
    return comp ? comp.long_name : '';
}

const Search = ({closeMenu}) => {

    const [formData, setFormData] = useState({
        destination: {},
        adults: 0,
        children: 0,
        pets: 0,
    });

    const [destination, setDestination] = useState({
        city: '',
        state: '',
        country: ''
    });
    const autoCompleteRef = useRef(null);

    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [activeInput, setActiveInput] = useState('start');
    const datepickerRef = useRef();

    const [showPopup, setShowPopup] = useState(false);
    const popupRef = useRef(null);
    const inputRef = useRef(null);

    const [guests, setGuests] = useState("")

    const onPlaceChanged = () => {
        const place = autoCompleteRef.current.getPlace();
        if (!place?.geometry) return;

        const components = place.address_components;

        const city = getAddressComponent(components, 'locality') || getAddressComponent(components, 'sublocality');
        const state = getAddressComponent(components, 'administrative_area_level_1');
        const country = getAddressComponent(components, 'country');

        setDestination({
            city,
            state,
            country
        });
    }

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

    const handleClickOutside = (event) => {
        if (
            popupRef.current &&
            !popupRef.current.contains(event.target) &&
            !inputRef.current.contains(event.target)
        ) {
            setShowPopup(false);
        }
    };

    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            destination: destination
        })); 
    }, [destination])
    
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const submitForm = (e) => {
        e.preventDefault();

        const newRequest = {
        destination,
        startDate,
        endDate,
        guests
        };
    }

    const slides = [
        {
            title: "Occupancy",
            options: ["adults", "children", "pets"],
            extra: ["Ages 13 and above", "Ages 2-12"]
        },
    ]

    const handleSubmit = async (e) => {

        e.preventDefault();
        
        const payload = {
            ...formData,
            date: dateRange,
        };

        console.log(payload)

        try {
            const response = await fetch("/api/search_results", {
                //"/api/search_results"
                //"http://localhost:4000/api/search_results"
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            console.log(data);

            if (data.message === "Search results returned successfully!") {
                setMessage(data.message);
                //navigate('/home/rentals')
            } 

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="p-3 bg-white rounded-full shadow-md">
                <div className="flex mx-auto">
                    <div className="w-full w-1/3 mt-2">
                        <label className='ml-10 text-[rgb(42,98,112)] font-semibold'>Where</label>
                        <Autocomplete onLoad={(ref) => (autoCompleteRef.current = ref)} onPlaceChanged={onPlaceChanged}>
                            <input
                                type="text"
                                placeholder="Search Destination"
                                value-={formData.destination}
                                className="appearance-none block w-4/5 bg-white text-gray-700 leading-tight focus:outline-none ml-10" 
                                required
                            />
                        </Autocomplete>
                    </div>
                        <div className="border-l-2 border-[rgb(209,224,204)] h-12 mt-2 mx-4"></div>
                    <div className='flex w-full w-1/3'>
                    <div className="flex flex-col mt-2">
                        <label className='text-[rgb(42,98,112)] font-semibold'>Check In</label>
                        <input 
                            type="text"
                            value={startDate ? startDate.toLocaleDateString() : ''}
                            readOnly
                            onClick={() => {
                                setActiveInput('start');
                                datepickerRef.current.setOpen(true);
                            }}
                            className="appearance-none block w-full text-gray-700 leading-tight focus:outline-none"
                            placeholder='Select date'
                        />
                    </div>
                    {/* Styled in between check in and check out to center */}
                    <div className='search-calendar'>
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
                    <div className="flex flex-col mt-2">
                    <label className='text-[rgb(42,98,112)] font-semibold'>Check Out</label>
                    <input
                        type="text"
                        value={endDate ? endDate.toLocaleDateString() : ''}
                        readOnly
                        onClick={() => {
                            setActiveInput('end');
                            datepickerRef.current.setOpen(true);
                        }}
                        className="appearance-none block w-full text-gray-700 leading-tight focus:outline-none"
                        placeholder="Select date"
                    />
                    </div>
                        <div className="border-l-2 border-[rgb(209,224,204)] h-12 mt-2 mr-1"></div>
                    </div>
                    <div className='flex w-full w-1/3 px-3'>
                    <div className="flex flex-col mt-2">
                        <label className='text-[rgb(42,98,112)] font-semibold'>Occupancy</label>
                        <div className="relative">
                        <input 
                            ref={inputRef}
                            onClick={() => setShowPopup(!showPopup)}
                            className="appearance-none block w-full bg-white text-gray-700 leading-tight focus:outline-none" 
                            type="text" 
                            placeholder="Number of Guests"
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
                                className="absolute left-0 top-[220%] z-10 bg-white p-4 shadow-lg border rounded-xl w-64"
                            >
                            {slides.map((slide, index) => (
                                <div key={index}>
                                    {slide.options.map((item, index) => (
                                        <div key={index} className="flex justify-between mb-2">
                                            <div className='flex flex-col'>
                                                <label className="block text-md text-[rgb(42,98,112)] font-bold capitalize">{item}</label>
                                                <span className="block text-xs text-gray-500 mb-1">{slide.extra[index]}</span>
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
                    </div>
                    <div>
                        <button 
                            className="bg-[rgb(250,112,99)] hover:bg-slate-400 text-white py-4 px-4 border rounded-full sm:w-auto mt-1 ml-14"
                            type="submit"
                            >
                            {/* <NavLink to="/home/rentals" onClick={closeMenu}><FaSearch /></NavLink> */}
                            <FaSearch />
                        </button> 
                    </div>
                    </div>
                </div>
            </form>

            {/*Mobile View*/}
            <div className="block md:hidden">
            <div className="flex items-center justify-center">
                <div className="bg-white shadow-md rounded-full border mt-10 w-1/2" onClick={null}>
                    <div className="w-full p-3">
                        <h3 className='flex flex-row justify-center text-slate-600'>Start your search <FaSearch className='ml-3 mt-1'/></h3>
                    </div>
                </div>
            </div>
            </div>

        </div>
    )
}

export default Search