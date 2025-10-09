import React from 'react'
import { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from 'uuid';

const Availability = ({availability, setAvailability}) => {

    const [activeInput, setActiveInput] = useState({ index: null, type: null });
    const datepickerRef = useRef([]);

    const handleDateChange = (dates, index) => {
        const [start, end] = dates;
        const updated = [...availability];
        updated[index] = { ...updated[index], startDate: start, endDate: end };
        console.log(updated)
        setAvailability(updated)
    }

    const handleAddRange = () => {
        setAvailability([...availability, { id: uuidv4(), startDate: null, endDate: null }]);
    };

    const handleDeleteRange = (idToDelete) => {
        setAvailability(availability.filter(range => range.id !== idToDelete));
    };

  return (
    <div>
        <form className="bg-white p-6 rounded-lg shadow-md font-nunito">
            <h2 className="text-2xl font-semibold mb-1">Current availability.</h2>
            <h4 className="text-lg font-light mb-2">Edit date windows for when your place is available.</h4>
            {availability.map((range, index) => (
            <>
            <div key={range.id} className='flex justify-between flex-wrap px-10'>
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
                        className="text-xs text-red-400 mx-10"
                        type="button"
                        >
                        Delete
                    </button>
                )}  
            </>
            ))}                
            <div className='mx-10'>
                <button 
                    onClick={handleAddRange}
                    className='border text-sm text-white bg-red-400 p-1.5 rounded-md mb-6 mt-4'
                    type="button"
                >
                    Add another window
                </button>
            </div>
        </form>
    </div>
  )
}

export default Availability