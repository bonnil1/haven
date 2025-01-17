import React from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaSearch } from "react-icons/fa";

const Landing = ({closeMenu}) => {

    const [destination, setDestination] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
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
            {/*Laptop View*/}
            <div className='bg-custom-image-2 bg-cover bg-center h-screen'>
            <div className="hidden md:block ">
            <div className="flex justify-center">
                <div className="bg-white shadow-md rounded-full border sm:m-28">
                <form onSubmit={submitForm} className="p-3">
                    <div className="flex mx-auto">
                        <div className="w-full sm:w-1/3 mt-3">
                            <label className='ml-10'>Where</label>
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
                            <div className="border-l-2 border-gray-400 h-16 mx-4 "></div>
                        <div className='flex w-full sm:w-1/3 '>
                        <div className="flex flex-col mt-3">
                            <label>Move In</label>
                            <DatePicker
                                selectsStart
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                startDate={startDate}
                                minDate={new Date()}
                                placeholderText="Insert Date"
                                className="appearance-none block w-full text-gray-700 leading-tight focus:outline-none"
                                required
                            />
                         
                        </div>
                        <div className="flex flex-col mt-3">
                        <label>Move Out</label>
                            <DatePicker
                                selectsEnd
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                endDate={endDate}
                                startDate={startDate}
                                minDate={startDate}
                                placeholderText="Insert Date"
                                className="appearance-none block w-full bg-white text-gray-700 leading-tight focus:outline-none"
                                required
                            />
                        </div>
                            <div className="border-l-2 border-gray-400 h-16 mr-1"></div>
                        </div>
                        <div className='flex w-full sm:w-1/3 px-3'>
                        <div className="flex flex-col mt-3">
                            <label>Occupancy</label>
                            <input 
                                className="appearance-none block w-full bg-white text-gray-700 leading-tight focus:outline-none" 
                                type="text" 
                                placeholder="Number of Rooms"
                                onChange={(e) => setGuests(e.target.value)}
                                pattern="^[0-9]+$"
                                required
                            >
                            </input>
                        </div>
                        <div>
                            <button 
                                className="bg-slate-800 hover:bg-slate-700 text-white py-4 px-4 border rounded-full sm:w-auto mt-2"
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
            </div>
            {/*Mobile View*/}
            <div className="block md:hidden">
            <div className="flex items-center justify-center mt-12">
                <div className="bg-gray-100 py-2 shadow-md rounded-md border m-2 md:m-0">
                <form onSubmit={submitForm} className="w-full max-w-xl">
                    <div className="flex flex-wrap ml-5 mr-5">
                        <div className="w-1/2 px-3 mt-3">
                            <input 
                                className="appearance-none block w-full bg-white text-gray-700 border border-teal-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none" 
                                type="text" 
                                placeholder="Destination"
                                onChange={(e) => setDestination(e.target.value)}
                            >
                            </input>
                        </div>
                        <div className="w-1/2 px-3 mt-3">
                            <input 
                                className="appearance-none block w-full bg-white text-gray-700 border border-teal-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none" 
                                type="text" 
                                placeholder="Guests"
                                onChange={(e) => setGuests(e.target.value)}
                            >
                            </input>
                        </div>
                        <div className="w-1/2 px-3 mt-3">
                            <DatePicker
                                selectsStart
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                startDate={startDate}
                                placeholderText="Check in"
                                className="appearance-none block w-full bg-white text-gray-700 border border-teal-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                            />
                        </div>
                        <div className="w-1/2 px-3 mt-3">
                            <DatePicker
                                selectsEnd
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                endDate={endDate}
                                startDate={startDate}
                                minDate={startDate}
                                placeholderText="Check out"
                                className="appearance-none block w-full bg-white text-gray-700 border border-teal-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                            />
                        </div>
                        <div className="flex items-center w-1/3 px-3 mt-2">
                            <button 
                                className="bg-blue-500 hover:text-teal-400 text-white font-bold py-2.5 px-4 border border-teal-600 rounded w-full sm:w-auto"
                                type="submit"
                                >
                                <NavLink to="/home/rentals" onClick={closeMenu}>Search</NavLink>
                            </button> 
                        </div>
                    </div>
                </form>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Landing