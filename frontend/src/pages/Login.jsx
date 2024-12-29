import React from 'react'

const Login = () => {
  return (
    <div className='flex justify-center items-center mt-20'>
        <form className='flex flex-col border border-slate-400 rounded-3xl w-5/6 sm:w-1/3 p-8 sm:p-16'>
            <h3 className='text-2xl text-slate-700 font-semibold mb-5'>Welcome Back to Haven</h3>
            <div>
                <div className='flex flex-col mb-5'>
                    <label>Email</label>
                    <input
                        className="border border-slate-300 focus:outline-slate-500 rounded-md p-1 mt-2"
                        type="text" 
                        pattern="^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z]{2,}$"
                        placeholder="Example@email.com"
                        required
                    >
                    </input>
                </div>
                <div className='flex flex-col'>
                    <label>Password</label>
                    <input
                        className="border border-slate-300 focus:outline-slate-500 rounded-md p-1 mt-2" 
                        type="text" 
                        pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*[;:",`]).{8,}'
                        title='The password must contain an upper and lower case letter, a number, and be 8 characters long.'
                        placeholder='Enter password.'
                    >
                    </input>
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
            <h6 className='flex justify-center text-xs mt-2'>Forgot username or password?</h6>
        </form>
    </div>
  )
}

export default Login