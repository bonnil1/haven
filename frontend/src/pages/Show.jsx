import React from 'react'
import Search from '../components/Search'
import Filter from '../components/Filter';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import Inquiry from '../components/Inquiry';
import { FaFilter } from "react-icons/fa";

const containerStyle = {
    width: '80%',
    height: '400px',
    borderRadius: '15px',
};

const Show = () => {

  const { id } = useParams();
  const [results, setResults] = useState("")
  const [locations, setLocations] = useState("")

  const inputRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);
  const [activeInquiryIndex, setActiveInquiryIndex] = useState(false);
  const inquiryRef = useRef(null);

  useEffect(() => {
      const fetchListing = async () => {
          try {
              const response = await fetch(`/api/search/show/${id}`, {
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

  const handleClickOutside = (event) => {
      if (
          popupRef.current &&
          !popupRef.current.contains(event.target) &&
          !inputRef.current.contains(event.target)
      ) {
          setShowPopup(false);
      }

      if (
          inquiryRef.current && 
          !inquiryRef.current.contains(event.target) &&  
          !inputRef.current.contains(event.target) 
      ) {
          setActiveInquiryIndex(false);
      }
  };

  useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-lease-bg bg-cover bg-opacity-25 font-roboto">
      <div className='flex justify-center'>
      {/*Search Bar*/}
      <div className='my-5 mr-5'>
          <Search />
      </div>

      {/*Filters */}
      <div className="relative flex items-center">
      <button
          ref={inputRef}
          onClick={() => setShowPopup(!showPopup)}
      >
          <div className='flex bg-white px-3 py-2 rounded-full text-sm text-slate-700 hover:bg-gray-100'><FaFilter className='size-3 mr-1.5 mt-1'/> Filters</div>
      </button>
      {showPopup && (
          <div
              ref={popupRef}
              className="absolute left-[-440%] top-[90%] z-10 bg-white p-4 shadow-lg border rounded-xl w-[27rem]"
          >
              <Filter />
          </div>
      )}
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
      <div className=" grid grid-cols-[2fr_1fr] ml-28 mt-5">
        <div>
          <div>
            {/*rental information */}
            <h2 className="text-2xl text-bold text-slate-800">{results.title}</h2>
            <h3 className="text-lg text-slate-700">{results.bedrooms} bedrooms | {results.bathrooms} bathrooms </h3>
          </div>
          <div className="mt-5">
            {/*pull in detailed rental schema */}
            <h2 className="text-xl text-slate-800">Property Information</h2>
            <h3 className="text-md text-slate-700">{results.description}</h3>
          </div>
          <div className="mt-5">
            {/*map section for general location */}
            <h2 className="text-xl text-slate-800">Where you'll be</h2>
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
          <div className="mt-5 mb-14">
            {/*reviews section */}
            <h2 className="text-xl">Reviews</h2>
              <div className='grid grid-cols-2 gap-4 text-slate-700 p-5'>
                  <div>
                      <h1 className='text-md text-slate-700 font-semibold mb-3'>Stella Says:</h1>
                      <h3 className='text-md text-slate-600'>I really enjoyed my stay here! Clean rooms and convenient location!</h3>
                  </div>
                  <div>
                      <h1 className='text-md text-slate-700 font-semibold mb-3'>Amber Says:</h1>
                      <h3 className='text-md text-slate-600'>I had a wonderful stay! The rooms were comfortable and I felt right at home.</h3>
                  </div>
              </div>
          </div>
        </div>
        {/*price information */}
        <div className="items-center p-5 border rounded-lg shadow-md bg-white bg-opacity-60 p-10 mr-28 h-80 text-slate-700 ml-5">
          <h2 className="text-xl"><strong>${results.rent}</strong> monthly</h2>
          <h3>Minimum stay: 1 month</h3>
          <h3>Available: December 1, 2024</h3>
          <h2 className="font-bold mt-5">Property fees</h2>
          <h3>Electric Fee ${results.electric_fee}</h3>
          <h3>Water Fee ${results.water_fee}</h3>
          <h3>Deposit (Refundable) $500</h3>
          <h3>Pet Deposit (Refundable) $200</h3>
          <div>
              <button 
                  ref={inputRef}
                  onClick={() => setActiveInquiryIndex(true)}
                  className='px-2 py-1 text-md text-white bg-[rgb(42,98,112)] hover:bg-gray-800 border-[rgb(42,98,112)] rounded-lg mt-5'
              >
                  Inquire
              </button>
              {activeInquiryIndex && (
              <div
                  ref={inquiryRef}
                  className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-1/2 h-1/2"
              >
                  <Inquiry />
              </div>
              )}
            </div>
        </div>
      </div>
      </div>

      {/*Mobile View*/}
      
    </div>
  )
}

export default Show