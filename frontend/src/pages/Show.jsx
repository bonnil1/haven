import React from 'react'
import Search from '../components/Search'
import { GoogleMap, Marker } from '@react-google-maps/api';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

const containerStyle = {
    width: '80%',
    height: '400px',
    borderRadius: '15px',
};

const Show = () => {

  const { id } = useParams();
  const [results, setResults] = useState("")
  const [locations, setLocations] = useState("")

  useEffect(() => {
      const fetchListing = async () => {
          try {
              const response = await fetch(`http://localhost:4000/api/search/show/${id}`, {
                  //`/api/search/show/${id}`
                  //`http://localhost:4000/api/search/show/${id}`
                  method: "GET",
              });

              const data = await response.json();
              console.log(data);

              if (data.message === "Listing returned successfully!") {
                  setResults(data.results)
              } 

          } catch (error) {
              console.error(error);
          }
      };

      fetchListing();
  }, [id])

  useEffect(() => {
      if (!results) return;
    
      const geocoder = new window.google.maps.Geocoder();
      const address = `${results.street_address}, ${results.city}, ${results.state} ${results.postal_code}`;
    
      geocoder.geocode({ address }, (results, status) => {
          if (status === "OK" && results[0]) {
              const location = results[0].geometry.location;
              setLocations({
                lat: location.lat(),
                lng: location.lng(),
              });
          } else {
              console.error("Geocode error:", status, results);
          }
      });
  }, [results]);

  return (
    <div className="bg-lease-bg bg-cover bg-opacity-25">
        {/*Search Bar*/}
        <div className='flex justify-center'>
            <div className='my-5'>
                <Search />
            </div>
        </div>

      {/*Laptop View*/}
      <div className="hidden md:block">
      <div className="grid grid-cols-2 grid-rows-1 gap-4 ml-20 mr-20 mt-5">
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
            <h2 className="text-2xl text-bold">{results.title}</h2>
            <h3 className="text-lg">{results.bedrooms} bedrooms | {results.bathrooms} bathrooms </h3>
          </div>
          <div className="mt-5">
            {/*pull in detailed rental schema */}
            <h2 className="text-xl">Property Information</h2>
            <h3 className="text-md">{results.description}</h3>
          </div>
          <div className="mt-5">
            {/*map section for general location */}
            <h2 className="text-xl">Where you'll be</h2>
            <div className="ml-5 mt-5">
              {window.google && locations && (
                  <GoogleMap mapContainerStyle={containerStyle} center={locations} zoom={14}>
                      <Marker
                        position={locations}
                      />
                  </GoogleMap>
              )}
            </div>
          </div>
          <div className="mt-5">
            {/*reviews section */}
            <h2 className="text-xl">Reviews</h2>
          </div>
        </div>
        {/*price information */}
        <div className="items-center p-5 border rounded-lg shadow-md bg-gray-50 mr-28 h-80">
          <h2 className="text-xl"><strong>${results.fee}</strong> / month</h2>
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
            <h2 className="text-xl text-bold">{results.title}</h2>
            <h3 className="text-md">1000 sq. ft. | {results.bedrooms} bedrooms | {results.bathrooms} bathrooms </h3>
          </div>
          <div className="mt-5">
            {/*pull in detailed rental schema */}
            <h2 className="text-lg">Property Information</h2>
          </div>
          <div className="mt-5">
            {/*map section for general location */}
            <h2 className="text-lg">Where you'll be</h2>
            <div className="ml-5 mr-5 mt-5">

            </div>
          </div>
          <div className="mt-5">
            {/*reviews section */}
            <h2 className="text-xl">Reviews</h2>
          </div>
          {/*price information */}
          <div className="items-center border rounded-lg shadow-md bg-gray-50 p-5 ml-5 mr-5 mb-5 h-80">
            <h2 className="text-xl"><strong>${results.fee}</strong> / month</h2>
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