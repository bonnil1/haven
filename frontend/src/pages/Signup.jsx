import React from 'react'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { RiLoader2Line } from "react-icons/ri";

const Signup = () => {

    const [formData, setFormData] = useState({
        FirstName: '',
        LastName: '',
        Email: ''
    })
    const [message, setMessage] = useState('')
    //can delete icon related code 
    const [icon, setIcon] = useState(false)

    const navigate = useNavigate();

    const handleChange = (event) => {
        setFormData(prevState => {
            const updatedFormData = {...prevState,[event.target.name]: event.target.value};

            //figure out how to set First and Last Name without local storage later
            localStorage.setItem("firstname", updatedFormData.FirstName)
            localStorage.setItem("lastname", updatedFormData.LastName)
            localStorage.setItem("email", updatedFormData.Email)

            return updatedFormData;
        })

        console.log(formData)
    }

    const handleSubmit = async (event) => {
        console.log("hitting handle submit");
        event.preventDefault();

        try {
            const response = await fetch("/api/new-user", {
                //"http://192.168.49.2:31560/api/new-user"
                //"/api/new-user"
                //"http://localhost:4000/api/new-user"
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.message === "User created successfully!") {
                setIcon(true)
                setMessage(data.message);
                navigate('/verification')
            } else if (data.message === "Email already exists."){
                setMessage(data.message);
            }
        } catch (error) {
            console.error(error);
            setMessage("An error occurred while creating the user.");
        }
    };

  return (
    <div>
        <div className='bg-teal-bg bg-cover bg-center h-screen'>
        {/* Laptop View*/}
        <div className="hidden md:block">
        <div className='flex justify-center items-center'>
            <form onSubmit={handleSubmit} className='flex flex-col border rounded-3xl shadow-xl bg-white mt-20 font-roboto w-5/6 sm:w-1/2 p-8 sm:p-16 sm:px-20'>
                <h3 className='text-3xl text-[rgb(48,92,112)] mb-5'>Join Haven</h3>
                <div>
                    <div className='flex flex-col mb-2'>
                        <div className='flex space-x-4'>
                        <div className='flex flex-col flex-1'>
                        <label className='text-[rgb(48,92,112)] font-bold text-sm'>First Name</label>
                            <input
                                className="border border-[rgb(120,161,169)] focus:outline-teal-700 text-sm placeholder-[rgb(154,186,192)] rounded-xl p-2 mt-1" 
                                type="text" 
                                name="FirstName"
                                placeholder="First Name"
                                onChange={handleChange} 
                                pattern="^[A-Za-z ]+$"
                                required
                            >
                            </input>
                        </div>
                        <div className='flex flex-col flex-1'>
                        <label className='text-slate-600 font-semibold text-sm'>Last Name</label>
                            <input
                                className="border border-[rgb(120,161,169)] focus:outline-teal-700 text-sm placeholder-[rgb(154,186,192)] rounded-xl p-2 mt-1" 
                                type="text" 
                                name="LastName"
                                placeholder="Last Name"
                                onChange={handleChange} 
                                pattern="^[A-Za-z ]+$"
                                required
                            >
                            </input>
                        </div>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-slate-600 font-semibold text-sm'>Email</label>
                        <input
                            className="border border-[rgb(120,161,169)] focus:outline-teal-700 text-sm placeholder-[rgb(154,186,192)] rounded-xl p-2 mt-1"
                            type="email" 
                            name="Email"
                            placeholder="Example@email.com"
                            onChange={handleChange} 
                            title='Example@email.com'
                            pattern="^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z]{2,}$"
                            required
                        >
                        </input>
                    </div>
                    <button
                        className="bg-[rgb(42,98,112)] hover:bg-teal-900 text-white py-2 border rounded-xl w-full mt-5"
                        type="submit"
                    >
                        Continue
                    </button>
                    {icon && (
                        <h4 className='flex justify-center mt-2'><RiLoader2Line className='size-16 text-slate-600'/></h4>
                    )}
                    {message === "Email already exists." && (
                        <h4 className='flex justify-center text-xs text-emerald-600 mt-2'>An account with this email already exists. Please log in</h4>
                    )}
                </div>    
                <h6 className='flex justify-center text-xs mt-2'>Already have an account? <NavLink to="/login" className="text-[rgb(42,98,112)] font-bold hover:text-teal-700 ml-1">Log In.</NavLink></h6>
                <div className="flex items-center justify-center space-x-4 w-full mt-5">
                    <div className="flex-grow border-t border-[rgb(42,98,112)]"></div>
                    <span className="text-slate-700 text-lg font-medium">or sign up with</span>
                    <div className="flex-grow border-t border-[rgb(42,98,112)]"></div>
                </div>
                <div className='flex justify-between mt-7'>
                    <button onClick={() => googlelogin()} className='border border-[rgb(209,224,205)] rounded-md p-5 sm:px-10'><FcGoogle className='size-10'/></button>
                    <button className='border border-[rgb(209,224,205)] rounded-md p-5 sm:px-10'><FaFacebook className='size-10 text-blue-600'/></button>
                    <button className='border border-[rgb(209,224,205)] rounded-md p-5 sm:px-10'><FaApple className='size-10'/></button>
                    <button className='border border-[rgb(209,224,205)] rounded-md p-5 sm:px-10'><FaLinkedin className='size-10 text-sky-700'/></button>
                </div>
            </form>
        </div>
        </div>

        {/* Mobile View */}
        <div className="block md:hidden">
        <div className='flex justify-center items-center'>
            <form onSubmit={handleSubmit} className='flex flex-col border rounded-3xl shadow-xl bg-white mt-20 font-roboto w-5/6 sm:w-1/2 p-8 sm:p-16 sm:px-20'>
                <h3 className='text-3xl text-[rgb(48,92,112)] mb-5'>Join Haven</h3>
                <div>
                    <div className='flex flex-col mb-3'>
                        <label className='text-[rgb(48,92,112)] font-bold text-sm'>First Name</label>
                        <input
                            className="border border-[rgb(120,161,169)] focus:outline-teal-700 text-sm placeholder-[rgb(154,186,192)] rounded-xl p-2 mt-1" 
                            type="text" 
                            name="FirstName"
                            placeholder="First Name"
                            onChange={handleChange} 
                            pattern="^[A-Za-z ]+$"
                            required
                        >
                        </input>
                    </div>
                    <div className='flex flex-col mb-3'>
                        <label className='text-slate-600 font-semibold text-sm'>Last Name</label>
                        <input
                            className="border border-[rgb(120,161,169)] focus:outline-teal-700 text-sm placeholder-[rgb(154,186,192)] rounded-xl p-2 mt-1" 
                            type="text" 
                            name="LastName"
                            placeholder="Last Name"
                            onChange={handleChange} 
                            pattern="^[A-Za-z ]+$"
                            required
                        >
                        </input>
                    </div>
                    <div className='flex flex-col mb-3'>
                        <label className='text-slate-600 font-semibold text-sm'>Email</label>
                        <input
                            className="border border-[rgb(120,161,169)] focus:outline-teal-700 text-sm placeholder-[rgb(154,186,192)] rounded-xl p-2 mt-1"
                            type="email" 
                            name="Email"
                            placeholder="Example@email.com"
                            onChange={handleChange} 
                            title='Example@email.com'
                            pattern="^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z]{2,}$"
                            required
                        >
                        </input>
                    </div>
                    <button
                        className="bg-[rgb(42,98,112)] hover:bg-teal-900 text-white py-2 border rounded-xl w-full mt-5"
                        type="submit"
                    >
                        Continue
                    </button>
                    {icon && (
                        <h4 className='flex justify-center mt-2'><RiLoader2Line className='size-16 text-slate-600'/></h4>
                    )}
                    {message === "Email already exists." && (
                        <h4 className='flex justify-center text-xs text-emerald-600 mt-2'>An account with this email already exists. Please log in</h4>
                    )}
                </div>    
                <h6 className='flex justify-center text-xs mt-2'>Already have an account? <NavLink to="/login" className="text-[rgb(42,98,112)] font-bold hover:text-teal-700 ml-1">Log In.</NavLink></h6>
            </form>
        </div>
        </div>
        </div>
    </div>
)}

export default Signup