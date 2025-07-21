import React from 'react'
import Search from '../components/Search'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from "react";
import { GoogleMap, OverlayView } from '@react-google-maps/api';
import { loadFromSession } from '../utils/sessionStorage';
import { FaFilter } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";

const containerStyle = {
    width: '90%',
    height: '500px',
    borderRadius: '15px',
};

const Rentals = () => {

    {/* derive user entered destination from previous search page */}
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

    const [showPopup, setShowPopup] = useState(false);
    const popupRef = useRef(null);
    const inputRef = useRef(null);

    const slides = {
        property_types: ["House", "Apartment", "Condo", "Cottage", "Guesthouse", "Hotel"],
        space: ["An entire place", "A private room", "A shared room"],
        rooms: ["bedrooms", "beds", "bathrooms"],
        amenities: ['In-unit laundry', 'Building laundry', 'Wifi', 'Heater', 'Air conditioning', 'Parking',
            'TV', 'Kitchen', 'Furnished', 'Gym', 'Pool', 'Pet friendly'],
        kitchen: ['Dishes', 'Utensils', 'Dishwasher', 'Refrigerator', 'Stove',
            'Microwave', 'Pots & pans', 'Coffee or Kettle', 'Toaster'],
        furniture: ['Bed', 'Workspace', 'Couch', 'Dining table', 'Bar table', 'Coffee table'],
        safeties: ['Smoke detector', 'CO detector', 'Fire extinguisher']
    }

    const [formData, setFormData] = useState({
            type: "",
            space: "",
            bedrooms: 1,
            beds: 1,
            bathrooms: 1,
            amenities: [],
            safeties: [],
    });

    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [selectedSafeties, setSelectedSafeties] = useState([]);
    const [showKitchen, setShowKitchen] = useState(false);
    const [showFurniture, setShowFurniture] = useState(false);
    const [showSafeties, setShowSafeties] = useState(false);

    const handleIncrement = (item) => {
        setFormData((prev) => ({
        ...prev,
        [item]: prev[item] + 1,
        }));
    };

    const handleDecrement = (item) => {
        setFormData((prev) => ({
        ...prev,
        [item]: Math.max(0, prev[item] - 1),
        }));
    };

    const handleClickOutside = (event) => {
        if (
            popupRef.current &&
            !popupRef.current.contains(event.target) &&
            !inputRef.current.contains(event.target)
        ) {
            setShowPopup(false);
        }
    };
        
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
/*
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
                const response = await fetch("http://localhost:4000/api/search/results", {
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
                            price: rental.fee,
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
*/
    return (
        <div className='bg-lease-bg bg-cover bg-opacity-25'>
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
                <div className='flex bg-white px-3 py-2 rounded-full text-sm text-slate-700'><FaFilter className='size-3 mr-1.5 mt-1'/> Filters</div>
            </button>
            {showPopup && (
                <div
                    ref={popupRef}
                    className="absolute left-[-440%] top-[90%] z-10 bg-white p-4 shadow-lg border rounded-xl w-[27rem]"
                >
                    <form /*onSubmit={handleSubmit}*/ className="font-nunito">
                        <h1 className='text-[rgb(42,98,112)] text-lg font-bold mb-2'>Search Filters</h1>

                        {/* Property Type Dropdown */}
                        <div>
                        <label className="mb-1 font-bold text-sm">Type of Place</label>
                        <div className="flex flex-wrap bg-white rounded-lg p-1 mb-1">
                            {slides.space.map((item) => (
                                <div
                                    key={item}
                                    onClick={() => {
                                        const isSelected = formData.amenities.includes(item)
                                        const updatedAmenities = isSelected 
                                            ? formData.amenities.filter(a => a !== item) // creates a new array with that item removed
                                            : [...formData.amenities, item] // creates a new array with the item added to the end
                                        setFormData(prev => ({ ...prev, amenities: updatedAmenities }));
                                        setSelectedAmenities(updatedAmenities);
                                    }}
                                    className={`border border-[rgb(232,240,232)] border-1 p-1.5 rounded-lg hover:text-white hover:bg-slate-700 cursor-pointer text-sm flex flex-col justify-center mr-1 mb-1
                                    ${selectedAmenities.includes(item) ? "border-teal-700 bg-slate-700 text-white shadow-md" : "border-[rgb(232,240,232)]"}`}
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                        </div>

                        {/* Price Range */}
                        <div className='w-2/3'>
                        <label className="block mb-1 font-bold text-sm">Price Range</label>
                        <div className='flex justify-between text-sm text-bold px-2 mb-4'>
                            <div className='mr-2'>
                                <labe>Minimum</labe>
                                <input
                                    className='border p-1 rounded-md focus:outline-gray-200'
                                >
                                </input>
                            </div>
                            <div>
                                <label>Maximum</label>
                                <input
                                    className='border p-1 rounded-md focus:outline-gray-200'
                                >
                                </input>
                            </div>
                        </div>
                        </div>

                        {/* Number of rooms and beds */}
                        <div className='w-2/3'>
                        <label className="block mb-4 font-bold text-sm">Number of Rooms and Beds</label>
                        <div className='px-2'>
                        {slides.rooms.map((item, index) => (
                            <div key={index} className="flex items-center justify-between mb-2">
                                <label className="mb-2 text-gray-700 capitalize text-sm">
                                    {item}
                                </label>
                                <div className="flex items-center space-x-1">
                                    <button
                                        type="button"
                                        onClick={() => handleDecrement(item)}
                                        className="w-6 h-6 text-sm font-bold text-gray-500 hover:bg-slate-700 hover:text-white border rounded-full"
                                    >
                                    −
                                    </button>

                                    <span className="w-8 text-center text-sm font-semibold text-slate-600">
                                    {formData[item]}
                                    </span>
                                    
                                    <button
                                        type="button"
                                        onClick={() => handleIncrement(item)}
                                        className="w-6 h-6 text-sm font-bold text-gray-500 hover:bg-slate-700 hover:text-white border rounded-full"
                                    >
                                    +
                                    </button>
                                </div>
                            </div>
                        ))}
                        </div>
                        </div>

                        {/* Amenities */}
                        <div>
                        <label className="block mb-1 font-bold text-sm">Amenities</label>
                        <div className="flex flex-wrap bg-white rounded-lg p-2 mb-2">
                            {slides.amenities.map((item) => (
                                <div
                                    key={item}
                                    onClick={() => {
                                        const isSelected = formData.amenities.includes(item)
                                        const updatedAmenities = isSelected 
                                            ? formData.amenities.filter(a => a !== item) // creates a new array with that item removed
                                            : [...formData.amenities, item] // creates a new array with the item added to the end
                                        setFormData(prev => ({ ...prev, amenities: updatedAmenities }));
                                        setSelectedAmenities(updatedAmenities);
                                    }}
                                    className={`border border-[rgb(232,240,232)] border-1 p-1.5 rounded-lg hover:text-white hover:bg-slate-700 cursor-pointer text-sm flex flex-col justify-center mr-1 mb-1
                                    ${selectedAmenities.includes(item) ? "border-teal-700 bg-slate-700 text-white shadow-md" : "border-[rgb(232,240,232)]"}`}
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                        </div>

                        {/* Kitchen */}
                        <button 
                            className="block mb-1 font-bold text-sm"
                            type="button"
                            onClick={() => setShowKitchen(!showKitchen)}
                        >
                            <div className='flex'>
                                {showKitchen ? <MdKeyboardArrowUp className='size-5'/> : <MdOutlineKeyboardArrowDown className='size-5'/>} Kitchen
                            </div>
                        </button>
                        {showKitchen && (
                        <div className="flex flex-wrap bg-white rounded-lg p-2 mb-2">
                            {slides.kitchen.map((item) => (
                                <div
                                    key={item}
                                    onClick={() => {
                                        const isSelected = formData.amenities.includes(item)
                                        const updatedAmenities = isSelected 
                                            ? formData.amenities.filter(a => a !== item) // creates a new array with that item removed
                                            : [...formData.amenities, item] // creates a new array with the item added to the end
                                        setFormData(prev => ({ ...prev, amenities: updatedAmenities }));
                                        setSelectedAmenities(updatedAmenities);
                                    }}
                                    className={`border border-[rgb(232,240,232)] border-1 p-1.5 rounded-lg hover:text-white hover:bg-slate-700 cursor-pointer text-sm flex flex-col justify-center mr-1 mb-1
                                    ${selectedAmenities.includes(item) ? "border-teal-700 bg-slate-700 text-white shadow-md" : "border-[rgb(232,240,232)]"}`}
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                        )}

                        {/* Furniture */}
                        <button 
                            className="block mb-1 font-bold text-sm"
                            type="button"
                            onClick={() => setShowFurniture(!showFurniture)}
                        >
                            <div className='flex'>
                                {showFurniture ? <MdKeyboardArrowUp className='size-5'/> : <MdOutlineKeyboardArrowDown className='size-5'/>} Furniture
                            </div>
                        </button>
                        {showFurniture && (
                        <div className="flex flex-wrap bg-white rounded-lg p-2 mb-2">
                            {slides.furniture.map((item) => (
                                <div
                                    key={item}
                                    onClick={() => {
                                        const isSelected = formData.amenities.includes(item)
                                        const updatedAmenities = isSelected 
                                            ? formData.amenities.filter(a => a !== item) // creates a new array with that item removed
                                            : [...formData.amenities, item] // creates a new array with the item added to the end
                                        setFormData(prev => ({ ...prev, amenities: updatedAmenities }));
                                        setSelectedAmenities(updatedAmenities);
                                    }}
                                    className={`border border-[rgb(232,240,232)] border-1 p-1.5 rounded-lg hover:text-white hover:bg-slate-700 cursor-pointer text-sm flex flex-col justify-center mr-1 mb-1
                                    ${selectedAmenities.includes(item) ? "border-teal-700 bg-slate-700 text-white shadow-md" : "border-[rgb(232,240,232)]"}`}
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                        )}

                        {/* Safeties */}
                        <button 
                            className="block mb-1 font-bold text-sm"
                            type="button"
                            onClick={() => setShowSafeties(!showSafeties)}
                        >
                            <div className='flex'>
                                {showSafeties ? <MdKeyboardArrowUp className='size-5'/> : <MdOutlineKeyboardArrowDown className='size-5'/>}Safety Features
                            </div>
                        </button>
                        {showSafeties && (
                        <div className="flex flex-wrap bg-white rounded-lg p-2 mb-2">
                            {slides.safeties.map((item) => (
                                <div
                                    key={item}
                                    onClick={() => {
                                        const isSelected = formData.safeties.includes(item)
                                        const updatedSafeties = isSelected 
                                            ? formData.safeties.filter(a => a !== item) // creates a new array with that item removed
                                            : [...formData.safeties, item] // creates a new array with the item added to the end
                                        setFormData(prev => ({ ...prev, safeties: updatedSafeties }));
                                        setSelectedSafeties(updatedSafeties);
                                    }}
                                    className={`border border-[rgb(232,240,232)] border-1 p-1.5 rounded-lg hover:text-white hover:bg-slate-700 cursor-pointer text-sm flex flex-col justify-center mr-1 mb-1
                                    ${selectedSafeties.includes(item) ? "border-teal-700 bg-slate-700 text-white shadow-md" : "border-[rgb(232,240,232)]"}`}
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                        )}

                        {/* Buttons */}
                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                //onClick={onClose}
                                className="px-2 py-1 border rounded text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-2 py-1 bg-[rgb(42,98,112)] text-white rounded hover:bg-gray-400 text-sm"
                            >
                                Apply Filters
                            </button>
                        </div>
                        </form>
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
                <h1 className='ml-14 text-xl my-2 text-slate-700 font-bold'>Search Results</h1>
                <div className="grid grid-cols-3 gap-x-4 mx-14">
                    {results.map((rental, index) => (
                        <NavLink to={`show/${rental.property_id}`} key={rental.property_id}>
                        <div key={index} className="flex flex-col items-center p-2 border rounded-xl bg-white shadow-md mb-4 text-slate-700">
                            <div className='relative w-full'>
                                <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" alt=""></img>
                                <div className="absolute top-4 left-4 bg-[rgb(250,112,99)] text-white text-sm font-semibold rounded-full px-3 py-1 shadow">
                                    ${rental.fee}
                                </div>
                                <div className='bg-gray-400 bg-opacity-80'>
                                    <h1 className="lg:text-xl md:text-sm font-bold mt-3 flex justify-center">{rental.title}</h1>
                                    <ul className="lg:text-lg md:text-sm list-none flex items-center">
                                        <li>{rental.bedrooms} bedrooms</li>
                                        <li>{rental.bathrooms} bathrooms</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        </NavLink>
                    ))}
                </div>
            </div>

            {/*Mobile View*/}
            
            
        </div>
    )
}

export default Rentals