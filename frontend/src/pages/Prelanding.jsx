import React from 'react'
import Landing from './Landing'
import ListProperty from './ListProperty'
import { NavLink } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa6";

const Prelanding = ({closeMenu}) => {
  return (
    <div className='bg-custom-image-3 bg-cover bg-center h-screen'>
        <div className='flex justify-center'>
            <div className='flex flex-col'>
                <h1 className='text-6xl sm:text-8xl text-white mt-56 ml-10 sm:ml-0'>Welcome to Haven</h1>
                <h3 className='text-lg sm:text-2xl text-white font-bold mt-10 ml-10 sm:ml-0'>Mid-term rentals for traveling professionals, students, and more.</h3>
                
                <div className='flex flex-row mt-10'>
                <button className='text-md sm:text-lg text-white hover:bg-white hover:text-black border border-white px-6 py-2 rounded-full mr-10 ml-10 sm:ml-0'>
                  <NavLink to="home" onClick={closeMenu} className="flex flex-row">Find your home <FaArrowRight className='mt-1 ml-5 '/></NavLink>
                </button>
                <button className='text-md sm:text-lg text-white hover:bg-white hover:text-black border border-white px-6 py-2 rounded-full mr-10'>
                  <NavLink to="list-your-property" onClick={closeMenu} className="flex flex-row">List your home <FaArrowRight className='mt-1 ml-5 '/></NavLink>
                </button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Prelanding