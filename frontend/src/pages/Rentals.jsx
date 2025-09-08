import React from 'react'
import Search from '../components/Search'
import Inquiry from '../components/Inquiry';
import Filter from '../components/Filter';
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from "react";
import { GoogleMap, OverlayView } from '@react-google-maps/api';
import { loadFromSession } from '../utils/sessionStorage';
import { FaFilter } from "react-icons/fa";

const containerStyle = {
    width: '90%',
    height: '500px',
    borderRadius: '15px',
};

const Rentals = () => {

    {/* load search info from session */}
    const destination = loadFromSession('search_dest');
    const center = destination
    const [mapCenter, setMapCenter] = useState(center);
    const [locations, setLocations] = useState([])

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)
    const city = searchParams.get("city")
    const state = searchParams.get("state")
    const country = searchParams.get("country")
    const adults = searchParams.get("adults")
    const children = searchParams.get("children")
    const pets = searchParams.get("pets")
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")
    
    const [results, setResults] = useState([])
    const [hoverID, setHoverID] = useState(null)
    const navigate = useNavigate();

    const inputRef = useRef(null);
    const [showPopup, setShowPopup] = useState(false);
    const [activeInquiryIndex, setActiveInquiryIndex] = useState(null);
    const popupRef = useRef(null);
    const inquiryRef = useRef(null);

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
            setActiveInquiryIndex(null);
        }
    };
        
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const fetchResults = async () => {

            const payload = {
                city: city,
                state: state,
                country: country,
                adults: adults,
                children: children,
                pets: pets,
                date: [startDate, endDate],
            };

            try {
                const response = await fetch("/api/search/results", {
                    //"/api/search_results"
                    //"http://localhost:4000/api/search/results"
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                });

                const data = await response.json();
                console.log(data);

                if (data.message === "Search results returned successfully!") {
                    setResults(data.results)
                } 

            } catch (error) {
                console.error(error);
            }
        }
        fetchResults();
    }, [city, state, country, adults, children, pets, startDate, endDate])

    useEffect(() => {
        const geocoder = new window.google.maps.Geocoder();
      
        Promise.all(
            results.map((rental) => {
                const address = `${rental.street_address}, ${rental.city}, ${rental.state} ${rental.postal_code}`
                return new Promise((resolve, reject) => {
                geocoder.geocode({ address: address }, (results, status) => {
                    if (status === "OK" && results[0]) {
                        const location = results[0].geometry.location;
                        resolve({
                            position: {
                                lat: location.lat(),
                                lng: location.lng(),
                            },
                            address: rental.address,
                            price: rental.rent,
                            title: rental.title,
                            bathrooms: rental.bathrooms,
                            bedrooms: rental.bedrooms,
                            property_type: rental.property_type,
                            id: rental.property_id
                        });
                    } else {
                        console.error("Geocode error for", rental.address, status);
                        reject(status);
                    }
                });
                });
            })
        )
          .then((results) => {
            setLocations(results);
          })
          .catch((err) => console.error("Geocoding failed:", err));
    }, [results]);

    return (
        <div className='bg-lease-bg bg-cover bg-opacity-25 font-nunito'>
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
                <div className='flex justify-center'>
                    {/* fixes re-rendering problem from type=submit */}
                    {typeof window !== 'undefined' && window.google && ( 
                        <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={14}>
                            {locations.map((loc, index) => (
                                <OverlayView
                                    key={index}
                                    position={loc.position}
                                    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                                >
                                    <div
                                        style={{
                                            position: 'relative',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                        }}
                                        onMouseEnter={() => setHoverID(loc.id)}
                                        onMouseLeave={() => setHoverID(null)}
                                        onClick={() => navigate(`show/${loc.id}`)}
                                    >
                                        <div
                                            style={{
                                                backgroundColor: '#fa7063',
                                                color: 'white',
                                                padding: '5px 20px',
                                                borderRadius: '20px',
                                                fontWeight: 'bold',
                                                fontSize: '14px',
                                                whiteSpace: 'nowrap',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                            onClick={() => navigate(`show/${loc.id}`)}
                                        >
                                            ${loc.price}
                                        </div>
                                        {hoverID === loc.id && (
                                            <div
                                                style={{
                                                    position: 'relative',
                                                    top: '5px',
                                                    width: '200px',
                                                    backgroundColor: 'white',
                                                    borderRadius: '20px',
                                                    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                                                    padding: '10px',
                                                    zIndex: 100,
                                                    color: '#333',
                                                }}
                                                className='flex flex-col text-sm font-medium space-y-1'
                                            >
                                                <div className='font-bold'>{loc.title}</div>
                                                <div className='ml-2'>{loc.property_type}</div>
                                                <div className='ml-2'>{loc.bedrooms} bed / {loc.bathrooms} bath</div>
                                            </div>
                                        )}
                                    </div>
                                </OverlayView>
                            ))}
                        </GoogleMap>
                    )}
                </div>
                <h1 className='ml-14 text-xl my-2 text-slate-600 font-semibold mt-5'>Search Results</h1>
                <div className="grid grid-cols-3 gap-x-4 mx-14">
                    {results.map((rental, index) => (
                        <div key={index} className="flex flex-col items-center rounded-xl shadow-md mb-4 text-slate-700">
                            <div className='relative w-full'>
                                <NavLink to={`show/${rental.property_id}`} key={rental.property_id}>
                                <img className="h-auto max-w-full rounded-xl" src="https://www.avail.co/wp-content/uploads/2021/03/where-to-post-rental-listing-online-for-free.jpg" alt=""></img>
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
                                    <div>
                                        <button 
                                            ref={inputRef}
                                            onClick={() => setActiveInquiryIndex(activeInquiryIndex === index ? null : index)}
                                            className='px-2 py-1 text-sm text-white bg-[rgb(42,98,112)] hover:bg-gray-800 border-[rgb(42,98,112)] rounded-lg'
                                        >
                                            Inquire
                                        </button>
                                        {activeInquiryIndex === index && (
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
                    ))}
                </div>
            </div>

            {/*Mobile View*/}
            
            
        </div>
    )
}

export default Rentals