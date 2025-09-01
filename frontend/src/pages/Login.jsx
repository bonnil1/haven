import React from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { useNavigate } from 'react-router-dom'
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Login = ({setIsLoggedIn}) => {

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
        console.log("hitting handle submit in log in flow")

        try {
            const response = await fetch("/api/login", {
                //"http://192.168.49.2:31560/api/login"
                //"/api/login"
                //"http://localhost:4000/api/login"
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({Email: email, Password: password})
            })

            const data = await response.json();
            console.log(data)

            if (data.message === "Log in successful.") {
                setIsLoggedIn(true)
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("email", data.email)
                localStorage.setItem("user_id", data.user_id)
                localStorage.setItem("firstname", data.FirstName)
                localStorage.setItem("lastname", data.LastName)
                navigate('/dashboard')
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

    const googlelogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => { 
            console.log(tokenResponse); 
            try {
                const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${tokenResponse.access_token}`,
                    },
                });
                
                const userData = await userInfo.json();
                console.log(userData); 

                const { given_name, family_name, email } = userData;
                console.log(`Name: ${given_name} ${family_name}`);
                console.log(`Email: ${email}`);
                setFirstName(given_name)
                setLastName(family_name)
                setEmail(email)

                const checkForUser = await fetch("/api/googleuser", {
                    //"http://192.168.49.2:31560/api/googleuser"
                    ///api/googleuser
                    //http://localhost:4000/api/googleuser
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({FirstName: given_name, LastName: family_name, Email: email})
                })

                console.log(data)
                if (data.message === "Google user already exists.") {
                    setIsLoggedIn(true);
                    navigate('/')
                } else if (data.message === "New google user created."){
                    setIsLoggedIn(true);
                    navigate('/')
                } else {
                    console.log("error checking if google user is in db.")
                }

            } catch (error) {
                console.log('Error fetching user info:', error);
            }
        },
        onError: (error) => {
            console.log('Login Failed:', error);
        },
        scope: 'profile email',
    });

    return (
        <div className='bg-gray-100 bg-opacity-60 min-h-screen'>
            <div className='flex justify-center items-center py-20'>
                {/* Laptop View */}
                <form onSubmit={handleSubmit} className='flex flex-col rounded-3xl shadow-lg font-roboto bg-[rgb(248,251,248)] w-5/6 sm:w-1/2 p-6 sm:p-16 sm:px-20'>
                    <h3 className='text-3xl text-[rgb(48,92,112)] mb-5'>Welcome Back  👋🏼</h3>
                    <div>
                        <div className='flex flex-col mb-5'>
                            <label className='text-[rgb(48,92,112)] font-bold text-sm'>Email</label>
                            <input
                                className="border border-[rgb(120,161,169)] focus:outline-teal-700 text-sm placeholder-[rgb(136,173,179)] rounded-xl p-2 mt-1"
                                type="email" 
                                placeholder="Example@email.com"
                                onChange={handleEmail}
                                title='Example@email.com'
                                pattern="^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z]{2,}$"
                                required
                            >
                            </input>
                        </div>
                        <div className='relative flex flex-col'>
                            <label className='text-[rgb(48,92,112)] font-bold text-sm'>Password</label>
                            <input
                                className="border border-[rgb(120,161,169)] focus:outline-teal-700 text-sm placeholder-[rgb(136,173,179)] rounded-xl p-2 mt-1" 
                                type={viewpw ? "text" : "password"}
                                placeholder='Enter password.'
                                onChange={handlePassword}
                            >
                            </input>
                            <button type="button" onClick={togglePassword} className='absolute mt-3 right-4 top-1/2 transform -translate-y-1/2'>
                                {viewpw ? (<FiEyeOff className="h-5 w-5 text-[rgb(136,173,179)]" />) : (<FiEye className="h-5 w-5 text-[rgb(136,173,179)]" />)}
                            </button>
                        </div>
                        <div>
                            <h3 className='flex justify-end text-xs text-[rgb(136,173,179)] mt-2'>Forgot password?</h3>
                        </div>
                        <div>
                            <button
                                className="bg-[rgb(42,98,112)] hover:bg-teal-900 text-white py-2 border rounded-xl w-full mt-5"
                                type="submit"
                            >
                                Continue
                            </button>
                        </div>
                        {message && (
                            <h1 className='flex justify-center text-xs text-emerald-700 mt-2'>{message}</h1>
                        )}
                    </div>    
                    <h6 className='flex justify-center text-xs mt-2'>Don't have an account? <NavLink to="/signup" className="text-[rgb(42,98,112)] font-bold hover:text-teal-700 ml-1">Sign up.</NavLink></h6>
                    <div className="flex items-center justify-center space-x-4 w-full mt-5">
                        <div className="flex-grow border-t border-[rgb(42,98,112)]"></div>
                        <span className="text-slate-700 text-lg font-medium">or sign in with</span>
                        <div className="flex-grow border-t border-[rgb(42,98,112)]"></div>
                    </div>
                    <div className='flex justify-between mt-7'>
                        <button onClick={() => googlelogin()} className='border border-[rgb(209,224,205)] rounded-md p-3 sm:px-10'><FcGoogle className='size-10'/></button>
                        <button className='border border-[rgb(209,224,205)] rounded-md p-3 sm:px-10'><FaFacebook className='size-10 text-blue-600'/></button>
                        <button className='border border-[rgb(209,224,205)] rounded-md p-3 sm:px-10'><FaApple className='size-10'/></button>
                        <button className='border border-[rgb(209,224,205)] rounded-md p-3 sm:px-10'><FaLinkedin className='size-10 text-sky-700'/></button>
                    </div>
                </form>


            </div>
        </div>
  )
}

export default Login