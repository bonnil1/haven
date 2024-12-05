import React from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Landing = () => {

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
            <div className="hidden md:block">
            <h1 className="flex items-center justify-center mt-24 ml-10 mr-10 text-7xl">Furnished Rentals.</h1>
            <div className="flex items-center justify-center mt-24">
                <div className="bg-gray-100 py-2 shadow-md rounded-md border m-4 md:m-0">
                <form onSubmit={submitForm} className="w-full max-w-4xl">
                    <div className="flex flex-wrap ml-10 mr-5">
                        <div className="w-full sm:w-1/5 md:w-1/5 px-3 mt-3">
                            <input 
                                className="appearance-none block w-full bg-white text-gray-700 border border-teal-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none" 
                                type="text" 
                                placeholder="Destination"
                                onChange={(e) => setDestination(e.target.value)}
                            >
                            </input>
                        </div>
                        <div className="w-full sm:w-1/5 md:w-1/5 px-3 mt-3">
                            <DatePicker
                                selectsStart
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                startDate={startDate}
                                placeholderText="Check in"
                                className="appearance-none block w-full bg-white text-gray-700 border border-teal-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                            />
                        </div>
                        <div className="w-full sm:w-1/5 md:w-1/5 px-3 mt-3">
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
                        <div className="w-full sm:w-1/5 md:w-1/5 px-3 mt-3">
                            <input 
                                className="appearance-none block w-full bg-white text-gray-700 border border-teal-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none" 
                                type="text" 
                                placeholder="Guests"
                                onChange={(e) => setGuests(e.target.value)}
                            >
                            </input>
                        </div>
                        <div className="w-full sm:w-auto md:w-1/5 px-3 mt-3">
                            <button 
                                className="bg-blue-500 hover:text-teal-400 text-white font-bold py-2.5 px-4 border border-teal-600 rounded w-full sm:w-auto"
                                type="submit"
                                >
                                <NavLink to="rentals">Search</NavLink>
                            </button> 
                        </div>
                    </div>
                </form>
                </div>
            </div>
            </div>
            {/*Mobile View*/}
            <div className="block md:hidden">
            <h1 className="flex items-center justify-center mt-12 ml-5 mr-5 text-4xl">Furnished Rentals.</h1>
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
                        <div className="flex items-center w-1/3 px-3 mt-3">
                            <button 
                                className="bg-blue-500 hover:text-teal-400 text-white font-bold py-2.5 px-4 border border-teal-600 rounded w-full sm:w-auto"
                                type="submit"
                                >
                                <NavLink to="rentals">Search</NavLink>
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