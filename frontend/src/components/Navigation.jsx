import React from 'react'
import { NavLink } from 'react-router-dom'
import { useState } from 'react';

const Navigation = () => {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <div>
            {/*Laptop View*/}
            <div className="hidden md:block">
            <nav className="bg-blue-500 p-4">
            <div className="mx-auto, max-w-8xl px-10">
                <div className="flex h-15 items-center justify-between">
                <div className="text-white">
                    <NavLink to="/" className="font-semibold text-2xl tracking-tight">
                        Work In Progress
                    </NavLink>
                </div>
                <div className="md:ml-auto">
                    <div className="flex space-x-5">
                    <NavLink to="housing-request" className="lg:inline-block lg:mt-0 text-white hover:text-teal-200 hover:underline">
                        Housing Request
                    </NavLink>
                    <NavLink to="list-your-property" className="lg:inline-block lg:mt-0 text-white hover:text-teal-200 hover:underline">
                        List Your Property
                    </NavLink>
                    <NavLink to="resources" className="lg:inline-block lg:mt-0 text-white hover:text-teal-200 hover:underline">
                        Resources
                    </NavLink>
                    <NavLink to="login" className="text-md text-white border-white hover:border-transparent hover:text-teal-500 hover:underline lg:mt-0">Login</NavLink>
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