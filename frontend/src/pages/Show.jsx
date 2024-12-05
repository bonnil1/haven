import React from 'react'
import Search from '../components/Search'
import { APIProvider, Map } from '@vis.gl/react-google-maps';

const Show = () => {

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
  ]  

  const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

  const handleCameraChange = (ev) => {
    const center = ev.center;  
    const zoom = ev.zoom;     
  };

  return (
    <div>
      <Search />
      {/*Laptop View*/}
      <div className="hidden md:block">
      <div className="grid grid-cols-2 grid-rows-1 gap-4 ml-20 mr-20">
        <div className="h-full">
            <img className="h-full w-full object-cover rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg" alt=""></img>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-4">
            <div>
                <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt=""></img>
            </div>
            <div>
                <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" alt=""></img>
            </div>
            <div>
                <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" alt=""></img>
            </div>
            <div>
                <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg" alt=""></img>
            </div>
        </div>
      </div>
      <div className=" grid grid-cols-[2fr_1fr] ml-28 mt-5 mb-20">
        <div>
          <div>
            {/*rental information */}
            <h2 className="text-2xl text-bold">{rentals[0].caption}</h2>
            <h3 className="text-lg">1000 sq. ft. | {rentals[0].bedrooms} bedrooms | {rentals[0].bathrooms} bathrooms </h3>
          </div>
          <div className="mt-5">
            {/*pull in detailed rental schema */}
            <h2 className="text-xl">Property Information</h2>
          </div>
          <div className="mt-5">
            {/*map section for general location */}
            <h2 className="text-xl">Where you'll be</h2>
            <div className="ml-5 mt-5">
              <APIProvider apiKey={API_KEY}>
                <Map
                  defaultZoom={13}
                  defaultCenter={ { lat: 37.70415364969486, lng: -122.07800056215052 } }
                  onCameraChanged={handleCameraChange}
                  style={{ width: '80%', height: '400px' }}
                >
                </Map>
            </APIProvider>
            </div>
          </div>
          <div className="mt-5">
            {/*reviews section */}
            <h2 className="text-xl">Reviews</h2>
          </div>
        </div>
        {/*price information */}
        <div className="items-center p-5 border rounded-lg shadow-md bg-gray-50 mr-28 h-80">
          <h2 className="text-xl"><strong>${rentals[0].price}</strong> / month</h2>
          <h3>Utilities: included</h3>
          <h3>Minimum stay: 1 month</h3>
          <h3>Available: December 1, 2024</h3>
          <h2 className="font-bold mt-5">Property fees</h2>
          <h3>Cleaning Fee $100</h3>
          <h3>Deposit (Refundable) $500</h3>
          <h3>Pet Deposit (Refundable) $200</h3>
          <button className="flex border bg-blue-500 hover:text-teal-400 text-white font-bold rounded-lg px-3 py-2 mt-5">Book Now</button>
        </div>
      </div>
      </div>

      {/*Mobile View*/}
      <div className="block md:hidden">
      <div className="grid grid-cols-1 grid-rows-1 gap-4 ml-5 mr-5">
        <div className="h-full">
            <img className="h-full w-full object-cover rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg" alt=""></img>
        </div>
        <div>
          <div>
            {/*rental information */}
            <h2 className="text-xl text-bold">{rentals[0].caption}</h2>
            <h3 className="text-md">1000 sq. ft. | {rentals[0].bedrooms} bedrooms | {rentals[0].bathrooms} bathrooms </h3>
          </div>
          <div className="mt-5">
            {/*pull in detailed rental schema */}
            <h2 className="text-lg">Property Information</h2>
          </div>
          <div className="mt-5">
            {/*map section for general location */}
            <h2 className="text-lg">Where you'll be</h2>
            <div className="ml-5 mr-5 mt-5">
              <APIProvider apiKey={API_KEY}>
                <Map
                  defaultZoom={13}
                  defaultCenter={ { lat: 37.70415364969486, lng: -122.07800056215052 } }
                  onCameraChanged={handleCameraChange}
                  style={{ width: '100%', height: '300px' }}
                >
                </Map>
            </APIProvider>
            </div>
          </div>
          <div className="mt-5">
            {/*reviews section */}
            <h2 className="text-xl">Reviews</h2>
          </div>
          {/*price information */}
          <div className="items-center border rounded-lg shadow-md bg-gray-50 p-5 ml-5 mr-5 mb-5 h-80">
            <h2 className="text-xl"><strong>${rentals[0].price}</strong> / month</h2>
            <h3>Utilities: included</h3>
            <h3>Minimum stay: 1 month</h3>
            <h3>Available: December 1, 2024</h3>
            <h2 className="font-bold mt-5">Property fees</h2>
            <h3>Cleaning Fee $100</h3>
            <h3>Deposit (Refundable) $500</h3>
            <h3>Pet Deposit (Refundable) $200</h3>
            <button className="flex border bg-blue-500 hover:text-teal-400 text-white font-bold rounded-lg px-3 py-2 mt-5">Book Now</button>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Show