import React from 'react'
import { useState, useEffect } from 'react';
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from 'react-router-dom'
import { FaCheckCircle } from "react-icons/fa";
import { BsXCircleFill } from "react-icons/bs";

const Password = ({setIsLoggedIn}) => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [viewpw, setViewpw] = useState(false);
    const [viewpw2, setViewpw2] = useState(false);
    const [pwchange, setPwchange] = useState(false);
    const [message, setMessage] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [pwvalidations, setPWValidations] = useState({
        capital: false,
        lower: false,
        number: false,
        characters: false,
        match: false,
    });

    const capitalRegex = /[A-Z]/;
    const lowerRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
    const charactersRegex = /^.{8,}$/;

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const tokenFromUrl = params.get('token');

        fetch(`/api/signup/pw?token=${tokenFromUrl}`)
        //`http://192.168.49.2:31560/api/signup/pw?token=${tokenFromUrl}`
        ///api/signup/pw?token=${tokenFromUrl}
        //http://localhost:4000/api/signup/pw?token=${tokenFromUrl}
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Failed to verify email.");
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    setMessage(data.message)
                    setEmail(data.email)
                })
                .catch(error => {
                    console.error("Error verifying email:", error);
                });
    }, []);

    const togglePassword = () => {
        setViewpw(prevState => !prevState)
    }

    const togglePassword2 = () => {
        setViewpw2(prevState => !prevState)
    }

    const validatePassword = (event) => {
        setPassword(event.target.value);
    
        setPWValidations({
          capital: capitalRegex.test(password),
          lower: lowerRegex.test(password),
          number: numberRegex.test(password),
          characters: charactersRegex.test(password)
        });
    };

    const handleChangeCPW = (event) => {
        setConfirmPassword(event.target.value)
        setPwchange(true)
    }

    useEffect(() => {
        if (pwchange) {
            const checkPassword = () => {
                if (password === confirmPassword && password !== "") {
                    setPWValidations({
                        capital: capitalRegex.test(password),
                        lower: lowerRegex.test(password),
                        number: numberRegex.test(password),
                        characters: charactersRegex.test(password),
                        match: true
                    })
                } else {
                    setPWValidations({
                        capital: capitalRegex.test(password),
                        lower: lowerRegex.test(password),
                        number: numberRegex.test(password),
                        characters: charactersRegex.test(password),
                        match: false
                    })
                }
            }
            checkPassword()
        }
    }, [password, confirmPassword, pwchange])

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(password)
        const params = new URLSearchParams(window.location.search);
        const tokenFromUrl = params.get('token');

        if (password === confirmPassword && password !== "") {
            try {
                const response = await fetch(`http://localhost:4000/api/signup/pw?token=${tokenFromUrl}`, {
                    //`http://192.168.49.2:31560/api/signup/pw?token=${tokenFromUrl}`
                    ///api/signup/pw?token=${tokenFromUrl}
                    //http://localhost:4000/api/signup/pw?token=${tokenFromUrl}
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({Password: password})
                });

                if (!response.ok) {
                    throw new Error("Failed to set password.");
                }

                const data = await response.json();
                console.log(data)
                setIsLoggedIn(true)
                navigate('/signup/pw/profile');

            } catch (error) {
                console.error(error);
                setMessage("An error occurred while setting password.");
            }
        } else {
            setMessage("Passwords do not match.")
        }
    };

  return (
    <div>
        <div className='flex justify-center items-center mt-16'>
        <form onSubmit={handleSubmit} className='flex flex-col rounded-3xl shadow-xl font-roboto bg-[rgb(248,251,248)] w-5/6 sm:w-1/2 p-8 sm:p-16 sm:px-20'>
            <h3 className='text-3xl text-[rgb(48,92,112)] mb-5'>Create Password</h3>
            <div>
                <div className='flex flex-col mb-5'>
                    <label className='text-[rgb(48,92,112)] font-bold text-sm'>Email</label>
                    <input
                        className="border border-[rgb(120,161,169)] focus:outline-teal-700 text-sm placeholder-[rgb(136,173,179)] rounded-xl p-2 mt-1"
                        type="email" 
                        name="Email"
                        value={email}
                        disabled
                        required
                    >
                    </input>
                </div>
                <div className='relative flex flex-col'>
                    <label className='text-[rgb(48,92,112)] font-bold text-sm'>Password</label>
                    <input
                        className="border border-[rgb(120,161,169)] focus:outline-teal-700 text-sm placeholder-[rgb(136,173,179)] rounded-xl p-2 mt-1" 
                        type={viewpw ? 'text' : 'password'}
                        pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*[;:",`]).{8,}'
                        title='The password must contain one upper and one lower case letter, one number, and be 8 characters minimum.'
                        name="Password"
                        placeholder='Enter password.'
                        onChange={validatePassword}
                        required
                    >
                    </input>
                    <button type="button" onClick={togglePassword} className='absolute mt-3 right-4 top-1/2 transform -translate-y-1/2'>
                        {viewpw ? (<FiEyeOff className="h-5 w-5 text-[rgb(136,173,179)]" />) : (<FiEye className="h-5 w-5 text-[rgb(136,173,179)]" />)}
                    </button>
                </div>
                <div className='relative flex flex-col mt-5'>
                    <label className='text-[rgb(48,92,112)] font-bold text-sm'>Confirm Password</label>
                    <input
                        className="border border-[rgb(120,161,169)] focus:outline-teal-700 text-sm placeholder-[rgb(136,173,179)] rounded-xl p-2 mt-1" 
                        type={viewpw2 ? 'text' : 'password'}
                        pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*[;:",`]).{8,}'
                        title='The password must contain one upper and one lower case letter, one number, and be 8 characters minimum.'
                        name="ConfirmPassword"
                        placeholder='Confirm password.'
                        onChange={handleChangeCPW}
                        required
                    >
                    </input>
                    <button type="button" onClick={togglePassword2} className='absolute mt-3 right-4 top-1/2 transform -translate-y-1/2'>
                        {viewpw2 ? (<FiEyeOff className="h-5 w-5 text-[rgb(136,173,179)]" />) : (<FiEye className="h-5 w-5 text-[rgb(136,173,179)]" />)}
                    </button>
                </div>
                <div className='flex flex-col mt-5'>
                    <div  className='text-xs text-slate-700'
                        style={{
                            color: pwvalidations.capital ? 'teal' : 'black',
                        }}
                        >
                        {pwvalidations.capital ? (
                            <div className='flex'>
                            <FaCheckCircle className='mt-0.5 mr-1 text-[rgb(250,112,99)]'/> One upper case letter
                            </div>
                        ) : (
                            <div className='flex'>
                            <BsXCircleFill className='mt-0.5 mr-1 text-[rgb(250,112,99)]'/> One upper case letter
                            </div>
                        )}
                    </div>
                    <div  className='text-xs text-slate-700'
                        style={{
                            color: pwvalidations.lower ? 'teal' : 'black',
                        }}
                        >
                        {pwvalidations.lower ? (
                            <div className='flex'>
                            <FaCheckCircle className='mt-0.5 mr-1 text-[rgb(250,112,99)]'/> One lower case letter
                            </div>
                        ) : (
                            <div className='flex'>
                            <BsXCircleFill className='mt-0.5 mr-1 text-[rgb(250,112,99)]'/> One lower case letter
                            </div>
                        )
                        }
                    </div>
                    <div  className='text-xs text-slate-700'
                        style={{
                            color: pwvalidations.number ? 'teal' : 'black',
                        }}
                        >
                        {pwvalidations.number ? (
                            <div className='flex'>
                            <FaCheckCircle className='mt-0.5 mr-1 text-[rgb(250,112,99)]'/> One number
                            </div>
                        ) : (
                            <div className='flex'>
                            <BsXCircleFill className='mt-0.5 mr-1 text-[rgb(250,112,99)]'/> One number
                            </div>
                        )}
                    </div>
                    <div  className='text-xs text-slate-700'
                        style={{
                            color: pwvalidations.characters ? 'teal' : 'black',
                        }}
                        >
                        {pwvalidations.characters ? (
                            <div className='flex'>
                            <FaCheckCircle className='mt-0.5 mr-1 text-[rgb(250,112,99)]'/> 8 characters minimum
                            </div>
                        ) : (
                            <div className='flex'>
                            <BsXCircleFill className='mt-0.5 mr-1 text-[rgb(250,112,99)]'/> 8 characters minimum
                            </div>
                        )}
                    </div>
                    <div  className='text-xs text-slate-700'
                        style={{
                            color: pwvalidations.match ? 'teal' : 'black',
                        }}
                        >
                        {pwvalidations.match ? (
                            <div className='flex'>
                            <FaCheckCircle className='mt-0.5 mr-1 text-[rgb(250,112,99)]'/> Passwords match
                            </div>
                        ) : (
                            <div className='flex'>
                            <BsXCircleFill className='mt-0.5 mr-1 text-[rgb(250,112,99)]'/> Passwords match
                            </div>
                        )}
                    </div>
                </div>
                <button
                    className="bg-[rgb(42,98,112)] hover:bg-teal-900 text-white py-2 border rounded-xl w-full mt-5"
                    type="submit"
                >
                    Continue
                </button>
                {message === "Passwords do not match." && (
                    <h1 className='text-xs text-slate-800 mt-2'>Passwords do not match.</h1>
                )}
            </div>    
        </form>
    </div>
    </div>
  )
}

export default Password