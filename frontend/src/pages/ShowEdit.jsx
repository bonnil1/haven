import React from 'react'
import Availability from '../components/Availability';
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
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

const mapFlatToNestedFormData = (flat) => ({
  title: flat.title || '',
  description: flat.description || '',
  bedrooms: flat.bedrooms || 0,
  bathrooms: flat.bathrooms || 0,
  rent: flat.rent || '',
  electric_fee: flat.electric_fee || '',
  water_fee: flat.water_fee || '',
  street_address: flat.street_address || '',
  city: flat.city || '',
  state: flat.state || '',
  postal_code: flat.postal_code || '',
  country: flat.country || '',
  rules: flat.rules || '',

  amenities: {
        IU_laundry: Boolean(flat.IU_laundry),
        B_laundry: Boolean(flat.B_laundry),
        wifi: Boolean(flat.wifi),
        heater: Boolean(flat.heater),
        ac: Boolean(flat.ac),
        parking: Boolean(flat.parking),
        tv: Boolean(flat.tv),
        kitchen: Boolean(flat.kitchen),
        furnished: Boolean(flat.furnished),
        gym: Boolean(flat.gym),
        pool: Boolean(flat.pool),
        pet_friendly: Boolean(flat.pet_friendly),
  },
  kitchen: {
        stove: Boolean(flat.stove),
        utensils: Boolean(flat.utensils),
        dishwasher: Boolean(flat.dishwasher),
        fridge: Boolean(flat.fridge),
        oven: Boolean(flat.oven),
        microwave: Boolean(flat.microwave),
        potpans: Boolean(flat.potpans),
        coffee: Boolean(flat.coffee),
        toaster: Boolean(flat.toaster),
  },
  furniture: {
        bed: Boolean(flat.bed),
        workspace: Boolean(flat.workspace),
        couch: Boolean(flat.couch),
        D_table: Boolean(flat.D_table),
        B_table: Boolean(flat.B_table),
        C_table: Boolean(flat.C_table),
  },
  safeties: {
        S_detector: Boolean(flat.S_detector),
        CO_detector: Boolean(flat.CO_detector),
        F_extinguisher: Boolean(flat.F_extinguisher),
  }
});

