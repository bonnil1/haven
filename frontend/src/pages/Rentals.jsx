import React from 'react'
import Search from '../components/Search'
import { NavLink, useLocation } from 'react-router-dom'
import { useState, useRef, useEffect } from "react";
import { GoogleMap, Marker } from '@react-google-maps/api';
import { loadFromSession } from '../utils/sessionStorage';

const containerStyle = {
    width: '90%',
    height: '500px',
    borderRadius: '15px',
};

const Rentals = () => {

    const location = useLocation();
    const results = location.state?.results;

    if (!results) {
        return <p>No results loaded. Please search again.</p>;
    }

    const [search, setSearch] = useState({
            streetAddress: '',
            unit: '',
            city: '',
            state: '',
            zipCode: '',
            country: '',
    });

    {/* derive user entered destination from previous search page */}
    const destination = loadFromSession('search_dest');
    const center = destination
    const [mapCenter, setMapCenter] = useState(center);
    const [markerPosition, setMarkerPosition] = useState("");
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

        setSearch({
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

    /*seed data*/
    class Property {
        constructor(caption, bedrooms, bathrooms, price, address) {
            this.caption = caption
            this.bedrooms = bedrooms
            this.bathrooms = bathrooms
            this.price = price
            this.address = address
        }
    }

    var rentals = [
        new Property("Waikiki beach view", 2, 1, 2500, "2490 Kalakaua Avenue Honolulu, HI 96815"),
        new Property("Downtown central location", 1, 1, 2000, "2500 Kuhio Avenue Honolulu, HI 96815"),
        new Property("10 min walk from Waikiki beach", 1, 1, 2100, "400 Royal Hawaiian Avenue Honolulu, HI 96815"),
        new Property("Newly renovated 1 br", 1, 1, 2000, "2454 S Beretania St Honolulu, HI 96826"),
        new Property("Cozy studio", 0, 1, 1500, "744 Kapahulu Ave Honolulu, HI 96816"),
        new Property("Near campus, walkable", 3, 2, 3000, "2528 McCarthy Mall Honolulu, HI 96822")
    ]

    const [locations, setLocations] = useState([])

    useEffect(() => {
        const geocoder = new window.google.maps.Geocoder();
      
        Promise.all(
          rentals.map((rental) => {
            return new Promise((resolve, reject) => {
              geocoder.geocode({ address: rental.address }, (results, status) => {
                if (status === "OK" && results[0]) {
                  const location = results[0].geometry.location;
                  resolve({
                    position: {
                      lat: location.lat(),
                      lng: location.lng(),
                    },
                    address: rental.address,
                    price: rental.price,
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
    }, []);

    return (
        <div className='bg-lease-bg bg-cover bg-opacity-25'>
            {/*Search Bar*/}
            <div className='flex justify-center'>
                <div className='my-10'>
                    <Search />
                </div>
            </div>
            
            {/*Laptop View*/}
            <div className="hidden md:block">
                <div className='flex justify-center mb-6'>
                    {/* fixes re-rendering problem from type=submit */}
                    {typeof window !== 'undefined' && window.google && ( 

                        <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={14}>
                            {locations.map((loc, index) => (
                                <Marker
                                    key={index}
                                    position={loc.position}
                                    title={`$${loc.price}`}
                                />
                            ))}
                        </GoogleMap>

                    )}
                </div>
                <h1 className='ml-14 text-xl my-2 text-slate-700 font-bold'>Search Results</h1>
                <div className="grid grid-cols-3 gap-x-4 mx-14">
                    {rentals.map((rental, index) => (
                        <NavLink to="show">
                        <div key={index} className="flex flex-col items-center p-2 border rounded-xl bg-white shadow-md mb-4 text-slate-700">
                            <div className='relative w-full'>
                                <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" alt=""></img>
                                <div className="absolute top-4 left-4 bg-[rgb(250,112,99)] text-white text-sm font-semibold rounded-full px-3 py-1 shadow">
                                    ${rental.price}
                                </div>
                                <h1 className="lg:text-xl md:text-sm font-bold mt-3 flex justify-center">{rental.caption}</h1>
                                <ul className="lg:text-lg md:text-sm list-none flex flex-col items-center">
                                    <li>{rental.bedrooms} bedrooms</li>
                                    <li>{rental.bathrooms} bathrooms</li>
                                </ul>
                            </div>
                        </div>
                        </NavLink>
                    ))}
                </div>
            </div>

            {/*Mobile View*/}
            <div className="block md:hidden">
            <div className="grid grid-cols-1 ml-2 mr-2">
                {rentals.map((rental, i) => (
                    <NavLink to="/home/show">
                    <div key={i} className="flex flex-col items-center p-4 bg-white border rounded-lg shadow-md mb-4">
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
        </div>
    )
}

export default Rentals