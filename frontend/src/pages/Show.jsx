import React from 'react'
import Search from '../components/Search'
import Filter from '../components/Filter';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import Inquiry from '../components/Inquiry';
import Booking from '../components/Booking';
import { FaFilter } from "react-icons/fa";
import { MdOutlineLocalLaundryService } from "react-icons/md";
import { GiWashingMachine } from "react-icons/gi";
import { FaWifi } from "react-icons/fa";
import { FaFire } from "react-icons/fa6";
import { FaRegSnowflake } from "react-icons/fa";
import { FaCar } from "react-icons/fa6";
import { ImTv } from "react-icons/im";
import { TbToolsKitchen3 } from "react-icons/tb";
import { FaCouch } from "react-icons/fa";
import { CgGym } from "react-icons/cg";
import { MdOutlinePool } from "react-icons/md";
import { FaPaw } from "react-icons/fa";
import { BiSolidFridge } from "react-icons/bi";
import { PiOven } from "react-icons/pi";
import { TbMicrowaveFilled } from "react-icons/tb";
import { GiCookingPot } from "react-icons/gi";
import { GiCoffeePot } from "react-icons/gi";
import { GiToaster } from "react-icons/gi";
import { FaBed } from "react-icons/fa";
import { MdOutlineTableRestaurant } from "react-icons/md";
import { GiDesk } from "react-icons/gi";
import { MdOutlineLocalBar } from "react-icons/md";
import { MdOutlineTableBar } from "react-icons/md";
import { LuAlarmSmoke } from "react-icons/lu";
import { GoAlertFill } from "react-icons/go";
import { FaFireExtinguisher } from "react-icons/fa6";

const containerStyle = {
    width: '80%',
    height: '400px',
    borderRadius: '15px',
};

