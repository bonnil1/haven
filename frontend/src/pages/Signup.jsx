import React from 'react'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Signup = () => {

    const [formData, setFormData] = useState({
        FirstName: '',
        LastName: '',
        Email: ''
    })
    const [message, setMessage] = useState('')

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
            const response = await fetch("http://localhost:4000/new-user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.message === "User created successfully!") {
                setMessage(data.message);
            } else if (data.message === "Email already exists."){
                setMessage(data.message);
            }
        } catch (error) {
            console.error(error);
            setMessage("An error occurred while creating the user.");
        }
    };

  return (
    <div className='flex justify-center items-center mt-20'>
        <form onSubmit={handleSubmit} className='flex flex-col border border-slate-400 rounded-3xl w-5/6 sm:w-1/3 p-8 sm:p-16'>
            <h3 className='text-2xl text-slate-700 font-semibold mb-5'>Join Haven</h3>
            <div>
                <div className='flex flex-col mb-5'>
                    <label>First Name</label>
                    <input
                        className="border border-slate-300 focus:outline-slate-500 rounded-md p-1 mt-2" 
                        type="text" 
                        name="FirstName"
                        placeholder="First Name"
                        onChange={handleChange} 
                        pattern="^[A-Za-z ]+$"
                        required
                    >
                    </input>
                </div>
                <div className='flex flex-col mb-5'>
                    <label>Last Name</label>
                    <input
                        className="border border-slate-300 focus:outline-slate-500 rounded-md p-1 mt-2" 
                        type="text" 
                        name="LastName"
                        placeholder="Last Name"
                        onChange={handleChange} 
                        pattern="^[A-Za-z ]+$"
                        required
                    >
                    </input>
                </div>
                <div className='flex flex-col'>
                    <label>Email</label>
                    <input
                        className="border border-slate-300 focus:outline-slate-500 rounded-md p-1 mt-2"
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
                    className="bg-slate-700 hover:bg-slate-500 text-white py-2 border rounded-xl w-full mt-5"
                    type="submit"
                >
                    Continue
                </button>
                {message === "User created successfully!" && (
                    <h4 className='flex justify-center text-xs text-emerald-600 mt-2'>Please verify your email address.</h4>
                )}
                {message === "Email already exists." && (
                    <h4 className='flex justify-center text-xs text-emerald-600 mt-2'>An account with this email already exists. Please log in</h4>
                )}
            </div>    
            <h6 className='flex justify-center text-xs mt-2'>Already have an account? <NavLink to="/login" className="hover:text-teal-700 ml-1">Log In.</NavLink></h6>
        </form>
    </div>
)}

export default Signup