const ShowEdit = () => {

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        bedrooms: 0,
        bathrooms: 0,
        rent: '',
        electric_fee: '',
        water_fee: '',
        street_address: '',
        city: '',
        state: '',
        postal_code: '',
        country: '',
        amenities: {
            IU_laundry: false,
            B_laundry: false,
            wifi: false,
            heater: false,
            ac: false,
            parking: false,
            tv: false,
            kitchen: false,
            furnished: false,
            gym: false,
            pool: false,
            pet_friendly: false
        },
        kitchen: {
            stove: false,
            utensils: false,
            dishwasher: false,
            fridge: false,
            oven: false,
            microwave: false,
            potpans: false,
            coffee: false,
            toaster: false
        },
        furniture: {
            bed: false,
            workspace: false,
            couch: false,
            D_table: false,
            B_table: false,
            C_table: false
        },
        safeties: {
            S_detector: false,
            CO_detector: false,
            F_extinguisher: false
        },
        availability: []
    })

    const { id } = useParams();

    const navigate = useNavigate();
    const inputRef = useRef(null);
    const [activeAvailIndex, setActiveAvailIndex] = useState(false);
    const availRef = useRef(null);

    const [photos, setPhotos] = useState([
        {
            id: 1,
            preview: "https://media.istockphoto.com/id/1293762741/photo/modern-living-room-interior-3d-render.jpg?s=612x612&w=0&k=20&c=iZ561ZIXOtPYGSzqlKUnLrliorreOYVz1pzu8WJmrnc=",
        },
        {
            id: 2,
            preview: "https://media.istockphoto.com/id/2207337994/photo/stylish-bedroom-interior-with-closet-and-wooden-panel-3d-rendering.jpg?s=612x612&w=0&k=20&c=poDNS1W428jOgUfDXeXWkOhxGSWwUqnTXOzXEusJcrs=",
        },
    ]);

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
                    const propertyData = data.results.property;
                    const availability = data.results.availability;
                    const formattedAvailability = availability.map((item) => ({
                        id: uuidv4(),
                        startDate: new Date(item.start_date || item.startDate),
                        endDate: new Date(item.end_date || item.endDate)
                    }))

                    const nestedFormData = mapFlatToNestedFormData(propertyData);
                    nestedFormData.availability = formattedAvailability;

                    setFormData(nestedFormData);
                } 

            } catch (error) {
                console.error(error);
            }
        };

        fetchListing();
    }, [id])

    const handleClickOutside = (event) => {
        if (
            availRef.current && 
            !availRef.current.contains(event.target) &&  
            !inputRef.current.contains(event.target) 
        ) {
            setActiveAvailIndex(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleValue = (category, value) => {
        setFormData((prev) => ({
            ...prev,
            [category]: {
                ...prev[category],
                [value]: !prev[category][value],
            },
        }));
    };

    const renderCategory = (title, category) => (
        <div className='ml-2'>
            <div className="grid grid-cols-3 gap-2 bg-white rounded-lg p-3 mb-6">
            {slides[category].map((item) => {
                const isSelected = formData[category][item.value];
                return (
                <div
                    key={item.value}
                    onClick={() => toggleValue(category, item.value)}
                    className={`flex flex-col items-center border border-[rgb(232,240,232)] border-1 p-3 rounded-lg hover:text-white hover:bg-slate-600 cursor-pointer text-sm flex flex-col justify-center
                    ${isSelected ? "bg-slate-600 text-white shadow-md" : "border-[rgb(232,240,232)]"}`}
                >
                    {item.icon}{item.label} 
                </div>
                );
            })}
            </div>
        </div>
    );

    const handlePhotoChange = (e) => {
        const files = Array.from(e.target.files);

        const newPhotos = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
            id: uuidv4(),
        }));

        setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]) 
    }

    const handleRemovePhoto = (id) => {
        setPhotos((prevPhotos) => {
            const updated = prevPhotos.filter((photo) => photo.id !== id)

            const removedPhoto = prevPhotos.find((photo) => photo.id === id)

            if (removedPhoto) {
                URL.revokeObjectURL(removedPhoto.preview);
            }

            return updated;
        })
    }

    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const droppedFiles = event.dataTransfer.files;

        if (droppedFiles && droppedFiles.length > 0) {
            const files = Array.from(droppedFiles);

            const newPhotos = files.map((file) => ({
                file,
                preview: URL.createObjectURL(file),
                id: uuidv4(),
            }));

            setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleChange = (event) => {
        setFormData(prevState => {
            const updatedFormData = {...prevState,[event.target.name]: event.target.value};

            return updatedFormData;
        })
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formattedAvailability = formData.availability.map(item => ({
            startDate: item.startDate ? item.startDate.toISOString().split('T')[0] : null,
            endDate: item.endDate ? item.endDate.toISOString().split('T')[0] : null
        }));

        const payload = {
            ...formData,
            availability: formattedAvailability
        };
        
        console.log(payload)

        try {
            const response = await fetch(`/api/property/edit/${id}`, {
                //`/api/property/edit/${id}`
                //`http://localhost:4000/api/property/edit/${id}`
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (data.message === "Listing updated successfully!") {
                console.log("Listing editted successfully!!!")
                navigate('/listing-dashboard')
            } 
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="bg-lease-bg bg-cover bg-opacity-25 font-roboto min-h-screen p-10">

        <div className="hidden md:block">
        <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 grid-rows-1 gap-8 mx-32 mt-2 w-full">
            <div>
                {/* Edit Images */}
                <div className="flex flex-col justify-center space-x-2">
                    <div className={`w-full h-8 transition-all duration-500 ease-in-out overflow-hidden ${photos.length > 0 ? "h-16" : "aspect-[3/1]"}`}
                        onDrop={handleDrop} onDragOver={handleDragOver}
                        >
                        <label
                            htmlFor="file-upload"
                            className="w-full h-full flex items-center justify-center
                            text-lg font-sm text-slate-700 rounded-md bg-white
                            hover:cursor-pointer hover:bg-[rgb(232,240,232)]"
                        >
                            📁 Upload more images
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handlePhotoChange}
                            className="hidden"
                        />
                    </div>

                    {photos.length > 0 && (
                        <div className="grid grid-cols-3 gap-2 mt-2">
                        {photos.map((photo) => (
                            <div key={photo.id} className="relative group">
                                <img
                                    src={photo.preview}
                                    alt="Preview"
                                    className="w-full h-40 object-cover rounded border"
                                />
                                <button
                                    onClick={() => handleRemovePhoto(photo.id)}
                                    className="absolute top-2 right-2 bg-gray-400 text-white rounded-full py-1 px-2 text-xs opacity-0 group-hover:opacity-100 transition"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                        </div>
                    )}
                </div>
            </div>
            
            <div>
                <div className='flex flex-col space-y-1 text-slate-700'>
                    {/* rental information */}
                    <label className='font-bold text-lg'>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="border rounded-lg p-1 w-1/2 text-sm text-slate-700 focus:outline-slate-300"
                    />
                    <label className='font-bold text-lg'>Bedrooms / Bathrooms</label>
                    <div className='flex mb-2 w-1/2'>    
                        <input
                            type="text"
                            name="bedrooms"
                            value={formData.bedrooms}
                            onChange={handleChange}
                            min="0"
                            className="border rounded-lg p-1 w-full text-sm text-slate-700 focus:outline-slate-300 mr-2"
                        />

                        <input
                            type="text"
                            name="bathrooms"
                            value={formData.bathrooms}
                            onChange={handleChange}
                            min="0"
                            className="border rounded-lg p-1 w-full text-sm text-slate-700 focus:outline-slate-300 ml-2"
                        />
                    </div>

                    {/* price information */}
                    <div>
                        <h2 className="font-bold text-lg mt-3">Cost Breakdown</h2>
                        <div className='flex w-1/2'>
                            <span className='text-md w-1/3'>Base Rent: $</span>
                            <input
                                type="text"
                                name="rent"
                                value={formData.rent}
                                onChange={handleChange}
                                pattern="^[0-9 ]+$"
                                min="0"
                                className="border rounded-lg p-1 w-1/2 text-sm text-slate-700 focus:outline-slate-300 ml-2"
                            />
                        </div>
                        <h2 className="font-bold text-md">Utilities</h2>
                        <div className='flex w-1/2 mb-2'>
                            <span className='text-md w-1/3'>Electric: $</span>
                            <input
                                type="text"
                                name="electric_fee"
                                value={formData.electric_fee}
                                onChange={handleChange}
                                pattern="^[0-9 ]+$"
                                min="0"
                                className="border rounded-lg p-1 w-1/2 text-sm text-slate-700 focus:outline-slate-300 ml-2"
                            />
                        </div>
                        <div className='flex w-1/2'>
                            <span className='text-md w-1/3'>Water: $</span>
                            <input
                                type="text"
                                name="water_fee"
                                value={formData.water_fee}
                                onChange={handleChange}
                                pattern="^[0-9 ]+$"
                                min="0"
                                className="border rounded-lg p-1 w-1/2 text-sm text-slate-700 focus:outline-slate-300 ml-2"
                            />
                        </div>
                        <h3 className='font-bold mt-2'>Total Price (pre-tax): ${Number(formData.rent) + Number(formData.electric_fee) + Number(formData.water_fee)}</h3>
                        <div className='flex justify-between w-1/3'>
                            {/* available dates */}
                            <button
                                type="button"
                                ref={inputRef}
                                onClick={() => setActiveAvailIndex(true)}
                                className='px-4 py-1 text-md text-white bg-[rgb(42,98,112)] hover:bg-gray-800 border-[rgb(42,98,112)] rounded-lg mt-3'
                            >
                                Edit Availability
                            </button>
                            {activeAvailIndex && (
                                <div
                                    ref={availRef}
                                    className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-1/2 h-1/2"
                                >
                                    <Availability id={id} availability={formData.availability} setAvailability={(updatedRanges) =>
                                        setFormData(prev => ({ ...prev, availability: updatedRanges }))
                                    }/>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className=" grid grid-cols-[6fr_1fr] ml-32">
            <div>
                <div className="mt-5 space-y-1">
                    {/* property info */}
                    <h2 className="text-xl text-slate-800">Property Information</h2>
                    <textarea
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows='6'
                        className="border rounded-lg p-1 w-full text-md text-slate-700 focus:outline-slate-300 ml-2"
                    />
                </div>
                <div className="mt-5 space-y-1">
                    {/* house rules */}
                    <h2 className="text-xl text-slate-800">House Rules</h2>
                    <textarea
                        type="text"
                        name="rules"
                        //value={formData.rules}
                        onChange={handleChange}
                        rows='6'
                        className="border rounded-lg p-1 w-full text-md text-slate-700 focus:outline-slate-300 ml-2"
                    />
                </div>
                <div className="mt-5 space-y-1">
                    {/* amenities info*/}
                    <h2 className="text-xl text-slate-800">Amenities</h2>
                        {renderCategory("Amenities", "amenities")}
                    <h2 className="text-xl text-slate-800">Kitchen</h2>
                        {renderCategory("Kitchen", "kitchen")}
                    <h2 className="text-xl text-slate-800">Furniture</h2>
                        {renderCategory("Furniture", "furniture")}
                    <h2 className="text-xl text-slate-800">Safeties</h2>
                        {renderCategory("Safety Features", "safeties")}
                </div>
                <div className="mt-5 ml-2 text-slate-800">
                    <h2 className="text-xl mb-2">Confirm Address</h2>
                    <div className='flex flex-col bg-white w-full border border-[rgb(232,240,232)]space-y-1 p-2 rounded-lg'>
                        <div className='flex flex-col'>
                            <label className='text-xs'>Street Address</label>
                            <input
                                className="bg-transparent focus:outline-none p-1 text-xs font-normal w-2/3" 
                                type="text" 
                                name="street_address"
                                value={formData.street_address}
                                onChange={handleChange}
                                pattern="^[A-Za-z0-9 ]+$"
                            >
                            </input>
                        </div>
                        <hr className="border-green-700 border-opacity-30 mb-1"/>
                        <div className='flex flex-col'>
                            <label className='text-xs'>Apt. / Suite / Unit</label>
                            <input
                                className="bg-transparent focus:outline-none p-1 text-xs font-normal w-2/3" 
                                type="text" 
                                name="extra_info"
                                value={formData.extra_info || ""}
                                onChange={handleChange}
                                pattern="^[A-Za-z0-9 ]+$"
                            >
                            </input>
                        </div>
                        <hr className="border-green-700 border-opacity-30 mb-1"/>
                        <div className='flex flex-col'>
                            <label className='text-xs'>City / Town</label>
                            <input
                                className="bg-transparent focus:outline-none p-1 text-xs font-normal w-2/3" 
                                type="text" 
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                pattern="^[A-Za-z ]+$"
                            >
                            </input>
                        </div>
                        <hr className="border-green-700 border-opacity-30 mb-1"/>
                        <div className='flex flex-col'>
                            <label className='text-xs'>State / Territory</label>
                            <input
                                className="bg-transparent focus:outline-none p-1 text-xs font-normal w-2/3" 
                                type="text" 
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                pattern="^[A-Za-z ]+$"
                            >
                            </input>
                        </div>
                        <hr className="border-green-700 border-opacity-30 mb-1"/>
                        <div className='flex flex-col'>
                            <label className='text-xs'>Zip Code</label>
                            <input
                                className="bg-transparent focus:outline-none p-1 text-xs font-normal w-2/3" 
                                type="text" 
                                name="postal_code"
                                value={formData.postal_code}
                                onChange={handleChange}
                                pattern="^[0-9 ]+$"
                            >
                            </input>
                        </div>
                        <hr className="border-green-700 border-opacity-30 mb-1"/>
                        <div className='flex flex-col'>
                            <label className='text-xs'>Country / Region</label>
                            <input
                                className="bg-transparent focus:outline-none p-1 text-xs font-normal w-2/3" 
                                type="text" 
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                pattern="^[A-Za-z ]+$"
                            >
                            </input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='flex justify-center'>
            <button type="submit" className="rounded-lg bg-[rgb(250,112,99)] text-white py-1 px-1.5 mt-5">
                Save Changes
            </button>
        </div>
        </form>  
        </div>
        </div>
    )
}

export default ShowEdit