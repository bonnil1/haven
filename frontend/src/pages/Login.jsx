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

            const data = await response.json();
            console.log(data)

            if (data.message === "Log in successful.") {
                navigate('/');
            } else if (data.message === "Please verify your email address to activate account.") {
                setMessage(data.message)
            } else if (data.message === "Invalid credentials.") {
                setMessage(data.message)
            } else if (data.message === "No account associated with the email address.") {
                setMessage(data.message)
            }
            
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
                    <div>
                    <button
                        className="bg-slate-700 hover:bg-slate-500 text-white py-2 border rounded-xl w-full mt-5"
                        type="submit"
                    >
                        Log In
                    </button>
                    </div>
                    {message && (
                        <h1 className='flex justify-center text-xs text-emerald-700 mt-2'>{message}</h1>
                    )}
                </div>    
                <h6 className='flex justify-center text-xs mt-2'>Don't have an account? Sign up</h6>
                <div className="flex items-center justify-center space-x-4 w-full mt-7">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="text-gray-500">or sign in with</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>
            </form>
        </div>
  )
}

export default Login