const Show = () => {

    const { id } = useParams();
    const [results, setResults] = useState({})
    const [locations, setLocations] = useState("")

    const inputRef = useRef(null);
    const [showPopup, setShowPopup] = useState(false);
    const popupRef = useRef(null);
    const [activeInquiryIndex, setActiveInquiryIndex] = useState(false);
    const inquiryRef = useRef(null);
    const [activeBookingIndex, setActiveBookingIndex] = useState(false);
    const bookingRef = useRef(null);

    const [currentPhoto, setCurrentPhoto] = useState(0);

    const images = [
        "https://media.istockphoto.com/id/1293762741/photo/modern-living-room-interior-3d-render.jpg?s=612x612&w=0&k=20&c=iZ561ZIXOtPYGSzqlKUnLrliorreOYVz1pzu8WJmrnc=",
        "https://media.istockphoto.com/id/2207337994/photo/stylish-bedroom-interior-with-closet-and-wooden-panel-3d-rendering.jpg?s=612x612&w=0&k=20&c=poDNS1W428jOgUfDXeXWkOhxGSWwUqnTXOzXEusJcrs=",
        "https://buildingandinteriors.com/wp-content/uploads/2022/05/designcafe.com-2.webp",
        "https://media.istockphoto.com/id/2185699077/photo/modern-bathroom-interior-with-dual-sinks-and-elegant-decor.jpg?s=612x612&w=0&k=20&c=Ttj1KpgXdfMyvi0FXcjkm-d6Kpx5WlOJzeuS42v1WL4=",
    ];

    const slides = {
        amenities: [
            { label: 'In-unit laundry', value: 'IU_laundry', icon: <MdOutlineLocalLaundryService className='size-8 mb-1'/> },
            { label: 'Building laundry', value: 'B_laundry', icon: <GiWashingMachine className='size-8 mb-1'/> }, 
            { label: 'Wifi', value: 'wifi', icon: <FaWifi className='size-8 mb-1'/> }, 
            { label: 'Heater', value: 'heater', icon: <FaFire className='size-8 mb-1'/> },
            { label: 'Air conditioning', value: 'ac', icon: <FaRegSnowflake className='size-8 mb-1'/> },
            { label: 'Parking', value: 'parking', icon: <FaCar className='size-8 mb-1'/> },
            { label: 'TV', value: 'tv', icon: <ImTv className='size-8 mb-1'/> }, 
            { label: 'Kitchen', value: 'kitchen', icon: <TbToolsKitchen3 className='size-8 mb-1'/> },
            { label: 'Furnished', value: 'furnished', icon: <FaCouch className='size-8 mb-1'/> },
            { label: 'Gym', value: 'gym', icon: <CgGym className='size-8 mb-1'/> },
            { label: 'Pool', value: 'pool', icon: <MdOutlinePool className='size-8 mb-1'/> },
            { label: 'Pet friendly', value: 'pet_friendly', icon: <FaPaw className='size-8 mb-1'/> }
        ],
        kitchen: [
            { label: 'Stove', value: 'stove', icon: <PiOven className='size-8 mb-1'/>  }, 
            { label: 'Utensils', value: 'utensils', icon: <TbToolsKitchen3 className='size-8 mb-1'/> }, 
            { label: 'Dishwasher', value: 'dishwasher', icon: <MdOutlineLocalLaundryService className='size-8 mb-1'/> }, 
            { label: 'Refrigerator', value: 'fridge', icon: <BiSolidFridge className='size-8 mb-1'/> },
            { label: 'Oven', value: 'oven', icon: <PiOven className='size-8 mb-1'/> },
            { label: 'Microwave', value: 'microwave', icon: <TbMicrowaveFilled className='size-8 mb-1'/> },
            { label: 'Pots & pans', value: 'potpans', icon: <GiCookingPot className='size-8 mb-1'/> },
            { label: 'Coffee or Kettle', value: 'coffee', icon: <GiCoffeePot className='size-8 mb-1'/> },
            { label: 'Toaster', value: 'toaster', icon: <GiToaster className='size-8 mb-1'/> }
        ],
        furniture: [
            { label: 'Bed', value: 'bed', icon: <FaBed className='size-8 mb-1'/> },
            { label: 'Workspace', value: 'workspace', icon: <GiDesk className='size-8 mb-1'/> }, 
            { label: 'Couch', value: 'couch', icon: <FaCouch className='size-8 mb-1'/> },
            { label: 'Dining table', value: 'D_table', icon: <MdOutlineTableRestaurant className='size-8 mb-1'/>},
            { label: 'Bar table', value: 'B_table', icon: <MdOutlineLocalBar className='size-8 mb-1' /> },
            { label: 'Coffee table', value: 'C_table', icon: <MdOutlineTableBar className='size-8 mb-1'/> }
        ],
        safeties: [
            { label: 'Smoke detector', value: 'S_detector', icon: <LuAlarmSmoke className='size-8 mb-1'/> },
            { label: 'CO detector', value: 'CO_detector', icon: <GoAlertFill className='size-8 mb-1'/>},
            { label: 'Fire extinguisher', value: 'F_extinguisher', icon: <FaFireExtinguisher className='size-8 mb-1'/> }
        ]
    }

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

        if (
            bookingRef.current && 
            !bookingRef.current.contains(event.target) &&  
            !inputRef.current.contains(event.target) 
        ) {
            setActiveBookingIndex(false);
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
      <div className="grid grid-cols-2 grid-rows-1 gap-10 mx-28 mt-2">
        <div>
            {/* Current Image */}
            <div className="relative w-full h-96 overflow-hidden rounded-md shadow-md">
                <img
                    src={images[currentPhoto]}
                    alt={`Slide ${currentPhoto}`}
                    className="object-cover w-full h-full transition duration-500 ease-in-out"
                />
            </div>
            {/* Dots */}
            <div className="flex justify-center mt-4 space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPhoto(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                            currentPhoto === index ? "bg-white scale-110" : "bg-gray-300"
                        }`}
                    ></button>
                ))}
            </div>
        </div>
        
        <div className="">
            <div>
                {/*rental information */}
                <h2 className="text-2xl text-bold text-slate-800 mt-5 mb-2">{results.title}</h2>
                <h3 className="text-lg text-slate-700 mb-2">{results.bedrooms} bedrooms | {results.bathrooms} bathrooms </h3>

                {/*price information */}
                <div className="text-slate-700">
                    <h2 className="font-bold text-xl mt-3">Cost Breakdown</h2>
                    <h3>Base Rent: ${results.rent}</h3>

                    <h2 className="font-bold mt-3">Utilities</h2>
                    <h3>Electric Fee: ${results.electric_fee}</h3>
                    <h3>Water Fee: ${results.water_fee}</h3>
                    <h3 className='font-bold'>Total Price (pre-tax): ${results.rent + results.electric_fee + results.water_fee}</h3>
                    <div className='flex justify-between w-1/3'>
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
                            <Inquiry id={id}/>
                        </div>
                        )}

                        <button
                            ref={inputRef}
                            onClick={() => setActiveBookingIndex(true)}
                            className='px-4 py-1 text-md text-white bg-[rgb(42,98,112)] hover:bg-gray-800 border-[rgb(42,98,112)] rounded-lg mt-5'
                        >
                            Book
                        </button>
                        {activeBookingIndex && (
                        <div
                            ref={bookingRef}
                            className="fixed top-[80%] left-1/2 transform -translate-x-1/5 -translate-y-1/2 z-50 w-1/2 h-1/2"
                        >
                            <Booking id={id}/>
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className=" grid grid-cols-[6fr_1fr] ml-28 mt-5">
        <div>
          <div className="mt-5 space-y-1">
            {/* property info */}
            <h2 className="text-xl text-slate-800">Property Information</h2>
            <h3 className="text-md text-slate-700">{results.description}</h3>
          </div>
          <div className="mt-5 space-y-1">
            {/* house rules */}
            <h2 className="text-xl text-slate-800">House Rules</h2>
            <h3 className="text-md text-slate-700"></h3>
          </div>
          <div className="mt-5 space-y-1">
            {/* amenities info*/}
            {Object.entries(slides).map(([categoryName, items]) => (
                <div key={categoryName}>
                <h3 className="text-xl text-slate-800 capitalize mb-2">{categoryName}</h3>
                <div className="flex flex-wrap gap-4">
                    {items
                    .filter(item => results[item.value])
                    .map(item => (
                        <div key={item.value} className="flex flex-col items-center w-20 text-slate-700">
                        {item.icon}
                        <span className="text-sm text-slate-800 text-center">{item.label}</span>
                        </div>
                    ))}
                </div>
                </div>
            ))}
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
              <div className='grid grid-cols-3 gap-6 text-slate-700 p-5'>
                  <div className='bg-white rounded-lg shadow-md p-5 space-y-3'>
                        <img className='w-16 h-16 rounded-full' src="https://previews.123rf.com/images/jemastock/jemastock1712/jemastock171201820/91047468-man-face-smiling-cartoon-icon-vector-illustration-graphic-design.jpg" alt="profile image"></img>
                        <h1 className='text-md text-slate-700 font-semibold'>Logan Says:</h1>
                        <h3 className='text-md text-slate-600'>I really enjoyed my stay here! Clean rooms and convenient location!</h3>
                  </div>
                  <div className='bg-white rounded-lg shadow-md p-3 space-y-3'>
                        <img className='w-16 h-16 rounded-full' src="https://t4.ftcdn.net/jpg/13/33/01/65/360_F_1333016517_uLILkC27ci0CM2bnyJr4siUHBeZ8kdQl.jpg" alt="profile image"></img>
                        <h1 className='text-md text-slate-700 font-semibold'>Amber Says:</h1>
                        <h3 className='text-md text-slate-600'>I had a wonderful stay! The rooms were comfortable and I felt right at home.</h3>
                  </div>
                  <div className='bg-white rounded-lg shadow-md p-3 space-y-3'>
                        <img className='w-16 h-16 rounded-full' src="https://img.freepik.com/premium-photo/cartoon-girl-with-brown-hair-brown-shirt_731790-16347.jpg" alt="profile image"></img>
                        <h1 className='text-md text-slate-700 font-semibold'>Megan Says:</h1>
                        <h3 className='text-md text-slate-600'>I enjoyed my stay here and will be booking again.</h3>
                  </div>
              </div>
          </div>
        </div>

      </div>
      </div>

      {/*Mobile View*/}
      
    </div>
  )
}

export default Show