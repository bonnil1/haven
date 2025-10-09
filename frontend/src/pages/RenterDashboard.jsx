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
                        <NavLink to="">
                          <IoMdSettings className='size-5 mr-8'/>
                        </NavLink>
                        <NavLink to="">
                          <IoEnterOutline className='size-5'/>
                        </NavLink>
                    </div>
                </div>
                <div className='flex flex-col bg-white rounded-lg shadow-md my-8 p-5 space-y-1'>
                    <h1 className='text-lg'>How to Rent in 7 Easy Steps</h1>
                    <hr className="my-2 border-green-700 border-opacity-30"/>
                    <h3 className='text-sm'>Step 1) Get Verified</h3>
                    <h3 className='text-sm'>Step 2) Search for an apartment</h3>
                    <h3 className='text-sm'>Step 3) Look through details</h3>
                    <h3 className='text-sm'>Step 4) Send inquiry</h3>
                    <h3 className='text-sm'>Step 5) Chat with host</h3>
                    <h3 className='text-sm'>Step 6) Sign contract</h3>
                    <h3 className='text-sm'>Step 7) Confirm payment</h3>
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