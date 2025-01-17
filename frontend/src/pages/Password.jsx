import React from 'react'
import { useState, useEffect } from 'react';
import { FiEye, FiEyeOff } from "react-icons/fi";
import { NavLink, useNavigate } from 'react-router-dom'

const Password = () => {

    const [email, setEmail] = useState('');
    const [viewpw, setViewpw] = useState(false);
    const [viewpw2, setViewpw2] = useState(false);

    // Extract email from URL query params
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const emailFromUrl = params.get('email');
        
        if (emailFromUrl) {
            setEmail(emailFromUrl);
        }
    }, []);

    const togglePassword = () => {
        setViewpw(prevState => !prevState)
    }

    const togglePassword2 = () => {
        setViewpw2(prevState => !prevState)
    }

    const navigate = useNavigate();

    const handleContinue = () => {
        navigate('/signup/pw/profile');
    };

  return (
    <div>
        <div className='flex justify-center items-center mt-20'>
        <form className='flex flex-col border border-slate-400 rounded-3xl w-5/6 sm:w-1/3 p-8 sm:p-16'>
            <h3 className='text-2xl text-slate-700 font-semibold mb-5'>Create Password</h3>
            <div>
                <div className='flex flex-col mb-5'>
                    <label>Email</label>
                    <input
                        className="border border-slate-300 focus:outline-slate-500 rounded-md p-1 mt-2"
                        type="email" 
                        name="Email"
                        value={email}
                        disabled
                        required
                    >
                    </input>
                </div>
                <div className='flex flex-col'>
                    <label>Password</label>
                    <input
                        className="border border-slate-300 focus:outline-slate-500 rounded-md p-1 mt-2" 
                        type={viewpw ? 'text' : 'password'}
                        pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*[;:",`]).{8,}'
                        title='The password must contain an upper and lower case letter, a number, and be 8 characters long.'
                        name="Password"
                        placeholder='Enter password.'
                        required
                    >
                    </input>
                    <button type="button" onClick={togglePassword} className='absolute ml-80 mt-10'>
                        {viewpw ? (<FiEyeOff className="h-5 w-5" />) : (<FiEye className="h-5 w-5" />)}
                    </button>
                </div>
                <div className='flex flex-col mt-5'>
                    <label>Confirm Password</label>
                    <input
                        className="border border-slate-300 focus:outline-slate-500 rounded-md p-1 mt-2" 
                        type={viewpw2 ? 'text' : 'password'}
                        pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*[;:",`]).{8,}'
                        title='The password must contain an upper and lower case letter, a number, and be 8 characters long.'
                        name="ConfirmPassword"
                        placeholder='Confirm password.'
                        required
                    >
                    </input>
                    <button type="button" onClick={togglePassword2} className='absolute ml-80 mt-10'>
                        {viewpw2 ? (<FiEyeOff className="h-5 w-5" />) : (<FiEye className="h-5 w-5" />)}
                    </button>
                </div>
                <button
                    className="bg-slate-700 hover:bg-slate-500 text-white py-2 border rounded-xl w-full mt-5"
                    type="submit"
                    onClick={handleContinue}
                >
                    Continue
                </button>
            </div>    
            <h6 className='flex justify-center text-xs mt-2'>The password must contain an upper and lower case letter, a number, and be 8 characters long.</h6>
        </form>
    </div>
    </div>
  )
}

export default Password