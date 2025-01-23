import React from 'react'
import { useState } from 'react'
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate();
    const [viewpw, setViewpw] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('')

    const togglePassword = () => {
        setViewpw(prevState => !prevState)
    }

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:4000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({Email: email, Password: password})
            })

            if (!response.ok) {
                throw new Error("Error logging in.");
            }

            const data = await response.json();
            console.log(data)

            setMessage(data.message)
            
            navigate('/');
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='flex justify-center items-center mt-20'>
            <form onSubmit={handleSubmit} className='flex flex-col border border-slate-400 rounded-3xl w-5/6 sm:w-1/3 p-8 sm:p-16'>
                <h3 className='text-2xl text-slate-700 font-semibold mb-5'>Welcome Back  👋🏼</h3>
                <div>
                    <div className='flex flex-col mb-5'>
                        <label>Email</label>
                        <input
                            className="border border-slate-300 focus:outline-slate-500 rounded-md p-1 mt-2"
                            type="email" 
                            placeholder="Example@email.com"
                            onChange={handleEmail}
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
                            onChange={handlePassword}
                        >
                        </input>
                        <button type="button" onClick={togglePassword} className='absolute ml-80 mt-10'>
                            {viewpw ? (<FiEyeOff className="h-5 w-5" />) : (<FiEye className="h-5 w-5" />)}
                        </button>
                    </div>
                    <div>
                        <h3 className='flex justify-end text-xs mt-2'>Forgot password?</h3>
                    </div>
                    {message && (
                        <h1 className='text-xs text-slate-700'>{message}</h1>
                    )}
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