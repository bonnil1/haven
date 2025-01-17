import React from 'react'
import { PiUserCircleFill } from "react-icons/pi";
import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react';

const Profile = () => {

    const currentYear = new Date().getFullYear();
    const [month, setMonth] = useState('');
    const [date, setDate] = useState('');
    const [year, setYear] = useState('');
    const [birthday, setBirthday] = useState('');
    const [selectedGender, setSelectedGender] = useState('');

    const handleGenderChange = (event) => {
        setSelectedGender(event.target.value);
    };

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);

    useEffect(() => {
        if (month && date && year) {
          const monthIndex = months.indexOf(month) + 1; // +1 to get month in MM format (1-based index)
          const formattedBirthday = `${monthIndex.toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}-${year}`;
          setBirthday(formattedBirthday); //change format to YYYY-MM-DD
        }
      }, [month, date, year]);

  return (
    <div className='flex flex-col justify-center items-center mt-10'>
        <h3 className='text-4xl text-slate-700 font-semibold mb-3'>Complete your profile</h3>
        <h4 className='text-sm text-slate-500'>Welcome to Haven!</h4>
        <h4 className='text-sm text-slate-500'>We're thrilled to have you on board.</h4>
        <h4 className='text-sm text-slate-500'>Complete your profile to unlock the full potential of Haven.</h4>
        <PiUserCircleFill className='size-24 text-slate-700 mt-3'/>
        <form className='flex flex-col border border-slate-400 rounded-3xl w-5/6 sm:w-2/5 p-8 sm:p-10 mt-3'>
            <div>
                <div className='flex flex-col mb-5'>
                    <label>First Name</label>
                    <input
                        className="border border-slate-300 focus:outline-slate-500 rounded-md p-1 mt-2" 
                        type="text" 
                        name="FirstName"
                        //value={}
                        placeholder="First Name"
                        pattern="^[A-Za-z ]+$"
                        required
                    >
                    </input>
                </div>
                <div className='flex flex-col mb-5'>
                    <label>Last Name</label>
                        <input
                        className="border border-slate-300 focus:outline-slate-500 rounded-md p-1 mt-2" 
                        type="text" 
                        name="LastName"
                        //value={}
                        placeholder="Last Name"
                        pattern="^[A-Za-z ]+$"
                        required
                    >
                    </input>
                </div>
                <div className='flex flex-col mb-5'>
                    <label>Phone Number</label>
                        <input
                        className="border border-slate-300 focus:outline-slate-500 rounded-md p-1 mt-2" 
                        type="text" 
                        name="PhoneNumber"
                        placeholder="201-555-0123"
                        pattern="^\d{3}-\d{3}-\d{4}$"
                        required
                    >
                    </input>
                </div>
                <div className='flex flex-col mb-5'>
                    <label>Gender</label>
                    <div className='flex space-x-4 mt-1'>
                        <div className='flex text-sm'>
                            <input
                                type="radio"
                                value="Female"
                                checked={selectedGender === "Female"}
                                onChange={handleGenderChange}
                                className="w-4 h-4 mr-1 mt-0.5 text-blue-600 border-gray-300 focus:ring-slate-500"
                            />
                            <span>Female</span>
                        </div>
                        <div className='flex text-sm'>
                            <input
                                type="radio"
                                value="Male"
                                checked={selectedGender === "Male"}
                                onChange={handleGenderChange}
                                className="w-4 h-4 mr-1 mt-0.5 text-blue-600 border-gray-300 focus:ring-slate-500"
                            />
                            <span>Male</span>
                        </div>
                        <div className='flex text-sm'>
                            <input
                                type="radio"
                                value="Non-Binary"
                                checked={selectedGender === "Non-Binary"}
                                onChange={handleGenderChange}
                                className="w-4 h-4 mr-1 mt-0.5 text-blue-600 border-gray-300 focus:ring-slate-500"
                            />
                            <span>Non-binary</span>
                        </div>
                        <div className='flex text-sm'>
                            <input
                                type="radio"
                                value="Prefer Not To Respond"
                                checked={selectedGender === "Prefer Not To Respond"}
                                onChange={handleGenderChange}
                                className="w-4 h-4 mr-1 mt-0.5 text-blue-600 border-gray-300 focus:ring-slate-500"
                            />
                            <span>Prefer Not To Respond</span>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col mb-5'>
                    <label>Birthday</label>
                    <div className='flex space-x-4 mt-1'>
                        <div className='flex flex-col flex-1'>
                            <label className='text-sm'>Month</label>
                            <select
                                name="month"
                                className="border border-slate-300 focus:outline-slate-500 rounded-md p-1 mt-2"
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}
                                required
                            >
                                <option value="" disabled selected className="text-gray-500"></option>
                                {months.map((monthName, index) => (
                                    <option key={index} value={monthName}>{monthName}</option>
                                ))}
                            </select>
                        </div>
                        <div className='flex flex-col flex-1'>
                            <label className='text-sm'>Date</label>
                            <select
                                name="date"
                                className="border border-slate-300 focus:outline-slate-500 rounded-md p-1 mt-2"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            >
                                <option value="" disabled selected className="text-gray-500"></option>
                                {days.map((day) => (
                                    <option key={day} value={day}>{day}</option>
                                ))}
                            </select>
                        </div>
                        <div className='flex flex-col  flex-1'>
                            <label className='text-sm'>Year</label>
                            <select
                                name="year"
                                className="border border-slate-300 focus:outline-slate-500 rounded-md p-1 mt-2"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                required
                            >
                                <option value="" disabled selected className="text-gray-500"></option>
                                {years.map((year) => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col mb-5'>
                    <label>Occupation</label>
                    <select
                        className='border border-slate-300 focus:outline-slate-500 rounded-md p-1 mt-2'
                        name='Occupation'
                        //value={occupation}
                        //onChange={(e) => setProperty(e.target.value)}
                        required
                    >
                        <option value='' disabled selected>Select Occupation</option>
                        <option value='Nurse'>Nurse</option>
                        <option value='Student'>Student</option>
                    </select>
                </div>
                <h6 className='flex justify-center text-xs mt-2'>By checking this box, you agree to the Terms of Service and Privacy Policy.</h6>
                <button
                    className="bg-slate-700 hover:bg-slate-500 text-white py-2 border rounded-xl w-full mt-5"
                    type="submit"
                >
                    Continue
                </button>
            </div>    
        </form>
    </div>
  )
}

export default Profile