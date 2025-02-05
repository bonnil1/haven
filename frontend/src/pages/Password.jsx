import React from 'react'
import { useState, useEffect } from 'react';
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from 'react-router-dom'

const Password = () => {

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

        fetch(`http://localhost:4000/signup/pw?token=${tokenFromUrl}`)
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
                const response = await fetch(`http://localhost:4000/signup/pw?token=${tokenFromUrl}`, {
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
        <form onSubmit={handleSubmit} className='flex flex-col border border-slate-400 rounded-3xl w-5/6 sm:w-1/3 p-8 sm:p-16'>
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
                        title='The password must contain one upper and one lower case letter, one number, and be 8 characters minimum.'
                        name="Password"
                        placeholder='Enter password.'
                        onChange={validatePassword}
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
                        title='The password must contain one upper and one lower case letter, one number, and be 8 characters minimum.'
                        name="ConfirmPassword"
                        placeholder='Confirm password.'
                        onChange={handleChangeCPW}
                        required
                    >
                    </input>
                    <button type="button" onClick={togglePassword2} className='absolute ml-80 mt-10'>
                        {viewpw2 ? (<FiEyeOff className="h-5 w-5" />) : (<FiEye className="h-5 w-5" />)}
                    </button>
                </div>
                <div className='flex flex-col mt-5'>
                    <p  className='text-xs text-slate-700'
                        style={{
                            color: pwvalidations.capital ? 'teal' : 'black',
                        }}
                        >
                        {pwvalidations.capital ? '✔ One upper case letter' : '✘ One upper case letter'}
                    </p>
                    <p  className='text-xs text-slate-700'
                        style={{
                            color: pwvalidations.lower ? 'teal' : 'black',
                        }}
                        >
                        {pwvalidations.lower ? '✔ One lower case letter' : '✘ One lower case letter'}
                    </p>
                    <p  className='text-xs text-slate-700'
                        style={{
                            color: pwvalidations.number ? 'teal' : 'black',
                        }}
                        >
                        {pwvalidations.number ? '✔ One number' : '✘ One number'}
                    </p>
                    <p  className='text-xs text-slate-700'
                        style={{
                            color: pwvalidations.characters ? 'teal' : 'black',
                        }}
                        >
                        {pwvalidations.characters ? '✔ 8 characters minimum' : '✘ 8 characters minimum'}
                    </p>
                    <p  className='text-xs text-slate-700'
                        style={{
                            color: pwvalidations.match ? 'teal' : 'black',
                        }}
                        >
                        {pwvalidations.match ? '✔ Passwords match' : '✘ Passwords match'}
                    </p>
                </div>
                <button
                    className="bg-slate-700 hover:bg-slate-500 text-white py-2 border rounded-xl w-full mt-5"
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