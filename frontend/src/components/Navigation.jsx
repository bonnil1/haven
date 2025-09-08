import React from 'react'
import { NavLink } from 'react-router-dom'
import { useState } from "react";
import logo from '../assets/images/haven_logo_2.png';
import { BiSolidUserRectangle } from "react-icons/bi";
import { IoIosSearch } from "react-icons/io";
import { AiOutlineHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FiMessageSquare } from "react-icons/fi";
import { CiViewList } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineContactSupport } from "react-icons/md";
import { MdOutlineLogin } from "react-icons/md";


const Navigation = ({toggleMenu, isMenuOpen, closeMenu, isLoggedIn, setIsLoggedIn, menuRef, onToggle}) => {

    const [isHost, setIsHost] = useState(false)

    const toggleRole = () => {
        setIsHost(prev => {
            const switchRole = !prev;
            onToggle(switchRole ? 'host' : 'renter');
            return switchRole
        })
    }

    const logout = () => {
        closeMenu(); 
        setIsLoggedIn(false);
        localStorage.clear();
        // change from localstorage > jwt eventually ... 
    }

    return (
        <div>
            {/*Laptop View*/}
            <div className="hidden md:block">
            <nav className="bg-white p-2 border-b border-gray-400">
            <div className="mx-auto, max-w-8xl px-5">
                <div className="flex h-15 items-center justify-between">
                <div className="flex space-x-5 text-white">
                    <NavLink to="/" onClick={closeMenu} className="flex font-semibold text-gray-600 hover:underline">
                        {/*<img className="size-12" src="https://i.imgur.com/yepIKjW.png" alt="logo" />*/}
                        <img className="size-11" src={logo} alt="logo" />
                    </NavLink>
                </div>
                <div className="md:ml-auto">
                    <div className="flex mt-1">
                        
                    {/* Toggle Button */}
                    {isLoggedIn ? (
                    <div className="flex items-center space-x-4 mr-8 font-nunito">
                        <span className="text-sm text-white">{isHost ? 'Host' : 'Renter'}</span>
                        <button
                            onClick={toggleRole}
                            className={`relative inline-flex h-12 w-40 items-center rounded-full transition bg-gray-300`}
                        >
                            <div className="flex justify-between items-center w-full px-3 text-md text-white z-10">
                                <span className='ml-1 font-bold'>Renter</span>
                                <span className='mr-2.5 font-bold'>Host</span>
                            </div>
                            <span
                            className={`absolute h-8 w-16 m-2 rounded-full bg-[rgb(250,112,99)] transition-transform duration-300 ${
                                isHost ? 'translate-x-20' : 'translate-x-0'
                            }`}
                            />
                        </button>
                    </div>
                    ) : null}

                    {/* Hamburger Icon */}
                    <div>
                        <button onClick={toggleMenu} className="flex text-[rgb(250,112,99)] focus:outline-none hover:bg-gray-200 rounded-md p-1">
                            {/* 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 24" stroke="currentColor" className="w-8 h-10">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            */}
                            <BiSolidUserRectangle className='size-12'/>
                        </button>
                    </div>
                    <div className={`${isMenuOpen ? 'block' : 'hidden'}`} ref={menuRef}>
                        <div className="absolute right-0 w-20 sm:w-56 p-2 mt-20 mr-3 bg-white shadow-xl rounded-xl font-roboto z-50">
                        {isLoggedIn ? (
                            <> 
                                <NavLink to="home" onClick={closeMenu} className="block text-black hover:bg-[rgb(232,240,232)] px-3 py-1.5">
                                    <div className='flex'><IoIosSearch className='mt-1 mr-2'/>Find your home</div>
                                </NavLink>
                                <NavLink to="renter-dashboard" onClick={closeMenu} className="block text-black hover:bg-[rgb(232,240,232)] px-3 py-1.5">
                                    <div className='flex'><AiOutlineHome className='mt-1 mr-2'/>View rentals</div>
                                </NavLink>
                                <NavLink to="profile" onClick={closeMenu} className="block text-black hover:bg-[rgb(232,240,232)] px-3 py-1.5">
                                    <div className='flex'><CgProfile className='mt-1 mr-2'/>Profile</div>
                                </NavLink>
                                <NavLink to="messages" onClick={closeMenu} className="block text-black hover:bg-[rgb(232,240,232)] px-3 py-1.5">
                                    <div className='flex'><FiMessageSquare className='mt-1 mr-2'/>Messages</div>
                                </NavLink>
                                <hr className="my-2 border-green-700 border-opacity-30"/>
                                <NavLink to="lease-1" onClick={closeMenu} className="block text-black hover:bg-[rgb(232,240,232)] px-3 py-1.5">
                                    <div className='flex'><CiViewList className='mt-1 mr-2'/>List your home</div>
                                </NavLink>
                                <NavLink to="listing-dashboard" onClick={closeMenu} className="block text-black hover:bg-[rgb(232,240,232)] px-3 py-1.5">
                                    <div className='flex'><AiOutlineHome className='mt-1 mr-2'/>View listings</div>
                                </NavLink>
                                <hr className="my-2 border-green-700 border-opacity-30"/>
                                <NavLink to="settings" onClick={closeMenu} className="block text-black hover:bg-[rgb(232,240,232)] px-3 py-1.5">
                                    <div className='flex'><IoSettingsOutline className='mt-1 mr-2'/>Account Settings</div>
                                </NavLink>
                                <NavLink to="contact" onClick={closeMenu} className="block text-black hover:bg-[rgb(232,240,232)] px-3 py-1.5">
                                    <div className='flex'><MdOutlineContactSupport className='mt-1 mr-2'/>Contact Us</div>
                                </NavLink>
                                <NavLink to="/" onClick={logout}  className="block text-black hover:bg-[rgb(232,240,232)] px-3 py-1.5">
                                    <div className='flex'><MdOutlineLogin className='mt-1 mr-2'/>Log Out</div>
                                </NavLink>
                            </>
                        ) : (
                            <>
                                <NavLink to="signup" onClick={closeMenu} className="block text-[rgb(250,112,99)] font-semibold hover:bg-[rgb(232,240,232)] px-3 py-1.5">
                                    <div className='flex'><CgProfile className='mt-1 mr-2'/>Sign up</div>
                                </NavLink>
                                <NavLink to="login" onClick={closeMenu} className="block text-black hover:bg-[rgb(232,240,232)] px-3 py-1.5">
                                    <div className='flex'><MdOutlineLogin className='mt-1 mr-2'/>Log In</div>
                                </NavLink>
                                <hr className="my-2 border-green-700 border-opacity-30"/>
                                <NavLink to="home" onClick={closeMenu} className="block text-black hover:bg-[rgb(232,240,232)] px-3 py-1.5">
                                    <div className='flex'><IoIosSearch className='mt-1 mr-2'/>Find your home</div>
                                </NavLink>
                                <NavLink to="lease-1" onClick={closeMenu} className="block text-black hover:bg-[rgb(232,240,232)] px-3 py-1.5">
                                    <div className='flex'><CiViewList className='mt-1 mr-2'/>List your home</div>
                                </NavLink>
                                <hr className="my-2 border-green-700 border-opacity-30"/>
                                <NavLink to="contact" onClick={closeMenu} className="block text-black hover:bg-[rgb(232,240,232)] px-3 py-1.5">
                                    <div className='flex'><MdOutlineContactSupport className='mt-1 mr-2'/>Contact Us</div>
                                </NavLink>
                            </>
                        )}
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
            <div className="mx-auto px-2">
                <div className="flex h-10 items-center justify-between">
                <div className="text-white">
                    <NavLink to="/" onClick={closeMenu} className="flex font-semibold text-gray-600 hover:underline">
                        <img className="size-10" src={logo} alt="logo" />
                    </NavLink>
                </div>
                <div className="md:ml-auto">
                    <div className="flex mt-1">
                    {/* Hamburger Icon for Mobile */}
                    <div className="mt-2">
                        <button onClick={toggleMenu} className="text-[rgb(250,112,99)] focus:outline-none hover:bg-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                    <div className={`${isMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
                        <div className="absolute right-0 w-44 sm:w-56 p-2 mt-12 mr-3 bg-white shadow-md rounded-md">
                        <NavLink to="/signup" onClick={closeMenu} className="block text-black font-bold hover:bg-gray-200 px-3 py-2">
                            Sign up
                        </NavLink>
                        <NavLink to="/login" onClick={closeMenu} className="block text-black hover:bg-gray-200 px-3 py-2">
                            Log in
                        </NavLink>
                        <hr className='my-2'/>
                        <NavLink to="/home" onClick={closeMenu} className="block text-black hover:bg-gray-200 px-3 py-2">
                            Find your home
                        </NavLink>
                        <NavLink to="/lease-1" onClick={closeMenu} className="block text-black hover:bg-gray-200 px-3 py-2">
                            List your home
                        </NavLink>
                        <hr className='my-2'/>
                        <NavLink to="/contact" onClick={closeMenu} className="block text-black hover:bg-gray-200 px-3 py-2">
                            Contact us
                        </NavLink>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </nav>    
            </div>
        </div>
    )
}

export default Navigation
