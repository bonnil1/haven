import React from 'react'
import Search from '../components/Search'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Rentals = () => {

    /*seed data*/
    class Rental {
        constructor(caption, bedrooms, bathrooms, price, image) {
            this.caption = caption
            this.bedrooms = bedrooms
            this.bathrooms = bathrooms
            this.price = price
            this.image = image
        }
    }

    var rentals = [
        new Rental("Waikiki beach view", 2, 1, 2500),
        new Rental("Downtown central location", 1, 1, 2000),
        new Rental("10 min walk from Waikiki beach", 1, 1, 2100),
        new Rental("Newly renovated 1 br", 1, 1, 2000),
        new Rental("Cozy studio", 0, 1, 1500),
        new Rental("Near campus, walkable", 3, 2, 3000)
    ]

    return (
        <div>
            <Search />
            {/*Laptop View*/}
            <div className="hidden md:block">
            <div className="grid grid-cols-3 gap-4 ml-10 mr-10 mb-10">
                {rentals.map((rental, i) => (
                    <NavLink to="show">
                    <div key={i} className="flex flex-col items-center p-4 border rounded-lg shadow-md">
                        <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" alt=""></img>
                        <h1 className="lg:text-xl md:text-sm font-bold mt-3">{rental.caption}</h1>
                        <ul className="lg:text-lg md:text-sm list-none">
                            <li>{rental.bedrooms} bedrooms</li>
                            <li>{rental.bathrooms} bathrooms</li>
                            <li>${rental.price}</li>
                        </ul>
                    </div>
                    </NavLink>
                ))}
            </div>
            </div>

            {/*Mobile View*/}
            <div className="block md:hidden">
            <div className="grid grid-cols-1 gap-4 ml-2 mr-2 mb-2">
                {rentals.map((rental, i) => (
                    <NavLink to="/home/show">
                    <div key={i} className="flex flex-col items-center p-4 border rounded-lg shadow-md">
                        <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" alt=""></img>
                        <h1 className="lg:text-xl md:text-sm font-bold mt-3">{rental.caption}</h1>
                        <ul className="lg:text-lg md:text-sm list-none">
                            <li>{rental.bedrooms} bedrooms</li>
                            <li>{rental.bathrooms} bathrooms</li>
                            <li>${rental.price}</li>
                        </ul>
                    </div>
                    </NavLink>
                ))}
            </div>    
            </div>
        </div>
    )
}

export default Rentals