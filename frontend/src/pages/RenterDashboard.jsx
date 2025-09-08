import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoMdSettings } from "react-icons/io";
import { IoEnterOutline } from "react-icons/io5";

const RenterDashboard = () => {

    const firstname = localStorage.getItem("firstname")
    const lastname = localStorage.getItem("lastname")

  return (
    <div className='font-nunito'>
        <div className='grid grid-cols-[25%_75%]'>
            <div className='flex flex-col bg-gray-100 min-h-screen'>
            <div className='mx-8'>
                <h1 className='text-2xl font-medium mt-6 mb-5'>Rentals Dashboard</h1>
                <div className='flex flex-col items-center bg-white rounded-lg shadow-md p-5 space-y-2 h-72'>
                    <img className='w-1/2 rounded-md' src="https://t3.ftcdn.net/jpg/10/24/11/58/360_F_1024115848_VTfuHjHj9UVVvrUOaDQqm2clMspgRnGs.jpg" alt="profile image"></img>
                    <h1 className='text-xl font-bold'>{firstname} {lastname}</h1>
                    <h1 className='text-xl text-[rgb(42,98,112)]'>Renter Profile</h1>
                  <div className='flex'>
                    <IoMdSettings className='size-5 mr-8'/>
                    <IoEnterOutline className='size-5'/>
                  </div>
                </div>
                <div className='flex flex-col bg-white rounded-lg shadow-md my-8 p-5'>
                    <h1 className='text-lg'> Safe and Secure subleasing starts here!</h1>
                    <hr className="my-2 border-green-700 border-opacity-30"/>
                    <h3 className='text-sm'>Haven is a mid-term rental platform designed for travel nurses, nomads, and professionals on assignment who need trusted housing for weeks to months at a time. Every listing is verified, payments are protected, and subleases are managed through the app-giving both renters and hosts peace of mind. With secure booking, transparent communication, and flexible options, Haven makes finding safe, reliable housing simple, so you can focus on work and feel at home wherever you go.</h3>
                </div>
            </div>    
            </div>
            <div className='bg-gray-100 min-h-screen'>
                <div className='mx-8'>
                    <div className='grid grid-cols-2 gap-8 mt-20'>
                        <div className='col-span-2 bg-white rounded-lg shadow-md p-5 h-72'>
                            <h1 className='text-xl'>Upcoming Reservations</h1>
                            <hr className="my-2 border-green-700 border-opacity-30"/>
                        </div>
                        <div className='bg-white rounded-lg shadow-md p-5 h-72'>
                            <h1 className='text-xl'>Pending Requests</h1>
                            <hr className="my-2 border-green-700 border-opacity-30"/>
                        </div>
                        <div className='bg-white rounded-lg shadow-md p-5 h-72'>
                            <h1 className='text-xl'>Past Reservations</h1>
                            <hr className="my-2 border-green-700 border-opacity-30"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default RenterDashboard