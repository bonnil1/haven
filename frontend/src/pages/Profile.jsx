import React from 'react'
import { PiUserCircleFill } from "react-icons/pi";
import { NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';

const Profile = () => {

    // think of a better approach than localstorage > jwt
    const firstname = localStorage.getItem("firstname")
    const lastname = localStorage.getItem("lastname")
    const email = localStorage.getItem("email")

    const [userid, setuserid] = useState('') 
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    // const [photo, setPhoto] = useState('')
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');
    const currentYear = new Date().getFullYear();
    const [month, setMonth] = useState('');
    const [date, setDate] = useState('');
    const [year, setYear] = useState('');
    const [birthday, setBirthday] = useState('');
    const [occupation, setOccupation] = useState('');
    const [agreeToTerms, setAgreeToTerms] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:4000/api/id?email=${encodeURIComponent(email)}`)
        //http://192.168.49.2:31560/api/id?email=${encodeURIComponent(email)}
        ///api/id?email=${encodeURIComponent(email)}
        //http://localhost:4000/api/id?email=${encodeURIComponent(email)}
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch id.");
                }
                return response.json();
            })
            .then(data => {
                //console.log(data);
                setuserid(data.user_id)
            })
            .catch(error => {
                console.error("Error fetching id:", error);
            });
    }, []);

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    }

    const handleGenderChange = (event) => {
        setGender(event.target.value);
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
          const formattedBirthday = `${year}-${monthIndex.toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`;
          setBirthday(formattedBirthday); // format is YYYY-MM-DD
        }
    }, [month, date, year]);

    const handleOccupationChange = (event) => {
        setOccupation(event.target.value);
    }

    const handleTermsChange = (event) => {
        setAgreeToTerms(event.target.checked);
    }

    const handleSubmit = async (event) => {
   
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:4000/api/new-profile", {
                //http://192.168.49.2:31560/api/new-profile
                //"/api/new-profile"
                //"http://localhost:4000/api/new-profile"
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({user_id: userid, PhoneNumber: phone, Gender: gender, DateOfBirth: birthday, Occupation: occupation, Terms: agreeToTerms})
            });

            const data = await response.json();
            console.log(data);

            if (data.message === "New user profile created.") {
                navigate('/')
            }
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <div className='flex flex-col justify-center items-center mt-10'>
        <h3 className='text-4xl text-slate-700 font-semibold mb-3'>Complete your profile</h3>
        <h4 className='text-sm text-slate-500'>Welcome to Haven!</h4>
        <h4 className='text-sm text-slate-500'>We're thrilled to have you on board.</h4>
        <h4 className='text-sm text-slate-500'>Complete your profile to unlock the full potential of Haven.</h4>
        <PiUserCircleFill className='size-24 text-slate-700 mt-3'/>
        <form onSubmit={handleSubmit} className='flex flex-col border border-slate-400 rounded-3xl w-5/6 sm:w-2/5 p-8 sm:p-10 mt-3'>
            <div>
                <div className='flex flex-col mb-5'>
                    <label>First Name</label>
                    <input
                        className="border border-slate-300 focus:outline-slate-500 rounded-md p-1 mt-2" 
                        type="text" 
                        name="FirstName"
                        value={firstname}
                        placeholder="First Name"
                        pattern="^[A-Za-z ]+$"
                        readOnly
                    >
                    </input>
                </div>
                <div className='flex flex-col mb-3'>
                    <label>Last Name</label>
                    <input
                        className="border border-slate-300 focus:outline-slate-500 rounded-md p-1 mt-2" 
                        type="text" 
                        name="LastName"
                        value={lastname}
                        placeholder="Last Name"
                        pattern="^[A-Za-z ]+$"
                        readOnly
                    >
                    </input>
                    <h4 className='text-xs text-slate-500 italic mt-1'>Please make sure to use your legal first name and last name that matches your ID.</h4>
                </div>
                <div className='flex flex-col mb-5'>
                    <label>Phone Number</label>
                    <input
                        className="border border-slate-300 focus:outline-slate-500 rounded-md p-1 mt-2" 
                        type="text" 
                        name="PhoneNumber"
                        placeholder="201-555-0123"
                        pattern="^\d{3}-\d{3}-\d{4}$"
                        onChange={handlePhoneChange}
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
                                checked={gender === "Female"}
                                onChange={handleGenderChange}
                                className="w-4 h-4 mr-1 mt-0.5 text-blue-600 border-gray-300 focus:ring-slate-500"
                            />
                            <span>Female</span>
                        </div>
                        <div className='flex text-sm'>
                            <input
                                type="radio"
                                value="Male"
                                checked={gender === "Male"}
                                onChange={handleGenderChange}
                                className="w-4 h-4 mr-1 mt-0.5 text-blue-600 border-gray-300 focus:ring-slate-500"
                            />
                            <span>Male</span>
                        </div>
                        <div className='flex text-sm'>
                            <input
                                type="radio"
                                value="Non-Binary"
                                checked={gender === "Non-Binary"}
                                onChange={handleGenderChange}
                                className="w-4 h-4 mr-1 mt-0.5 text-blue-600 border-gray-300 focus:ring-slate-500"
                            />
                            <span>Non-binary</span>
                        </div>
                        <div className='flex text-sm'>
                            <input
                                type="radio"
                                value="Prefer Not To Respond"
                                checked={gender === "Prefer Not To Respond"}
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
                        onChange={handleOccupationChange}
                    >
                        <option value='' disabled selected>Select Occupation</option>
                        <option value='Prefer Not To Say'>Prefer not to say</option>
                        <option value='Nurse'>Nurse</option>
                        <option value='Student'>Student</option>
                    </select>
                </div>
                <div className='flex flex-row mb-5'>
                    <input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={agreeToTerms}
                        onChange={handleTermsChange}
                    >
                    </input>
                    <h6 className='flex justify-center text-xs ml-2'>By checking this box, you agree to the Terms of Service and Privacy Policy.</h6>
                </div>
                <button
                    className="bg-slate-700 hover:bg-slate-500 text-white py-2 border rounded-xl w-full mt-5"
                    type="submit"
                    disabled={!agreeToTerms}
                >
                    Continue
                </button>
            </div>    
        </form>
    </div>
  )
}

export default Profile