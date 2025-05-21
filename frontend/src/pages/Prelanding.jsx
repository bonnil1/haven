import React from 'react'
import Landing from './Search'
import ListProperty from './ListProperty'
import { NavLink } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa6";

const Prelanding = ({closeMenu}) => {
  return (
    <div>
    <div className='bg-custom-image-3 bg-cover bg-center h-screen'>
    {/*Laptop View*/}
        <div className="hidden md:block ">
          <div className='flex justify-center'>
              <div className='flex flex-col bg-white bg-opacity-90 rounded-2xl mt-28 p-14'>
                  <h1 className='text-5xl sm:text-6xl text-stone-700 ml-10 sm:ml-0'>A <strong>safe</strong> and <strong>secure</strong></h1>
                  <h1 className='text-5xl sm:text-6xl text-stone-700 mt-5 ml-10 sm:ml-0'>way to sublease</h1>
                  <h3 className='text-xl sm:text-2xl text-stone-700 mt-10 ml-10 sm:ml-0'>Welcome to <strong>Haven</strong>, the trusted subleasing platform for professionals and students.</h3>
                  
                  <div className='flex flex-row mt-10'>
                  <button className='text-md sm:text-lg text-white hover:bg-white bg-slate-50 px-6 py-2 rounded-full mr-10 ml-10 sm:ml-0'>
                    <NavLink to="home" onClick={closeMenu} className="flex flex-row text-stone-700">I'm looking for a place <FaArrowRight className='mt-1 ml-5 text-[rgb(250,112,99)]'/></NavLink>
                  </button>
                  <button className='text-md sm:text-lg text-white hover:bg-white bg-slate-50 px-6 py-2 rounded-full mr-10'>
                    <NavLink to="lease-1" onClick={closeMenu} className="flex flex-row text-stone-700">I'm listing my place <FaArrowRight className='mt-1 ml-5 text-[rgb(250,112,99)]'/></NavLink>
                  </button>
              </div>
              </div>
          </div>
      </div>

    {/*Mobile View */}
      <div className="block md:hidden">
        <div className='flex justify-center'>
          <div className='flex flex-col bg-white bg-opacity-90 rounded-2xl mt-14 p-10'>
            <h1 className='text-4xl text-stone-700'>A <strong>safe</strong> and <strong>secure</strong> way to sublease</h1>
            <h3 className='text-lg text-stone-700 mt-5'>Welcome to <strong>Haven</strong>, the trusted subleasing platform for professionals and students.</h3>
            
            <div className='flex flex-row mt-5'>
            <button className='text-md hover:bg-white bg-slate-50 px-6 py-2 rounded-full mr-5 ml-5'>
              <NavLink to="home" onClick={closeMenu} className="flex flex-row text-sm text-stone-700 font-bold">Find <FaArrowRight className='mt-1 ml-2 text-[rgb(250,112,99)]'/></NavLink>
            </button>
            <button className='text-md hover:bg-white bg-slate-50 px-6 py-2 rounded-full ml-10'>
              <NavLink to="lease-1" onClick={closeMenu} className="flex flex-row text-sm text-stone-700 font-bold">List<FaArrowRight className='mt-1 ml-2 text-[rgb(250,112,99)]'/></NavLink>
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Prelanding