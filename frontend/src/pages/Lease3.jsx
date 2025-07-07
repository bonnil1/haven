import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from "react";
import { GoogleMap, Autocomplete, Marker } from '@react-google-maps/api';
import { saveToSession, loadFromSession } from '../utils/sessionStorage';

const containerStyle = {
    width: '100%',
    height: '300px',
    borderRadius: '10px',
};
  
const center = {
    lat: 37.7749,
    lng: -122.4194,
};

function getAddressComponent(components, type) {
    const comp = components.find((c) => c.types.includes(type));
    return comp ? comp.long_name : '';
}

const Lease3 = () => {

    const [address, setAddress] = useState({
        streetAddress: '',
        unit: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
      });
    const [mapCenter, setMapCenter] = useState(center);
    const [markerPosition, setMarkerPosition] = useState(center);
    const autoCompleteRef = useRef(null);
    const navigate = useNavigate();

    const onPlaceChanged = () => {
        const place = autoCompleteRef.current.getPlace();
        if (!place?.geometry) return;

        const components = place.address_components;

        const streetNumber = getAddressComponent(components, 'street_number');
        const route = getAddressComponent(components, 'route');
        const streetAddress = [streetNumber, route].filter(Boolean).join(' ');

        const city = getAddressComponent(components, 'locality') || getAddressComponent(components, 'sublocality');
        const state = getAddressComponent(components, 'administrative_area_level_1');
        const zipCode = getAddressComponent(components, 'postal_code');
        const country = getAddressComponent(components, 'country');

        setAddress({
            streetAddress,
            city,
            state,
            zipCode,
            country,
        });

        const location = place.geometry.location;
        const newCenter = {
            lat: location.lat(),
            lng: location.lng(),
        };

        setMapCenter(newCenter);
        setMarkerPosition(newCenter);
    };

    const handleChange = (event) => {
        setAddress(prevState => {
            const updatedAddress = {...prevState,[event.target.name]: event.target.value};

            return updatedAddress;
        })
        console.log(address)
    }

    const slides = [
        {
            title: "Where is this place located?",
        },
        {
            title: "Confirm the address.",
        }
    ]

    const handleSubmit = async (event) => {

        event.preventDefault();
        console.log(address)

        try {
            const response = await fetch("http://localhost:4000/api/lease-3", {
                //"/api/lease-3"
                //"http://localhost:4000/api/lease-3"
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(address)
            });

            const data = await response.json();
            console.log(data);

            if (data.message === "Lease 3 created successfully!") {
                setMessage(data.message);
                navigate('/lease-4')
            } 

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const stored = loadFromSession('form3');
        if (stored) setAddress(stored);
        //console.log(stored)
    }, []);
    
    const handleNext = (e) => {
        e.preventDefault();
        saveToSession('form3', address);
        navigate('/lease-4');
    };

    return (
        <div className="flex justify-center font-nunito font-semibold text-slate-700 bg-lease-bg bg-cover bg-opacity-25">
        <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="relative w-10 flex flex-col items-center pt-10">
            <div className="absolute top-12 bottom-28 w-3 bg-white bg-opacity-70 rounded-md" />
            {slides.map((_, index) => (
                <div
                    key={index}
                    className="relative z-10 flex items-center justify-center w-10 h-10 mb-[27rem] bg-red-400 text-white text-xl rounded-full"
                >
                    {index + 5}
                </div>
            ))}
            </div>
        {/* Slides */}
        <form onSubmit={handleNext} className="flex flex-col gap-12 p-10">
            <div className="bg-white bg-opacity-70 p-10 pt-6 pb-0 rounded-lg shadow-md w-[42rem]">
                <h2 className="text-2xl font-semibold mb-1">Where is the place located?</h2>
                <h4 className="text-lg font-light mb-4">The address will be kept private until you confirm the reservation.</h4>
                <div className='mb-6'>
                    {/* fixes re-rendering problem from type=submit */}
                {typeof window !== 'undefined' && window.google && ( 
                <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={14}>
                    <Autocomplete onLoad={(ref) => (autoCompleteRef.current = ref)} onPlaceChanged={onPlaceChanged}>
                    <input
                        type="text"
                        placeholder="Search an address"
                        style={{
                            boxSizing: 'border-box',
                            border: '1px solid transparent',
                            width: '240px',
                            height: '40px',
                            padding: '0 12px',
                            borderRadius: '8px',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                            fontSize: '16px',
                            position: 'absolute',
                            left: '66%',
                            marginLeft: '-120px',
                            top: '15px',
                            zIndex: 5,
                        }}
                    />
                    </Autocomplete>
                    <Marker position={markerPosition} />
                </GoogleMap>
                )}
                </div>
   
            </div>

            <div className="bg-white bg-opacity-70 p-10 pt-6 pb-0 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-1">Confirm the address.</h2>
                <h4 className="text-lg font-light mb-4">Please check all details before we continue...</h4>
                <div className='rounded-lg bg-white p-4 mb-6'>
                    <div className='flex flex-col w-full border border-[rgb(232,240,232)] border-2 p-4 rounded-lg'>
                        <div className='flex flex-col'>
                            <label className='text-xs'>Street Address</label>
                            <input
                                className="bg-transparent focus:outline-none p-1 text-xs font-normal w-2/3" 
                                type="text" 
                                name="streetAddress"
                                value={address.streetAddress}
                                onChange={handleChange}
                                pattern="^[A-Za-z0-9 ]+$"
                            >
                            </input>
                        </div>
                        <hr className="my-2 border-green-700 border-opacity-20"/>
                        <div className='flex flex-col'>
                            <label className='text-xs'>Apt. / Suite / Unit</label>
                            <input
                                className="bg-transparent focus:outline-none p-1 text-xs font-normal w-2/3" 
                                type="text" 
                                name="unit"
                                value={address.unit || ""}
                                onChange={handleChange}
                                pattern="^[A-Za-z0-9 ]+$"
                            >
                            </input>
                        </div>
                        <hr className="my-2 border-green-700 border-opacity-30"/>
                        <div className='flex flex-col'>
                            <label className='text-xs'>City / Town</label>
                            <input
                                className="bg-transparent focus:outline-none p-1 text-xs font-normal w-2/3" 
                                type="text" 
                                name="city"
                                value={address.city}
                                onChange={handleChange}
                                pattern="^[A-Za-z ]+$"
                            >
                            </input>
                        </div>
                        <hr className="my-2 border-green-700 border-opacity-30"/>
                        <div className='flex flex-col'>
                            <label className='text-xs'>State / Territory</label>
                            <input
                                className="bg-transparent focus:outline-none p-1 text-xs font-normal w-2/3" 
                                type="text" 
                                name="state"
                                value={address.state}
                                onChange={handleChange}
                                pattern="^[A-Za-z ]+$"
                            >
                            </input>
                        </div>
                        <hr className="my-2 border-green-700 border-opacity-30"/>
                        <div className='flex flex-col'>
                            <label className='text-xs'>Zip Code</label>
                            <input
                                className="bg-transparent focus:outline-none p-1 text-xs font-normal w-2/3" 
                                type="text" 
                                name="zipCode"
                                value={address.zipCode}
                                onChange={handleChange}
                                pattern="^[0-9 ]+$"
                            >
                            </input>
                        </div>
                        <hr className="my-2 border-green-700 border-opacity-30"/>
                        <div className='flex flex-col'>
                            <label className='text-xs'>Country / Region</label>
                            <input
                                className="bg-transparent focus:outline-none p-1 text-xs font-normal w-2/3" 
                                type="text" 
                                name="country"
                                value={address.country}
                                onChange={handleChange}
                                pattern="^[A-Za-z ]+$"
                            >
                            </input>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex justify-between'>
                <button
                    className="text-white bg-[rgb(232,240,232)] bg-opacity-50 font-bold rounded-full w-1/4"
                >
                    <NavLink to="/lease-2">Back</NavLink>
                </button> 
                <button
                    className="text-[rgb(42,98,112)] bg-[rgb(232,240,232)] bg-opacity-50 font-bold rounded-full w-1/4"
                    type="submit"
                >
                {/* <NavLink to="/lease-4">Next</NavLink> */}
                Next
                </button>  
            </div>
        </form>     
        </div>
        </div>
    )
}

export default Lease3