import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { IoMdSettings } from "react-icons/io";
import { IoEnterOutline } from "react-icons/io5";

const ListingDashboard = () => {

    const firstname = localStorage.getItem("firstname")
    const lastname = localStorage.getItem("lastname")
    const user_id = localStorage.getItem("user_id")

    const [results, setResults] = useState([])

    useEffect(() => {
        const fetchListings = async () => {

            try {
                const response = await fetch("/api/property/all_listings", {
                    //"/api/property/all_listings"
                    //"http://localhost:4000/api/property/all_listings"
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({user_id})
                });

                const data = await response.json();
                console.log(data);

                if (data.message === "All listings for user returned successfully!") {
                    setResults(data.results)
                } 

            } catch (error) {
                console.error(error);
            }
        }
        fetchListings();
        }, [user_id])

  return (
    <div className='font-nunito text-slate-700'>
        <div className='grid grid-cols-[25%_75%]'>
            <div className='flex flex-col bg-gray-100 min-h-screen'>
            <div className='mx-8'>
                <h1 className='text-2xl font-medium mt-6 mb-5'>Listings Dashboard</h1>
                <div className='flex flex-col items-center bg-white rounded-lg shadow-md p-5 space-y-2 h-72'>
                    <img className='w-1/2 rounded-md' src="https://t3.ftcdn.net/jpg/10/24/11/58/360_F_1024115848_VTfuHjHj9UVVvrUOaDQqm2clMspgRnGs.jpg" alt="profile image"></img>
                    <h1 className='text-xl font-bold'>{firstname} {lastname}</h1>
                    <h1 className='text-xl text-[rgb(42,98,112)]'>Renter Profile</h1>
                    <div className='flex'>
                        <NavLink to="">
                            <IoMdSettings className='size-5 mr-8'/>
                        </NavLink>
                        <NavLink to="">
                            <IoEnterOutline className='size-5'/>
                        </NavLink>
                    </div>
                </div>
                <div className='flex flex-col bg-white rounded-lg shadow-md my-8 p-5'>
                    <h1 className='text-lg'> Safe and Secure subleasing starts here!</h1>
                    <hr className="my-2 border-green-700 border-opacity-30"/>
                    <h3 className='text-sm'>Haven is a mid-term rental platform designed for travel nurses, nomads, and professionals on assignment who need trusted housing for weeks to months at a time. Every listing is verified, payments are protected, and subleases are managed through the app-giving both renters and hosts peace of mind. With secure booking, transparent communication, and flexible options, Haven makes finding safe, reliable housing simple, so you can focus on work and feel at home wherever you go.</h3>
                </div>
            </div>    
            </div>
            <div className='bg-gray-100 min-h-screen'>
                <div className='flex flex-col bg-white rounded-lg shadow-md mx-8 mt-20 mb-5'>
                    <div className='flex justify-between pt-5 pb-2 px-5'>
                        <h1 className='text-2xl font-bold'>Listings</h1>
                        <NavLink to="/lease-1" className="rounded-lg bg-[rgb(250,112,99)] text-white py-1 px-1.5 mb-2">
                            + New Property Listing
                        </NavLink>
                    </div>
                    <hr className="border-green-700 border-opacity-30 mx-5"/>
                    <div className='flex flex-col p-5'>
                        <div>
                            {results.map((listing, index) => (
                                <div key={index} className="grid grid-cols-[25%_75%] gap-3 items-center rounded-xl shadow-md p-2">
                                    <div className='relative w-full'>
                                        <NavLink>
                                            <img className="h-auto max-w-full rounded-xl" src="https://www.avail.co/wp-content/uploads/2021/03/where-to-post-rental-listing-online-for-free.jpg" alt=""></img>
                                        </NavLink>
                                    </div>
                                    <div className='flex flex-col space-y-2 text-md p-4'>
                                        <h1 className='text-xl text-[rgb(42,98,112)] font-medium'>{listing.title}</h1>
                                        <h2 className=''>address goes here</h2>
                                        <h2>${listing.rent} monthly</h2>
                                        <h2>availability goes here</h2>
                                        <div className='flex flex-row justify-between'>
                                            <button className='text-sm text-slate-600 bg-[rgb(232,240,232)] rounded rounded-full py-1 px-2'>Edit Listing</button>
                                            <button className='text-sm text-slate-600 bg-[rgb(232,240,232)] rounded rounded-full py-1 px-4'>Delete</button>
                                            <button className='text-sm text-slate-600 bg-[rgb(232,240,232)] rounded rounded-full py-1 px-2'>View Inquiries</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ListingDashboard