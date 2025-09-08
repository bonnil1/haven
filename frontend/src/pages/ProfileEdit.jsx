import React from 'react'
import { CgProfile } from "react-icons/cg";
import { AiOutlineSmile } from "react-icons/ai";
import { MdOutlineMedicalInformation } from "react-icons/md";
import { GiGraduateCap } from "react-icons/gi";
import { PiHouseThin } from "react-icons/pi";
import { FaPaw } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { useState, useEffect } from 'react';

const ProfileEdit = () => {

    const firstname = localStorage.getItem("firstname")
    const email = localStorage.getItem("email")
    const user_id = localStorage.getItem("user_id")

    const [userData, setUserData] = useState({
        user_id: '',
        firstName: '',
        lastName: '',
        phone: '',
        gender: '',
        birthday: '',
        occupation: '',
    })

    const [message, setMessage] = useState('');

    const currentYear = new Date().getFullYear();
    const [month, setMonth] = useState('');
    const [date, setDate] = useState('');
    const [year, setYear] = useState('');



    useEffect(() => {
        fetch(`/api/profile?email=${encodeURIComponent(email)}`)
        //http://192.168.49.2:31560/api/profile?email=${encodeURIComponent(email)}
        ///api/profile?email=${encodeURIComponent(email)}
        //http://localhost:4000/api/profile?email=${encodeURIComponent(email)}
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch user profile.");
                }
                return response.json();
            })
            .then(data => {
                console.log(data);

                setUserData({
                    user_id: user_id,
                    firstName: data.FirstName,
                    lastName: data.LastName,
                    phone: data.PhoneNumber,
                    gender: data.Gender,
                    birthday: data.DateOfBirth,
                    occupation: data.Occupation,
                })

            })
            .catch(error => {
                console.error("Error fetching id:", error);
            });
    }, []);

    useEffect(() => {
        if (userData.birthday) {
            //console.log(userData.birthday)
            const [year, month, date] = userData.birthday.split('-');
            
            setYear(year);
            setMonth(months[parseInt(month, 10) - 1]);
            setDate(parseInt(date, 10));
        }
    }, [userData.birthday]);

    useEffect(() => {
        if (month && date && year) {
            const monthIndex = months.indexOf(month) + 1; // +1 to get month in MM format (1-based index)
            const formattedBirthday = `${year}-${monthIndex.toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`;
            if (formattedBirthday !== userData.birthday) {
                setUserData(prevData => ({
                    ...prevData,
                    birthday: formattedBirthday
                }));
            }
        }
    }, [month, date, year]);

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);

    const handleChange = (event) => {
        setUserData(prevState => {
            const updatedUserData = {...prevState,[event.target.name]: event.target.value};

            return updatedUserData;
        })
    };

    {/* 
    //conflicting with other code
    useEffect(() => {
        if (month && date && year) {
            const monthIndex = months.indexOf(month) + 1; // +1 to get month in MM format (1-based index)
            const formattedBirthday = `${monthIndex.toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}-${year}`;
            setBirthday(formattedBirthday); //change format to YYYY-MM-DD
        }
    }, [month, date, year]);
    */}
    
    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await fetch("/api/update-profile", {
                //"/api/update-profile"
                //"http://localhost:4000/api/update-profile"
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData) 
            })
            
            const data = await response.json()
            console.log(data)

            if (data.message === "User profile updated.") {
                setMessage("User profile updated.")
            }

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='grid grid-cols-5 h-screen w-full sm:w-2/3 mx-auto mt-20'>
        <div className='col-span-2 flex flex-col font-nunito'>
            <div className='rounded-xl bg-[rgb(248,251,248)] shadow-md px-6 py-12'>
                <div className='flex flex-col'>
                    <div className='flex'>
                        <img className='w-1/4 rounded-full' src="https://t3.ftcdn.net/jpg/10/24/11/58/360_F_1024115848_VTfuHjHj9UVVvrUOaDQqm2clMspgRnGs.jpg" alt="profile image"></img>
                        <h1 className='text-xl font-bold mt-5 ml-5 text-slate-700 capitalize'>
                            Welcome Back, {firstname}! 👋🏼
                        </h1>
                    </div>
                    <div>
                        <h1 className='bg-[rgb(250,112,99)] rounded-full text-white font-bold text-sm px-3 py-0.5 w-16 ml-3 mt-3'>Renter</h1>
                        <h1 className='text-slate-700 font-semibold mt-7'>Verified Information</h1>
                        <h1 className='text-slate-700 mt-5 flex'> <AiOutlineSmile className='size-5 text-teal-800 ml-3 mr-3'/> Identity</h1>
                        <h1 className='text-slate-700 mt-5 flex'> <MdOutlineMedicalInformation className='size-5 text-teal-800 ml-3 mr-3'/>Medical Professional</h1>
                        <h1 className='text-slate-700 mt-5 flex'> <GiGraduateCap className='size-5 text-teal-800 ml-3 mr-3'/>University of California, Davis</h1>
                        <h1 className='text-slate-700 font-semibold mt-7'>About you</h1>
                        <div className='flex flex-col md:flex-row mt-3'>
                            <h1 className='border border-teal-800 rounded-full text-teal-800 font-bold text-sm px-2 py-0.5 ml-3 mr-3 flex items-center whitespace-nowrap w-auto'>
                                <PiHouseThin className='size-5 text-teal-800 font-bold mr-1 shrink-0' />
                                Lives in Davis, CA
                            </h1>

                            <h1 className='bg-teal-800 rounded-full text-white font-bold text-sm px-4 py-0.5 flex items-center whitespace-nowrap w-auto'>
                                <FaPaw className='size-3.5 text-white font-bold mr-1.5 mt-0.5 shrink-0' />
                                Pet Parent
                            </h1>
                        </div>
                    </div>
                    
                    <div>
                        <h1 className='text-slate-700 font-semibold mt-7'>Socials</h1>
                    </div>
                    <div className='flex mt-3'>
                        <FaLinkedin className='size-8 text-[rgb(250,112,99)] ml-3'/>
                        <FaFacebook className='size-8 text-[rgb(250,112,99)] ml-10'/>
                        <FaInstagram className='size-8 text-[rgb(250,112,99)] ml-10'/>
                    </div>
                </div>
            </div>
        </div>
        <div className='col-span-3 flex flex-col font-roboto'>
            <div className='shadow-lg rounded-xl'>
                <form onSubmit={handleSubmit} className='border border-green-700 border-opacity-20 rounded-xl p-6 sm:p-8'>
                    <div>
                        <div className='flex flex-col mb-3'>
                            <label>First Name</label>
                            <input
                                className="border border-slate-300 focus:outline-slate-500 rounded-md p-1 mt-2" 
                                type="text" 
                                name="firstName"
                                value={userData.firstName}
                                onChange={handleChange}
                                pattern="^[A-Za-z ]+$"
                                required
                            >
                            </input>
                        </div>
                        <div className='flex flex-col mb-2'>
                            <label>Last Name</label>
                                <input
                                className="border border-slate-300 focus:outline-slate-500 rounded-md p-1 mt-2" 
                                type="text" 
                                name="lastName"
                                value={userData.lastName}
                                onChange={handleChange}
                                pattern="^[A-Za-z ]+$"
                                required
                            >
                            </input>
                            <h4 className='text-xs text-slate-500 italic mt-1'>Please make sure to use your legal first and last name that matches your ID.</h4>
                        </div>
                        <div className='flex flex-col mb-3'>
                            <label>Phone Number</label>
                                <input
                                className="border border-slate-300 focus:outline-slate-500 rounded-md p-1 mt-2" 
                                type="text" 
                                name="phone"
                                value={userData.phone}
                                onChange={handleChange}
                                pattern="^\d{3}-\d{3}-\d{4}$"
                                required
                            >
                            </input>
                        </div>
                        <div className='flex flex-col mb-3'>
                            <label>Gender</label>
                            <div className='flex space-x-4 mt-1 ml-3'>
                                <div className='flex text-sm'>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Female"
                                        checked={userData.gender === "Female"}
                                        onChange={handleChange}
                                        className="w-4 h-4 mr-1 mt-0.5 text-blue-600 border-gray-300 focus:ring-slate-500"
                                    />
                                    <span>Female</span>
                                </div>
                                <div className='flex text-sm'>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Male"
                                        checked={userData.gender === "Male"}
                                        onChange={handleChange}
                                        className="w-4 h-4 mr-1 mt-0.5 text-blue-600 border-gray-300 focus:ring-slate-500"
                                    />
                                    <span>Male</span>
                                </div>
                                <div className='flex text-sm'>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Non-Binary"
                                        checked={userData.gender === "Non-Binary"}
                                        onChange={handleChange}
                                        className="w-4 h-4 mr-1 mt-0.5 text-blue-600 border-gray-300 focus:ring-slate-500"
                                    />
                                    <span>Non-binary</span>
                                </div>
                                <div className='flex text-sm'>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Prefer Not To Respond"
                                        checked={userData.gender === "Prefer Not To Respond"}
                                        onChange={handleChange}
                                        className="w-4 h-4 mr-1 mt-0.5 text-blue-600 border-gray-300 focus:ring-slate-500"
                                    />
                                    <span>Prefer Not To Respond</span>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col mb-3'>
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
                        <div className='flex flex-col mb-3'>
                            <label>Occupation</label>
                            <select
                                className='border border-slate-300 focus:outline-slate-500 rounded-md p-1 mt-2'
                                name='occupation'
                                value={userData.occupation}
                                onChange={handleChange}
                                required
                            >
                                <option value='' disabled>Select Occupation</option>
                                <option value='Not'>Prefer not to say</option>
                                <option value='Nurse'>Nurse</option>
                                <option value='Student'>Student</option>
                            </select>
                        </div>
                        <button
                            className="bg-[rgb(209,224,205)] hover:bg-gray-300 text-white py-2 border rounded-xl w-full mt-1"
                            type="submit"
                        >
                            Save Changes
                        </button>
                        
                        {message === "User profile updated." && (
                            <h4 className='flex justify-center text-xs text-emerald-600'>User profile updated successfully.</h4>
                        )}
                    </div>   
                </form>
            </div>
        </div>
        </div>
    )
}

export default ProfileEdit