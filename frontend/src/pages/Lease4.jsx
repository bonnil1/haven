import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from 'uuid';
import { saveToSession, loadFromSession } from '../utils/sessionStorage';

const Lease4 = () => {

    const [dateRanges, setDateRanges] = useState([{ id: uuidv4(), startDate: null, endDate: null }]);
    const [activeInput, setActiveInput] = useState({ index: null, type: null });
    const datepickerRef = useRef([]);
    const [formData, setFormData] = useState({
        totalRent: "",
        rent: "",
        utilities: "",
        water_fee: "",
        electric_fee: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        const { rent, water_fee, electric_fee } = formData;

        if (rent && water_fee && electric_fee) {
            const totalUtilities = Number(water_fee) + Number(electric_fee);
            const total = totalUtilities + Number(rent);

            setFormData(prev => ({
                ...prev,
                totalRent: total,
                utilities: totalUtilities
            }));
        }
    }, [formData.rent, formData.water_fee, formData.electric_fee]);

    const handleChange = (event) => {
        setFormData(prevState => {
            const updatedFormData = {...prevState,[event.target.name]: event.target.value};

            return updatedFormData;
        })
        console.log(formData)
    }

    const handleDateChange = (dates, index) => {
        const [start, end] = dates;
        const updated = [...dateRanges];
        updated[index] = { ...updated[index], startDate: start, endDate: end };
        console.log(updated)
        setDateRanges(updated)
    }

    const handleAddRange = () => {
        setDateRanges([...dateRanges, { id: uuidv4(), startDate: null, endDate: null }]);
    };

    const handleDeleteRange = (idToDelete) => {
        setDateRanges(dateRanges.filter(range => range.id !== idToDelete));
    };

    const slides = [
        {
            title: "Monthly rent.",
        },
        {
            title: "Add availability.",
        }
    ]

    const handleSubmit = async (event) => {

        event.preventDefault();
        
        const formattedDateRange = dateRanges.map(range => ({
            start_date: range.startDate
              ? range.startDate.toISOString().split("T")[0]
              : null,
            end_date: range.endDate
              ? range.endDate.toISOString().split("T")[0]
              : null
          }));

        const payload = {
            ...formData,
            availability: formattedDateRange,
        };
        console.log(payload)

        try {
            const response = await fetch("http://localhost:4000/api/lease-4", {
                //"/api/lease-4"
                //"http://localhost:4000/api/lease-4"
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            console.log(data);

            if (data.message === "Lease 5 created successfully!") {
                setMessage(data.message);
                //navigate('/')
            } 

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const stored = loadFromSession('form41');
        if (stored) {
            setFormData(stored);
        }
        const stored2 = loadFromSession('form42');
        // Set dateRanges and ensure correct formatting
        if (stored2) {
        const converted = stored2.map((range) => ({
            ...range,
            id: range.id || uuidv4(),
            startDate: range.startDate ? new Date(range.startDate) : null,
            endDate: range.endDate ? new Date(range.endDate) : null,
        }));
        setDateRanges(converted);
        }
        console.log(stored2)
    }, []);
    
    const handleNext = (e) => {
        e.preventDefault();
        saveToSession('form41', formData);
        saveToSession('form42', dateRanges)
        navigate('/lease-5');
    };

    return (
        <div className="flex justify-center font-nunito font-semibold text-slate-700 bg-lease-bg bg-cover bg-opacity-25">
        <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="relative w-10 flex flex-col items-center">
            <div className="absolute top-12 bottom-44 w-3 bg-white bg-opacity-70 rounded-md"/>
            {slides.map((_, index) => (
            <div key={index} className="relative z-10 flex items-center justify-center w-10 h-10 mt-10 mb-96 bg-red-400 text-white text-xl rounded-full">
                {index + 7}
            </div>
            ))}
            </div>
        {/* Slides */}
        <form onSubmit={handleNext} className="flex flex-col gap-12 p-10">
            <div className="bg-white bg-opacity-70 p-10 pt-6 pb-0 rounded-lg shadow-md w-[42rem]">
                <h2 className="text-2xl font-semibold mb-2">Monthly rent.</h2>
                <h4 className="text-lg font-light mb-4">Enter the base rent, water, and electricity.</h4>
                <div className='flex flex-row border border-gray-500 rounded-md mb-6 p-1'>
                    <h4 className="text-3xl mx-3 mt-4">$</h4>
                    <textarea
                        className='bg-[rgb(232,240,232)] bg-opacity-70 focus:outline-none rounded-md p-4 w-full font-thin text-2xl'
                        type="number" 
                        name="rent"
                        rows='1'
                        value={formData.totalRent}
                        pattern="^[0-9 ]+$"
                        readOnly

                    >
                    </textarea>
                </div>

                <div className='border border-gray-500 rounded-md mb-8 p-1'>
                    <h4 className='flex flex-col ml-2 mt-2'>Price Breakdown</h4>
                    <div className='flex flex-row justify-between' >
                        <h4 className="text-sm ml-5">Base Rent</h4>
                        <div className='flex flex-row justify-end'>
                            <h4 className="text-xs mr-1 mt-0.5">$</h4>
                            <textarea
                                className='bg-[rgb(232,240,232)] bg-opacity-70 focus:outline-none rounded-md w-1/2 font-thin text-sm'
                                type="number" 
                                name="rent"
                                rows='1'
                                onChange={handleChange}
                                value={formData.rent}
                                pattern="^[0-9 ]+$"
                                required
                            >
                            </textarea>
                        </div>
                    </div>
                    <div className='flex flex-row justify-between' >
                        <h4 className="text-sm ml-5">Utilities</h4>
                        <div className='flex flex-row justify-end'>
                            <h4 className="text-xs mr-1 mt-0.5">$</h4>
                            <textarea
                                className='bg-[rgb(232,240,232)] bg-opacity-70 focus:outline-none rounded-md w-1/2 font-thin text-sm'
                                type="number" 
                                name="utilities"
                                rows='1'
                                value={formData.utilities}
                                pattern="^[0-9 ]+$"
                                readOnly
                            >
                            </textarea>
                        </div>
                    </div>
                    <div className='flex flex-row justify-between' >
                        <h4 className="text-sm ml-10 font-thin">Water</h4>
                        <div className='flex flex-row justify-end'>
                            <h4 className="text-xs mr-1 mt-0.5">$</h4>
                            <textarea
                                className='bg-[rgb(232,240,232)] bg-opacity-70 focus:outline-none rounded-md w-1/2 font-thin text-sm'
                                type="number" 
                                name="water_fee"
                                rows='1'
                                onChange={handleChange}
                                value={formData.water_fee}
                                pattern="^[0-9 ]+$"
                                required
                            >
                            </textarea>
                        </div>
                    </div>
                    <div className='flex flex-row justify-between' >
                        <h4 className="text-sm ml-10 font-thin">Electricity</h4>
                        <div className='flex flex-row justify-end'>
                            <h4 className="text-xs mr-1 mt-0.5">$</h4>
                            <textarea
                                className='bg-[rgb(232,240,232)] bg-opacity-70 focus:outline-none rounded-md w-1/2 font-thin text-sm'
                                type="number" 
                                name="electric_fee"
                                rows='1'
                                onChange={handleChange}
                                value={formData.electric_fee}
                                pattern="^[0-9 ]+$"
                                required
                            >
                            </textarea>
                        </div>
                    </div>
                    <hr className='my-2'/>
                    <div className='flex flex-row justify-between' >
                        <h4 className="text-sm ml-5 mb-2">Total Pre-Tax Guest Price</h4>
                        <div className='flex flex-row justify-end'>
                            <h4 className="text-xs mr-1 mt-0.5">$</h4>
                            <textarea
                                className='bg-[rgb(232,240,232)] bg-opacity-70 focus:outline-none rounded-md w-1/2 font-thin text-sm'
                                type="number" 
                                name="totalRent"
                                rows='1'
                                value={formData.totalRent}
                                pattern="^[0-9 ]+$"
                                readOnly
                            >
                            </textarea>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white bg-opacity-70 p-10 pt-6 pb-0 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-1">Add availability.</h2>
                <h4 className="text-lg font-light mb-2">Add one or more date windows for when your place is available.</h4>
                {dateRanges.map((range, index) => (
                <>
                <div key={range.id} className='flex justify-between flex-wrap'>
                    <div className="flex flex-col mt-2">
                        <label className='text-[rgb(42,98,112)] font-semibold'>Move-in</label>
                        <input 
                            type="text"
                            value={range.startDate ? range.startDate.toLocaleDateString() : ''}
                            readOnly
                            onClick={() => {
                                setActiveInput({ index, type: 'start' });
                                datepickerRef.current[index]?.setOpen(true);
                            }}
                            className="border border-gray-300 bg-white bg-opacity-40 rounded-md text-md p-2 focus:outline-none mt-1"
                        />
                    </div>
                    {/* Styled in between to center */}
                    <div className='availability-calendar'>
                        <DatePicker
                            ref={el => (datepickerRef.current[index] = el)}
                            selected={activeInput.index === index ? (activeInput.type === 'start' ? range.startDate : range.endDate) : null}
                            onChange={(update) => {
                                handleDateChange(update, index);
                                if (update[0] && update[1]) {
                                    datepickerRef.current[index]?.setOpen(false); // Close after both dates are selected
                                }
                            }}
                            startDate={range.startDate}
                            endDate={range.endDate}
                            selectsRange
                            inline={false}
                            monthsShown={2}
                            minDate={new Date()}
                            className="hidden"
                        />
                    </div>
                    <div className="flex flex-col mt-2">
                        <label className='text-[rgb(42,98,112)] font-semibold'>Move-out</label>
                        <input
                            type="text"
                            value={range.endDate ? range.endDate.toLocaleDateString() : ''}
                            readOnly
                            onClick={() => {
                                setActiveInput({ index, type: 'end' });
                                datepickerRef.current[index]?.setOpen(true);
                            }}
                            className="border border-gray-300 bg-white bg-opacity-40 rounded-md text-md p-2 focus:outline-none mt-1"
                        />
                    </div>  
                </div>
                    {index > 0 && (
                        <button
                            onClick={() => handleDeleteRange(range.id)}
                            className="text-xs text-red-400 "
                            type="button"
                            >
                            Delete
                        </button>
                    )}  
                </>
                ))}                
                <div>
                    <button 
                        onClick={handleAddRange}
                        className='border text-sm text-white bg-red-400 p-1.5 rounded-md mb-6 mt-4'
                        type="button"
                    >
                        Add another window
                    </button>
                </div>
            </div>

            <div className='flex justify-between'>
                <button
                    className="text-white bg-[rgb(232,240,232)] bg-opacity-50 font-bold rounded-full w-1/4"
                >
                    <NavLink to="/lease-3">Back</NavLink>
                </button> 
                <button
                    className="text-[rgb(42,98,112)] bg-[rgb(232,240,232)] bg-opacity-50 font-bold rounded-full w-1/4"
                    type="submit"
                >
                {/* <NavLink to="/lease-4">Submit</NavLink> */}
                Next
                </button>  
            </div>
        </form>     
        </div>
        </div>
    )
}

export default Lease4