import React from 'react'
import { useState } from 'react'
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";

const Login = () => {

    const [viewpw, setViewpw] = useState(false)

    const togglePassword = () => {
        setViewpw(prevState => !prevState)
    }

    return (
        <div className='flex justify-center items-center mt-20'>
            <form className='flex flex-col border border-slate-400 rounded-3xl w-5/6 sm:w-1/3 p-8 sm:p-16'>
                <h3 className='text-2xl text-slate-700 font-semibold mb-5'>Welcome Back  👋🏼</h3>
                <div>
                    <div className='flex flex-col mb-5'>
                        <label>Email</label>
                        <input
                            className="border border-slate-300 focus:outline-slate-500 rounded-md p-1 mt-2"
                            type="email" 
                            placeholder="Example@email.com"
                            title='Example@email.com'
                            pattern="^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z]{2,}$"
                            required
                        >
                        </input>
                    </div>
                    <div className='flex flex-col'>
                        <label>Password</label>
                        <input
                            className="border border-slate-300 focus:outline-slate-500 rounded-md p-1 mt-2" 
                            type={viewpw ? "text" : "password"}
                            pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*[;:",`]).{8,}'
                            title='The password must contain an upper and lower case letter, a number, and be 8 characters long.'
                            placeholder='Enter password.'
                        >
                        </input>
                        <button type="button" onClick={togglePassword} className='absolute ml-80 mt-10'>
                            {viewpw ? (<FiEyeOff className="h-5 w-5" />) : (<FiEye className="h-5 w-5" />)}
                        </button>
                    </div>
                    <div className=''>
                        <h3 className='flex justify-end text-xs mt-2'>Forgot password?</h3>
                    </div>
                    <div>
                    <button
                        className="bg-slate-700 hover:bg-slate-500 text-white py-2 border rounded-xl w-full mt-5"
                        type="submit"
                    >
                        Log In
                    </button>
                    </div>
                </div>    
                <h6 className='flex justify-center text-xs mt-2'>Don't have an account? Sign up</h6>
                <div class="flex items-center justify-center space-x-4 w-full mt-7">
                    <div class="flex-grow border-t border-gray-300"></div>
                    <span class="text-gray-500">or sign in with</span>
                    <div class="flex-grow border-t border-gray-300"></div>
                </div>
            </form>
        </div>
  )
}

export default Login