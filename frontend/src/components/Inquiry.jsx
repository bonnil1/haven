import React from 'react'
import { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Inquiry = () => {

    const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });
    const [activeInput, setActiveInput] = useState('start');
    const datepickerRef = useRef();

    const handleDateChange = (dates) => {
        const [start, end] = dates;
        const updated = [...dateRange];
        console.log(updated)
        setDateRange(updated)
    }

  return (
    <div className='font-nunito'>
        <form
            className='bg-white rounded-lg p-8 w-full'
            //onSubmit={handleSubmit}
        >
            <div className='flex flex-col'>
                <h1 className='text-2xl text-[rgb(42,98,112)] font-bold mb-5'>Send Inquiry Request</h1>
                <div className='flex justify-between mb-4'>
                    <div className='flex flex-col mr-5 w-full'>
                        <label className='text-md font-semibold'>Move-in</label>
                        <input 
                            type="text"
                            value={dateRange.startDate ? dateRange.startDate.toLocaleDateString() : ''}
                            readOnly
                            onClick={() => {
                                setActiveInput('start');
                                datepickerRef.current.setOpen(true);
                            }}
                            className="border border-gray-300 bg-white bg-opacity-40 rounded-md text-sm p-2 focus:outline-none mt-1"
                        />
                    </div>
                    {/* Styled in between to center */}
                    <div className='availability-calendar'>
                        <DatePicker
                            ref={datepickerRef}
                            selected={activeInput === 'start' ? dateRange.startDate : dateRange.endDate}
                            onChange={([start, end]) => {
                                setDateRange({ startDate: start, endDate: end });
                                if (start && end) {
                                    datepickerRef.current.setOpen(false);
                                }
                            }}
                            startDate={dateRange.startDate}
                            endDate={dateRange.endDate}
                            selectsRange
                            inline={false}
                            monthsShown={2}
                            minDate={new Date()}
                            className="hidden"
                        />
                    </div>
                    <div className='flex flex-col w-full'>
                        <label className='text-md font-semibold'>Move-out</label>
                        <input
                            type="text"
                            value={dateRange.endDate ? dateRange.endDate.toLocaleDateString() : ''}
                            readOnly
                            onClick={() => {
                                setActiveInput('end');
                                datepickerRef.current.setOpen(true);
                            }}
                            className="border border-gray-300 bg-white bg-opacity-40 rounded-md text-sm p-2 focus:outline-none mt-1"
                        />
                    </div>
                </div>
                <div className='flex flex-col mb-4'>
                    <label className='text-md font-semibold'>Introduction Message</label>
                    <textarea
                        type='text'
                        rows='4'
                        className='border border-gray-300 focus:outline-none rounded-sm text-md p-2 mt-1'
                    ></textarea>
                </div>
            </div>
            <button
                type='submit'
                className='px-2 py-1 text-sm text-white bg-[rgb(42,98,112)] hover:bg-gray-800 border-[rgb(42,98,112)] rounded-lg'
            >
                Send Request
            </button>
        </form>
    </div>
  )
}

export default Inquiry