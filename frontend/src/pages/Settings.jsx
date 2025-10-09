import React from 'react'
import { NavLink } from 'react-router-dom';
import { IoMdSettings } from "react-icons/io";
import { IoEnterOutline } from "react-icons/io5";
import { RiArrowRightSLine } from "react-icons/ri";

const Settings = () => {

    const firstname = localStorage.getItem("firstname")
    const lastname = localStorage.getItem("lastname")
    const user_id = localStorage.getItem("user_id")

  return (
    <div className='font-nunito text-slate-700'>
        <div className='grid grid-cols-[25%_75%]'>
            <div className='flex flex-col bg-gray-100 min-h-screen'>
            <div className='mx-8'>
                <h1 className='text-2xl font-medium mt-6 mb-5'>Account Settings</h1>
                <div className='flex flex-col items-center bg-white rounded-lg shadow-md p-5 space-y-2 h-72'>
                    <img className='w-1/2 rounded-md' src="https://t3.ftcdn.net/jpg/10/24/11/58/360_F_1024115848_VTfuHjHj9UVVvrUOaDQqm2clMspgRnGs.jpg" alt="profile image"></img>
                    <h1 className='text-xl font-bold'>{firstname} {lastname}</h1>
                    <h1 className='text-xl text-[rgb(42,98,112)]'>Renter Profile</h1>
                    <div className='flex'>
                    <IoMdSettings className='size-5 mr-8'/>
                    <IoEnterOutline className='size-5'/>
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
                <div className='flex flex-col bg-white rounded-lg shadow-md mx-8 mt-20 mb-5 p-10 space-y-2'>
                    <div>
                        <h1 className='text-xl font-semibold capitalize'>{firstname} {lastname}</h1>
                        <div className='flex justify-between'>
                            <NavLink className="text-[rgb(42,98,112)]">Personal Information</NavLink> <RiArrowRightSLine />
                        </div>
                    </div>
                    <hr className="border-green-700 border-opacity-30"/>
                    <div>
                        <h1 className='text-xl font-semibold'>Log In & Security</h1>
                        <div className='flex justify-between'>
                            <NavLink className="text-[rgb(42,98,112)]">Change Password</NavLink> <RiArrowRightSLine />
                        </div>
                        <div className='flex justify-between'>
                            <NavLink className="text-[rgb(42,98,112)]">Identity Verification</NavLink> <RiArrowRightSLine />
                        </div>
                    </div>
                    <hr className="border-green-700 border-opacity-30"/>
                    <div>
                        <h1 className='text-xl font-semibold'>Notifications</h1>
                        <div className='flex justify-between'>
                            <NavLink className="text-[rgb(42,98,112)]">Offers and updates</NavLink> <RiArrowRightSLine />
                        </div>
                        <div className='flex justify-between'>
                            <NavLink className="text-[rgb(42,98,112)]">Account</NavLink> <RiArrowRightSLine />
                        </div>
                    </div>
                    <hr className="border-green-700 border-opacity-30"/>
                    <div>
                        <h1 className='text-xl font-semibold'>Payment</h1>
                        <div className='flex justify-between'>
                            <NavLink className="text-[rgb(42,98,112)]">Add or update credit / debit cards</NavLink> <RiArrowRightSLine />
                        </div>
                        <div className='flex justify-between'>
                            <NavLink className="text-[rgb(42,98,112)]">Bank account info</NavLink> <RiArrowRightSLine />
                        </div>
                    </div>
                    <hr className="border-green-700 border-opacity-30"/>
                    <div>
                        <h1 className='text-xl font-semibold'>Taxes</h1>
                        <div className='flex justify-between'>
                            <NavLink className="text-[rgb(42,98,112)]">Taxpayers</NavLink> <RiArrowRightSLine />
                        </div>
                        <div className='flex justify-between'>
                            <NavLink className="text-[rgb(42,98,112)]">Tax Documents</NavLink> <RiArrowRightSLine />
                        </div>
                    </div>
                    <hr className="border-green-700 border-opacity-30"/>
                    <div>
                        <h1 className='text-xl font-semibold'>Support & Legal</h1>
                        <div className='flex justify-between'>
                            <NavLink className="text-[rgb(42,98,112)]">Add text here</NavLink> <RiArrowRightSLine />
                        </div>
                        <div className='flex justify-between'>
                            <NavLink className="text-[rgb(42,98,112)]">Add text here</NavLink> <RiArrowRightSLine />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Settings