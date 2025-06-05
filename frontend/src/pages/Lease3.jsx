import React from 'react'
import { NavLink } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";
import { GoogleMap, LoadScript, Autocomplete, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '300px',
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

    const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
    const [address, setAddress] = useState({
        streetAddress: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
      });
    const [mapCenter, setMapCenter] = useState(center);
    const [markerPosition, setMarkerPosition] = useState(center);
    const autoCompleteRef = useRef(null);

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

    const handleSubmit = async (e) => {

    }

    const slides = [
        {
            title: "Where is this place located?",
        },
        {
            title: "Confirm the address.",
        }
    ]

    return (
        <div className="flex justify-center font-nunito font-semibold text-slate-700 bg-lease-bg bg-cover bg-opacity-25">
        <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="relative w-10 flex flex-col items-center">
            <div className="absolute top-24 bottom-0 w-3 bg-white bg-opacity-70"/>
            {slides.map((_, index) => (
            <div key={index} className="relative z-10 flex items-center justify-center w-10 h-10 mt-16 mb-80 bg-red-400 text-white text-xl rounded-full">
                {index + 5}
            </div>
            ))}
            </div>
        {/* Slides */}
        <div className="flex flex-col gap-12 p-10">
            <div className="bg-white bg-opacity-70 p-10 pt-6 pb-0 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-1">Where is the place located?</h2>
                <h4 className="text-lg font-light mb-4">The address will be kept private until you confirm the reservation.</h4>
                <div className='mb-6'>
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
                        borderRadius: '4px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                        fontSize: '16px',
                        position: 'absolute',
                        left: '66%',
                        marginLeft: '-120px',
                        top: '10px',
                        zIndex: 5,
                        }}
                    />
                    </Autocomplete>
                    <Marker position={markerPosition} />
                </GoogleMap>
                </div>
   
            </div>

            <div className="bg-white bg-opacity-70 p-10 pt-6 pb-0 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-1">Confirm the address.</h2>
                <h4 className="text-lg font-light mb-4">Please check all details before we continue...</h4>
                <form onSubmit={handleSubmit} className='border border-slate-300 rounded-lg bg-grey-100 p-5 mb-6'>
                    <div className='flex flex-col w-full'>
                        <div className='flex flex-col'>
                            <label className='text-xs'>Street Address</label>
                            <input
                                className="bg-transparent focus:outline-none p-1 text-xs font-normal w-2/3" 
                                type="text" 
                                name="street_address"
                                value={address.streetAddress}
                                pattern="^[A-Za-z0-9 ]+$"
                                //readOnly
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
                                //value={lastname}
                                pattern="^[A-Za-z0-9 ]+$"
                                //readOnly
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
                                pattern="^[A-Za-z ]+$"
                                //readOnly
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
                                pattern="^[A-Za-z ]+$"
                                //readOnly
                            >
                            </input>
                        </div>
                        <hr className="my-2 border-green-700 border-opacity-30"/>
                        <div className='flex flex-col'>
                            <label className='text-xs'>Zip Code</label>
                            <input
                                className="bg-transparent focus:outline-none p-1 text-xs font-normal w-2/3" 
                                type="text" 
                                name="zip"
                                value={address.zipCode}
                                pattern="^[0-9 ]+$"
                                //readOnly
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
                                pattern="^[A-Za-z ]+$"
                                //readOnly
                            >
                            </input>
                        </div>
                    </div>
                </form>
            </div>

            <div className='flex justify-end'>
                <button
                    className="text-white bg-[rgb(232,240,232)] bg-opacity-50 font-bold rounded-full w-1/4"
                >
                <NavLink to="/lease-4">Next</NavLink> 
                </button>  
            </div>
        </div>     
        </div>
        </div>
    )
}

export default Lease3

{/*
    
    const autoCompleteRef = useRef(null);
    const [mapUrl, setMapUrl] = useState('');
    const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

    useEffect(() => {
        const el = autoCompleteRef.current;
        
        if (!el) return;
        
        const handlePlaceChange = (e) => {
            const place = e.target.getPlace?.();
            const address = place?.formatted_address || place?.description || place?.name;
            console.log(address)

            if (address) {
                const encodeAddress = encodeURIComponent(address);
                setMapUrl(`https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${encodeAddress}`);
            }
            };
            
            el.addEventListener('gmp-placechange', handlePlaceChange);

            return () => {
                el.removeEventListener('gmp-placechange', handlePlaceChange);
            };
    }, [API_KEY]);

    <div className="border border-gray-300 rounded-md p-2 bg-transparent focus:outline-none mb-6">
                    <gmp-place-autocomplete
                        ref={autoCompleteRef}
                    ></gmp-place-autocomplete>
                </div>
                {mapUrl && (
                    <div style={{ marginTop: '20px', height: '400px' }}>
                    <iframe
                        title="Google Map"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        src={mapUrl}
                    ></iframe>
                    </div>
                )}
*/}