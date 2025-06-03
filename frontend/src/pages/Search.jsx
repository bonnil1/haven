import React from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { useState, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { FaSearch } from "react-icons/fa";

const Search = ({closeMenu}) => {

    const [destination, setDestination] = useState("");
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [activeInput, setActiveInput] = useState('start');
    const datepickerRef = useRef();

    const [guests, setGuests] = useState(1)

    const submitForm = (e) => {
        e.preventDefault();

        const newRequest = {
        destination,
        startDate,
        endDate,
        guests
        };
    }

    return (
        <div>
            <div className='bg-custom-image-5 bg-cover bg-center h-screen font-nunito'>
            {/*Laptop View*/}    
            <div className="hidden md:block">
            <div className="flex justify-center">
                <div className="bg-white shadow-md rounded-full border sm:m-28">
                <form onSubmit={submitForm} className="p-3">
                    <div className="flex mx-auto">
                        <div className="w-full w-1/3 mt-2">
                            <label className='ml-10 text-[rgb(42,98,112)] font-semibold'>Where</label>
                            <input 
                                className="appearance-none block bg-white text-gray-700 leading-tight focus:outline-none ml-10" 
                                type="text" 
                                placeholder="Search Destination"
                                onChange={(e) => setDestination(e.target.value)}
                                pattern="^[A-Za-z ]+$"
                                required
                            >
                            </input>
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
                            <input 
                                className="appearance-none block w-full bg-white text-gray-700 leading-tight focus:outline-none" 
                                type="text" 
                                placeholder="Number of Guests"
                                onChange={(e) => setGuests(e.target.value)}
                                pattern="^[0-9]+$"
                                required
                            >
                            </input>
                        </div>
                        <div>
                            <button 
                                className="bg-[rgb(250,112,99)] hover:bg-slate-400 text-white py-4 px-4 border rounded-full sm:w-auto mt-1"
                                type="submit"
                                >
                                <NavLink to="/home/rentals" onClick={closeMenu}><FaSearch /></NavLink>
                            </button> 
                        </div>
                        </div>
                    </div>
                </form>
                </div>
            </div>
            </div>

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
        </div>
    )
}

export default Search