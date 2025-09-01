import React from 'react'
import { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom'

const AllListings = () => {

  const user_id = localStorage.getItem("user_id")

  const [results, setResults] = useState([])

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch("/api/property/all_listings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({user_id})
        })

        const data = await response.json();
        console.log(data)

        if (data.message === "All listings returned successfully!") {
          setResults(data.results)
        }

      } catch (error) {
        console.error(error)
      }
    }
    fetchResults()
  }, [])

  return (
    <div className='font-roboto text-slate-800 bg-lease-bg bg-cover bg-opacity-25 min-h-screen'>
      <div className='px-36 py-10'>
        <div className=''>
            <h1 className='flex text-2xl font-semi-bold py-8'>Current Listings</h1>
            <div className='grid grid-cols-4 gap-x-4'>
              {results.map((rental, index) => (
                <div key={index} className='flex flex-col items-center rounded-xl shadow-md mb-4 text-slate-700'>
                  <div className='relative w-full'>
                  <NavLink to={`show/${rental.property_id}`} key={rental.property_id}>
                    <img className="h-auto max-w-full rounded-xl" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" alt=""></img>
                  </NavLink>
                  <div className="absolute top-4 left-4 bg-[rgb(250,112,99)] text-white text-sm font-semibold rounded-full px-3 py-1 shadow">
                    ${rental.rent}
                  </div>
                  <div className='absolute bottom-0 w-full flex justify-between px-4 py-3 items-center bg-white bg-opacity-60 rounded-xl'>
                    <div className='flex flex-col'>
                        <h1 className="text-sm text-gray-700 font-bold flex justify-center">{rental.title}</h1>
                        <ul className="text-sm text-gray-500 list-none flex">
                            <li>{rental.bedrooms} bedrooms</li>
                            <div className="w-px h-4 bg-gray-600 opacity-30 mx-2" />
                            <li>{rental.bathrooms} bathrooms</li>
                        </ul>
                    </div>
                  </div>
                  </div>
                </div>
              ))}
            </div>
        </div>
        <div>
            <h1 className='flex text-2xl font-semi-bold py-8'>Past Listings</h1>
        </div>
      </div>  
    </div>
  )
}

export default AllListings