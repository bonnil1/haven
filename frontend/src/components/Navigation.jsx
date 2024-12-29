import React from 'react'
import { NavLink } from 'react-router-dom'
import { useState } from 'react';
import { PiWarehouseFill } from "react-icons/pi";
import { BiSolidUserRectangle } from "react-icons/bi";

const Navigation = ({toggleMobileMenu, isMobileMenuOpen, closeMenu}) => {

    

    return (
        <div>
            {/*Laptop View*/}
            <div className="hidden md:block">
            <nav className="bg-gray-200/50 p-2">
            <div className="mx-auto, max-w-8xl px-5">
                <div className="flex h-15 items-center justify-between">
                <div className="flex space-x-5 text-white">
                    <NavLink to="/" onClick={closeMenu} className="flex font-semibold text-gray-600 hover:underline">
                        <PiWarehouseFill className='size-8 mr-3'/> 
                        <h5 className='text-2xl'>Haven</h5>
                    </NavLink>
                    {/* 
                    <div className='mt-2'>
                        <NavLink to="housing-request" className="lg:inline-block lg:mt-0 text-gray-700 hover:underline mr-5">
                        Housing Request
                        </NavLink>
                        <NavLink to="list-your-property" className="lg:inline-block lg:mt-0 text-gray-700 hover:underline mr-5">
                            List Your Property
                        </NavLink>
                        <NavLink to="resources" className="lg:inline-block lg:mt-0 text-gray-700 hover:underline">
                            Resources
                        </NavLink>
                    </div>
                    */}
                </div>
                <div className="md:ml-auto">
                    <div className="flex mt-1">

                    {/* Hamburger Icon */}
                    <div>
                        <button onClick={toggleMobileMenu} className="flex text-gray-600 focus:outline-none hover:bg-gray-300 rounded-md p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 24" stroke="currentColor" className="w-7 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <BiSolidUserRectangle className='size-8'/>
                        </button>
                    </div>
                    <div className={`${isMobileMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
                        <div className="absolute right-0 w-20 sm:w-56 p-2 mt-16 mr-3 bg-white shadow-md rounded-xl">
                        <NavLink to="sign-up" onClick={closeMenu} className="block text-black font-bold hover:bg-gray-200 px-3 py-2">
                            Sign up
                        </NavLink>
                        <NavLink to="login" onClick={closeMenu} className="block text-black hover:bg-gray-200 px-3 py-2">
                            Log in
                        </NavLink>
                        <hr className='my-2'/>
                        <NavLink to="list-your-property" onClick={closeMenu} className="block text-black hover:bg-gray-200 px-3 py-2">
                            List your home
                        </NavLink>
                        <NavLink to="home" onClick={closeMenu} className="block text-black hover:bg-gray-200 px-3 py-2">
                            Find your home
                        </NavLink>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </nav>
            </div>

            {/*Mobile View*/}
            <div className="block md:hidden">
            <nav className="bg-blue-500 p-4">
            <div className="mx-auto, max-w-3xl px-2">
                <div className="flex h-10 items-center justify-between">
                    <div className="text-white">
                        <NavLink to="/" onClick={closeMenu} className="font-semibold text-xl tracking-tight">
                            Work In Progress
                        </NavLink>
                    </div>
                    {/* Hamburger Icon for Mobile */}
                    <div className="mt-2">
                        <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className={`${isMobileMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
                        <div className="px-2 pt-2 pb-1">
                        <NavLink to="housing-request" onClick={closeMenu} className="block text-white hover:text-teal-200 hover:underline px-3 py-2">
                            Housing Request
                        </NavLink>
                        <NavLink to="list-your-property" onClick={closeMenu} className="block text-white hover:text-teal-200 hover:underline px-3 py-2">
                            List Your Property
                        </NavLink>
                        <NavLink to="resources" onClick={closeMenu} className="block text-white hover:text-teal-200 hover:underline px-3 py-2">
                            Resources
                        </NavLink>
                        <NavLink to="login" onClick={closeMenu} className="block text-white hover:text-teal-500 hover:underline px-3 py-2">
                            Login
                        </NavLink>
                        </div>
                </div>
            </div>
            </nav>    
            </div>
        </div>
    )
}

export default Navigation

{/*
<NavLink to="login" className="text-md text-gray-600 hover:underline lg:mt-0">
    <BiSolidUserRectangle className='size-9'/>
</NavLink>
*/}