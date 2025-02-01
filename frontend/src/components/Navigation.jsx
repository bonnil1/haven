import React from 'react'
import { NavLink } from 'react-router-dom'
import { useState, useEffect, useRef  } from 'react';
import { PiWarehouseFill } from "react-icons/pi";
import { BiSolidUserRectangle } from "react-icons/bi";

const Navigation = ({toggleMobileMenu, isMobileMenuOpen, closeMenu}) => {


    return (
        <div>
            {/*Laptop View*/}
            <div className="hidden md:block">
            <nav className="bg-white p-2 border-b border-gray-300">
            <div className="mx-auto, max-w-8xl px-5">
                <div className="flex h-15 items-center justify-between">
                <div className="flex space-x-5 text-white">
                    <NavLink to="/" onClick={closeMenu} className="flex font-semibold text-gray-600 hover:underline">
                        <img className="size-12" src="https://i.imgur.com/w1ogrfV.jpeg" alt="haven_logo" />
                    </NavLink>
                </div>
                <div className="md:ml-auto">
                    <div className="flex mt-1">

                    {/* Hamburger Icon */}
                    <div>
                        <button onClick={toggleMobileMenu} className="flex text-teal-700 focus:outline-none hover:bg-gray-300 rounded-md p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 24" stroke="currentColor" className="w-8 h-10">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <BiSolidUserRectangle className='size-10'/>
                        </button>
                    </div>
                    <div className={`${isMobileMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
                        <div className="absolute right-0 w-20 sm:w-56 p-2 mt-16 mr-3 bg-white shadow-md rounded-xl">
                        <NavLink to="signup" onClick={closeMenu} className="block text-black font-bold hover:bg-gray-200 px-3 py-2">
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
            <nav className="bg-white p-4">
            <div className="mx-auto, max-w-3xl px-2">
                <div className="flex h-10 items-center justify-between">
                    <div className="text-white">
                        <NavLink to="/" onClick={closeMenu} className="flex font-semibold text-gray-600 hover:underline">
                            <img className="size-12" src="https://i.imgur.com/w1ogrfV.jpeg" alt="haven_logo" />
                        </NavLink>
                    </div>
                    {/* Hamburger Icon for Mobile */}
                    <div className="mt-2">
                        <button onClick={toggleMobileMenu} className="text-emerald-600 focus:outline-none hover:bg-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
                    <div className={`${isMobileMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
                        <div className="absolute right-0 w-44 sm:w-56 p-2 mt-3 mr-3 bg-white shadow-md rounded-md">
                        <NavLink to="/signup" onClick={closeMenu} className="block text-black font-bold hover:bg-gray-200 px-3 py-2">
                            Sign up
                        </NavLink>
                        <NavLink to="/login" onClick={closeMenu} className="block text-black hover:bg-gray-200 px-3 py-2">
                            Log in
                        </NavLink>
                        <hr className='my-2'/>
                        <NavLink to="/list-your-property" onClick={closeMenu} className="block text-black hover:bg-gray-200 px-3 py-2">
                            List your home
                        </NavLink>
                        <NavLink to="/home" onClick={closeMenu} className="block text-black hover:bg-gray-200 px-3 py-2">
                            Find your home
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
